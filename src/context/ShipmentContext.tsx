/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { useAuth } from "./AuthContext";

export type ShipmentStatus =
  | "Pending"
  | "Picked Up"
  | "In Transit"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled"
  | "On Hold";

export type ShipmentData = {
  shipperName: string;
  shipperAddress: string;
  receiverName: string;
  receiverAddress: string;
  package: string;
  shipmentType: string;
  shipmentMode: string;
  carrierMode: string;
  weight: number;
  pickupDate: string;
  deliveryDate: string;
  status: ShipmentStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
  id?: string;
};

type ShipmentContextType = {
  shipments: ShipmentData[];
  createShipment: (data: Omit<ShipmentData, "status">) => Promise<void>;
  getShipments: () => Promise<ShipmentData[]>;
  trackShipment: (trackingId: string) => Promise<ShipmentData | null>;
  updateShipmentStatus: (
    shipmentId: string,
    status: ShipmentStatus
  ) => Promise<void>;
  loading: boolean;
  error: string | null;
};

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

const LOCAL_STORAGE_KEY = "user_shipments";

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [shipments, setShipments] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setShipments(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
  }, []);

  // Sync shipments to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(shipments));
  }, [shipments]);

  const createShipment = async (data: Omit<ShipmentData, "status">) => {
    if (!currentUser) {
      setError("You must be logged in to create a shipment.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await addDoc(collection(db, "shipments"), {
        ...data,
        status: "Pending" as ShipmentStatus,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await getShipments();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to create shipment");
      }
    } finally {
      setLoading(false);
    }
  };

  const updateShipmentStatus = async (
    shipmentId: string,
    status: ShipmentStatus
  ) => {
    if (!currentUser) {
      setError("You must be logged in to update shipment status.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const shipmentRef = doc(db, "shipments", shipmentId);
      await updateDoc(shipmentRef, {
        status,
        updatedAt: serverTimestamp(),
      });

      const updated = shipments.map((shipment) =>
        shipment.id === shipmentId
          ? { ...shipment, status, updatedAt: new Date().toISOString() }
          : shipment
      );
      setShipments(updated);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to update shipment status");
      }
    } finally {
      setLoading(false);
    }
  };

  const getShipments = useCallback(async () => {
    if (!currentUser) {
      setError("You must be logged in to fetch shipments.");
      setShipments([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      const snapshot = await getDocs(
        query(
          collection(db, "shipments"),
          where("userId", "==", currentUser.uid)
        )
      );

      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (ShipmentData & { id: string })[];

      const sorted = fetched.sort((a, b) => {
        const dateA =
          a.createdAt instanceof Date
            ? a.createdAt
            : new Date(a.createdAt || 0);
        const dateB =
          b.createdAt instanceof Date
            ? b.createdAt
            : new Date(b.createdAt || 0);
        return dateB.getTime() - dateA.getTime();
      });

      setShipments(sorted);
      return sorted;
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to fetch shipments");
      }
      setShipments([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentUser]);

  const trackShipment = useCallback(async (trackingId: string) => {
    if (!trackingId.trim()) {
      setError("Please provide a valid tracking ID.");
      return null;
    }

    try {
      setLoading(true);
      setError(null);

      // Try direct lookup by doc ID
      const docRef = doc(db, "shipments", trackingId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const shipmentData = {
          id: docSnap.id,
          ...docSnap.data(),
        } as ShipmentData & { id: string };

        // ✅ Store in sessionStorage
        sessionStorage.setItem("trackedShipment", JSON.stringify(shipmentData));

        return shipmentData;
      }

      // Fallback: search all documents
      const snapshot = await getDocs(collection(db, "shipments"));
      const foundShipment = snapshot.docs.find((doc) => {
        const data = doc.data();
        return doc.id === trackingId || data.trackingId === trackingId;
      });

      if (foundShipment) {
        const shipmentData = {
          id: foundShipment.id,
          ...foundShipment.data(),
        } as ShipmentData & { id: string };

        // ✅ Store in sessionStorage
        sessionStorage.setItem("trackedShipment", JSON.stringify(shipmentData));

        return shipmentData;
      } else {
        setError("Shipment not found. Please check your tracking ID.");
        return null;
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to track shipment");
      }
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ShipmentContext.Provider
      value={{
        shipments,
        createShipment,
        getShipments,
        trackShipment,
        updateShipmentStatus,
        loading,
        error,
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error("useShipment must be used within a ShipmentProvider");
  }
  return context;
};

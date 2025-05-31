/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebaseConfig/firebase";
import { useAuth } from "./AuthContext";

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
  createdAt?: Date | string;
  id?: string; // Optional: for referencing individual documents
};

type ShipmentContextType = {
  shipments: Array<ShipmentData>; // Use ShipmentData type for shipments
  createShipment: (data: ShipmentData) => Promise<void>;
  getShipments: () => Promise<ShipmentData[]>;

  loading: boolean;
  error: string | null;
};

const ShipmentContext = createContext<ShipmentContextType | undefined>(
  undefined
);

export const ShipmentProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [shipments, setShipments] = useState<ShipmentData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createShipment = async (data: ShipmentData) => {
    if (!currentUser) {
      setError("You must be logged in to create a shipment.");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await addDoc(collection(db, "shipments"), {
        ...data,
        userId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      // Optionally refresh shipments after creation
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

  const getShipments = useCallback(async () => {
    if (!currentUser) {
      setError("You must be logged in to fetch shipments.");
      setShipments([]);
      return [];
    }

    try {
      setLoading(true);
      setError(null);

      // Remove orderBy from the query to avoid needing a composite index
      const snapshot = await getDocs(
        query(
          collection(db, "shipments"),
          where("userId", "==", currentUser.uid)
        )
      );

      const shipments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as (ShipmentData & { id: string })[];

      // Sort client-side by createdAt (most recent first)
      const sortedShipments = shipments.sort((a, b) => {
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

      setShipments(sortedShipments);
      return sortedShipments;
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

  return (
    <ShipmentContext.Provider
      value={{ shipments, createShipment, getShipments, loading, error }}
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

import { PiTelegramLogoThin } from "react-icons/pi";

const StickyWhatsappIcon = () => {
  return (
    <a
      href="https://wa.me/1234567890" // Replace with your WhatsApp number
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out"
    >
      <PiTelegramLogoThin color="white" size={32} />
    </a>
  );
};

export default StickyWhatsappIcon;

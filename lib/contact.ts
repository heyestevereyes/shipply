const number = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "52XXXXXXXXXX").replace(/\D/g, "") || "52";
const message = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || "Hola, quiero cotizar una importación";

export const whatsappUrl = (text: string = message) =>
  `https://wa.me/${number}?text=${encodeURIComponent(text)}`;

export const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://shipply.mx").replace(/\/$/, "");

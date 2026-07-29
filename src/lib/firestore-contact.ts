import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "facebook" | "instagram";
};

export type ContactContent = {
  email: string;
  location: string;
  replyTime: string;
  socials: SocialLink[];
};

export const DEFAULT_CONTACT: ContactContent = {
  email: "",
  location: "",
  replyTime: "",
  socials: [],
};

const contactRef = doc(db, "siteContent", "contact");

export function subscribeToContact(callback: (contact: ContactContent) => void) {
  return onSnapshot(contactRef, (snap) => {
    if (snap.exists()) {
      callback({ ...DEFAULT_CONTACT, ...(snap.data() as ContactContent) });
    } else {
      callback(DEFAULT_CONTACT);
    }
  });
}

export async function saveContact(data: ContactContent) {
  await setDoc(contactRef, data, { merge: true });
}
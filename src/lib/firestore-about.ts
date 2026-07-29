import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export type AboutStat = {
  icon: string;
  value: number;
  suffix: string;
  decimals: number;
  label: string;
  color: string;
};

export type AboutContent = {
  portrait: string;
  paragraph: string;
  bio: string;
  location: string;
  roles: string[];
  stats: AboutStat[];
  degreeTitle: string;
  institution: string;
  years: string;
  coursework: string[];
  certifications: string[];
};

export const DEFAULT_ABOUT: AboutContent = {
  portrait: "",
  paragraph: "",
  bio: "",
  location: "",
  roles: [],
  stats: [],
  degreeTitle: "",
  institution: "",
  years: "",
  coursework: [],
  certifications: [],
};

const aboutRef = doc(db, "siteContent", "about");

export function subscribeToAbout(callback: (about: AboutContent) => void) {
  return onSnapshot(aboutRef, (snap) => {
    if (snap.exists()) {
      callback({ ...DEFAULT_ABOUT, ...(snap.data() as AboutContent) });
    } else {
      callback(DEFAULT_ABOUT);
    }
  });
}

export async function saveAbout(data: AboutContent) {
  await setDoc(aboutRef, data, { merge: true });
}
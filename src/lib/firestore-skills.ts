import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export type Stack = {
  id: string;
  icon: string;
  title: string;
  items: string[];
  color: string;
  order: number;
};

export type StackInput = Omit<Stack, "id">;

const skillsCol = collection(db, "skills");

export function subscribeToSkills(callback: (stacks: Stack[]) => void) {
  const q = query(skillsCol, orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const stacks = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as StackInput),
    }));
    callback(stacks);
  });
}

export async function addStack(data: StackInput) {
  await addDoc(skillsCol, data);
}

export async function updateStack(id: string, data: StackInput) {
  await updateDoc(doc(db, "skills", id), data);
}

export async function deleteStack(id: string) {
  await deleteDoc(doc(db, "skills", id));
}
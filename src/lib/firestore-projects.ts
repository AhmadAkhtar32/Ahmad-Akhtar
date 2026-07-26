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

export type ProjectLink = {
  label: string;
  href: string;
};

export type Project = {
  id: string;
  image: string;
  title: string;
  desc: string;
  tags: string[];
  links: ProjectLink[];
  year: string;
  color: string;
  order: number;
};

export type ProjectInput = Omit<Project, "id">;

const projectsCol = collection(db, "projects");

export function subscribeToProjects(callback: (projects: Project[]) => void) {
  const q = query(projectsCol, orderBy("order", "asc"));
  return onSnapshot(q, (snapshot) => {
    const projects = snapshot.docs.map((d) => ({
      id: d.id,
      ...(d.data() as ProjectInput),
    }));
    callback(projects);
  });
}

export async function addProject(data: ProjectInput) {
  await addDoc(projectsCol, data);
}

export async function updateProject(id: string, data: ProjectInput) {
  await updateDoc(doc(db, "projects", id), data);
}

export async function deleteProject(id: string) {
  await deleteDoc(doc(db, "projects", id));
}
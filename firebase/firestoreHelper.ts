import { addDoc, collection, doc, DocumentData, DocumentReference, getDocs, QuerySnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./clientApp";

export function readCollection(collectionKey: string): Promise<QuerySnapshot<DocumentData>> {
  return Promise.resolve()
    .then(() => getDocs(collection(db, collectionKey)));
};

export function writeDocument(collectionKey: string, dataKey: string, data: any): Promise<void> {
  return Promise.resolve()
    .then(() => setDoc(doc(db, collectionKey, dataKey), data))
};

export function updateDocument(collectionKey: string, dataKey: string, data: any): Promise<void> {
  return Promise.resolve()
    .then(() => updateDoc(doc(db, collectionKey, dataKey), data))
};
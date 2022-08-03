import { addDoc, collection, DocumentData, DocumentReference, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "./clientApp";

export function readCollection(collectionKey: string): Promise<QuerySnapshot<DocumentData>> {
  return Promise.resolve()
    .then(() => getDocs(collection(db, collectionKey)));
};


export function writeDoc(collectionKey: string, data: any): Promise<DocumentReference> {
  return Promise.resolve()
    .then(() => addDoc(collection(db, collectionKey), data));
};
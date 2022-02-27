import { collection, DocumentData, getDocs, QuerySnapshot } from "firebase/firestore";
import { db } from "../../firebase/clientApp";

export function readCollection(collectionKey: string): Promise<QuerySnapshot<DocumentData>> {
  return Promise.resolve()
    .then(() => getDocs(collection(db, collectionKey)));
};

export function writeDoc() { };
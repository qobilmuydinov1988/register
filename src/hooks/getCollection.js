import { useEffect, useMemo, useState } from "react";
import { db } from "../firebase/firebase-config";
import { useGlobalcontext } from "./useGlobalcontext";
import { onSnapshot, collection, query, where } from "firebase/firestore";

export function useCollection(collectionName, q) {
  const userId = q?.[2];

  const memoizedQ = useMemo(() => {
    return [...q];
  }, [userId]);

  const transactionFilter = useMemo(() => {
    if (!memoizedQ) {
      return collection(db, collectionName);
    } else {
      return query(collection(db, collectionName), where(...memoizedQ));
    }
  }, [collectionName, memoizedQ]);

  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    const unsubscribe = onSnapshot(transactionFilter, (querySnapshot) => {
      const collectionFromFireStore = [];
      querySnapshot.forEach((item) => {
        collectionFromFireStore.push({ id: item.id, ...item.data() });
      });
      console.log(collectionFromFireStore);
      setData(collectionFromFireStore);
    });

    return () => unsubscribe();
  }, [transactionFilter]);

  return { data };
}

import { db } from "../firebase/firebase-config.js";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { toast } from "sonner";
export function useFirestore() {
  const addData = (data) => {
    addDoc(collection(db, "transactions"), data)
      .then(() => {
        toast.success("data is added successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteData = (id) => {
    deleteDoc(doc(db, "transactions", id))
      .then(() => toast.info("data is deleted successfully"))
      .catch((err) => console.log(err));
  };
  const updateData = (id, title, price) => {
    updateDoc(doc(db, "transactions", id), {
      title,
      price,
    })
      .then(() => {
        toast("Data is chenged!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return { addData, deleteData, updateData };
}

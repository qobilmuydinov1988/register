import TransactionList from "../components/TransactionList.jsx";
import { useCollection } from "../hooks/getCollection.js";
import { useGlobalcontext } from "../hooks/useGlobalcontext.js";
import { useState } from "react";

import styles from "../components/formTransaction.module.css";
import { useFirestore } from "../hooks/useFireStoreMethod.js";

import { toast } from "sonner";

function Home() {
  const [selectedId, setSelectedId] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  console.log(title, price);
  const { user } = useGlobalcontext();
  console.log(user.uid);
  const { data: transactions } = useCollection("transactions", [
    "uid",
    "==",
    user.uid,
  ]);
  const { updateData } = useFirestore();

  function changePrice(e) {
    setPrice(e.target.value);
  }
  function changeTitle(e) {
    setTitle(e.target.value);
  }
  let selectedData;
  if (selectedId) {
    selectedData = transactions.find((transaction) => {
      return transaction.id === selectedId;
    });
  }
  console.log(selectedId);

  function selectProductId(product) {
    if (selectedId) {
      setSelectedId(null);
      setPrice("");
      setTitle("");
      return;
    }
    setSelectedId(product.id);
    setTitle(product.title);
    setPrice(product.price);
  }

  function handleUpdateData(id, title, price) {
    updateData(id, title, price);
    setTitle("");
    setPrice("");
    setSelectedId(null);
  }

  return (
    <div className="container">
      <TransactionList
        transactions={transactions}
        selectProductId={selectProductId}
        selectedId={selectedId}
      />
      <div className="reproduction-transaction">
        <FormTransaction
          user={user}
          selectedId={selectedId}
          selectedData={selectedData}
          changePrice={changePrice}
          changeTitle={changeTitle}
          title={title}
          price={price}
          setPrice={setPrice}
          setTitle={setTitle}
          handleUpdateData={handleUpdateData}
        />
      </div>
    </div>
  );
}

export default Home;

function FormTransaction({
  user,
  selectedId,
  selectedData,
  changePrice,
  changeTitle,
  title,
  price,
  handleUpdateData,
  cancelChange,
  setTitle,
  setPrice,
}) {
  const { addData } = useFirestore();
  console.log(selectedData);

  function handleSubmit(e) {
    e.preventDefault();
    if (!title || !price) {
      toast.error("all the fields mus be filled!");
      return;
    }
    if (selectedId) {
      handleUpdateData(selectedId, title, price);
      return;
    }

    addData({ title, price, uid: user.uid });
    setTitle("");
    setPrice("");
  }

  return (
    <div className={styles.box}>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input type="text" onChange={changeTitle} value={title} />
        </label>
        <label>
          <span>Price</span>
          <input type="number" onChange={changePrice} value={price} />
        </label>
        {selectedId ? (
          <>
            <button>chnage product</button>
          </>
        ) : (
          <>
            <button>add product</button>
          </>
        )}
      </form>
    </div>
  );
}

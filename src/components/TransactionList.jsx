import styles from "./TransactionList.module.css";
import { useFirestore } from "../hooks/useFireStoreMethod.js";
import { FaRegTrashCan } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
function TransactionList({ transactions, selectProductId, selectedId }) {
  console.log(transactions);
  return (
    <div>
      {transactions &&
        transactions.map((transaction) => (
          <Transaction
            transaction={transaction}
            key={transaction.id}
            selectProductId={selectProductId}
            selectedId={selectedId}
          />
        ))}
    </div>
  );
}

export default TransactionList;

function Transaction({ transaction, selectProductId, selectedId }) {
  const { deleteData } = useFirestore();
  console.log(deleteData);

  const isEditing = selectedId === transaction.id;
  return (
    <div className={styles.card}>
      <div className="content">
        <h3>Product: {transaction.title}</h3>
        <p>Price: {transaction.price}$</p>
      </div>
      <div className={styles.buttons}>
        <div
          className={styles.trash}
          onClick={() => {
            deleteData(transaction.id);
          }}
        >
          <FaRegTrashCan />
        </div>
        <div
          className={`${styles.edit} ${isEditing ? styles.active : ""}`}
          onClick={() => {
            selectProductId(transaction);
          }}
        >
          <CiEdit />
        </div>
      </div>
    </div>
  );
}

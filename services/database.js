import { database } from "../firebase";
import { getCurrentUser } from "./auth";

const createItem = (newItem) => {
  const todoRef = database.ref("Items");
  todoRef.push(newItem);
};

const listItems = (setItemList) => {
  const todoRef = database.ref("Items");
  todoRef.on("value", (snapshot) => {
    const items = snapshot.val();
    const itemList = [];
    for (let id in items) {
      itemList.push({ id, ...items[id] });
    }
    setItemList(itemList);
  });
};
const deleteItem = (id) => {
  const todoRef = database.ref("Items").child(id);
  todoRef.remove();
};
const updateItem = (id, status) => {
  const todoRef = database.ref("Items").child(id);
  todoRef.update({
    complete: !status,
  });
};
export { createItem, listItems, deleteItem, updateItem };

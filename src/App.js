import { useEffect, useState } from "react";
import Alert from "./components/Alert";
import GroceryItem from "./components/GroceryItem";



/* Add LocalStorage */

function App() {
  const [grocery, setGrocery] = useState("");
  const [itemList, setItemList] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, text: "", type: "" });

  /* alert */
  useEffect(() => {
    const timeout = setTimeout(() => {
      setAlert((alert) => (alert.show = false));
    }, 2000);

    return () => clearTimeout(timeout);
  }, [itemList]);


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!grocery) {
      setAlert({
        show: true,
        text: "please enter value",
        type: "alert-danger",
      });
    } else if (grocery && edit) {
      setItemList(
        itemList.map((item) => {
          if (item.id === editId) {
            return { ...item, title: grocery };
          }
          return item;
        })
      );

      setGrocery("");
      setEdit(false);
      setEditId(null);
      setAlert({ show: true, text: "Item edited", type: "alert-success" });
    } else {
      const newGrocery = {
        id: new Date().getTime().toString(),
        title: grocery,
      };
      setItemList([...itemList, newGrocery]);
      setGrocery("");
      setAlert({
        show: true,
        text: "Item added to list",
        type: "alert-success",
      });
    }
  };


  const editItem = (id) => {
    setEdit(true);
    const editedItem = itemList.find((item) => item.id === id);
    setGrocery(editedItem.title);
    setEditId(id);
  };


  const deleteItem = (id) => {
    const newList = itemList.filter((item) => item.id !== id);
    setItemList(newList);
    setAlert({ show: true, text: "Item removed", type: "alert-danger" });
  };


  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} />}
        <h3>grocery list</h3>
        <div className="form-control">
          <input
            onChange={(e) => setGrocery(e.target.value)}
            className="grocery"
            type="text"
            value={grocery}
            placeholder="e.g. eggs"
          />
          <button type="submit" className="submit-btn">
            {edit ? "Edit" : "Submit"}
          </button>
        </div>
      </form>

      {itemList.map((item) => {
        return (
          <div className="grocery-container">
            <GroceryItem
              key={item.id}
              groceryItem={item}
              editItem={editItem}
              deleteItem={deleteItem}
            />
          </div>
        );
      })}
      {/* Clear All button shows only when there are items in the list */}
      {itemList.length !== 0 && (
        <button onClick={() => setItemList([])} className="clear-btn">
          {" "}
          Clear Items
        </button>
      )}
    </section>
  );
}

export default App;

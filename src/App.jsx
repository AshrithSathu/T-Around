import BackgroundHeading from "./Components/Background/BackgroundHeading";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import ItemList from "./Components/ItemList/ItemList";
import Sidebar from "./Components/Sidebar/Sidebar";
import { initialItems } from "./Constants/Constants";
import { useEffect, useState } from "react";
function App() {
  const getItemsFromLocalStorage = JSON.parse(localStorage.getItem("items"));
  // const [items, setItems] = useState(() => {
  //   return JSON.parse(localStorage.getItem("items") || initialItems);
  // });
  const [items, setItems] = useState(getItemsFromLocalStorage || initialItems);

  const handleAddItem = (newItemText) => {
    const newItem = {
      id: new Date().getTime(),
      name: newItemText,
      packed: false,
    };
    const newItems = [...items, newItem];
    setItems(newItems);
  };
  const handleRemoveAllItems = () => setItems([]);
  const handleResetToInitial = () => setItems(initialItems);
  const handleMarkAllAsComplete = () => {
    console.log("mark all as complete");
    const newItems = items.map((item) => {
      return {
        ...item,
        packed: true,
      };
    });
    setItems(newItems);
  };
  const handleMarkAllAsIncomplete = () => {
    const newItems = items.map((item) => {
      return {
        ...item,
        packed: false,
      };
    });
    setItems(newItems);
  };

  const handleDeleteItem = (id) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleToggleItems = (id) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          packed: !item.packed,
        };
      }
      return item;
    });
    setItems(newItems);
  };

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  const numberOfItemsPacked = items.filter((item) => item.packed).length;

  return (
    <>
      <BackgroundHeading />

      <main>
        <Header
          numberOfItemsPacked={numberOfItemsPacked}
          totalNumberOfItems={items.length}
        />
        <ItemList
          items={items}
          setItems={setItems}
          handleDeleteItem={handleDeleteItem}
          handleToggleItems={handleToggleItems}
        />
        <Sidebar
          handleAddItem={handleAddItem}
          handleRemoveAllItems={handleRemoveAllItems}
          handleResetToInitial={handleResetToInitial}
          handleMarkAllAsComplete={handleMarkAllAsComplete}
          handleMarkAllAsIncomplete={handleMarkAllAsIncomplete}
        />
      </main>
      <Footer />
    </>
  );
}

export default App;

import { useEffect, useRef, useState } from "react";

function MaintainCategories() {
  const idRef = useRef();
  const nameRef = useRef();
  const [categories, setCategories] = useState([]);
  const categoriesDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  useEffect(() => {
    fetch(categoriesDb)
    .then(res => res.json())
    .then(data => setCategories(data)); 
  }, []);

  const add = () => {
    const newCategory = {
      id: Number(idRef.current.value),
      name: nameRef.current.value
    }
    categories.push(newCategory);
    setCategories(categories.slice());
    fetch(categoriesDb,{
      method: "PUT", 
      body: JSON.stringify(categories), 
      headers: {
        "Content-Type": "application/json"
      }
    })
  }

  const deleteCategory = (index) => {
    categories.splice(index, 1);
    setCategories(categories.slice());
    fetch(categoriesDb,{
      method: "PUT", // pannakse midagi sinna API otspunktile
      body: JSON.stringify(categories), // mida pannakse
      headers: { // mis kujul andmed pannakse
        "Content-Type": "application/json"
      }
    })
  }

  return ( <div>
    <label>Kategooria ID</label> <br />
    <input ref={idRef} type="number" /> <br />
    <label>Kategooria nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <button onClick={add}>Lisa</button>
   { categories.map( (element, index) => 
      <div key={element.id + element.name}>
        {element.name}
        <button onClick={() => deleteCategory(index)}>x</button>
      </div>)}
  </div> );
}

export default MaintainCategories;
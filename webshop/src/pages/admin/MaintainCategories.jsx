import { useEffect, useRef, useState } from "react";
import Spinner from "../../components/Spinner";

function MaintainCategories() {
  const idRef = useRef();
  const nameRef = useRef();
  const [categories, setCategories] = useState([]);
  const categoriesDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(categoriesDb)
    .then(res => res.json())
    .then(data => {
      setCategories(data || []);
      setLoading(false);
    }); 
  }, []);

  // ||   <--- kui vasakul pool on tühjus, siis võta parem pool
  // &&   <--- kui vasakul pool on tõene, siis kuva parem pool

  const add = (event) => { // <- saadan eventi 
    //console.log(event); // event on sündmus, mis mõõdab kuidas see funktsioon käima läks
    // iga nupuvajutusega (onKeyUp()) läheb siia funktsiooni
    // aga if sees olevat blokki teeb ainult siis, kui sulgude sees on üks tingimustest tõene
    if (event.code === "Enter" || event.type === "click") {
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
      idRef.current.value = "";
      nameRef.current.value = "";
    }
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
// HomePage spinner koos useState-ga (useState vaja tekitada)
// MaintainProducts spinner koos useState-ga (Spinner ka HTMLi + useState)
  return ( <div>
    { isLoading === true && <Spinner /> } <br />
    <label>Kategooria ID</label> <br />
    <input ref={idRef} type="number" /> <br />
    <label>Kategooria nimi</label> <br />
    <input onKeyUp={add} ref={nameRef} type="text" /> <br />
    <button onClick={add}>Lisa</button>
   { categories.map( (element, index) => 
      <div key={element.id + element.name}>
        {element.name}
        <button onClick={() => deleteCategory(index)}>x</button>
      </div>)}
  </div> );
}

export default MaintainCategories;
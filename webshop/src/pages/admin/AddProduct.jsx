import { useEffect, useRef, useState } from "react"; // <----- Reacti HOOK
// import productsFromFile from "../../products.json";
// import categoriesFromFile from "../../categories.json";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const [idUnique, setIdUnique] = useState(true);
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  // <-------
  const [products, setProducts] = useState([]); // <----

  const [categories, setCategories] = useState([]);
  const categoriesDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

  useEffect(() => {  // <-------
    fetch(productsDb)
    .then(res => res.json())
    .then(data => setProducts(data)); 

    fetch(categoriesDb)
    .then(res => res.json())
    .then(data => setCategories(data)); 
  }, []);

  const add = () => {
    const newProduct = {
      id: Number(idRef.current.value),
      name: nameRef.current.value,
      price: Number(priceRef.current.value),
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      image: imageRef.current.value,
      active: activeRef.current.checked
    }
    products.push(newProduct); // <---- 1)
    // LISAMINE PEAKS KÄIMA API PÄRINGU KAUDU
    // PUT / POST ---> saavad rakendused (localhost:3000) ja POSTMAN
    fetch(productsDb,{
      method: "PUT", // pannakse midagi sinna API otspunktile
      body: JSON.stringify(products), // mida pannakse
      headers: { // mis kujul andmed pannakse
        "Content-Type": "application/json"
      }
    })
  }


  const checkIdUniqueness = () => {
    //const ELEMENT = [].find(element => TRUE)
    //const JÄRJEKORRANUMBER = [].findIndex(element => TRUE)
                                                  //      29853242 === 29853242
                // <--- 2)
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    if (index === -1) {
      // console.log("unikaalne");
      setIdUnique(true);
    } else {
      // console.log("mitteunikaalne");
      setIdUnique(false);
    }
  }

  return ( 
    <div>
      {/* { !idUnique && <div>Sisestasid mitteunikaalse ID!</div>} */}
      { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
      <label>ID</label> <br />
      <input onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Kategooria</label> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <select ref={categoryRef}>
        {categories.map(element => <option key={element.id + element.name}>{element.name}</option>)}
      </select> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={add}>Lisa</button>
    </div> );
}

export default AddProduct;
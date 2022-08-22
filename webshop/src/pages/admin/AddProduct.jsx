import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  // const imageRef = useRef();
  const activeRef = useRef();
  const [idUnique, setIdUnique] = useState(true);
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoriesDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";
  const navigate = useNavigate(); // <- import kui vaadate varasemaid tutoriale, siis võite näha useHistory   .push()
  const [message, setMessage] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetch(productsDb)
    .then(res => res.json())
    .then(data => setProducts(data || [])); 

    fetch(categoriesDb)
    .then(res => res.json())
                        // || <- kui on vasakul poolt tühjus (null), võta parem pool
    .then(data => setCategories(data || [])); 
  }, []);

  const add = () => {                                // cart.jsx sees pani numbri HTMLi sisse
    if (idRef.current.value === "") {
      setMessage("ID on täitmata");   // setIdMessage("Id on täitmata")
      return;                         // korjake kõik returnid ära
    }  
    if (nameRef.current.value === "") {
      setMessage("Nimi on täitmata"); // setNameMessage("Nimi on täitmata")
      return;                         // korjake kõik returnid ära
    }  
    if (priceRef.current.value === "") {
      setMessage("Hind on täitmata"); // setPriceMessage("Nimi on täitmata")
      return;                         // korjake kõik returnid ära
    }  
    if (descriptionRef.current.value === "") {
      setMessage("Kirjeldus on täitmata"); // setDescriptionMessage("Kirjeldus on täitmata")
      return;                              // korjake kõik returnid ära
    }  
    // if (imageRef.current.value === "") {
    //   setMessage("Pildi aadress on täitmata"); // setImageMessage("Kirjeldus on täitmata")
    //   return;                              // korjake kõik returnid ära
    // }  

    const newProduct = {
      id: Number(idRef.current.value), // 0
      name: nameRef.current.value,   // ""
      price: Number(priceRef.current.value), // 0
      description: descriptionRef.current.value, // ""
      category: categoryRef.current.value, // gold
      image: image, // ""
      active: activeRef.current.checked // 0
    }
    products.push(newProduct);
    fetch(productsDb,{
      method: "PUT", // pannakse midagi sinna API otspunktile
      body: JSON.stringify(products), // mida pannakse
      headers: { // mis kujul andmed pannakse
        "Content-Type": "application/json"
      }
    }).then(() => navigate("/admin/halda-tooteid"))
  }

  const checkIdUniqueness = () => {
    const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
    if (index === -1) {
      setIdUnique(true);
    } else {
      setIdUnique(false);
    }
  }

  return ( 
    <div>
      <div>{message}</div>
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
      {/* <input ref={imageRef} type="text" /> <br /> */}
      <FileUpload onSendPictureUrl={setImage} />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={add}>Lisa</button>
    </div> );
}

export default AddProduct;
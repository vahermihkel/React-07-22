// Salvestus:
//1. brauserisse: localStorage/sessionStorage - lehekülje andmed (mis keel), sisselogimise andmed (token), ostukorv
//2. faili - logide (salvestatakse kasutaja iga klikk ja andmesisestus)
//3. andmebaas - kasutajad, tooted, tellimused, kategooriad, administraatorid, poed

import { useEffect, useRef, useState } from "react"; 
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import Spinner from "../../components/Spinner";

function MaintainProducts() {
  // käitub nagu productsFromFile (koguaeg on originaalsed tooted sees)
  const [databaseProducts, setDatabaseProducts] = useState([]);  
  // on koguaeg muutuvas seisundis (filtreeritakse / sorteeritakse)
  const [products, setProducts] = useState([]); 
  const [isLoading, setLoading] = useState(false);
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const searchedRef = useRef();

   // uef
   useEffect(() => { 
    setLoading(true);
    fetch(productsDb)
    .then(res => res.json())
    .then(data => {
      setProducts(data || []);
      setDatabaseProducts(data || []);
      setLoading(false);
    }); 
  }, []); 

  const deleteProduct = (productClicked) => {
    const index = databaseProducts.findIndex(element => element.id === productClicked.id);
    databaseProducts.splice(index,1); // 476 --> 475
    setProducts(databaseProducts.slice()); // HTML muutmiseks // 475
    searchProducts(); // 50
    fetch(productsDb,{ // andmebaasis muutmiseks
      method: "PUT", // pannakse midagi sinna API otspunktile
      body: JSON.stringify(databaseProducts), // mida pannakse
      headers: { // mis kujul andmed pannakse
        "Content-Type": "application/json"
      }
    })
    // ilus oleks .then() sees setProducts teha ja toast teha (kui backend on maas)
    toast.error('Edukalt kustutatud!', {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark"
      });
  }

  // "Elas metsas mutionu".indexOf("metsast")  --> 5   -1
  const searchProducts = () => {
    const result = databaseProducts.filter(element =>   // <-------
      element.name.toLowerCase().indexOf(searchedRef.current.value.toLowerCase()) >= 0);
    setProducts(result);
  }

  // järjekorranumbri (index) alusel käib nii muutmine kui ka kustutamine array-st
  // [].splice(index,1);
  // [][0] = "Ant";

  const changeProductActivity = (productClicked) => {
    const index = databaseProducts.findIndex(element => element.id === productClicked.id);
    databaseProducts[index].active = !databaseProducts[index].active;
                                // =   true
    setProducts(databaseProducts.slice()); // HTML muutmiseks
    searchProducts();
    fetch(productsDb,{ // andmebaasis muutmiseks
      method: "PUT", // pannakse midagi sinna API otspunktile
      body: JSON.stringify(databaseProducts), // mida pannakse
      headers: { // mis kujul andmed pannakse
        "Content-Type": "application/json"
      }
    })
  }

  return ( 
  <div>
    <ToastContainer />
    { isLoading === true && <Spinner /> } <br />
    <input onChange={searchProducts} ref={searchedRef} type="text" />
    <span>{products.length} tk</span>
    {products.map( (element) => 
      <div key={element.id} className={ element.active === true ? "active-product" : "inactive-product" }>
        <div onClick={() => changeProductActivity(element)}>
          <div>{element.id}</div>
          <div>{element.name}</div>
          <div>{element.price} €</div>
          <div>{element.image}</div>
          <div>{element.category}</div>
          <div>{element.description}</div>
          <div>{element.active + 0}</div>
        </div>
        <button onClick={() => deleteProduct(element)}>Kustuta</button>
        {/* <Link to={"/admin/muuda/" + element.id}> */}
        <Link to={`/admin/muuda/${element.id}`}>
          <button>Muuda</button>
        </Link>
      </div> )}
  </div> );
}

export default MaintainProducts;
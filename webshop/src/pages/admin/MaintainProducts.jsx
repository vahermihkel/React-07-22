// Salvestus:
//1. brauserisse: localStorage/sessionStorage - lehekülje andmed (mis keel), sisselogimise andmed (token), ostukorv
//2. faili - logide (salvestatakse kasutaja iga klikk ja andmesisestus)
//3. andmebaas - kasutajad, tooted, tellimused, kategooriad, administraatorid, poed

import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import productsFromFile from "../../products.json";

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);
  const searchedRef = useRef();

  const deleteProduct = (index) => {
    products.splice(index,1);
    setProducts(products.slice());
  }

  // "Elas metsas mutionu".indexOf("metsast")  --> 5   -1
  const searchProducts = () => {
    const result = productsFromFile.filter(element => 
      element.name.toLowerCase().indexOf(searchedRef.current.value.toLowerCase()) >= 0);
    setProducts(result);
  }

  return ( 
  <div>
    <input onChange={searchProducts} ref={searchedRef} type="text" />
    <span>{products.length} tk</span>
    {products.map( (element, index) => 
      <div key={element.id}>
        <div>{element.id}</div>
        <div>{element.name}</div>
        <div>{element.price} €</div>
        <div>{element.image}</div>
        <div>{element.category}</div>
        <div>{element.description}</div>
        <div>{element.active + 0}</div>
        <button onClick={() => deleteProduct(index)}>Kustuta</button>
        {/* <Link to={"/admin/muuda/" + element.id}> */}
        <Link to={`/admin/muuda/${element.id}`}>
          <button>Muuda</button>
        </Link>
      </div> )}
  </div> );
}

export default MaintainProducts;
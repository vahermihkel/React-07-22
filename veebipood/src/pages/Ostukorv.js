// import { Link } from 'react-router-dom';
import { useState } from "react";


function Ostukorv() {
  //const ostukorv = JSON.parse(sessionStorage.getItem("ostukorv")) || [];
  const [ostukorv, muudaOstukorv] = useState(JSON.parse(sessionStorage.getItem("ostukorv")) || []);

  const lisaOstukorvi = (element) => {
    ostukorv.push(element);
    // ostukorv = JSON.stringify(ostukorv);
    sessionStorage.setItem("ostukorv", JSON.stringify(ostukorv));
    muudaOstukorv(ostukorv.slice());// slice - koopia tegemiseks
  }

  const eemaldaOstukorvist = (index) => {
    ostukorv.splice(index,1); // splice - kustutamiseks
    sessionStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // salvestus
    muudaOstukorv(ostukorv.slice());  // HTML muutmine
  }

  return ( 
  <div>
    <div>{ostukorv.map((element, index) => 
      <div key={index}>
        <span>{element}</span>
        <button onClick={() => eemaldaOstukorvist(index)}>x</button>
        <button onClick={() => lisaOstukorvi(element)}>+</button>
      </div>)}</div> 
  </div>
   );
}

export default Ostukorv;
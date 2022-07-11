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

  // tühjenda
  const tyhjenda = () => {
    sessionStorage.setItem("ostukorv", JSON.stringify([])); // salvestus
    muudaOstukorv([]);  // HTML muutmine
  }

  const arvutaKogusumma = () => {
    let kogusumma = 0; // kogusumma = 0
  //[{n: "Nob", hind: 12}, {n: "Tes", hind: 21}].forEach()
  // forEach({n: "Nob", hind: 12} => 12  =  0 + 12  )
  // forEach({n: "Tes", hind: 21} => 33  =  12 + 21  )
    // ostukorv.forEach(element => kogusumma = kogusumma + Number(element.hind));
    ostukorv.forEach(element => kogusumma += Number(element.hind));
    return kogusumma;
  }

  // dünaamiline väljakuvamine
  return ( 
  <div>
    {ostukorv.length === 0 && <div>Ostukorv on tühi!</div>}
    {ostukorv.length > 0 && <button onClick={() => tyhjenda()}>Tühjenda</button>}
    <div>{ostukorv.map((element, index) => 
      <div key={index}>
        <span>{element.nimi} - {element.hind}</span>
        <button onClick={() => eemaldaOstukorvist(index)}>x</button>
        <button onClick={() => lisaOstukorvi(element)}>+</button>
      </div>)}
    </div> 
    {ostukorv.length > 0 && <div>{arvutaKogusumma()} €</div>}
  </div>
   );
}

export default Ostukorv;
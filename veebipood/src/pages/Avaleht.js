import { useState } from "react";

function Avaleht() {
//     muutuv väärtus (hoitakse HTML-s), funktsiooni abil saan seda muuta
                                  // () - sulgude sees on algväärtus
  const [muutuja, funktsioon] = useState(0); 
  const [keel, muudaKeel] = useState(localStorage.getItem("language"));
                              // useState - Reacti erikood
  
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  // const v2henda = () => {}

  const muudak6ik = () => {
    funktsioon(muutuja+2);
    // aadress("uus aadrees");
  }

  // const muudaKeelEE = () => {
  //   localStorage.setItem("language", "EE");
  //   muudaKeel("EE");
  // } 

  // const muudaKeelEN = () => {
  //   localStorage.setItem("language", "EN");
  //   muudaKeel("EN");
  // } 

  // const muudaKeelRU = () => {
  //   localStorage.setItem("language", "RU");
  //   muudaKeel("RU");
  // } 

  const muudaKeeltKoosSalvestusega = (lang) => {
    localStorage.setItem("language", lang);
    muudaKeel(lang);
  } 

  const lisaOstukorvi = (element) => {
    let ostukorv = sessionStorage.getItem("ostukorv");
    ostukorv = JSON.parse(ostukorv) || [];
    ostukorv.push(element);
    ostukorv = JSON.stringify(ostukorv);
    sessionStorage.setItem("ostukorv", ostukorv);
  }

  return ( 
  <div>
    {/* <img src="/logo192.png" alt="" />
    <img src={require("../assets/logo512.png")} alt="" /> */}
    { keel === "EE" && <div>Siin on avalehe leht</div>}
    { keel === "EN" && <div>This is home page</div>}
    <button onClick={() => muudaKeeltKoosSalvestusega('EE')}>EE</button>
    <button onClick={() => muudaKeeltKoosSalvestusega('EN')}>EN</button>
    <button onClick={() => muudaKeeltKoosSalvestusega('RU')}>RU</button>
    <div>{tooted.map((element, index) => 
      <div key={index}>
        <div>{element}</div>
        <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
      </div>)}</div>
    <button onClick={() => funktsioon(muutuja - 1)}>-1</button>
    {/* <button onClick={() => v2henda()}>-</button> */}
    <div>{muutuja}</div>
    <button onClick={() => funktsioon(muutuja + 1)}>+1</button>
    {/* <button onClick={() => suurenda()}>+</button> */}
    { muutuja < 0 && <div>Kogus ei saa olla miinuses!</div>}
    <button onClick={() => muudak6ik()}>MUUDA</button>
  </div> );
}

export default Avaleht;

// <    -- tag-i algus ja lõpp, nool   <div> ,  =>
//      - suurem/väiksem
// &&   - dünaamiline väljakuvamine HTMLs, JS if(mõlemad tingimused peavad olema täidetud)
// ||   - see või teine    if( kallis || kindlustus )
// =>   - teeb koodilõigu kui vasakpoolne on OK
// ===  - vasak pool võrdub paremale poolega, siis on TRUE, kui ei ole võrdne, FALSE
// {}   - JS funktsioonide algus ja lõpp
//      - HTMLs JavaScripti algus ja lõpp
// []   - JavaScriptis väärtusena massiiv       ["Nobe", "tesla", "BMW"]
//      - useState muutuja ja funktsiooni loomiseks const [mutuuja, funktsioon] =
// ()   - funktsioonide argumente

// tumesinine - tag-i nimetus, JS-s const, function
// sinine  - muutujad, mis tulevad JavaScriptist
// helesinine - muutuja HTML-st, atribuudid, className, onClick
// kollane - funktsioonid
// tumeroheline - imporditavad kohad
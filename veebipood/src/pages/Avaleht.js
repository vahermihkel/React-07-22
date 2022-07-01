import { useState } from "react";

function Avaleht() {
//     muutuv väärtus (hoitakse HTML-s), funktsiooni abil saan seda muuta
                                  // () - sulgude sees on algväärtus
  const [muutuja, funktsioon] = useState(0); 
                              // useState - Reacti erikood
  
  const toode = localStorage.getItem("tooted");
  // const v2henda = () => {}

  const muudak6ik = () => {
    funktsioon(muutuja+2);
    // aadress("uus aadrees");
  }

  return ( 
  <div>
    <div>Siin on avalehe leht</div>
    <div>{toode}</div>
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
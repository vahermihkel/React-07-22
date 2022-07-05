import { useRef, useState } from "react";

function LisaToode() {
  // kõik ref-d lähevad input külge
  const nimiRef = useRef();
  // useRef --> lugeda inputi väärtust
  // useState --> näidata error / edukat sõnumit
  const [s6num, m22raS6num] = useState("");

  const sisestaToode = () => {
    // parem klõps -> inspect -> console
    console.log("tööötab sisestus");
    console.log(nimiRef.current.value);
    // salvestab brauseri lokaalHoidlasse, võtmega "tooted", väärtusega input seest
    if (nimiRef.current.value === "") {
      m22raS6num("Toodet ei saa lisada! Nimi on tühi.")
    } else {
      //   tooted =                null
      //   tooted =                "["Nobe"]"
      let tooted = localStorage.getItem("tooted");
      console.log(tooted);
      // "nobe"
      // ["nobe"]
      //         JSON.parse(null)
      //  tooted = [];
      //         JSON.parse("["Nobe"]")   ->    ["Nobe"]
      // tooted = ["Nobe"]
      tooted = JSON.parse(tooted) || [];
      // [].push("Nobe")   ---> ["Nobe"]
      // ["Nobe"].push("Tesla")  ---> ["Nobe", "Tesla"]
      tooted.push(nimiRef.current.value);
      //   tooted  =       "["Nobe"]"
      //   tooted  =       "["Nobe", "Tesla"]"
      tooted = JSON.stringify(tooted);
      //    "key"    |    "value"
      //   "tooted"  |    "["Nobe"]"

      //   "tooted"  |    "["Nobe", "Tesla"]"
      localStorage.setItem("tooted",tooted);
      // parem klõps -> inspect -> application
      m22raS6num("Toode " + nimiRef.current.value + " edukalt lisatud!");
    }
  }


  // ["Nobe", "Tesla", "BMW"]
  // localStorage pannes kaovad vanad väärtused ära
  // lahendus:
  // 1. enne lisamist võtan vanad väärtused ja salvestan nad muutujasse
  //      let muutuja = localStorage.getItem("VÕTI");
  // 2. jutumärgid ära võtta
  //      muutuja = JSON.parse(muutuja);
  // 3. muutujasse lisan lisatava väärtuse juurde
  //      muutuja.push(uus_nimi);
  // 4. jutumärgid tagasi panna
  //      muutuja = JSON.stringify(muutuja);
  // 5. asendan ära muutuja väärtusega localStorage-s asuvad väärtused
  //      localStorage.setItem("VÕTI", muutuja)

  // andmebaas:
  // pane uus olemasolevate juurde

  // parem klõps -> inspect -> elements
  return ( 
  <div>
    <br /> <br />
    <label>Toote nimi</label> <br />
    <input ref={nimiRef} type="text" /> <br />
    <button onClick={() => sisestaToode()}>Sisesta</button>
    <div>{s6num}</div>
  </div> 
  );
}

export default LisaToode;
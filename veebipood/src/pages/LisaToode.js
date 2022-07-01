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
      localStorage.setItem("tooted",nimiRef.current.value);
      // parem klõps -> inspect -> application
      m22raS6num("Toode " + nimiRef.current.value + " edukalt lisatud!");
    }
  }

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
import { useRef, useState } from "react";

// ffc
function Poed() {
  const [poed, muudaPoed] = useState(JSON.parse(localStorage.getItem("poed")) || []);
  const poodRef = useRef();
  const aegRef = useRef();
  // const poed = [{keskus: "Kristiine", aeg: "9-21"}, {keskus: "Mustamäe": aeg: "10-22"}, {keskus: "Ülemiste", aeg: "9-23"}];

  const kustuta = (index) => {
    poed.splice(index,1);
    muudaPoed(poed.slice());
    localStorage.setItem("poed", JSON.stringify(poed));
  }

  const lisa = () => {
    poed.push({keskus: poodRef.current.value, aeg: aegRef.current.value});
    muudaPoed(poed.slice());
    localStorage.setItem("poed", JSON.stringify(poed));
  }

  const sorteeriAZ = () => {
    poed.sort((a,b) => a.keskus.localeCompare(b.keskus));
    muudaPoed(poed.slice());
  }

  const sorteeriZA = () => {
    poed.sort((a,b) => b.keskus.localeCompare(a.keskus));
    muudaPoed(poed.slice());
  }

  return ( 
    <div>
      {/* <div>Kristiine</div>
      <div>Mustamäe</div>
      <div>Ülemiste</div> */}
      <label>Uue poe nimetus</label> <br />
      <input ref={poodRef} type="text" /> <br />
      <label>Uue poe lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text" /> <br />
      <button onClick={() => lisa()}>Lisa</button> <br />

      <button onClick={() => sorteeriAZ()}>Sorteeri A-Z</button>
      <button onClick={() => sorteeriZA()}>Sorteeri Z-A</button>

      <div>{poed.map((element, index) => 
        <div key={element.keskus}>
          {element.keskus} ({element.aeg}) 
          <button onClick={() => kustuta(index)}>X</button> 
        </div>)}
      </div>
    </div>
   );
}

export default Poed;
// import { useState } from "react";

// ffc
function Poed() {
  // const [poed, muudaPoed] = useState(["Kristiine", "Mustamäe", "Ülemiste"]);
  const poed = ["Kristiine", "Mustamäe", "Ülemiste"];

  return ( 
    <div>
      {/* <div>Kristiine</div>
      <div>Mustamäe</div>
      <div>Ülemiste</div> */}
      <div>{poed.map(element => <div>{element}</div>)}</div>
    </div>
   );
}

export default Poed;
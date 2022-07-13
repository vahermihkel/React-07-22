import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const { tooteNimi } = useParams();
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const toode = tooted.find(element => element.nimi === tooteNimi);
  const index = tooted.indexOf(toode);
  const nimiRef = useRef();
  const hindRef = useRef();
  const aktiivneRef = useRef();
  const navigate = useNavigate();

  const muuda = () => {
    // [{},{}][1] = {nimi: nimiRef.current.value, hind: hindRef.current.value, aktiivne: aktiivneRef.current.value}
    tooted[index] = {
      nimi: nimiRef.current.value, 
      hind: hindRef.current.value, 
      aktiivne: aktiivneRef.current.checked
    };
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/");
  }

  return ( 
  <div>
    {toode !== undefined && 
    <div>
      {/* <div>{toode.nimi}</div>
      <div>{toode.hind}</div> */}
      <label>Toote nimi</label> <br />
      <input ref={nimiRef} defaultValue={toode.nimi} type="text" /> <br />
      <label>Toote hind</label> <br />
      <input ref={hindRef} defaultValue={toode.hind} type="number" /> <br />
      <label>Toote aktiivne</label> <br />
      <input ref={aktiivneRef} defaultChecked={toode.aktiivne} type="checkbox" /> <br />
      <button onClick={() => muuda()}>Muuda</button>
    </div>}
  </div> );
}

export default MuudaToode;
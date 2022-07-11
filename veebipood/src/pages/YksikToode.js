import { useParams } from 'react-router-dom';

// toode/:nimi/p/:hind
function YksikToode() {
  //const params = useParams();  // params.nimi     params.hind
  const { nimi } = useParams(); // { nimi, hind } = useParams();
  // console.log(nimi);

  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  // console.log(tooted);

  const toode = tooted.find(element => element.nimi.toLowerCase() === nimi);
  // console.log(toode);

  return ( 
    <div>
      { toode !== undefined && <div>
        <div>{toode.nimi}</div>
        <div>{toode.hind}</div>
      </div>}
      { toode === undefined && <div>
        Otsitud toodet ei leitud!
      </div>}
    </div> );
}

export default YksikToode;
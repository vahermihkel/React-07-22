import { useState } from 'react';
import Map from '../components/Map';

function Shops() {
  const [coordinaates, setCoordinates] = useState({lngLat: [59.8643, 24.7795], zoom: 7});
// shops.json
  return (<div>
    <button onClick={() => setCoordinates({lngLat: [59.8643, 24.7795], zoom: 7})}>Kõik poed</button>
    <button onClick={() => setCoordinates({lngLat: [59.4378, 24.7574], zoom: 11})}>Kõik Tallinna poed</button>
    <button onClick={() => setCoordinates({lngLat: [59.4231, 24.7991], zoom: 13})}>Ülemiste</button>
    <button onClick={() => setCoordinates({lngLat: [59.4277, 24.7193], zoom: 13})}>Kristiine</button>
    <button onClick={() => setCoordinates({lngLat: [60.1679, 24.9537], zoom: 13})}>Helsinki</button>

    {/* shops.map(element => <button onClick={() => setCoordinates({lngLat: [element.y, elemeny.x], zoom: 13})}>{element.name}</button>) */}
    <Map mapCoordinaates={coordinaates}  />
  </div>)
}

export default Shops;
import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Ostukorv from './pages/Ostukorv';

function App() {
  return (
    <div className="App">
      <button className="nupp">Vajuta mind</button>
      <img className="pilt" src="https://cdn.motor1.com/images/mgl/PRXz4/s1/nobe-100-three-wheeled-electric-vehicle.jpg" alt="" />
      
      <Link to="/avaleht">
        <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>
      
      <Routes>
        {/* localhost:3000/avaleht            näitab seda HTMLi */}
        <Route path="avaleht" exact element={ <Avaleht /> } />
        <Route path="ostukorv" exact element={ <Ostukorv /> } />
        <Route path="lisa-toode" exact element={ <LisaToode /> } />
      </Routes>
    </div>
  );
}

export default App;

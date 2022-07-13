import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import HaldaTooteid from './pages/HaldaTooteid';
import LisaToode from './pages/LisaToode';
import MuudaToode from './pages/MuudaToode';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import YksikToode from './pages/YksikToode';

function App() {
  return (
    <div className="App">
      <button className="nupp">Vajuta mind</button>
      <img className="pilt" src="https://cdn.motor1.com/images/mgl/PRXz4/s1/nobe-100-three-wheeled-electric-vehicle.jpg" alt="" />
      
      <Link to="/">
        <button>Avalehele</button>
      </Link>
      <Link to="/ostukorv">
        <button>Ostukorvi</button>
      </Link>
      <Link to="/lisa-toode">
        <button>Lisa toode</button>
      </Link>
      <Link to="/poed">
        <button>Poed</button>
      </Link>
      <Link to="/halda">
        <button>Halda tooteid</button>
      </Link>
      
      <Routes>
        {/* localhost:3000/avaleht            näitab seda HTMLi */}
        <Route path="" exact element={ <Avaleht /> } />
        <Route path="ostukorv" exact element={ <Ostukorv /> } />
        <Route path="lisa-toode" exact element={ <LisaToode /> } />
        <Route path="poed" exact element={ <Poed /> } />
        <Route path="toode/:nimi" exact element={ <YksikToode /> } />
        <Route path="halda" exact element={ <HaldaTooteid /> } />
        <Route path="muuda/:tooteNimi" exact element={ <MuudaToode /> } />
      </Routes>
    </div>
  );
}

export default App;

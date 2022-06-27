import { Link } from 'react-router-dom';

function Ostukorv() {
  return ( 
  <div>
    <Link to="/avaleht">
      <button>Avalehele</button>
    </Link>
    <div>Siin on ostukorvi leht</div> 
    <img src="/_ERF8054b.jpg" alt="" />
  </div>
   );
}

export default Ostukorv;
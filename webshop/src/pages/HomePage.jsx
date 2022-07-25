import { useState } from 'react';
import { Button } from 'react-bootstrap';
import productsFromFile from '../products.json';
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function HomePage() {
  const [products, setProducts] = useState(productsFromFile);
                // tagastab --- returns
  const categories = [...new Set(productsFromFile.map(element => element.category))];
  const [selectedCategory, setSelectedCategory] = useState("all");

  // [].map( => uus_väärtus)   [{n:"1"},{n:"2"},{n:"3"}]  -->   ["1","2","3"]      .length jääb alati samaks
  // [].sort( => pluss / miinus )   [{n:"1"},{n:"2"},{n:"3"}] --> [{n:"3"},{n:"2"},{n:"1"}]
  // [].filter( => TRUE / FALSE )   [{n:"1"},{n:"2"},{n:"3"}] --> [{n:"2"},{n:"3"}]

  // sort
  const sortAZ = () => {
    // muteerib --- mutates
    const result = [...products].sort((a,b)=> a.name.localeCompare(b.name));
    setProducts(result);
  }

  const sortZA = () => {
    const result = [...products].sort((a,b)=> b.name.localeCompare(a.name));
    setProducts(result);
  }

  const sortPriceAsc = () => {
    const result = [...products].sort((a,b)=> a.price - b.price);
    setProducts(result);
  }

  const sortPriceDesc = () => {
    const result = [...products].sort((a,b)=> b.price - a.price);
    setProducts(result);
  }

  const filterByCategory = (categoryClicked) => {
    if (categoryClicked === 'all') {
      setProducts(productsFromFile);
    } else {
      const result = productsFromFile.filter(element => element.category === categoryClicked);
      setProducts(result);
    }
    setSelectedCategory(categoryClicked);
  }

  // ternary operator
  // true/false ? true-blokk : false-blokk
  return ( 
  <div>
    <div 
      className={selectedCategory === 'all' ? 'active-category' : undefined} 
      onClick={() => filterByCategory('all')}>
        Kõik kategooriad
    </div>
    { categories.map(element => 
      <div 
      className={selectedCategory === element ? 'active-category' : undefined} 
      key={element} 
      onClick={() => filterByCategory(element)}>
        {element}
      </div>) }
    <DropdownButton id="dropdown-basic-button" title="Sorteeri ">
        <Dropdown.Item onClick={sortAZ}>A - Z</Dropdown.Item>
        <Dropdown.Item onClick={sortZA}>Z - A</Dropdown.Item>
        <Dropdown.Item onClick={sortPriceAsc}>
          Kasvav hind
        </Dropdown.Item>
        <Dropdown.Item onClick={sortPriceDesc}>
          Kahanev hind
        </Dropdown.Item>
      </DropdownButton>
    <div>Tooteid on {products.length} tükki</div>
    {products.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        {/* punane: variant="danger" kollane: variant="warning"  hall: variant="secondary" */}
        <Button variant="success">Lisa ostukorvi</Button>
      </div>)}
  </div> );
}

export default HomePage;

// massiive (objektid) -- nende manipuleerimist

// API - makse, pakiautomaadid, andmebaasist
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
// import productsFromFile from '../products.json';
import Carousel from 'react-bootstrap/Carousel';
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer, toast } from 'react-toastify';
import SortDropdown from '../components/home/SortDropdown';
import Spinner from '../components/Spinner';

function HomePage() {
  // käitub nagu productsFromFile (koguaeg on originaalsed tooted sees)
  const [databaseProducts, setDatabaseProducts] = useState([]);  // 463
  // on koguaeg muutuvas seisundis (filtreeritakse / sorteeritakse)
  const [filteredProducts, setFilteredProducts] = useState([]); // 250 / 220 / 1 / 5 / 10
  const [products, setProducts] = useState([]); // 20 20 20 20 20 20 20 20 20 20 3
                // tagastab --- returns
  const categories = [...new Set(databaseProducts.map(element => element.category))];
  const [selectedCategory, setSelectedCategory] = useState("all");
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [isLoading, setLoading] = useState(false);
  // [].map( => uus_väärtus)   [{n:"1"},{n:"2"},{n:"3"}]  -->   ["1","2","3"]      .length jääb alati samaks
  // [].sort( => pluss / miinus )   [{n:"1"},{n:"2"},{n:"3"}] --> [{n:"3"},{n:"2"},{n:"1"}]
  // [].filter( => TRUE / FALSE )   [{n:"1"},{n:"2"},{n:"3"}] --> [{n:"2"},{n:"3"}]

  // uef
  useEffect(() => { // <--- see funktsioon läheb käima lehele tulles
    setLoading(true);
    fetch(productsDb) // fetch on alati asünkroonne (ütleb koodile, et mine edasi)
    .then(res => res.json()) // staatuskoodi - 200 / 404
    .then(data => {
      data = data.filter(element => element.active === true);
      setProducts(data.slice(0,20) || []);
      setFilteredProducts(data || []);
      setDatabaseProducts(data || []);
      setLoading(false);
    }); // <--- pannakse kõik andmebaasitooted set abil products muutuja sisse
  }, []);

  const [activePage,setActivePage] = useState(1);
  let pages = [];
  for (let number = 1; number < filteredProducts.length/20+1; number++) {
    pages.push(number);
  }
  // for (let number = 1; number <= databaseProducts.length; number++) {
  //   if (number % 20 === 0) {
  //     pages.push(number);
  //   }
  // }
  // items = [1,2,3,4,5]

  // sort
  

  const filterByCategory = (categoryClicked) => {
    if (categoryClicked === 'all') {
      setProducts(databaseProducts.slice(0,20));
      setFilteredProducts(databaseProducts);
    } else {
      const result = databaseProducts.filter(element => element.category === categoryClicked);
      setProducts(result.slice(0,20));
      setFilteredProducts(result);
    }
    setActivePage(1);
    setSelectedCategory(categoryClicked);
  }

  //  {product: {id,name,category}, quantity: 1}
                     // {id: 1, nimi: "Tesla"}
  const addToCart = (productClicked) => {
    // cart = null;
    // cart = "[{product: {id: 1, nimi: "Tesla"}, quantity: 1}]"
    let cart = sessionStorage.getItem("cart");
    // cart = [];
    // cart = [{product: {id: 1, nimi: "Tesla"}, quantity: 1}]
    cart = JSON.parse(cart) || [];
    // [].push(productClicked);   sort/filter/map/push/splice/indexOf/find
    // index = -1
    //            [{product: {id: 1, nimi: "Tesla"}, quantity: 1}].findIndex()
    //                .findIndex({product: {id: 1, nimi: "Tesla"}, quantity: 1} => element.product.id === {id: 1, nimi: "Tesla"})
    //                .findIndex({product: {id: 1, nimi: "Tesla"}, quantity: 1} => 1 === 1)
    // index = 0;
    const index = cart.findIndex(element => element.product.id === productClicked.id);
    if (index >= 0) {
      // suurendan kogust
      // ["ant", "bison", "camel"][1] = "bird";
      // ["ant", "bird", "camel"];
      // [{n:"1"},{n:"2"},{n:"3"}][2].n = "4";

    //[{product: {id: 1, nimi: "Tesla"}, quantity: 1}][0].quantity = 1 + 1;
      cart[index].quantity = cart[index].quantity + 1;
      // cart[index].quantity += 1;
      // cart[index].quantity++;
    } else {
          // pushi sisse kirjutama, mida lisan lõppu
      // [].push({product: {id: 1, nimi: "Tesla"}, quantity: 1})
      cart.push({product: productClicked, quantity: 1});
    }
    // "[{product: {id: 1, nimi: "Tesla"}, quantity: 1}]"
    // "[{product: {id: 1, nimi: "Tesla"}, quantity: 2}]"
    cart = JSON.stringify(cart);
    //   key       |      value
    //   cart      |    [{product: {id: 1, nimi: "Tesla"}, quantity: 1}]
    //   cart      |    [{product: {id: 1, nimi: "Tesla"}, quantity: 2}]
    sessionStorage.setItem("cart",cart);
    toast.success('Edukalt ostukorvi lisatud!', {
      position: "bottom-right",
      autoClose: 3000,
      theme: "dark"
      });
  }

  const images = [
    {src: "https://picsum.photos/id/237/500/200", alt: "First slide", header: "First slide label", text: "Nulla vitae elit libero, a pharetra augue mollis interdum."},
    {src: "https://picsum.photos/id/337/500/200", alt: "Second slide", header: "Second slide label", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {src: "https://picsum.photos/id/437/500/200", alt: "Third slide", header: "Third slide label", text: "Praesent commodo cursus magna, vel scelerisque nisl consectetur."}  
  ]
  // const [images, setImages] = useState([]);

  // useEffect(() => {
  //   fetch("https://react722-default-rtdb.europe-west1.firebasedatabase.app/images.json")
  //     .then(res => res.json())
  //     .then(data => setImages(data || []))
  // }, []);

  // ternary operator
  // true/false ? true-blokk : false-blokk
  const changePage = (number) => {
    setActivePage(number);
    // 1-20    .slice(0,20);   1
    // 21-40   .slice(20,40);  2
    // 41-60   .slice(40,60);  3
    setProducts(filteredProducts.slice(number*20-20,number*20));
  }

  return ( 
  <div>
    <Carousel>
      { images.map( element => <Carousel.Item key={element.src}>
        <img
          src={element.src}
          alt={element.alt}
        />
        <Carousel.Caption>
          <h3>{element.header}</h3>
          <p>{element.text}</p>
        </Carousel.Caption>
      </Carousel.Item> )}
    </Carousel>
    <ToastContainer />
    {isLoading === true && <Spinner />}
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

   <SortDropdown
        filteredProducts={filteredProducts}
        updateProducts={setProducts}
        updatePage={setActivePage}
   />

    <div>Tooteid on {filteredProducts.length} tükki</div>
    {products.map(element => 
      <div key={element.id}>
        <img src={element.image} alt="" />
        <div>{element.name}</div>
        <div>{element.price}</div>
        {/* punane: variant="danger" kollane: variant="warning"  hall: variant="secondary" */}
        <Button variant="success" onClick={() => addToCart(element)}>Lisa ostukorvi</Button>
      </div>)}

      <Pagination>{pages.map(number => 
        <Pagination.Item onClick={() => changePage(number)} key={number} active={number === activePage}>
          {number}
        </Pagination.Item>)}
      </Pagination>
  </div> );
}

export default HomePage;

// massiive (objektid) -- nende manipuleerimist

// API - makse, pakiautomaadid, andmebaasist
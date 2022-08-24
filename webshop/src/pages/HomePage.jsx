import { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { ToastContainer } from 'react-toastify';
import CarouselGallery from '../components/home/CarouselGallery';
import CategoryFilter from '../components/home/CategoryFilter';
import Product from '../components/home/Product';
import SortDropdown from '../components/home/SortDropdown';
import Spinner from '../components/Spinner';

function HomePage() {
  const [databaseProducts, setDatabaseProducts] = useState([]);  // 463
  const [filteredProducts, setFilteredProducts] = useState([]); // 250 / 220 / 1 / 5 / 10
  const [products, setProducts] = useState([]); // 20 20 20 20 20 20 20 20 20 20 3
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  const [isLoading, setLoading] = useState(false);

  useEffect(() => { // <--- see funktsioon läheb käima lehele tulles
    setLoading(true);
    fetch(productsDb) // fetch on alati asünkroonne (ütleb koodile, et mine edasi)
    .then(res => res.json()) // staatuskoodi - 200 / 404
    .then(data => {
      data = data.filter(element => element.active === true);
      const cart = JSON.parse(sessionStorage.getItem("cart")) || [];

      data = data.map(element => {
        
        const index = cart.findIndex(cartProduct => cartProduct.product.id === element.id)
        const count = index >= 0 ? cart[index].quantity : 0;
        return {...element,count} // returni järel olevaga asendab iga elemendi ära
        // ...element <- tähisab, et jäta vana tervikuna alles
      })

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
  
  const changePage = (number) => {
    setActivePage(number);
    setProducts(filteredProducts.slice(number*20-20,number*20));
  }

  return ( 
  <div>
    <CarouselGallery />
    <ToastContainer />
    {isLoading === true && <Spinner />}
    
    <CategoryFilter
          databaseProducts={databaseProducts}
          setProducts={setProducts}
          setFilteredProducts={setFilteredProducts}
          setActivePage={setActivePage}    
    />

    <SortDropdown
          filteredProducts={filteredProducts}
          updateProducts={setProducts}
          updatePage={setActivePage}
    />

    <div>Tooteid on {filteredProducts.length} tükki</div>
    {products.map(element => 
        <Product 
        // parempoolne on siit failist
        // vasakpoolne vastuvõtvast failist props. järel olev võti
          key={element.id}
          element={element} 
          products={products}
          setProducts={setProducts}
        />
      )}

      <Pagination>{pages.map(number => 
        <Pagination.Item onClick={() => changePage(number)} key={number} active={number === activePage}>
          {number}
        </Pagination.Item>)}
      </Pagination>
  </div> );
}

export default HomePage;
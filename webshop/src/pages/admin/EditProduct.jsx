import { useEffect, useRef, useState } from "react"; 
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {
  // const params = useParams()       params.id;    params.category
  const { id } = useParams(); // /admin/muuda/:id
  // const products = productsFromFile;
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const navigate = useNavigate();
  // "25369546" === 25369546
  // const product = productsFromFile.find(element => Number(element.id) === Number(id));
  const [products, setProducts] = useState([]); // Cannot access 'products' before initialization
  const index = products.findIndex(element => Number(element.id) === Number(id));
  const product = products[index]; 
  console.log(product);
  const [idUnique, setIdUnique] = useState(true); 
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  const [categories, setCategories] = useState([]);
  const categoriesDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/categories.json";

   // uef
   useEffect(() => { 
    fetch(productsDb)
    .then(res => res.json())
    .then(data => setProducts(data || [])); 

    fetch(categoriesDb)
    .then(res => res.json())
    .then(data => setCategories(data || [])); 
  }, []);

  const edit = () => {
    // [{1},{2}][1] = {UUS};
    products[index] = {
      id: Number(idRef.current.value),
      name: nameRef.current.value,
      price: Number(priceRef.current.value),
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      image: imageRef.current.value,
      active: activeRef.current.checked
    };
    // console.log(index);
    // MUUTMINE PEAKS KÄIMA API PÄRINGU KAUDU
    fetch(productsDb,{
      method: "PUT", // pannakse midagi sinna API otspunktile
      body: JSON.stringify(products), // mida pannakse
      headers: { // mis kujul andmed pannakse
        "Content-Type": "application/json"
      }
    }).then(() => navigate("/admin/halda-tooteid"))
  }

  const checkIdUniqueness = () => {   
    if (Number(product.id) === Number(idRef.current.value)) {
      setIdUnique(true);
    } else {
                      // 0,1,2,3,4,5,6,...,481   /  -1
      const index = products.findIndex(element => Number(element.id) === Number(idRef.current.value));
      if (index === -1) {
        setIdUnique(true);
      } else {
        setIdUnique(false);
      }
    }
  } 

  return ( 
    <div>
      {product !== undefined && 
      <div>
        { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
        <label>ID</label> <br />
        <input ref={idRef} onChange={checkIdUniqueness} defaultValue={product.id} type="number" /> <br />
        <label>Nimi</label> <br />
        <input ref={nameRef} defaultValue={product.name} type="text" /> <br />
        <label>Hind</label> <br />
        <input ref={priceRef} defaultValue={product.price} type="number" /> <br />
        <label>Kirjeldus</label> <br />
        <input ref={descriptionRef} defaultValue={product.description} type="text" /> <br />
        <label>Kategooria</label> <br />
        {/* <input ref={categoryRef} defaultValue={product.category} type="text" /> <br /> */}
        <select ref={categoryRef} defaultValue={product.category}>
          {categories.map(element => <option key={element.id + element.name}>{element.name}</option>)}
        </select> <br />
        <label>Pilt</label> <br />
        <input ref={imageRef} defaultValue={product.image} type="text" /> <br />
        <label>Aktiivne</label> <br />
        <input ref={activeRef} defaultChecked={product.active} type="checkbox" /> <br />
        <button disabled={idUnique === false} onClick={edit}>Muuda</button>
      </div>}
    </div>
    );
}

export default EditProduct;
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsFromFile from "../../products.json";

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
  // 1. proovige eesti keelse järgi leida toode üles
  // "25369546" === 25369546
  // const product = productsFromFile.find(element => Number(element.id) === Number(id));
  const index = productsFromFile.findIndex(element => Number(element.id) === Number(id));
  const product = productsFromFile[index];
  console.log(product);
  // 2. kuvage inputide sees iga toote väärtust
  // 3. Nupp ja funktsioon muutmise osas - muutma minna

  const edit = () => {
    // [{1},{2}][1] = {UUS};
    productsFromFile[index] = {
      id: idRef.current.value,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      image: imageRef.current.value,
      active: activeRef.current.checked
    };
    navigate("/admin/halda-tooteid");
    // console.log(index);
  }

  return ( 
    <div>
      <label>ID</label> <br />
      <input ref={idRef} defaultValue={product.id} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} defaultValue={product.name} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} defaultValue={product.price} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} defaultValue={product.description} type="text" /> <br />
      <label>Kategooria</label> <br />
      <input ref={categoryRef} defaultValue={product.category} type="text" /> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} defaultValue={product.image} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} defaultChecked={product.active} type="checkbox" /> <br />
      <button onClick={edit}>Muuda</button>
    </div> );
}

export default EditProduct;
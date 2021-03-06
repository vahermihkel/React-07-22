import { useRef, useState } from "react";
import productsFromFile from "../../products.json";
import categoriesFromFile from "../../categories.json";

function AddProduct() {
  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const descriptionRef = useRef();
  const categoryRef = useRef();
  const imageRef = useRef();
  const activeRef = useRef();
  const [idUnique, setIdUnique] = useState(true);

  const add = () => {
    const newProduct = {
      id: idRef.current.value,
      name: nameRef.current.value,
      price: priceRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      image: imageRef.current.value,
      active: activeRef.current.checked
    }
    productsFromFile.push(newProduct);
    // LISAMINE PEAKS KÄIMA API PÄRINGU KAUDU
  }


  const checkIdUniqueness = () => {
    //const ELEMENT = [].find(element => TRUE)
    //const JÄRJEKORRANUMBER = [].findIndex(element => TRUE)
                                                  //      29853242 === 29853242
    const index = productsFromFile.findIndex(element => Number(element.id) === Number(idRef.current.value));
    if (index === -1) {
      // console.log("unikaalne");
      setIdUnique(true);
    } else {
      // console.log("mitteunikaalne");
      setIdUnique(false);
    }
  }

  return ( 
    <div>
      {/* { !idUnique && <div>Sisestasid mitteunikaalse ID!</div>} */}
      { idUnique === false && <div>Sisestasid mitteunikaalse ID!</div>}
      <label>ID</label> <br />
      <input onChange={checkIdUniqueness} ref={idRef} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} type="number" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} type="text" /> <br />
      <label>Kategooria</label> <br />
      {/* <input ref={categoryRef} type="text" /> <br /> */}
      <select ref={categoryRef}>
        {categoriesFromFile.map(element => <option>{element.name}</option>)}
      </select> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} type="checkbox" /> <br />
      <button disabled={idUnique === false} onClick={add}>Muuda</button>
    </div> );
}

export default AddProduct;
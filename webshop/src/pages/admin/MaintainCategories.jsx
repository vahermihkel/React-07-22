import { useRef } from "react";
import categoriesFromFile from "../../categories.json";

function MaintainCategories() {
  const idRef = useRef();
  const nameRef = useRef();

  const add = () => {
    const newCategory = {
      id: idRef.current.value,
      name: nameRef.current.value
    }
    categoriesFromFile.push(newCategory);
  }

  // KOJU: kustutamine
  // const delete() => {}

  return ( <div>
    <label>Kategooria ID</label> <br />
    <input ref={idRef} type="text" /> <br />
    <label>Kategooria nimi</label> <br />
    <input ref={nameRef} type="text" /> <br />
    <button onClick={add}>Lisa</button>
    {/* .map( <div><button>x</button></div>) */}
  </div> );
}

export default MaintainCategories;
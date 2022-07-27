import { useRef, useState } from "react";
import omnivaParcelMachines from "../omniva.json";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const parcelMachines = omnivaParcelMachines.filter(element => element.A0_NAME === "EE");

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const increaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity + 1; // võtab varasema koguse ja liidab ühe juurde
    // uuendab HTMLi (proovige korra välja kommenteerida/kustutada), vajutage + ja vajutage refresh
    setCart(cart.slice());
    // salvestab (proovige korra välja kommenteerida/kustutada), vajutage + ja vajutage refresh
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const removeFromCart = (index) => {
    cart.splice(index,1);
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }

  const calculateCartSum = () => {
    let cartSum = 0;
    cart.forEach(element => cartSum = cartSum + element.product.price * element.quantity )
    return cartSum;
  }

  const [selectedPM, setSelectedPM] = useState(sessionStorage.getItem("parcelMachine") || "");
  const pmRef = useRef();

  const selectPM = () => {
    // console.log("adsadsa");
    setSelectedPM(pmRef.current.value);
    sessionStorage.setItem("parcelMachine", pmRef.current.value);
  }

  const unSelectPM = () => {
    // console.log("adsadsa");
    setSelectedPM("");
    sessionStorage.removeItem("parcelMachine");
  }

  // koguse vähendamine  ---> ülemise järgi
  // kustutamine  ---> eesti keelse järgi
  // ostukorvi kokku arvutamine (tasub arvestada, et meil on kogused - 
  // (.product et hinnani jõuda) hind korda kogus)

   //  {product: {id,name,category}, quantity: 1}
  return ( 
  <div>
    {cart.map((element, index) => 
      <div>
        <img src={element.product.image} alt="" />
        <div>{element.product.name}</div>
        <div>{element.product.price} €</div>
        <button onClick={() => decreaseQuantity(index)}>-</button>
        <div>{element.quantity} tk</div>
        <button onClick={() => increaseQuantity(index)}>+</button>
        <div>{element.product.price * element.quantity} €</div>
        <button onClick={() => removeFromCart(index)}>x</button>
      </div>)}

    { selectedPM === "" && <select onChange={selectPM} ref={pmRef}>{parcelMachines.map(element => <option>{element.NAME}</option>)}</select>}
    { selectedPM !== "" && <div>{selectedPM} <button onClick={unSelectPM}>X</button> </div>}

      <div>{calculateCartSum()} €</div>
  </div> );
}

export default Cart;
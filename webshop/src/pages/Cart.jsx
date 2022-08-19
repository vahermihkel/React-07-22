import { useEffect, useRef, useState } from "react";
// import omnivaParcelMachines from "../omniva.json";
import styles from '../css/Cart.module.css';

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const [parcelMachines, setParcelMachines] = useState([]);
  //const parcelMachines = omnivaParcelMachines.filter(element => element.A0_NAME === "EE");

  useEffect(() => { // pean importima
    fetch("https://www.omniva.ee/locations.json") // aadress kuhu teen api päringu
      .then(res => res.json()) // saan terviktagastuse, kus on staatuskood jne
      .then(data => {
        const result = (data || []).filter(element => element.A0_NAME === "EE");
        setParcelMachines(result);
      }) // saan body tagastuse (peab olema [] või {})
  }, []);

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

  const [paymentError, setPaymentError] = useState("");

  const pay = () => {
    const paymentData = {
      "api_username": "92ddcfab96e34a5f",
      "account_name": "EUR3D1",
      "amount": calculateCartSum(),
      "order_reference": Math.random() * 9999999,
      "nonce": "a9b7f7" + new Date() + Math.random() * 9999999,
      "timestamp": new Date(),
      "customer_url": "https://react7202.web.app/tellimus"
      }

    fetch("https://igw-demo.every-pay.com/api/v4/payments/oneoff", {
      method: "POST",
      body: JSON.stringify(paymentData),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA=="
      }
    }).then(res => res.json()).then(data => {
      if (data.payment_link === undefined) {
        setPaymentError("Maksma minek ei õnnestunud, proovi mõne aja pärast uuesti!");
      } else {
        sessionStorage.removeItem("cart");
        window.location.href = data.payment_link;

      }
    })
  }

  return ( 
  <div>
    {/* TEHKE KA TÜHJENDA OSTUKORV, MIDA NÄIDATAKSE VAID SIIS KUI OSTUKORVIS ON MIDAGI */}
    <button>Kodus: tühjenda</button>

    {cart.map((element, index) => 
      <div className={styles.product} key={element.id}>
        <img className={styles.image} src={element.product.image} alt="" />
        <div className={styles.name}>{element.product.name}</div>
        <div className={styles.price}>{Number(element.product.price).toFixed(2)} €</div>
        <div className={styles.controls}>
          <img 
            className={styles.button} 
            onClick={() => decreaseQuantity(index)} 
            src={require("../assets/minus.png")} alt="" />
          <div>{element.quantity} tk</div>
          <img 
            className={styles.button} 
            onClick={() => increaseQuantity(index)}
            src={require("../assets/plus.png")} alt="" />
        </div>
        <div className={styles.total}>{(element.product.price * element.quantity).toFixed(2)} €</div>
        <img 
          className={styles.button} 
          onClick={() => removeFromCart(index)} 
          src={require("../assets/delete.png")} alt="" />
      </div>)}

    { cart.length > 0 && 
    <div className={styles.sum}>
      { selectedPM === "" &&
        <select onChange={selectPM} ref={pmRef}>
            {parcelMachines.map(element => <option key={element.NAME}>{element.NAME}</option>)}
        </select>}
      { selectedPM !== "" && <div>{selectedPM} <button onClick={unSelectPM}>X</button> </div>}

       <div>{calculateCartSum().toFixed(2)} €</div>
       <button onClick={pay}>Maksa</button>
       <div>{paymentError}</div>
    </div>}

     {/* KODUS: näita mingit pilti kui ostukorv on tühi */}
  </div> );
}

export default Cart;
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
 
function SingleProduct() {
  // localhost:3000/toode/1231231
  // path="toode/:id" -> toode/:productId
  const { productId } = useParams();
  // [{1},{2},{3}] <- mitte seda ei võta
  // {id: "3123", name: "dada"} <- selle võtan
  const [product, setProduct] = useState({});
  const productsDb = "https://react722-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(productsDb)
      .then(res => res.json())
      .then(data => {
        const found = data.find(element => Number(element.id) === Number(productId));
        setProduct(found);
      })
  }, [productId]);

  return ( 
  <div>
    { product !== undefined && 
      <div>
        <img src={product.image} alt="" />
        <div>{product.name}</div>
        <div>{product.price} €</div>
        <div>{product.category}</div>
        <div>{product.description}</div>
      </div> }
    { product === undefined && <div>Toodet ei leitud!</div> }
  </div> );
}

export default SingleProduct;
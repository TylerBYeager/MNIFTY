import React from "react";
import { Link } from "react-router-dom";
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART } from "../../utils/actions";
// importing indexDB as idbPromise to manage cart storage
import { idbPromise } from "../../utils/IndexDB";


/*
*** ProductItem defines the attributes of item through deconstruction
***     as well as deconstructs store context,
***     it then contains a function and returns the 'HTML'
*/

function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
  } = item;
  const { cart } = state
  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      return;
    } else 
    {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item,}
      });
      idbPromise('cart', 'put', { ...item });
    }
  }

//   returns the visible elements to be displayed.
  return (
    <div className="card px-1 py-1 glassCard">
      <Link to={`/products/${_id}`}>
        <img
          alt={name}
          src={`/images/${image}`}
        />
        <p>{name}</p>
      </Link>
      <div>
        <span>{price} MUT Tokens</span>
      </div>
      <button 
      className="itemButton"
      onClick={addToCart}>+ ADD TO CART</button>
    </div>
  );
}

export default ProductItem;

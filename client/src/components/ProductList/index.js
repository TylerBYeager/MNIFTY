import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
// This isn't imported as "loading" to prevent any potential conflicts
import loadSymbol from '../../assets/loading.gif';


/*
*** @ProductList deconstructs important things from set locations
***     then it utilizes those within important functions
*** @useEffect: if there's data, then loop through it and append that data
***     Else, if it's loading, it's going to display the loading symbol.
*** @filterProducts filters products based off the selected category;
***     If it doesn't match, then don't show the product.
***
*** This is using indexDB for the storage, which is why it's being imported
***     from utils/helpers as idbPromise
*/



function ProductList() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

    } else if (!loading) {
      console.log("loading")
    }
  }, [data, loading, dispatch]);

  function filterProducts() {
    if (!currentCategory) {
      return state.products;
    }

    return state.products.filter(
      (product) => product.category._id === currentCategory
    );
  }

  return (
    <div className="my-2">
      {/* <h2>Our Products:</h2> */}
      {state.products.length ? (
        <div className="flex-row maysSuperItemContainer">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
      ) : (
        <h3>You have yet to add products.</h3>
      )}
      {loading ? <img src={loadSymbol} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;



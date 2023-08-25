import React, { useEffect } from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../slice/product/productSlice";
import { useDispatch, useSelector } from "react-redux"
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";


const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    dispatch(getProducts({}))

  }, [dispatch, error, alert])


  return (
    <>
      <MetaData title="ECOMMERCE" />
      {loading ? (<Loader />) : (
        <>
          <div className="banner">
            <p>Welcome to Ecommerce</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>
            <a href="#container">
              <button>
                Scroll
              </button>
            </a>

          </div>

          <h2 className="homeHeading">Featured Products </h2>

          <div className="container" id="container" >

            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}


          </div>
        </>)}
    </>
  )
}


export default Home;


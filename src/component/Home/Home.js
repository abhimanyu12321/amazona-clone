import React from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useQuery } from '@tanstack/react-query'
import { getProducts } from "../../api/product.js";

const Home = () => {
  const alert = useAlert();

  const { isPending: loading, isError, data, error } = useQuery({
    queryKey: ['productsList'],
    queryFn: getProducts,
  })
  if (isError) {
    alert.error(error)
  }
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

            {data.products &&
              data.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}


          </div>
        </>)}
    </>
  )
}


export default Home;


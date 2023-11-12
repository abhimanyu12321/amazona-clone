import React from "react";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { useQuery } from '@tanstack/react-query'
import { getProducts } from "../../api/product.js";
import { Carousel } from 'flowbite-react';
import caro1 from '../../images/caro1.png'
import caro2 from '../../images/caro2.png'
import caro3 from '../../images/caro3.png'
import caro4 from '../../images/caro4.png'

const Home = () => {
  const alert = useAlert();

  const { isPending: loading, isError, data, error } = useQuery({
    queryKey: ['productsList'],
    queryFn: getProducts,
  })
  if (isError) {
    alert.error(error)
  }
  console.log(data && data.products)
  return (
    <>
      <MetaData title="ECOMMERCE" />
      {loading ? (<Loader />) : (
        <>

          <div className="con pt-20">
            <div className="carousel h-[180px]  md:h-[250px] ">
              <Carousel slideInterval={3000} indicators={false}>
                <img src={caro1} alt="CaroImages" className="" />
                <img src={caro2} alt="CaroImages" className="" />
                <img src={caro3} alt="CaroImages" className="" />
                <img src={caro4} alt="CaroImages" className="" />
              </Carousel>
            </div>
            <h2 className="text-center text-4xl font-extrabold mt-4">Featured Products </h2>
            <div className="container flex my-[2vmax] mx-auto w-[80vw] flex-wrap justify-center" id="container" >

              {data.products &&
                data.products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}


            </div>
          </div>
        </>)}
    </>
  )
}


export default Home;


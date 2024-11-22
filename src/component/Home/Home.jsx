import React from "react";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
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
            <div className="carousel h-[180px]  md:h-[250px] mt-24 lg:my-10">
              <Carousel slideInterval={3000} indicators={false}>
                <img src={caro1} alt="CaroImages" className="h-full object-cover" />
                <img src={caro2} alt="CaroImages" className="h-full object-cover" />
                <img src={caro3} alt="CaroImages" className="h-full object-cover" />
                <img src={caro4} alt="CaroImages" className="h-full object-cover" />
              </Carousel>
            </div>
            <h2 className="text-center text-4xl font-extrabold my-10">Featured Products </h2>
            <div className="container flex gap-6 mx-auto w-[90vw]  lg:w-[80vw] flex-wrap justify-center" id="container" >

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


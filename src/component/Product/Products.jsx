import React, { useState } from "react";
import "./Products.css";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { getProducts } from "../../api/product";
import { useQuery } from "@tanstack/react-query";

const categories = [
  "Footwear",
  "Shirt",
  "Headphones",
  "SmartPhones",
];

const Products = ({ match }) => {

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);


  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  const { isPending: loading, isError, data, error } = useQuery({
    queryKey: ['productsList', keyword, currentPage, price, category, ratings],
    queryFn: () => getProducts({ keyword, currentPage, price, category, ratings }),
  })
  if (isError) {
    alert.error(error)
  }
  console.log(data)
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <div className="producctCategories flex justify-between md:justify-around pt-[10rem] pb-4 border-b-2 ">
            <h2 className="hidden md:flex productsHeading text-sm md:text-2xl  font-bold ">Amazon Fashion</h2>
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
                style={{ fontWeight: "bold" }}
              >
                {category}
              </li>
            ))}
          </div>

          <div className="filter flex justify-around gap-16 mt-8 border-b-2 mb-8">
            <div className="">
              <h2 className="hidden md:flex font-medium">Filter by Price(0-25000)</h2>
              <h2 className="flex md:hidden font-medium">Price filter</h2>
              <div className="m-2">
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="off"
                  aria-labelledby="range-slider"
                  size="small"
                  min={0}
                  max={25000}
                  color="warning"
                />
              </div>
            </div>
            <div>
              <h2 className="font-medium">Filter by Ratings Above</h2>
              <div className="m-2">
                <Slider
                  value={ratings}
                  onChange={(e, newRating) => {
                    setRatings(newRating);
                  }}
                  aria-labelledby="continuous-slider"
                  valueLabelDisplay="off"
                  min={0}
                  max={5}
                  size="small"
                  aria-label="Small"
                />
              </div>
            </div>
          </div>

          <div className="products flex flex-wrap justify-center items-center min-h-[30vh] ">
            {data.products &&
              data.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            {data.products.length === 0 && <h1 className="text-3xl font-extrabold">Products not Available</h1>}
          </div>


          {data.resultPerPage && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={data.resultPerPage}
                totalItemsCount={data.productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;


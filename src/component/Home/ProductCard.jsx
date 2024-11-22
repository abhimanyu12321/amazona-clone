import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link className="w-full lg:w-[280px] flex flex-col justify-center items-center text-[rgba(48,48,48)] bg-white lg:m-4 pb-4" to={`/product/${product._id}`}>
      <img src={product.images[0].url} alt={product.name} className="w-full" />
      <p>{product.name}</p>
      <div className="flex justify-center items-center">
        <Rating {...options} />
        <span className="productCardSpan" style={{ fontSize: "15px", fontWeight: "bold" }}>
          {`( ${product.numOfReviews} Reviews )`}
        </span>
      </div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;

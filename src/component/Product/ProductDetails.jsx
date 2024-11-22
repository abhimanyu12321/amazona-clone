import React from "react";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

import { Rating } from "@material-ui/lab";
import { addItemsToCartAction } from "../../slice/cart/cartSlice";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'flowbite-react';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { newReview1, productData1 } from "../../api/product.js";
import { addItemsToCart1 } from "../../api/order.js";


const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  // React Query hook call
  const queryClient = useQueryClient()
  const { isPending: loading, isError, data, error } = useQuery({
    queryKey: ['productDetailData', match.params.id],
    queryFn: () => productData1(match.params.id),
  })

  // React Query mutation for adding Review
  const reviewMutation = useMutation({
    mutationFn: (newReview) => {
      return newReview1(newReview)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['productDetailData', match.params.id] })
      alert.success("Review Submitted Successfully");
    },
    onError: () => {
      alert.error(reviewMutation.error.message)
    }
  })


  if (isError) {
    alert.error(error.message);
  }

  const { isAuthenticated } = useSelector(
    (state) => state.User
  );


  const options = {
    size: "large",
    value: data?.product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const increaseQuantity = () => {
    if (data.product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const id = match.params.id

  // React Query mutation for adding Item to cart
  const addItemToCartMutation = useMutation({
    mutationFn: (item) => {
      return addItemsToCart1(item)
    },
    onSuccess: (data) => {
      dispatch(addItemsToCartAction(data))
    },
    onError: () => {
      alert.error(addItemToCartMutation.error.message)
    }
  })
  const addToCartHandler = () => {

    if (isAuthenticated === false) {
      alert.info("Please Login to add to cart")
      return;
    }
    addItemToCartMutation.mutate({ id, quantity })
    alert.success("Item added to cart")
  };

  // For adding review and rating

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    if (isAuthenticated === false) {
      alert.info("Please Login to add Review")
      return;
    }
    reviewMutation.mutate(myForm)
    setOpen(false);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`${data && data.product.name} -- ECOMMERCE`} />
          <div className="ProductDetails">
            <div className="h-[480px]  md:h-[550px] ">
              <Carousel slideInterval={3000} indicators={true}>
                {data.product.images &&
                  data.product.images.map((item, i) => (
                    <img
                      className="CarouselImage md:w-[30vmax]"
                      key={i}
                      src={item.url}
                      alt={`${i} Slide`}
                    />

                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{data.product.name}</h2>
                <p>Product # {data.product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span" style={{ fontWeight: "bold" }}>
                  {" "}
                  ({data.product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${data.product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={data.product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    {addItemToCartMutation.isPending ? "Adding...." : "Add to Cart"}
                  </button>
                </div>

                <p>
                  Status:
                  <b className={data.product.Stock < 1 ? "redColor" : "greenColor"}>
                    {data.product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4" >
                Description : <p>{data.product.description}</p>
              </div>

              <button className="submitReview" onClick={submitReviewToggle}>
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>
          {/* Adding material ui component  for takin Reviews  */}
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {data.product.reviews && data.product.reviews[0] ? (
            <div className="reviews">
              {data.product.reviews &&
                data.product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </>
      )}
    </>
  );
};

export default ProductDetails;

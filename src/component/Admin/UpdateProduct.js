import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Button } from "@material-ui/core";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import DescriptionIcon from "@material-ui/icons/Description";
import StorageIcon from "@material-ui/icons/Storage";
import SpellcheckIcon from "@material-ui/icons/Spellcheck";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import SideBar from "./Sidebar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { productData1, updateProduct1 } from "../../api/product";


const UpdateProduct = ({ history, match }) => {
  const alert = useAlert();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const queryClient = useQueryClient()


  const categories = [
    "Footwear",
    "Shirt",
    "Headphones",
    "SmartPhones",
  ];

  // React Query Mutation for getting product detail
  const productDetailMutation = useMutation({
    mutationFn: (id) => productData1(id),
    onSuccess: (data) => {
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setCategory(data.product.category);
      setStock(data.product.Stock);
      setOldImages(data.product.images);
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })

  const id = match.params.id;
  useEffect(() => {
    productDetailMutation.mutate(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // React Query Mutation for updating product
  const updateProductMutation = useMutation({
    mutationFn: (updatedData) => updateProduct1(updatedData),
    onSuccess: (data) => {
      alert.success("Product Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ['getProductsAdminQuery'] })
      history.push("/admin/products");
    },
    onError: (err) => {
      alert.error(err.response.data.message)
    }
  })
  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    console.log("images during form submission : ", images)
    images.forEach((image) => {
      myForm.append("images", image);
    });
    updateProductMutation.mutate({ id, myForm })
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    console.log(files)
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
    console.log("images before foreach loop : ", images)
    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          //console.log("reader.result is  ", reader.result)
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });

  };

  return (
    <>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer ">
          <form
            className="createProductForm "
            encType="multipart/form-data"
            onSubmit={updateProductSubmitHandler}
          >
            <h1>Update Product</h1>

            <div>
              <SpellcheckIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <AttachMoneyIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </div>

            <div>
              <DescriptionIcon />

              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
              <AccountTreeIcon />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <StorageIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
                value={Stock}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={updateProductImagesChange}
                multiple
              />
            </div>

            <div id="createProductFormImage">
              {oldImages &&
                oldImages.map((image, index) => (
                  <img key={index} src={image.url} alt="Old Product Preview" />
                ))}
            </div>

            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            <Button
              id="createProductBtn"
              type="submit"
              disabled={updateProductMutation.isPending ? true : false}
            >
              {updateProductMutation.isPending ? "Updating....." : "Update"}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateProduct;

// File: contexts/ProductContext.js
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
import {  getProducts } from '../axios';
import productReducer from '../reducers/product';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] })
  
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getProducts();
        dispatch({ type: "SET_PRODUCTS", payload: data })
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    })()
  }, []);
  
  
  return (
    <ProductContext.Provider
    value={{ state, dispatch }}
    >
      {children}
    </ProductContext.Provider>
  );
};


// export const useProductContext = () => {
  //   return useContext(ProductContext);
  // };
  // const [products, setProducts] = useState([]);
  // const addProduct = async (product) => {
  //   try {
  //     const res = await instance.post('/products', product);
  //     setProducts([...products, res.data]);
  //   } catch (error) {
  //     console.error('Error adding product:', error);
  //   }
  // };

  // const updateProduct = async (updatedProduct) => {
  //   try {
  //     await instance.patch(`/products/${updatedProduct.id}`, updatedProduct);
  //     const updatedProducts = await fetchProducts();
  //     setProducts(updatedProducts);
  //   } catch (error) {
  //     console.error('Error updating product:', error);
  //   }
  // };

  // const getProductById = async (id) => {
  //   try {
  //     const { data } = await instance.get(`/products/${id}`);
  //     return data;
  //   } catch (error) {
  //     console.error('Error fetching product by ID:', error);
  //   }
  // };




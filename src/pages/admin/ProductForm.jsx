import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, instance, updateProduct } from "../../axios";
import productSchema from "../../schemaValid/productSchema";
import { ProductContext } from "../../context/product";

const ProductForm = () => {

    const { id } = useParams();
    const { dispatch } = useContext(ProductContext)
    const nav = useNavigate();
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm({ resolver: zodResolver(productSchema) });

    useEffect(() => {
        if (id) {
            (async () => {
                try {
                    const { data } = await getProductById(id);
                    console.log(data);
                    reset(data)
                } catch (error) {
                    console.log(error);
                }
            })();
        }
    }, [id, reset]);

    const onSubmit = async (data) => {
        if (id) {
            const res = await updateProduct({ ...data, id })
            console.log(res)
            dispatch({ type: 'UPDATE_PRODUCT', payload: res.data })
            nav('/admin')
        } else {
            const res = await instance.post(`/products/`, data);
            dispatch({ type: 'ADD_PRODUCT', payload: res.data })
            nav('/admin')
        }
    };
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h1>{id ? "Product Edit" : "Product Add"}</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" {...register("title", { required: true })} />
                    {errors.title?.message && <p className="text-danger">{errors.title?.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">
                        Price
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        {...register("price", { required: true, valueAsNumber: true })}
                    />
                    {errors.price?.message && <p className="text-danger">{errors.price?.message}</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Description
                    </label>
                    <input type="text" className="form-control" id="description" {...register("description")} />
                    {errors.description?.message && <p className="text-danger">{errors.description?.message}</p>}
                </div>
                <div className="mb-3">
                    <button className="btn btn-primary w-100" type="submit">
                        {id ? "Product Edit" : "Product Add"}
                    </button>
                </div>
            </form>
        </>
    );
};

export default ProductForm;

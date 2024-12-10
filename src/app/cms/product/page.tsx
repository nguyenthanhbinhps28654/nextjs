'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';

// URL API JSON Server cho sản phẩm
const API_URL = 'http://localhost:5000/products';

export default function CMSProduct() {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const router = useRouter();

  // Fetch data sản phẩm
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(API_URL);
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    image: Yup.string().url('Invalid image URL').required('Image URL is required'),
    idcate: Yup.number().required('Category is required'),
  });

  // Formik setup cho Add / Edit sản phẩm
  const formik = useFormik({
    initialValues: {
      name: editProduct ? editProduct.name : '',
      price: editProduct ? editProduct.price : '',
      image: editProduct ? editProduct.image : '',
      hot: editProduct ? editProduct.hot : 0,
      idcate: editProduct ? editProduct.idcate : 1, // Default category to 1
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (editProduct) {
        // Update sản phẩm
        await axios.put(`${API_URL}/${editProduct.id}`, values);
      } else {
        // Thêm sản phẩm mới
        await axios.post(API_URL, values);
      }
      router.refresh();
      setEditProduct(null); // Reset trạng thái sau khi submit
    },
  });

  // Handle edit sản phẩm
  const handleEdit = (product) => {
    setEditProduct(product);
    formik.setValues({
      name: product.name,
      price: product.price,
      image: product.image,
      hot: product.hot,
      idcate: product.idcate,
    });
  };

  // Handle delete sản phẩm
  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setProducts(products.filter((product) => product.id !== id)); // Xóa sản phẩm khỏi state
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditProduct(null);
    formik.resetForm();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">CMS Dashboard - Product Management</h1>
      <Link href="/cms">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded">
                CMS User
              </button>
            </Link>
      

      {/* Product Form for Add / Edit */}
      <form onSubmit={formik.handleSubmit} className="space-y-4 mb-6">
        <div>
          <label htmlFor="name" className="block">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="price" className="block">Price</label>
          <input
            id="price"
            name="price"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.price}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="image" className="block">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="idcate" className="block">Category ID</label>
          <input
            id="idcate"
            name="idcate"
            type="number"
            onChange={formik.handleChange}
            value={formik.values.idcate}
            className="p-2 border border-gray-300 rounded w-full text-black"
          />
        </div>
        <div>
          <label htmlFor="hot" className="block">Hot Product</label>
          <input
            id="hot"
            name="hot"
            type="checkbox"
            checked={formik.values.hot === 1}
            onChange={() => formik.setFieldValue('hot', formik.values.hot === 1 ? 0 : 1)}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="flex items-center space-x-4">
          {editProduct ? (
            <>
              <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                Save
              </button>
              <button type="button" onClick={handleCancelEdit} className="bg-red-500 text-white py-2 px-4 rounded">
                Cancel
              </button>
            </>
          ) : (
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
              Add Product
            </button>
          )}
        </div>
      </form>

      {/* Product List Table */}
      <table className="table-auto w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Price</th>
            <th className="border px-4 py-2">Category</th>
            <th className="border px-4 py-2">Image</th>
            <th className="border px-4 py-2">Hot</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td className="border px-4 py-2">{product.name}</td>
              <td className="border px-4 py-2">{product.price}</td>
              <td className="border px-4 py-2">{product.idcate}</td>
              <td className="border px-4 py-2">
                <a href={product.image} target="_blank" rel="noopener noreferrer">
                  <img src={product.image} alt="product" className="h-10 w-10" />
                </a>
              </td>
              <td className="border px-4 py-2">{product.hot === 1 ? 'Yes' : 'No'}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
                <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-white px-4 py-2 rounded ml-2">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

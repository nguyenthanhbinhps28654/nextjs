"use client";

import React, { useEffect, useState } from 'react';

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  hot: number;
  idcate: number;
}

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterProducts(searchValue, sortOrder, selectedCategory, minPrice, maxPrice);
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc";
    setSortOrder(value);
    filterProducts(searchTerm, value, selectedCategory, minPrice, maxPrice);
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterProducts(searchTerm, sortOrder, value, minPrice, maxPrice);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    filterProducts(searchTerm, sortOrder, selectedCategory, value, maxPrice);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    filterProducts(searchTerm, sortOrder, selectedCategory, minPrice, value);
  };

  const filterProducts = (
    search: string, 
    order: "asc" | "desc", 
    category: string,
    min: string,
    max: string
  ) => {
    let updatedProducts = products;

    // Lọc theo từ khóa tìm kiếm
    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }

    // Lọc theo danh mục
    if (category !== "all") {
      updatedProducts = updatedProducts.filter((product) => 
        product.idcate === parseInt(category)
      );
    }

    // Lọc theo khoảng giá
    if (min !== "") {
      updatedProducts = updatedProducts.filter((product) => 
        product.price >= parseInt(min)
      );
    }
    if (max !== "") {
      updatedProducts = updatedProducts.filter((product) => 
        product.price <= parseInt(max)
      );
    }

    // Sắp xếp theo giá
    updatedProducts = updatedProducts.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(updatedProducts);
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 text-white">
      <h1 className="text-center text-3xl font-bold mb-8">Danh Sách Sản Phẩm</h1>

      {/* Thanh tìm kiếm */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={searchTerm}
          onChange={handleSearch}
          className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        />
      </div>

      {/* Bộ lọc và sắp xếp */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        {/* Dropdown danh mục */}
        <select
          value={selectedCategory}
          onChange={handleCategoryFilter}
          className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="all">Tất cả danh mục</option>
          <option value="1">Danh mục 1</option>
          <option value="2">Danh mục 2</option>
        </select>

        {/* Dropdown sắp xếp giá */}
        <select
          value={sortOrder}
          onChange={handleSort}
          className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="asc">Giá thấp đến cao</option>
          <option value="desc">Giá cao đến thấp</option>
        </select>

        {/* Bộ lọc khoảng giá */}
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Giá từ"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="px-4 py-2 w-32 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Giá đến"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="px-4 py-2 w-32 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h3 className="text-xl font-semibold mb-1">{product.name}</h3>
            <p className="text-gray-400 mb-2">Giá: {product.price.toLocaleString()} VND</p>
            {product.hot === 1 && (
              <span className="bg-red-500 text-white text-sm font-bold px-2 py-1 rounded">Hot</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
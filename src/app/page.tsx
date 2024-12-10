"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const [uniqueCategories, setUniqueCategories] = useState<number[]>([]);
  const [showHotOnly, setShowHotOnly] = useState<boolean>(false);

  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/products");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);

        // Get unique categories
        const uniqueCats: number[] = Array.from(
          new Set(data.map((product: Product) => product.idcate))
        );
        setUniqueCategories(uniqueCats.sort((a, b) => a - b));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => (prevIndex + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const getRandomHotProducts = () => {
    const hotProducts = products.filter((product) => product.hot === 1);
    return hotProducts.sort(() => 0.5 - Math.random()).slice(0, 3);
  };

  const bannerContent = [
    <img
      src="https://bizweb.dktcdn.net/100/329/122/themes/951253/assets/slider1_2.jpg?1731817324023"
      alt="Banner 1"
      className="w-full h-full object-fit"
    />,
    <img
      src="https://bizweb.dktcdn.net/100/329/122/themes/951253/assets/bannertop_1.jpg?1731817263786"
      alt="Banner 2"
      className="w-full h-full object-fit"
    />,
    <div className="grid grid-cols-3 gap-4 p-4 bg-gray-900">
      {getRandomHotProducts().map((product) => (
        <Link key={product.id} href={`/pro/${product.id}`}>
          <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="w-full h-40 overflow-hidden rounded-md mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="text-sm font-semibold mb-1 text-white">
              {product.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>,
  ];

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value.toLowerCase();
    setSearchTerm(searchValue);
    filterProducts(
      searchValue,
      sortOrder,
      selectedCategory,
      minPrice,
      maxPrice,
      showHotOnly
    );
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as "asc" | "desc";
    setSortOrder(value);
    filterProducts(
      searchTerm,
      value,
      selectedCategory,
      minPrice,
      maxPrice,
      showHotOnly
    );
  };

  const handleCategoryFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCategory(value);
    filterProducts(
      searchTerm,
      sortOrder,
      value,
      minPrice,
      maxPrice,
      showHotOnly
    );
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinPrice(value);
    filterProducts(
      searchTerm,
      sortOrder,
      selectedCategory,
      value,
      maxPrice,
      showHotOnly
    );
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMaxPrice(value);
    filterProducts(
      searchTerm,
      sortOrder,
      selectedCategory,
      minPrice,
      value,
      showHotOnly
    );
  };

  const handleHotFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setShowHotOnly(isChecked);
    filterProducts(
      searchTerm,
      sortOrder,
      selectedCategory,
      minPrice,
      maxPrice,
      isChecked
    );
  };

  const filterProducts = (
    search: string,
    order: "asc" | "desc",
    category: string,
    min: string,
    max: string,
    hotOnly: boolean
  ) => {
    let updatedProducts = products;

    if (hotOnly) {
      updatedProducts = updatedProducts.filter((product) => product.hot === 1);
    }

    if (search) {
      updatedProducts = updatedProducts.filter((product) =>
        product.name.toLowerCase().includes(search)
      );
    }

    if (category !== "all") {
      updatedProducts = updatedProducts.filter(
        (product) => product.idcate === parseInt(category)
      );
    }

    if (min !== "") {
      updatedProducts = updatedProducts.filter(
        (product) => product.price >= parseInt(min)
      );
    }
    if (max !== "") {
      updatedProducts = updatedProducts.filter(
        (product) => product.price <= parseInt(max)
      );
    }

    updatedProducts.sort((a, b) =>
      order === "asc" ? a.price - b.price : b.price - a.price
    );

    setFilteredProducts(updatedProducts);
  };

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="bg-gray-900 min-h-screen py-8 px-4 text-white">
      {/* Banner */}
      <div className="relative h-64 w-full mb-8 overflow-hidden rounded-lg">
        {bannerContent[currentBannerIndex]}
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-20"></div>
      </div>

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
        <select
          value={selectedCategory}
          onChange={handleCategoryFilter}
          className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="all">Tất cả danh mục</option>
          {uniqueCategories.map((category) => (
            <option key={category} value={category}>
              Danh mục {category}
            </option>
          ))}
        </select>

        <select
          value={sortOrder}
          onChange={handleSort}
          className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
        >
          <option value="asc">Giá thấp đến cao</option>
          <option value="desc">Giá cao đến thấp</option>
        </select>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="hotOnly"
            checked={showHotOnly}
            onChange={handleHotFilter}
            className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
          />
          <label htmlFor="hotOnly" className="text-white">
            Sản phẩm Hot
          </label>
        </div>

        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Giá từ"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
          <input
            type="number"
            placeholder="Đến"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
          />
        </div>
      </div>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {filteredProducts.map((product) => (
    <Link key={product.id} href={`/pro/${product.id}`}>
      <div className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        {/* Tăng chiều cao của hình ảnh */}
        <div className="w-full h-60 overflow-hidden rounded-md mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-sm text-gray-400 mb-4">
          Giá: {product.price.toLocaleString()} VND
        </p>
        {product.hot === 1 && (
          <span className="px-2 py-1 bg-red-500 text-white text-xs rounded">
            HOT
          </span>
        )}
      </div>
    </Link>
  ))}
</div>


    </div>
  );
};

export default ProductsPage;

"use client";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "@/redux/slices/cartslice";
import { useState } from "react";
import useSWR from 'swr';
import { use } from 'react';

export default function DetailPage({ params }) {
  const [quantity, setQuantity] = useState(1); // Số lượng sản phẩm muốn thêm vào giỏ
  const dispatch = useDispatch(); // Dùng dispatch để gọi action addToCart
  const cart = useSelector(state => state.cart); // Lấy giỏ hàng từ Redux store

  console.log(cart); // Hiển thị giỏ hàng hiện tại trong console (debugging)

  // Dùng React.use() để unwrap params
  const { id } = use(params); // Lấy id từ params đã unwrap
  
  // Hàm fetcher dùng để lấy dữ liệu từ API
  const fetcher = (url) => fetch(url).then(res => res.json());
  
  // Dùng useSWR để fetch dữ liệu sản phẩm từ API
  const { data, error } = useSWR(`http://localhost:5000/products/${id}`, fetcher, {
    refreshInterval: 6000, // Tự động cập nhật dữ liệu sau mỗi 6 giây
  });

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (!data) return <div>Đang tải...</div>;

  // Hàm để xử lý khi người dùng thêm sản phẩm vào giỏ
  const handleAddToCart = () => {
    // Tạo đối tượng action để gửi vào Redux
    dispatch(addToCart({ item: data, quantity: quantity }));
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="flex">
        {/* Hình ảnh sản phẩm */}
        <div className="w-1/2">
          <img src={data.image} alt={data.name} className="w-full h-auto object-cover" />
        </div>
        
        {/* Thông tin sản phẩm */}
        <div className="w-1/2 pl-8">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <p className="text-gray-600 mt-2">Giá: {data.price.toLocaleString('vi-VN')} VND</p>
          <p className="mt-4">{data.description}</p>
          
          {/* Input số lượng sản phẩm */}
          <div className="flex items-center mt-4">
            <label htmlFor="quantity" className="mr-4 text-lg">Số lượng:</label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="border p-2 rounded mt-2 w-16 text-center text-black"
            />
          </div>
          
          {/* Nút thêm vào giỏ */}
          <button
            onClick={handleAddToCart}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}

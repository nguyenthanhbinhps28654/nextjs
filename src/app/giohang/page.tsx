"use client";

import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, updateQuantity } from "@/redux/slices/cartslice";
import Link from "next/link";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: any) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0
  );

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  return (
    <div className="container mx-auto mt-4">
      <h1 className="text-3xl font-semibold mb-6">Giỏ hàng của bạn</h1>
      {cartItems.length === 0 ? (
        <div className="text-center">Giỏ hàng của bạn hiện tại trống.</div>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      Giá: {item.price.toLocaleString()} VND
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity - 1)
                    }
                    className="bg-black-200 hover:bg-black-300 px-2 py-1 rounded"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(item.id, item.quantity + 1)
                    }
                    className="bg-black-200 hover:bg-black-300 px-2 py-1 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-700 ml-4"
                  >
                    Xóa
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-semibold">Tổng cộng:</h2>
            <p className="text-lg">{totalPrice.toLocaleString()} VND</p>
          </div>

          <div className="mt-6 flex justify-end">
            <Link href="/hoadon">
              <button className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded">
                Tiến hành thanh toán
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
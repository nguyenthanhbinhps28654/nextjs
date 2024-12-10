"use client";
import useSWR from 'swr';

export default function DetailPage({ params: { id } }) {
  const fetcher = (url: string) => fetch(url).then(res => res.json());
  const { data, error } = useSWR(`http://localhost:5000/products/${params.id}`, fetcher, {
    refreshInterval: 6000,
  });

  if (error) return <div>Lỗi load dữ liệu.</div>;
  if (!data) return <div>Đang tải...</div>;

  return (
    <div className="container mx-auto mt-4">
      <div className="flex">
        <div className="w-1/2">
          <img src={data.image} alt={data.name} />
        </div>
        <div className="w-1/2">
          <h1 className="text-3xl font-semibold">{data.name}</h1>
          <p className="text-gray-600 mt-2">Giá: {data.price.toLocaleString('vi-VN')} VND</p>
          <p className="mt-4">{data.description}</p>
          <input type="number" min={1} defaultValue={1} className="border p-2 rounded mt-4" />
          <br />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Thêm vào giỏ hàng
          </button>
        </div>
      </div>
    </div>
  );
}
export default function CheckoutPage() {
    return (
      <div className="container mx-auto mt-4 text-center">
        <h1 className="text-3xl font-bold text-green-600">Thanh toán thành công!</h1>
        <p className="mt-4 text-lg">Cảm ơn bạn đã mua hàng tại cửa hàng của chúng tôi.</p>
        
        <a
          href="/"
          className="inline-block mt-6 bg-blue-500 hover:bg-blue-700 text-white py-2 px-6 rounded"
        >
          Quay về trang chủ
        </a>
      </div>
    );
  }
  
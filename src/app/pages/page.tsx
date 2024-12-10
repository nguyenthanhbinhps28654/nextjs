import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SearchResults = () => {
  const router = useRouter();
  const { query } = router.query;
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        const data = await response.json();
        setProducts(data);

        if (query) {
          const lowerQuery = query.toLowerCase();
          setFilteredProducts(data.filter(product =>
            product.name.toLowerCase().includes(lowerQuery)
          ));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Kết quả tìm kiếm cho: "{query}"</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="bg-gray-800 p-4 rounded-lg">
              <img src={product.image} alt={product.name} className="w-full h-40 object-cover mb-4 rounded-md" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-400">Giá: {product.price.toLocaleString()} VND</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm phù hợp.</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;

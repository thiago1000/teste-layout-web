import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import StarRatings from './react-star-ratings';
import storeFetch from "../axios/config";
import Star from "../components/Star";
import "../styles/main.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  
  const getProducts = async() =>{
    try {
      const response = await storeFetch.get('/products')
      const data = response.data;
      console.log(data.products);
      setProducts(data.products);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [])

  return (
    <div className="container mx-auto px-4 sm:px-0">
      <div className="grid gap-8 grig-cols-1 md:grid-cols-3 xl:grid-cols-4 p-5">
        {products.map((product) => (
          <div key={product.id} className="border border-1 border-gray-200 rounded-md hover:border-blue-600 transition-colors bg-white">
            <a href="/src/product.html" className="block overflow-hidden h-56">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="rounded-lg hover:scale-105 hover:rotate-1 transition-transform h-full w-full object-cover object-center"
              />
            </a>
            <div className="p-4">
              <h3 className="text-lg">
                <Link to={"#"}>{product.title}</Link>
              </h3>
              <Star stars={product.rating} />
              <h5 className="font-bold">${product.price},00</h5>
            </div>
            <div className="flex justify-between py-3 px-4">
              <button className="w-10 h-10 rounded-full border border-1 border-blue-600 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white active:bg-blue-800 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <button className="btn-primary">Comprar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;
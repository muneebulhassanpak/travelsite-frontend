import { useEffect, useState } from "react";
import { headers, getHomeToursUrl } from "../../utils/urls";
import bgImage from "../assets/bg.png";
import { motion } from "framer-motion";
import Card from "../components/Card";
import TravelServiceComponent from "../components/TravelServiceComponent";
import Loader from "../assets/loader.gif";

export default function Example() {
  const [regularTours, setRegularTours] = useState([]);
  const [premiumTours, setPremiumTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllHomePosts = async () => {
      try {
        const response = await fetch(getHomeToursUrl, {
          method: "GET",
          headers: headers,
          credentials: "include",
        });
        const data = await response.json();
        if (data.success === true) {
          setRegularTours(data.data[0]);
          setPremiumTours(data.data[1]);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllHomePosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <img src={Loader} className="w-12 h-12 rounded-full" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching products. Please try again later.</div>;
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        duration: 10,
      }}
    >
      <div
        className="py-10"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="px-6 pt-0 lg:px-8">
          <div className="mx-auto max-w-4xl pt-32 pb-12 md:pb-0 md:py-28">
            <div className="text-center">
              <div className="relative inter px-3 max-w-sm mx-auto py-1 uppercase leading-6 text-white text-lg">
                Welcome to{" "}
                <span className="font-semibold underline">Pacific Tours</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl md:text-8xl font-lufga-medium">
                Providing
                <span className="block birth text-[50px] sm:text-[80px] md:text-[140px] leading-[50px] sm:leading-[120px]">
                  travel inspiration
                </span>
                in Pakistan
              </h1>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <a
                  href="#products"
                  className="light-blue-bg px-4 sm:px-6 border-2 border-white py-3 sm:py-4 text-md rounded-full font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex justify-between gap-3"
                >
                  View Upcoming Trips{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 animate-bounce"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 13.5L12 21m0 0L4.5 13.5M12 21V3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, duration: 2 }}
        className="bg-white"
        id="products"
      >
        <div className="mx-auto max-w-2xl px-3 pt-6 sm:px-6 sm:pt-10 lg:max-w-6xl lg:px-8">
          <h2 className="text-4xl inter uppercase font-bold tracking-tight text-gray-900 text-center">
            Upcoming Premium Trips
          </h2>

          {premiumTours.length === 0 ? (
            <p className="mt-8 text-center text-gray-600">
              No tours available.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
              {premiumTours.map((product) => (
                <Card
                  key={product._id}
                  id={product._id}
                  price={product.tourprice}
                  location={product.tourlocation}
                  image={product.tourimages[0]}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, marginTop: "-300px" }}
        whileInView={{ opacity: 1, marginTop: "0px", duration: 0.75 }} // Adjusted duration for faster animation
        viewport={{ once: true }}
        transition={{ easein: [0.17, 0.67, 0.83, 0.67], duration: 0.75 }} // Consistent duration for all properties
        className="bg-white mb-3 -z-20"
      >
        <div className="mx-auto max-w-2xl px-3 pt-6 sm:px-6 sm:pt-10 lg:max-w-6xl lg:px-8">
          <h2 className="text-4xl inter uppercase font-bold tracking-tight text-gray-900 text-center">
            Upcoming Standard Trips
          </h2>

          {regularTours.length === 0 ? (
            <p className="mt-8 text-center text-gray-600">
              No tours available.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
              {regularTours.map((product) => (
                <Card
                  key={product._id}
                  id={product._id}
                  price={product.tourprice}
                  location={product.tourlocation}
                  image={product.tourimages[0]}
                />
              ))}
            </div>
          )}
        </div>
      </motion.div>
      <TravelServiceComponent />
    </motion.section>
  );
}

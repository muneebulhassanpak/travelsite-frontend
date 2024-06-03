import { useEffect, useState } from "react";
import { headers, getToursUrl } from "../../utils/urls";
import Card from "../components/Card";
import { motion } from "framer-motion";
import Loader from "../assets/loader.gif";

export default function AllTrips() {
  const [regularTours, setRegularTours] = useState([]);
  const [premiumTours, setPremiumTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch(getToursUrl, {
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

    fetchAllPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <img src={Loader} className="w-12 h-12 rounded-full" alt="Loading" />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching tours. Please try again later.</div>;
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          duration: 10,
        }}
        className="bg-white mt-28"
      >
        <div className="mx-auto max-w-2xl px-3 pt-6 sm:px-6 sm:pt-10 lg:max-w-6xl lg:px-8">
          <h2 className="text-4xl inter uppercase font-bold tracking-tight text-gray-900 text-center">
            All Upcoming Premium Trips
          </h2>

          {premiumTours.length === 0 ? (
            <p className="mt-8 text-center text-gray-600">
              No tours available.
            </p>
          ) : (
            <div className="mt-6 flex flex-wrap justify-between items-center gap-3">
              {premiumTours.map((product) => (
                <Card
                  id={product._id}
                  key={product._id}
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
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1, duration: 4 }}
        className="bg-white mb-3"
      >
        <div className="mx-auto max-w-2xl px-3 pt-6 sm:px-6 sm:pt-10 lg:max-w-6xl lg:px-8">
          <h2 className="text-4xl inter uppercase font-bold tracking-tight text-gray-900 text-center">
            All Upcoming Standard Trips
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
    </>
  );
}

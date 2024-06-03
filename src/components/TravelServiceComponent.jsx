import React, { useState } from "react";

const services = [
  {
    title: "Expert Guidance",
    description:
      "Our team consists of seasoned travel experts with extensive knowledge and experience in the destinations we offer. We stay up-to-date with the latest travel trends, ensuring that you receive the best recommendations and advice.",
  },
  {
    title: "Personalized Service",
    description:
      "We believe that every traveler deserves a personalized experience. Whether you're planning a solo adventure, a romantic getaway, or a family vacation, we tailor our itineraries to suit your interests and preferences. From luxury accommodations to off-the-beaten-path excursions, we ensure that every aspect of your trip is designed with you in mind.",
  },
  {
    title: "Seamless Planning Process",
    description:
      "Planning a trip can be overwhelming, but with Wanderlust Adventures, it's a breeze. Our dedicated team will handle all the details, from booking flights and accommodations to arranging tours and activities. We take care of the logistics so that you can focus on enjoying your journey.",
  },
  {
    title: "Exceptional Customer Service",
    description:
      "Your satisfaction is our top priority. Our friendly and professional staff are available to assist you at every step of your journey. Whether you have questions before your trip or need assistance while you're away, we're here to help, 24/7.",
  },
  {
    title: "Sustainable Travel Practices",
    description:
      "We are committed to responsible travel practices that minimize our impact on the environment and support local communities. We partner with eco-friendly hotels, tour operators, and suppliers who share our commitment to sustainability.",
  },
  {
    title: "Peace of Mind",
    description:
      "With Wanderlust Adventures, you can travel with confidence, knowing that you're in good hands. We offer comprehensive travel insurance options and 24/7 support, so you can relax and enjoy your trip without worry.",
  },
];

const TravelServiceComponent = () => {
  const [expandedIndexes, setExpandedIndexes] = useState([]);

  const toggleExpansion = (index) => {
    if (expandedIndexes.includes(index)) {
      setExpandedIndexes(expandedIndexes.filter((i) => i !== index));
    } else {
      setExpandedIndexes([...expandedIndexes, index]);
    }
  };

  return (
    <section className=" py-10 bg-lightBlue text-white">
      <div className="max-w-6xl mx-auto">
        <h3 className="text-4xl mx-auto font-semibold uppercase text-center mb-6">
          Why Choose Pacific Trips for Your Next Trip?
        </h3>
        <div className="flex flex-wrap justify-center sm:justify-between items-center sm:px-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-3 rounded-md border border-white min-w-[280px] w-[90%] md:w-[30%] inter mb-4 hover:scale-105 transition-transform hover:cursor-pointer"
            >
              <h2 className="font-bold text-xl text-center">{service.title}</h2>
              <p>
                {expandedIndexes.includes(index)
                  ? service.description
                  : service.description.slice(0, 200)}
                {service.description.length > 200 && (
                  <span>
                    {expandedIndexes.includes(index) ? (
                      <button
                        className="ml-2 text-gray-300"
                        onClick={() => toggleExpansion(index)}
                      >
                        read less
                      </button>
                    ) : (
                      <button
                        className="ml-2 text-gray-300"
                        onClick={() => toggleExpansion(index)}
                      >
                        read more...
                      </button>
                    )}
                  </span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TravelServiceComponent;

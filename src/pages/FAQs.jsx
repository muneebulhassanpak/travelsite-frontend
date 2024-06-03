import React, { useState } from "react";
import { motion } from "framer-motion";

const FAQs = () => {
  const qs = [
    {
      question: "What are the popular domestic destinations in Pakistan?",
      answer:
        "Pakistan boasts numerous domestic travel destinations, including the scenic valleys of Hunza and Swat, cultural hubs like Lahore and Karachi, historical sites such as Taxila and Mohenjo-Daro, and stunning natural landscapes like Naran, Kaghan, and Skardu, Astore Minimerg, Fairy Meadows",
      isOpen: false,
    },
    {
      question: "What types of domestic trips do you offer?",
      answer:
        "We offer a wide range of domestic trips tailored to various interests, including adventure tours, cultural experiences, historical tours, religious pilgrimages, wildlife safaris, and relaxing getaways.",
      isOpen: false,
    },
    {
      question: "Are your domestic trips suitable for families?",
      answer:
        "Yes, many of our domestic trips are family-friendly and cater to travelers of all ages. We offer activities and accommodations suitable for families, ensuring a memorable and enjoyable experience for everyone.",
      isOpen: false,
    },
    {
      question: "How do I book a domestic trip with your company?",
      answer:
        "Booking a domestic trip with us is easy. You can visit our office or website to browse available trips, check availability, and make reservations online. Alternatively, you can contact our customer service team for personalized assistance and guidance.",
      isOpen: false,
    },
    {
      question: "What is included in your domestic trip packages?",
      answer:
        "Our domestic trip packages typically include accommodation, transportation, guided tours, meals, and entrance fees to attractions specified in the itinerary. Optional activities and additional services may be available at an extra cost.",
      isOpen: false,
    },
    {
      question:
        "Can you customize a domestic trip according to my preferences?",
      answer:
        "Yes, we understand that every traveler has unique preferences and interests. We offer customization options to tailor your domestic trip itinerary, activities, and accommodations to suit your specific needs and preferences.",
      isOpen: false,
    },
    {
      question: "What is the best time to take a domestic trip in Pakistan?",
      answer:
        "The best time for a domestic trip in Pakistan depends on the destination and activities you plan to undertake. Generally, spring (March to May) and autumn (September to November) offer pleasant weather for most parts of the country.",
      isOpen: false,
    },
    {
      question: "Are your domestic trips suitable for solo travelers?",
      answer:
        "Yes, many of our domestic trips are suitable for solo travelers. We offer group tours where solo travelers can join like-minded individuals, as well as personalized itineraries for those seeking a more independent experience.",
      isOpen: false,
    },
    {
      question: "Do you offer discounts for group bookings on domestic trips?",
      answer:
        "Yes, we offer special discounts for group bookings on domestic trips. The exact discount may vary depending on the size of the group and the specific trip itinerary. Please contact our customer service team for more information.",
      isOpen: false,
    },
    {
      question: "Is it safe to travel domestically in Pakistan?",
      answer:
        "Yes, domestic travel in Pakistan is generally safe, especially to popular tourist destinations. However, as with any travel, it's essential to stay informed, exercise caution, and follow any travel advisories or safety guidelines issued by local authorities.",
      isOpen: false,
    },
  ];

  const [faqs, setFaqs] = useState(qs);

  const toggleAnswer = (index) => {
    setFaqs((prevFaqs) => {
      const updatedFaqs = prevFaqs.map((faq, i) => {
        if (i === index) {
          return { ...faq, isOpen: !faq.isOpen };
        } else {
          return faq;
        }
      });
      return updatedFaqs;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        duration: 8,
      }}
      className="max-w-6xl mx-auto px-4 py-8 mt-10 sm:mt-20 lg:mt-24"
    >
      <h1 className="text-3xl font-semibold mb-8 text-center">
        Frequently Asked Questions
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-[rgba(0,0,0,0.2)] sm:border-0 p-4"
          >
            <div className="flex justify-between items-start">
              <h2 className="text-md font-medium">{faq.question}</h2>
              <button onClick={() => toggleAnswer(index)}>
                {faq.isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 12h14"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    />
                  </svg>
                )}
              </button>
            </div>
            {faq.isOpen && <p className="mt-4 text-gray-600">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default FAQs;

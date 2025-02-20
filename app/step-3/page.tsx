"use client";

import React, { useState ,useEffect} from "react";
import Image from "next/image";
import { useRouter,useSearchParams } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import ProgressBar from "../components/ProgressBar";
import { useOrder } from "../context/OrderContext";

const coffeeCategories = [
  {
    title: "ESPRESSO",
    items: [
      { name: "Pre-Ground Espresso", image: "/coffeemachine.jpg" },
      { name: "Wholebean Espresso", image: "/coffeemachine.jpg" },
      { name: "Bean to Cup", image: "/coffeemachine.jpg" },
    ],
  },
  {
    title: "FILTER",
    items: [
      { name: "Batch Brew", image: "/coffeemachine.jpg" },
      { name: "Drip", image: "/coffeemachine.jpg" },
      { name: "Cafetiere", image: "/coffeemachine.jpg" },
    ],
  },
  {
    title: "PODS",
    items: [{ name: "Nespresso Compatible Machine", image: "/coffeemachine.jpg" }],
  },
];

export default function CoffeeBrewingSelection() {
  const router = useRouter();
  const { selectedCoffee, setSelectedCoffee } = useOrder(); 

  const [openSections, setOpenSections] = useState(
    coffeeCategories.map(() => true)
  );

  // Toggle section visibility
  const toggleSection = (index: number) => {
    setOpenSections((prev) =>
      prev.map((open, i) => (i === index ? !open : open))
    );
  };
  
  const [companyName, setCompanyName] = useState('');
  const searchParams = useSearchParams();
   // useEffect to retrieve the company name from URL parameters and set it to the state
   useEffect(() => {
    const companyNameFromParams = searchParams.get('companyName');
    if (companyNameFromParams) {
      setCompanyName(companyNameFromParams);
    }
  }, [searchParams]);

  // Store Selected Brew Method & Go to Next Step
  const selectItem = (itemName: string) => {
    setSelectedCoffee(itemName); 
    router.push("/step-5");
  };

   

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center pb-6">
      <ProgressBar step={3} />
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-4 mt-10">
      How do you brew your coffee at <span className="text-teal-800">{companyName}</span>?
      </h2>

      {coffeeCategories.map((category, index) => (
        <div key={index} className="w-full max-w-7xl mb-6">
          <div
            className="flex justify-between items-center bg-teal-800 text-white px-6 py-3 cursor-pointer"
            onClick={() => toggleSection(index)}
          >
            <h3 className="text-lg md:text-xl font-semibold">
              {category.title}
            </h3>
            {openSections[index] ? (
              <FaChevronUp size={20} />
            ) : (
              <FaChevronDown size={20} />
            )}
          </div>

          {openSections[index] && (
            <div className="grid gap-6 p-6 bg-white shadow-md"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              }}
            >
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  onClick={() => selectItem(item.name)} // ✅ Save & Go to Next Step
                  className={`flex flex-col items-center border p-6 rounded-lg cursor-pointer transition w-full ${
                    selectedCoffee === item.name ? "bg-teal-800 text-white" : "hover:shadow-lg"
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={280}
                    height={200}
                    className="rounded-lg"
                  />
                  <h4 className="mt-4 text-center text-lg font-semibold">
                    {item.name}
                  </h4>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

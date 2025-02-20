"use client";
import { useRouter } from "next/navigation";
import { FaBuilding } from "react-icons/fa";
import { BsFillBuildingsFill } from "react-icons/bs";
import { Card, CardContent } from "@/components/ui/card";
import ProgressBar from "../components/ProgressBar";
import { useOrder } from "../context/OrderContext";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const audienceData = [
  { icon: <FaBuilding size={70} />, employees: 5 },
  { icon: <FaBuilding size={70} />, employees: 10 },
  { icon: <FaBuilding size={70} />, employees: 15 },
  { icon: <FaBuilding size={70} />, employees: 25 },
  { icon: <FaBuilding size={70} />, employees: 35 },
  { icon: <FaBuilding size={70} />, employees: 50 },
  { icon: <FaBuilding size={70} />, employees: 75 },
  { icon: <BsFillBuildingsFill size={70} />, employees: 100 },
  { icon: <BsFillBuildingsFill size={70} />, employees: 150 },
  { icon: <BsFillBuildingsFill size={70} />, employees: 200 },
  { icon: <BsFillBuildingsFill size={70} />, employees: "200+" },
];

export default function BusinessInfo() {
  const router = useRouter();
  
  // Use Global State (OrderContext)
  const { companyName, setCompanyName, selectedEmployees, setSelectedEmployees } = useOrder();

  // Function to handle the "Next" button click
  const handleNext = () => {
    // Proceed to the next page only if both company name and number of employees are selected
    if (companyName && selectedEmployees) {
      // Pass the company name as a URL parameter to the next page
      router.push(`/step-3?companyName=${encodeURIComponent(companyName)}`);
    }
  };

  return (
    <div className="relative w-full min-h-screen font-sans flex flex-col items-center pb-6">
      <ProgressBar step={2} />

      {/* Back Button */}
      <div className="absolute top-6 left-6 cursor-pointer mt-10">
        <span className="text-lg" onClick={() => router.push("/step-1")}>&larr;</span>
      </div>

      {/* Heading */}
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 mt-10">
        Tell us about your business
      </h2>

      {/* Company Name Input */}
      <div className="text-center">
        <h3 className="text-sm font-semibold text-gray-700">COMPANY NAME</h3>
        <input
          type="text"
          placeholder="Enter your company name..."
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className="mt-2 border-b-2 border-gray-400 outline-none text-center w-full max-w-xs p-2"
        />
      </div>

      {/* Carousel Selection for Employees */}
      <Carousel className="w-full max-w-md mt-8">
        <CarouselContent className="flex gap-4">
          {audienceData.map((item, index) => (
            <CarouselItem key={index} className="w-1/3">
              <div className="p-1">
                <Card
                  onClick={() => setSelectedEmployees(item.employees)}
                  className={`cursor-pointer ${
                    selectedEmployees === item.employees ? "bg-teal-900 text-white" : ""
                  }`}
                >
                  <CardContent className="flex flex-col items-center justify-center p-20">
                    {selectedEmployees === item.employees ? (
                      <span className="text-white">{item.icon}</span>
                    ) : (
                      <span className="text-teal-900">{item.icon}</span>
                    )}
                    <p
                      className={`text-sm mt-1 ${
                        selectedEmployees === item.employees ? "text-white" : "text-teal-900"
                      }`}
                    >
                      {item.employees} EMPLOYEES
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      {/* Next Button */}
      <button
        className={`mt-8 px-6 py-3 font-medium uppercase ${
          companyName && selectedEmployees
            ? "bg-teal-700 text-white hover:bg-teal-800"
            : "bg-gray-200 text-gray-500 cursor-not-allowed"
        }`}
        onClick={handleNext}
        disabled={!companyName || !selectedEmployees}
      >
        NEXT
      </button>
    </div>
  );
}

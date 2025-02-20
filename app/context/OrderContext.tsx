"use client";
import { createContext, useContext, useState } from "react";

interface OrderContextType {
  selected: string | null;
  companyName: string;
  selectedEmployees: number | string | null;
  selectedCoffee: string | null;
  coffeeQuantity: { kg: number; days: number };
  setSelected: (value: string | null) => void;
  setCompanyName: (value: string) => void;
  setSelectedEmployees: (value: number | string | null) => void;
  setSelectedCoffee: (value: string | null) => void;
  setCoffeeQuantity: (value: { kg: number; days: number }) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<number | string | null>(null);
  const [selectedCoffee, setSelectedCoffee] = useState<string | null>(null);
  const [coffeeQuantity, setCoffeeQuantity] = useState<{ kg: number; days: number }>({
    kg: 1,
    days: 28,
  });

  return (
    <OrderContext.Provider
      value={{
        selected,
        companyName,
        selectedEmployees,
        selectedCoffee,
        coffeeQuantity,
        setSelected,
        setCompanyName,
        setSelectedEmployees,
        setSelectedCoffee,
        setCoffeeQuantity,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used within an OrderProvider");
  }
  return context;
};

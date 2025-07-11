import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const data = [
    { id: 1, date: "25 June 2025", number: "+91 9999990000", amount: "₹349", operator: "airtel" },
    { id: 2, date: "22 June 2025", number: "+91 9888880011", amount: "₹299", operator: "vi" },
    { id: 3, date: "22 June 2025", number: "+91 8239749086", amount: "₹49", operator: "jio" },
    { id: 4, date: "20 June 2025", number: "+91 8239749085", amount: "₹579", operator: "vi" },
    { id: 5, date: "19 June 2025", number: "+91 8239749123", amount: "₹19", operator: "jio" },
    { id: 6, date: "13 June 2025", number: "+91 7651749084", amount: "₹349", operator: "airtel" },
    { id: 7, date: "10 June 2025", number: "+91 9876543210", amount: "₹149", operator: "jio" },
    { id: 8, date: "08 June 2025", number: "+91 9123456780", amount: "₹99", operator: "airtel" },
    { id: 9, date: "25 June 2025", number: "+91 9999990000", amount: "₹349", operator: "airtel" },
    { id: 10, date: "22 June 2025", number: "+91 9888880011", amount: "₹299", operator: "vi" },
    { id: 11, date: "22 June 2025", number: "+91 8239749086", amount: "₹49", operator: "jio" },
    { id: 12, date: "20 June 2025", number: "+91 8239749085", amount: "₹579", operator: "vi" },
    { id: 13, date: "19 June 2025", number: "+91 8239749123", amount: "₹19", operator: "jio" },
  ];

  const filteredData = data.filter((item) =>
    item.number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by phone number"
          className="w-full border rounded-full py-2 px-4 pl-10 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      <h3 className="text-sm text-gray-500 mb-3">June 2025</h3>

      {filteredData.length > 0 ? (
        <div className="space-y-4">
          {filteredData.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate("/payment-success")}
              className="flex items-center justify-between border-b pb-2 cursor-pointer hover:bg-gray-50 px-2 rounded transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={`/logos/${item.operator}.png`}
                  alt={item.operator}
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <div>
                  <p className="text-sm md:text-base">{item.number}</p>
                  <p className="text-xs text-gray-500">{item.date}</p>
                </div>
              </div>
              <p className="text-sm md:text-base font-medium">{item.amount}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
}

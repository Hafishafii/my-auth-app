import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BASE_API = "http://13.203.154.168";

export default function PaymentHistory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const url = new URL(`${BASE_API}/api/purchases/history`);
    url.searchParams.set("page", page.toString());
    url.searchParams.set("search", searchTerm);

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.results) {
          setHistory(data.results);
          setTotalPages(data.total_pages || 1);
        }
      })
      .catch((err) => console.error("Error loading history:", err))
      .finally(() => setLoading(false));
  }, [token, page, searchTerm]);

  return (
    <div className="p-4 max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search by phone number"
          className="w-full border rounded-full py-2 px-4 pl-10 text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setPage(1);
          }}
        />
        <FiSearch className="absolute left-3 top-2.5 text-gray-500" size={18} />
      </div>

      <h3 className="text-sm text-gray-500 mb-3">Recent History</h3>

      {loading ? (
        <p>Loading...</p>
      ) : history.length > 0 ? (
        <>
          <div className="space-y-4">
            {history.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/payment-success?id=${item.id}`)}
                className="flex items-center justify-between border-b pb-2 cursor-pointer hover:bg-gray-50 px-2 rounded transition"
              >
                <div>
                  <p className="text-sm md:text-base">{item.phone_number}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm md:text-base font-medium">₹{item.amount}</p>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center items-center gap-3 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="text-sm">{page} / {totalPages}</span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">No results found.</p>
      )}
    </div>
  );
}

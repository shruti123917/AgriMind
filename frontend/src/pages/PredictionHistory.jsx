import { useEffect, useState } from "react";
import axios from "axios";

export default function PredictionHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/history/disease"
      );

      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Prediction History
      </h1>

      <div className="bg-white rounded-xl shadow-md p-6">
        {history.length === 0 ? (
          <p>No predictions found.</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Disease</th>
                <th className="text-left py-2">Confidence</th>
                <th className="text-left py-2">Date</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-b"
                >
                  <td className="py-2">
                    {item.disease}
                  </td>

                  <td className="py-2">
                    {item.confidence}%
                  </td>

                  <td className="py-2">
                    {new Date(
                      item.created_at
                    ).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
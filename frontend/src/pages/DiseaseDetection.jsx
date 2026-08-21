import { useState } from "react";
import { detectDisease } from "../services/api";

export default function DiseaseDetection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const response = await detectDisease(file);

      setResult(response);
    } catch (error) {
      console.error(error);
      alert("Disease detection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Plant Disease Detection
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <label className="block mb-3 font-medium">
          Upload Leaf Image
        </label>

        <input
          type="file"
          accept="image/*"
          className="w-full border rounded-lg p-3"
          onChange={(e) => {
            const selectedFile = e.target.files[0];

            setFile(selectedFile);

            if (selectedFile) {
              setPreview(
                URL.createObjectURL(selectedFile)
              );
            }
          }}
        />

        {preview && (
          <div className="mt-4">
            <img
              src={preview}
              alt="Preview"
              className="w-64 rounded-lg border"
            />
          </div>
        )}

        <button
          type="submit"
          className="mt-6 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Detecting..." : "Detect Disease"}
        </button>
      </form>

      {result && (
        <div className="mt-6 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-4">
            Detection Result
          </h2>

          <p>
            <strong>Disease:</strong>{" "}
            {result.disease}
          </p>

          <p>
            <strong>Confidence:</strong>{" "}
            {result.confidence.toFixed(2)}%
          </p>

          <p>
            <strong>Recommendation:</strong>{" "}
            {result.recommendation}
          </p>
        </div>
      )}
    </div>
  );
}
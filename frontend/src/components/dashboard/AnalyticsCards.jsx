import { Activity, Leaf, TrendingUp, Brain } from "lucide-react";


export default function AnalyticsCards({ analytics }) {
  const cards = [
    {
      title: "Total Predictions",
      value: analytics?.total_predictions ?? 0,
      icon: Activity,
    },
    {
      title: "Average Confidence",
      value: `${analytics?.average_confidence ?? 0}%`,
      icon: TrendingUp,
    },
    {
      title: "Most Common Disease",
      value: analytics?.most_common_disease ?? "N/A",
      icon: Leaf,
    },
    {
      title: "Latest Prediction",
      value: analytics?.latest_prediction ?? "N/A",
      icon: Brain,
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <card.icon className="h-6 w-6 text-primary-600" />
          </div>

          <p className="mt-3 text-sm text-gray-500">
            {card.title}
          </p>

          <h3 className="mt-1 text-lg font-bold text-gray-800">
            {card.value}
          </h3>
        </div>
      ))}
    </div>
  );
}
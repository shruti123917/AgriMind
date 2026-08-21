import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import FarmerProfile from './pages/FarmerProfile'
import CropRecommendation from './pages/CropRecommendation'
import CropCalendar from './pages/CropCalendar'
import RiskAnalysis from './pages/RiskAnalysis'
import WhatIfSimulator from './pages/WhatIfSimulator'
import AIAssistant from './pages/AIAssistant'
import YieldPrediction from './pages/YieldPrediction'
import DiseaseDetection from "./pages/DiseaseDetection";
import PredictionHistory from "./pages/PredictionHistory";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<FarmerProfile />} />
          <Route path="recommendation" element={<CropRecommendation />} />
          <Route path="calendar" element={<CropCalendar />} />
          <Route path="disease" element={<DiseaseDetection />} />
          <Route path="risk" element={<RiskAnalysis />} />
          <Route path="simulator" element={<WhatIfSimulator />} />
          <Route path="assistant" element={<AIAssistant />} />
          <Route path="/yield-prediction" element={<YieldPrediction />}/>
          <Route path="/disease-detection" element={<DiseaseDetection />}/>
          <Route path="/history" element={<PredictionHistory />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

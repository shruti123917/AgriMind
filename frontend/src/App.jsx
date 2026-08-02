import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import FarmerProfile from './pages/FarmerProfile'
import CropRecommendation from './pages/CropRecommendation'
import CropCalendar from './pages/CropCalendar'
import DiseaseDetection from './pages/DiseaseDetection'
import RiskAnalysis from './pages/RiskAnalysis'
import WhatIfSimulator from './pages/WhatIfSimulator'
import AIAssistant from './pages/AIAssistant'

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
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

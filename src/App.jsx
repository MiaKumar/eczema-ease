import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { hasCompletedOnboarding } from './data/storage'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import HomeScreen from './pages/HomeScreen'
import TriggerLogging from './pages/TriggerLogging'
import HistoryView from './pages/HistoryView'
import Insights from './pages/Insights'
import PhotoDocumentation from './pages/PhotoDocumentation'
import Settings from './pages/Settings'

export default function App() {
  const [showMainApp, setShowMainApp] = useState(hasCompletedOnboarding)

  if (!showMainApp) {
    return <Onboarding onComplete={() => setShowMainApp(true)} />
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomeScreen />} />
        <Route path="triggers" element={<TriggerLogging />} />
        <Route path="history" element={<HistoryView />} />
        <Route path="insights" element={<Insights />} />
        <Route path="photos" element={<PhotoDocumentation />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  )
}

import { Routes, Route, Navigate } from 'react-router-dom'
import { hasCompletedSetup } from './data/setupStorage'
import Layout from './components/Layout'
import Onboarding from './pages/Onboarding'
import HomeScreen from './pages/HomeScreen'
import TriggerLogging from './pages/TriggerLogging'
import HistoryView from './pages/HistoryView'
import Insights from './pages/Insights'
import PhotoDocumentation from './pages/PhotoDocumentation'
import Settings from './pages/Settings'

function SetupGate({ children }) {
  if (!hasCompletedSetup()) {
    return <Onboarding />
  }
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/onboarding" element={<Onboarding />} />
      <Route path="/" element={<SetupGate><Layout /></SetupGate>}>
        <Route index element={<HomeScreen />} />
        <Route path="triggers" element={<TriggerLogging />} />
        <Route path="history" element={<HistoryView />} />
        <Route path="insights" element={<Insights />} />
        <Route path="photos" element={<PhotoDocumentation />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

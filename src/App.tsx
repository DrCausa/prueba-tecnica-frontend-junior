import { Route, Routes } from "react-router"
import CollaboratorList from "./pages/CollaboratorList"
import CollaboratorRegister from "./pages/CollaboratorRegister"
import CollaboratorDetail from "./pages/CollaboratorDetail"

function App() {

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Routes>
        <Route path="/" element={<CollaboratorList />} />
        <Route path="/registro" element={<CollaboratorRegister />} />
        <Route path="/colaboradores/:id" element={<CollaboratorDetail />} />
      </Routes>
    </div>
  )
}

export default App

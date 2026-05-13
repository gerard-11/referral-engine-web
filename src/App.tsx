import './App.css'
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./features/auth/pages/LoginPage.tsx";
import {RegisterPage} from "./features/auth/pages/RegisterPage.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {ProfilePage} from "./profile/ProfilePage.tsx";
import {ProtectedRoute} from "./shared/components/ProtectedRoute.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {AgentProfilePage} from "./pages/AgentProfilePage.tsx";
import {AdminDashboard} from "./features/admin/pages/AdminDashboard.tsx";
import {AgentDetailPage} from "./features/admin/pages/AgentDetailPage.tsx";
import {ClientLeadsPage} from "./features/admin/pages/ClientLeadsPage.tsx";


function App() {

  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
            <Route element={<MainLayout/>}>

                <Route path="/agent/:agentCode" element={<AgentProfilePage />} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage/>} />
                    <Route path="/admin" element={<AdminDashboard/>} />
                    <Route path="/admin/agents/:agentId" element={<AgentDetailPage/>} />
                    <Route path="/admin/agents/:agentId/clients/:clientId/leads/:clientName" element={<ClientLeadsPage/>} />
                </Route>

                 <Route path="/login" element={<LoginPage/>} />
                 <Route path="/register" element={<RegisterPage/>} />
            </Route>
    </Routes>
  )
}

export default App

import './App.css'
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "./features/auth/pages/LoginPage.tsx";
import {RegisterPage} from "./features/auth/pages/RegisterPage.tsx";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {ProfilePage} from "./profile/ProfilePage.tsx";
import {ProtectedRoute} from "./shared/components/ProtectedRoute.tsx";


function App() {

  return (
    <Routes>
            <Route element={<MainLayout/>}>
                <Route path="/" element={<h1>Home</h1>} />
                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<ProfilePage/>} />
                </Route>
            </Route>
                 <Route path="/login" element={<LoginPage/>} />
                 <Route path="/register" element={<RegisterPage/>} />
    </Routes>
  )
}

export default App

import { Navbar } from "../shared/components/Navbar";
import { Outlet } from "react-router-dom";

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="p-3">
                <Outlet />
            </main>
        </>
    );
};
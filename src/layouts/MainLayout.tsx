import { Navbar } from "../shared/components/Navbar";
import { Outlet } from "react-router-dom";


export const MainLayout = () => {
    return (
        <div className="flex flex-col min-height-screen">
            <Navbar />
            <main className="p-3 flex-grow">
                <Outlet />
            </main>

        </div>
    );
};
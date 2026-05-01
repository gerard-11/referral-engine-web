import { Navbar } from "../shared/components/Navbar";
import { Outlet } from "react-router-dom";
import {Footer} from "../shared/components/Footer.tsx";

export const MainLayout = () => {
    return (
        <div className="flex flex-col min-height-screen">
            <Navbar />
            <main className="p-3 flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
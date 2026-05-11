import { Link } from "react-router-dom";
import {useAuthStore} from "../../features/auth/store/auth.store.ts";

const capitalizeFullName = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const Navbar = () => {
    const { user, logout } = useAuthStore();

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-slate-800 to-blue-950 text-white px-6 py-4 flex justify-between items-center shadow-lg border-b-2 border-amber-600">
            <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold">S</div>
                <h1 className="text-2xl font-serif font-bold tracking-wide">SecureReferral</h1>
            </Link>

            <ul className="flex gap-8 items-center">
                {!user && (
                    <>
                        <li>
                            <Link to="/" className="text-gray-200 hover:text-amber-400 transition-colors font-medium text-sm uppercase tracking-wide">
                                Inicio
                            </Link>
                        </li>
                        <li>
                            <Link to="/register" className="text-gray-200 hover:text-amber-400 transition-colors font-medium text-sm uppercase tracking-wide">
                                Registrarse
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-md font-semibold text-sm transition-colors shadow-md">
                                Iniciar Sesión
                            </Link>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-lg border border-white/20">
                            <span className="text-amber-400">●</span>
                            <span className="font-semibold">{capitalizeFullName(user.name)}</span>
                        </li>
                        <li>
                            <button
                                onClick={logout}
                                className="bg-red-700 hover:bg-red-800 text-white px-6 py-2 rounded-md font-semibold text-sm transition-colors shadow-md"
                            >
                                Salir
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
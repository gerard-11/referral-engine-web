import { Link } from "react-router-dom";
import { useState } from "react";
import {useAuthStore} from "../../features/auth/store/auth.store.ts";

const capitalizeFullName = (name: string): string => {
    return name
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
};

export const Navbar = () => {
    const { user, logout } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="bg-gradient-to-r from-blue-900 via-slate-800 to-blue-950 text-white px-4 md:px-6 py-4 shadow-lg border-b-2 border-amber-600">
            <div className="flex justify-between items-center">
                {/* Logo y nombre */}
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center font-bold text-sm">S</div>
                    <h1 className="text-lg md:text-2xl font-serif font-bold tracking-wide">SecureReferral</h1>
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8 items-center">
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
                                <span className="text-green-400 text-2xl">●</span>
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

                {/* Mobile Menu Button */}
                {user && (
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden flex flex-col gap-1.5 p-2"
                    >
                        <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-white transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {user && isMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-3">
                    <div className="flex items-center gap-2 px-4 py-3 bg-white/10 rounded-lg border border-white/20">
                        <span className="text-green-400 text-xl">●</span>
                        <span className="font-semibold text-sm">{capitalizeFullName(user.name)}</span>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                        }}
                        className="w-full bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-md font-semibold text-sm transition-colors shadow-md"
                    >
                        Salir
                    </button>
                </div>
            )}
        </nav>
    );
};
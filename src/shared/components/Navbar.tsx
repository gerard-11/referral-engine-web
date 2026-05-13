import { Link } from "react-router-dom";
import { useState } from "react";
import {useAuthStore} from "../../features/auth/store/auth.store.ts";
import logo from "/referix_logo.svg";

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
        <nav className="bg-blue-900 text-white px-4 md:px-6 py-4 shadow-md border-b border-slate-700">
            <div className="flex justify-center items-center md:justify-between">
                <Link to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
                    <img src={logo} alt="Referix" className="w-15 h-12 md:w-18 md:h-14" />
                    <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wide">Referix</h1>
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
                                <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-semibold text-sm transition-colors">
                                    Iniciar Sesión
                                </Link>
                            </li>
                        </>
                    )}
                    {user && (
                        <>
                            <li className="flex items-center gap-2 px-4 py-2 bg-blue-50/10 rounded-lg border border-white/20">
                                <span className="text-green-400 text-2xl">●</span>
                                <span className="font-semibold">{capitalizeFullName(user.name)}</span>
                            </li>
                            <li>
                                <button
                                    onClick={logout}
                                    className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded font-semibold text-sm transition-colors"
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
                        <div className={`w-6 h-0.5 bg-blue-50 transition-all ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-blue-50 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                        <div className={`w-6 h-0.5 bg-blue-50 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></div>
                    </button>
                )}
            </div>

            {/* Mobile Menu */}
            {user && isMenuOpen && (
                <div className="md:hidden mt-4 pt-4 border-t border-white/20 space-y-3">
                    <div className="flex items-center gap-2 px-4 py-3 bg-blue-50/10 rounded-lg border border-white/20">
                        <span className="text-green-400 text-xl">●</span>
                        <span className="font-semibold text-sm">{capitalizeFullName(user.name)}</span>
                    </div>
                    <button
                        onClick={() => {
                            logout();
                            setIsMenuOpen(false);
                        }}
                        className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold text-sm transition-colors"
                    >
                        Salir
                    </button>
                </div>
            )}
        </nav>
    );
};
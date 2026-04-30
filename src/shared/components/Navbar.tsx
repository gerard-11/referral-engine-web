import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-white px-6 py-1 flex justify-between items-center">
            <h1 className="text-xl font-bold">MyApp</h1>

            <ul className="flex gap-6">
                <li>
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                </li>

                <li>
                    <Link to="/profile" className="hover:text-gray-300">
                        Perfil
                    </Link>
                </li>

                <li>
                    <Link to="/register" className="hover:text-gray-300">
                        Registro
                    </Link>
                </li>

                <li>
                    <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                        Log In
                    </Link>
                </li>
            </ul>
        </nav>
    );
};
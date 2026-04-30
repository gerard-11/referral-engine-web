import { Link } from "react-router-dom";
import {useAuthStore} from "../../features/auth/store/auth.store.ts";

export const Navbar = () => {
    const { user,logout } = useAuthStore();

    console.log(user);
    return (
        <nav className="bg-gray-900 text-white px-6 py-1 flex justify-between items-center">
            <h1 className="text-xl font-bold">MyApp</h1>

            <ul className="flex gap-6">
                <li>
                    <Link to="/" className="hover:text-gray-300">
                        Home
                    </Link>
                </li>
                {user && (
                    <li>
                        <Link to="/profile" className="hover:text-gray-300">
                            Perfil
                        </Link>
                    </li>
                )}
                {!user && (
                    <>
                        <li>
                            <Link to="/register" className="hover:text-gray-300">
                                register
                            </Link>
                        </li>

                        <li>
                            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
                                login
                            </Link>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className="text-gray-300">
                            👤 {user.name}
                        </li>

                        <li>
                            <button
                                onClick={logout}
                                className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                            >
                                Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};
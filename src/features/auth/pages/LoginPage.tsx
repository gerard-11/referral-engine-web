import { useState } from 'react';
import { useAuthStore } from '../store/auth.store.ts';
import * as React from "react";
import {useNavigate} from "react-router-dom";

export const LoginPage = () => {
    const navigate=useNavigate();
    const { login, isLoading, error } = useAuthStore();

    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()
        try{
            await login(form);
            navigate('/profile')
        }catch{
            setForm({
                ...form,
                password:'',
            })
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className=" p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Inicio de Sesión
                </h2>

                <div className="mb-4">
                    <label className="block mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    {isLoading ? 'Cargando...' : 'Login'}
                </button>
            </form>
        </div>
    );
};
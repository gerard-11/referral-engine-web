import { useState } from 'react';
import { useAuthStore } from '../store/auth.store.ts';
import * as React from "react";
import {useNavigate} from "react-router-dom";

export const RegisterPage = () => {
    const navigate=useNavigate();
    const { register, isLoading, error } = useAuthStore();

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        referralCode: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };
    
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
            await register(form);
            navigate('/profile');
    };
    return (
        <div className="min-h-screen flex items-center justify-center ">
            <form
                onSubmit={handleSubmit}
                className="p-8 rounded-2xl shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">
                    Crear Cuenta
                </h2>

                <div className="mb-4">
                    <label className="block mb-1">Nombre</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full border rounded-lg px-3 py-2"
                        required
                    />
                </div>

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

                    <div className="mb-4">
                        <label className=" mb-1 ">Codigo de Referido</label>
                        <input
                            type="referralCode"
                            name="referralCode"
                            value={form.referralCode}
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
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
                >
                    {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
};
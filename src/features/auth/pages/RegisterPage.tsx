import { useState } from 'react';
import { useAuthStore } from '../store/auth.store.ts';
import * as React from "react";
import {useNavigate} from "react-router-dom";

type UserRole = 'CLIENT' | 'AGENT';

export const RegisterPage = () => {
    const navigate=useNavigate();
    const { register, isLoading, error } = useAuthStore();
    const [role, setRole] = useState<UserRole>('CLIENT');

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        referralCode: '',
        agentCodeInput: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        const payload = {
            ...form,
            role,
        };
        await register(payload);
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


                <div className="mb-6">
                    <label className="block mb-2 font-medium text-gray-700">Tipo de Cuenta</label>
                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => setRole('CLIENT')}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                role === 'CLIENT'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Cliente
                        </button>
                        <button
                            type="button"
                            onClick={() => setRole('AGENT')}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-colors ${
                                role === 'AGENT'
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            Agente
                        </button>
                    </div>
                </div>

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

                {role === 'CLIENT' && (
                    <div className="mb-4">
                        <label className="block mb-1">Código de Referido </label>
                        <input
                            type="text"
                            name="referralCode"
                            value={form.referralCode}
                            onChange={handleChange}
                            placeholder="Ingresa el código que te compartio tu agente"
                            className="w-full border rounded-lg px-3 py-2"
                        />
                    </div>
                )}

                {role === 'AGENT' && (
                    <div className="mb-4">
                        <label className="block mb-1 font-medium text-gray-700">Código de Agente</label>
                        <input
                            type="text"
                            name="agentCodeInput"
                            value={form.agentCodeInput}
                            onChange={handleChange}
                            placeholder="Ej: FRNHBNRR"
                            className="w-full border rounded-lg px-3 py-2 uppercase"
                            required
                        />
                        <p className="text-xs text-gray-500 mt-1">Solicita este código a tu administrador</p>
                    </div>
                )}

                {error && (
                    <p className="text-red-500 text-sm mb-4">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition disabled:bg-gray-400"
                >
                    {isLoading ? 'Creando cuenta...' : 'Registrarse'}
                </button>
            </form>
        </div>
    );
};
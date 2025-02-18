"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock } from 'react-icons/fa';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8000/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                router.push('/dashboard');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
            <div className="p-10 bg-[#11111a] rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
                    Welcome Back
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                            Email
                        </label>
                        <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-3">
                            <FaUser className="text-purple-400 mr-3" />
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-300 mb-2">
                            Password
                        </label>
                        <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-3">
                            <FaLock className="text-purple-400 mr-3" />
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                                required
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                    >
                        Sign In
                    </button>
                </form>
                <p className="text-gray-400 text-sm mt-6 text-center">
                    Don't have an account? <a href="/register" className="text-purple-400 hover:underline">Sign Up</a>
                </p>
            </div>
        </div>
    );
}

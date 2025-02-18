"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaEnvelope, FaDiscord, FaGoogle, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            const response = await fetch(`http://localhost:8000/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                router.push('/login');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed. Please try again.');
        }
    };

    const handleOAuthLogin = (provider: string) => {
        window.location.href = `http://localhost:8000/api/auth/${provider}`;
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a12]">
            <div className="p-10 bg-[#11111a] rounded-2xl shadow-2xl w-full max-w-md">
                <h1 className="text-4xl font-extrabold text-white mb-8 text-center">
                    Create Account
                </h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-300 mb-2">
                            Email
                        </label>
                        <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-3">
                            <FaEnvelope className="text-purple-400 mr-3" />
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
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="text-purple-400 ml-3"
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-300 mb-2">
                            Confirm Password
                        </label>
                        <div className="flex items-center bg-[#1a1a2e] rounded-lg px-4 py-3">
                            <FaLock className="text-purple-400 mr-3" />
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="flex-1 bg-transparent outline-none text-white placeholder-gray-500"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="text-purple-400 ml-3"
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white py-3 rounded-xl text-lg font-semibold hover:from-purple-700 hover:to-blue-600 transition-all duration-300"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 space-y-4">
                    <button
                        onClick={() => handleOAuthLogin('discord')}
                        className="w-full flex items-center justify-center bg-[#7289DA] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#5b6eae] transition-all duration-300"
                    >
                        <FaDiscord className="mr-3" /> Sign Up with Discord
                    </button>
                    <button
                        onClick={() => handleOAuthLogin('google')}
                        className="w-full flex items-center justify-center bg-[#DB4437] text-white py-3 rounded-xl text-lg font-semibold hover:bg-[#c23321] transition-all duration-300"
                    >
                        <FaGoogle className="mr-3" /> Sign Up with Google
                    </button>
                </div>
                <p className="text-gray-400 text-sm mt-6 text-center">
                    Already have an account? <a href="/login" className="text-purple-400 hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
}

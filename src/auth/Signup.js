import { useState } from 'react';
import logo from '../brain-bridge-logo.png';
import google from '../google.png';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "@heroui/button";

export default function Signup() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function signup(event) {
        event.preventDefault();
        setError('');

        if (!first_name || !last_name || !email || !password || !confirmPassword) {
            setError('All fields are required.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        let item = { first_name, last_name, email, password };

        try {
            setIsLoading(true)
            let response = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                },
                body: JSON.stringify(item),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                setError(errorResponse.message || 'Failed to register.');
                return;
            }

            let result = await response.json();
            localStorage.setItem('user-info', JSON.stringify(result));
            navigate('/signin');
        } catch (error) {
            setIsLoading(false);
            console.error("Error response:", error.response?.data || error.message);
            alert("Failed to add assessment. Please try again.");
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="App">
            <div className="register-page content-center min:h-screen h-max py-9 w-full bg-gradient-to-b">
                <div className='container mx-auto max-w-4xl rounded-2xl overflow-hidden bg-white lg:pt-6 lg:pb-10 lg:px-4 p-8 shadow-lg' style={{ border: "1px solid rgb(222, 226, 230)" }}>
                    <div className="flex content-center">
                        <div>
                            <Link to="/">
                                <img src={logo} alt="logo" className='w-52' />
                            </Link>
                        </div>
                        <div className="text-start py-8 px-12">
                            <h1 className="text-[32px]">Sign Up</h1>
                            <p>
                                Already have an account?{' '}
                                <Link to="/signin" className="underline underline-offset-2">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </div>
                    <form className="px-16" onSubmit={signup} method='POST' >
                        {error && <p className="text-red-500">{error}</p>}
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
                            <div className="col-span-3">
                                <label htmlFor="first-name" className="block font-medium text-[#666666] text-start">
                                    First Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="last-name" className="block font-medium text-[#666666] text-start">
                                    Last Name
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block font-medium text-[#666666] text-start">
                                Email Address
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
                            <div className="col-span-3">
                                <label htmlFor="password" className="block font-medium text-[#666666] text-start">
                                    Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="confirm-password" className="block font-medium text-[#666666] text-start">
                                    Confirm Password
                                    <span className="text-red-500">*</span>
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-start text-[#666666] pt-2">
                            <span className="text-red-500">*</span>
                            Use 8 or more characters with a mix of letters, numbers & symbols.
                        </p>
                        <div className="flex justify-end mt-6">
                            {/* <button type="submit" className="bg-cyan-500 shadow-lg shadow-cyan-500/25 hover:bg-cyan-500/75 py-2 w-full rounded-lg text-white font-bold">
                                Create an account
                            </button> */}
                            <Button type='submit' isLoading={isLoading} color="primary" className='w-full'>
                                Sign Up
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

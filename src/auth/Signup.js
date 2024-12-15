import { useState } from 'react';
import logo from '../brain-bridge-logo.png';
import google from '../google.png';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

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
            navigate('/login');
        } catch (error) {
            console.error("Error response:", error.response?.data || error.message);
            alert("Failed to add assessment. Please try again.");
        }
    }

    return (
        <div className="App">
            <div className="register-page content-center min:h-screen h-max py-9 w-full bg-gradient-to-b from-[#FFD60A] to-[#FFA62B]">
                <div className="container mx-auto max-w-4xl rounded overflow-hidden shadow-lg bg-white p-8 lg:pt-6 lg:pb-10 lg:px-4">
                    <div className="flex content-center">
                        <div>
                            <Link to="/">
                                <img src={logo} alt="logo" />
                            </Link>
                        </div>
                        <div className="text-start py-8 px-12">
                            <h1 className="text-[32px]">Create an account</h1>
                            <p>
                                Already have an account?{' '}
                                <Link to="/login" className="underline underline-offset-2">
                                    Log in
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
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={first_name}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="last-name" className="block font-medium text-[#666666] text-start">
                                    Last Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={last_name}
                                        onChange={(e) => setLastName(e.target.value)}
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <label htmlFor="email" className="block font-medium text-[#666666] text-start">
                                Email Address
                            </label>
                            <div className="mt-2">
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
                            <div className="col-span-3">
                                <label htmlFor="password" className="block font-medium text-[#666666] text-start">
                                    Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                            <div className="col-span-3">
                                <label htmlFor="confirm-password" className="block font-medium text-[#666666] text-start">
                                    Confirm Password
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        type="password"
                                        name="confirm-password"
                                        id="confirm-password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>
                        </div>
                        <p className="text-start text-[#666666]">
                            Use 8 or more characters with a mix of letters, numbers & symbols.
                        </p>
                        <div className="flex justify-end mt-6">
                            <button type="submit" className="bg-[#48CAE4] py-3 px-7 rounded-3xl">
                                Create an account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

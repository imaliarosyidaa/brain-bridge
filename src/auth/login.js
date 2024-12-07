import { useState } from 'react';
import logo from '../brain-bridge-logo.png';
import google from '../google.png';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login(event) {
        event.preventDefault();
        console.warn(email, password);

        let item = { email, password };

        try {
            let response = await fetch("https://2dae-114-79-5-79.ngrok-free.app/api/auth/login", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "*/*"
                },
                body: JSON.stringify(item)
            });

            if (!response.ok) {
                throw new Error(`Login failed with status ${response.status}`);
            }

            let result = await response.json();
            localStorage.setItem("user-info", JSON.stringify(result));
            navigate("/app"); // Mengarahkan ke halaman berikutnya
        } catch (error) {


            console.error("Login error:", error);
            alert("Login failed, please check your credentials.");
        }
    }

    return (
        <div className="App">
            <div className='register-page content-center min:h-screen min:h-max p-8 lg:py-9 w-full bg-gradient-to-b from-[#FFD60A] to-[#FFA62B]'>
                <div className='container mx-auto max-w-4xl rounded overflow-hidden shadow-lg bg-white lg:pt-6 lg:pb-10 lg:px-4 p-8'>
                    <div className='flex content-center'>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className='text-start py-8 px-12'>
                            <h1 className="text-[32px]">Sign In</h1>
                            <p>Don't have an account? <a href="/signup" className="underline underline-offset-2">Sign up</a></p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 divide-x'>
                        <div className="items-center flex flex-col">
                            <h2 className="text-center pb-1 text-xl font-medium mb-5">Sign in</h2>
                            <button className="border-solid border-[1px] border-gray-700 rounded-full block-inline flex justify-center w-fit px-7 py-3">
                                <img src={google} className="pe-4" alt="google" />
                                Continue with Google
                            </button>
                        </div>
                        <form className="px-12" onSubmit={login}>
                            <h2 className="text-center pb-6 text-xl font-medium">Sign in with email</h2>
                            <div className='col-span-1'>
                                <label htmlFor="email" className='block font-medium text-gray-900 text-start'>Email address</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='col-span-1 mt-2'>
                                <label htmlFor="password" className='block font-medium text-gray-900 text-start'>Password</label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button type='submit' className="bg-[#48CAE4] py-3 px-7 rounded-3xl">Log in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

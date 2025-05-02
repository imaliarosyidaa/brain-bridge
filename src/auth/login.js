import { useEffect, useState, useRef } from 'react';
import logo from '../brain-bridge-logo.png';
import google from '../google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import axios from '../api/axios';
const LOGIN_URL = '/api/auth/login';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errMsg, setErrMsg] = useState('');
    const userRef = useRef();
    const errRef = useRef();

    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const defaultPath = "/";
    const from = location.state?.from?.pathname || defaultPath;

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json', "Accept": "*/*" },
                    withCredentials: true
                }
            );
            const id = response?.data?.id;
            const role = response?.data?.role;
            const nama = response?.data?.name;
            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            setAuth({ id, email, nama, password, role, accessToken, refreshToken });
            setEmail('');
            setPassword('');
            navigate(from, {
                replace: true, state: {
                    login: true
                }
            })
        } catch (error) {
            console.error("Login error:", error);
            alert("Login failed, please check your credentials.");
        }
        //window.location.reload();
    }

    return (
        <div className="App">
            <div className='register-page content-center h-screen max:h-max p-8 lg:py-9 w-full bg-gradient-to-b bg-slate-50'>
                <div className='container mx-auto max-w-xl rounded-2xl overflow-hidden bg-white lg:pt-6 lg:pb-10 lg:px-4 p-8 shadow-lg' style={{ border: "1px solid rgb(222, 226, 230)" }}>
                    <div className='flex content-center'>
                        <div>
                            <Link to="/">
                                <img src={logo} alt="logo" className='w-52' />
                            </Link>
                        </div>
                        <div className='text-start py-8 px-12'>
                            <h1 className="text-[32px]">Login</h1>
                            <p>Don't have an account? <a href="/signup" className="underline underline-offset-2">Sign up</a></p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 gap-4 divide-x'>
                        {/* <div className="items-center flex flex-col">
                            <h2 className="text-center pb-1 text-xl font-medium mb-5">Login</h2>
                            <button className="border-solid border-[1px] border-gray-700 rounded-full block-inline flex justify-center w-fit px-7 py-3">
                                <img src={google} className="pe-4" alt="google" />
                                Continue with Google
                            </button>
                        </div> */}
                        <form className="px-12" onSubmit={handleSubmit} method='POST'>
                            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                            <h2 className="text-center pb-6 text-xl font-medium">Login with email</h2>
                            <div className='col-span-1'>
                                <label htmlFor="email" className="block font-medium text-[#666666] text-start">Email address</label>
                                <div className="mt-2">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        ref={userRef}
                                        autoComplete="off"
                                        required
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className='col-span-1 mt-2'>
                                <label htmlFor="password" className="block font-medium text-[#666666] text-start">Password</label>
                                <div className="mt-2">
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        value={password}
                                        ref={userRef}
                                        autoComplete="off"
                                        required
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex justify-center mt-6">
                                <button type='submit' className="bg-cyan-500 shadow-lg shadow-cyan-500/25 hover:bg-cyan-500/75 py-2 w-full rounded-lg text-white font-bold">Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

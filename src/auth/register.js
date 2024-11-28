import './App.css';
import logo from './brain-bridge-logo.png';
import google from './google.png';
import people from './images/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min.png';

export default function App() {
    return (
        <div className="App">
            <div className='register-page content-center h-screen min:h-max py-9 w-full bg-gradient-to-b from-[#FFD60A] to-[#FFA62B]'>
                <div className='container mx-auto max-w-4xl rounded overflow-hidden shadow-lg bg-white lg:pt-6 lg:pb-10 lg:px-4'>
                    <div className='flex content-center'>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className='text-start py-8 px-12'>
                            <h1 className="text-[32px]">Sign In</h1>
                            <p>Don't have an account? sign up</p>
                        </div>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 divide-x'>
                        <div className="items-center flex flex-col">
                            <h2 className="text-center pb-1 text-xl font-medium mb-5">Sign in</h2>
                            <button className="border-solid border-[1px] border-gray-700 rounded-full block-inline flex justify-center w-fit px-7 py-3"><img src={google} className="pe-4" alt="google" />Continue with Google</button>
                        </div>
                        <form className="px-16">
                            <h2 className="text-center pb-6 text-xl font-medium">Sign in with email</h2>
                            <div className='col-span-1'>
                                <label for="email" className='block font-medium text-gray-900 text-start'>Email address</label>
                                <div class="mt-2">
                                    <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
                                </div>
                            </div>
                            <div className='col-span-1 mt-2'>
                                <label for="password" className='block font-medium text-gray-900 text-start'>Password</label>
                                <div class="mt-2">
                                    <input type='text' name='last-name' id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
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
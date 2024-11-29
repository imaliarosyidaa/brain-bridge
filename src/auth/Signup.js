import logo from '../brain-bridge-logo.png';
import google from '../google.png'
import { Link } from 'react-router-dom'

export default function Signup() {
    return (
        <div className="App">
            <div className='register-page content-center min:h-screen h-max py-9 w-full bg-gradient-to-b from-[#FFD60A] to-[#FFA62B]'>
                <div className='container mx-auto max-w-4xl rounded overflow-hidden shadow-lg bg-white lg:pt-6 lg:pb-10 lg:px-4'>
                    <div className='flex content-center'>
                        <div>
                            <img src={logo} alt="logo" />
                        </div>
                        <div className='text-start py-8 px-12'>
                            <h1 className="text-[32px]">Create an account</h1>
                            <p>Already have an account? <Link to="/login" className='underline underline-offset-2' >Log in</Link> </p>
                        </div>
                    </div>
                    <form className="px-16">
                        <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 divide-x'>
                            <div className='col-span-3'>
                                <label for="first-name" className='block font-medium text-[#666666] text-start'>First Name</label>
                                <div class="mt-2">
                                    <input type="text" name="first-name" id="first-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
                                </div>
                            </div>
                            <div className='col-span-3'>
                                <label for="last-name" className='block font-medium text-[#666666] text-start'>Last Name</label>
                                <div class="mt-2">
                                    <input type='text' name='last-name' id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-4 divide-x'>
                            <div className='mt-2'>
                                <label for="email-address" className='block font-medium text-[#666666] text-start'>Email Address</label>
                                <div class="mt-2">
                                    <input type='text' name='email-address' id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
                                </div>
                            </div>
                        </div>
                        <div className='grid grid-cols-1 lg:grid-cols-6 gap-4 divide-x'>
                            <div className='col-span-3 mt-2'>
                                <label for="password" className='block font-medium text-[#666666] text-start'>Password</label>
                                <div class="mt-2">
                                    <input type='text' name='password' id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
                                </div>
                            </div>
                            <div className='col-span-3 mt-2'>
                                <label for="confirm-password" className='block font-medium text-[#666666] text-start'>Confirm your password</label>
                                <div class="mt-2">
                                    <input type='text' name='confirm-password' id="last-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></input>
                                </div>
                            </div>
                        </div>
                        <p className='text-start text-[#666666]'>Use 8 or more characters with a mix of letters, numbers & symbols</p>
                        <div className="flex justify-end mt-6">
                            <Link to="/login" ><button type='submit' className="bg-[#48CAE4] py-3 px-7 rounded-3xl">Create an account</button></Link>
                        </div>
                    </form>
                    <div className="items-start flex flex-col px-16">
                        <h2 className="text-center pb-1 text-xl text-[#666666] font-medium mb-5">Or continue with</h2>
                        <button className="border-solid border-[1px] border-gray-700 rounded-full block-inline flex justify-center w-fit px-7 py-3"><img src={google} className="pe-4" alt="google" />Google</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
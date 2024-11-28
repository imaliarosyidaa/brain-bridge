import './App.css';
import logo from './brain-bridge-logo.png';
import google from './google.png';
import people from './images/lovely-teenage-girl-with-curly-hair-posing-yellow-tshirt-min.png';

export default function App() {
  return (
    <div className="App">
      <nav class="bg-transparent">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span class="absolute -inset-0.5"></span>
                <span class="sr-only">Open main menu</span>
                <svg class="block size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                <svg class="hidden size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex shrink-0 items-center">
                <img class="h-14 w-auto" src={logo} alt="Your Company"></img>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <div class="hidden sm:ml-6 sm:block">
                <div class="flex space-x-4">
                  <a href="#" class="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page">Home</a>
                  <a href="#" class="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-700 hover:text-white">Topic</a>
                  <a href="#" class="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-700 hover:text-white">Feature</a>
                  <a href="#" class="rounded-md px-3 py-2 text-sm font-bold text-[#1E1E1E] hover:bg-gray-700 hover:text-white">About Us</a>
                </div>
              </div>
              <button type="button" class="relative rounded-sm ml-6 bg-[#FFA62B] text-white font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-2 py-1">
                Login
              </button>
              <div class="relative ml-3">
                <div>
                  <button type="button" class="relative flex rounded-sm bg-[#FFD60A] text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-2 py-1" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pb-3 pt-2">
            <a href="#" class="block rounded-md bg-gray-900 px-3 py-2 text-base font-medium text-white" aria-current="page">Home</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Topic</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Feature</a>
            <a href="#" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">About Us</a>
          </div>
        </div>
      </nav>
      <div className="lg:h-screen h-fit bg-[#48CAE4] rounded-b-[20%] container mx-auto">
        <div className="grid lg:grid-cols-2 grid-cols-1">
          <div className="pt-11">
            <h1 className="text-[#FFD60A] text-5xl text-start font-bold pb-4">BRAIN BRIDGE :</h1>
            <h2 className="text-[#343A40] text-5xl text-start font-bold pb-4">Connecting Minds,</h2>
            <h2 className="text-[#343A40] text-5xl text-start font-bold">Buildeng Furutes</h2>
            <p className="text-start mt-5">Your ultimate gateway to accessible and inclusive learning—bridging gaps, empowering communities, and transforming education for everyone, everywhere.</p>
            <div>
              <button type="button" className="relative justify-start flex ml-6 bg-[#FFA62B] text-white font-bold hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 px-5 py-3 rounded-full mt-4">Get started</button>
            </div>
          </div>
          <div className="flex justify-center">
            <img className="w-64 lg:w-max" src={people} alt="people"></img>
          </div>
        </div>
        <div>
          <div className="bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute left-24 -bottom-24">Study Planner</div>
          <div className="bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute right-24 -bottom-36">
            <div></div>
            <p>Interactive Class</p>
            <p>Today at 12.00 PM</p>
            <div className="text-white rounded-full px-2 py-1 bg-[#FFA62B] justify-center">Join Now</div>
          </div>
          <div className="bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute left-16 -bottom-52">
            <p>E-Book Library</p>
            <p>Baca dan Unduk Buku Anda</p>
          </div>
          <div className="bg-neutral-100/80 w-fit text-start rounded-xl backdrop-blur-xl absolute right-16 -bottom-72">
            <p>Video</p>
            <p>Choice Resolution & Unduh</p>
          </div>
        </div>
      </div>
    </div>
  );
}

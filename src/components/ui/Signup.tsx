import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const RegisterPage = () => {
  return (
    <div className="flex min-h-screen flex-col font-[Poppins] lg:flex-row">
      {/* Left Section */}
      <div
        className="left-section relative flex min-h-[40vh] flex-1 items-center justify-center p-8 text-white lg:min-h-screen"
        style={{
          backgroundImage: `url('https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fimages.says.com%2Fuploads%2Fstory%2Fcover_image%2F1182%2Fd0ed.jpeg&f=1&nofb=1&ipt=455941ce31c73f43cf4ddafcbf8d40590dd8e94e743a83d33c32acbf6dc3cbf3')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="left-section-content z-20 max-w-lg text-center lg:text-left">
          <div className="mb-6 flex items-center justify-center lg:mb-8 lg:justify-start">
            <Image
              src="/logo.png"
              alt="SOPHALA Logo"
              width={200}
              height={80}
              className="h-16 object-contain sm:h-20 lg:h-24"
            />
          </div>
          <h1 className="text-4xl leading-tight font-extrabold tracking-wide lg:text-5xl">
            Meet <span className="text-purple-400">People</span> Who Have Same{' '}
            <span className="text-red-500">Interest</span> As You or sum shit
          </h1>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex flex-1 items-center justify-center bg-black p-8">
        <div className="form-container w-full max-w-md rounded-lg border border-red-500 bg-black p-6 shadow-xl sm:p-8">
          <h2 className="mb-6 text-center text-3xl font-bold text-red-500 sm:mb-8 sm:text-4xl">
            Register
          </h2>

          <form className="space-y-5 sm:space-y-6">
            <div>
              <input
                type="text"
                id="username"
                className="w-full rounded-md border border-gray-300 bg-white p-4 text-black placeholder-gray-500 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="username"
              />
            </div>
            <div>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border border-gray-300 bg-white p-4 text-black placeholder-gray-500 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="email"
              />
            </div>
            <div>
              <input
                type="password"
                id="password"
                className="w-full rounded-md border border-gray-300 bg-white p-4 text-black placeholder-gray-500 transition duration-200 focus:border-transparent focus:ring-2 focus:ring-red-500 focus:outline-none"
                placeholder="password"
              />
            </div>
            <button
              type="submit"
              className="w-full transform rounded-md bg-red-500 p-4 text-lg font-semibold text-white transition duration-300 hover:scale-105 hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black focus:outline-none sm:text-xl"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 text-center sm:mt-8">
            <Link
              href="/login"
              className="text-base text-red-500 transition duration-300 hover:underline sm:text-lg"
            >
              Already Have An Account? Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

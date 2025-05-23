import React from 'react';
import Link from 'next/link';

const Signin = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-black px-4 font-[Poppins]">
      <div className="grid w-full max-w-4xl grid-cols-1 items-center gap-6 p-4 text-white md:grid-cols-2">
        {/* Left Section: Login Form */}
        <div className="space-y-6 px-4">
          <h1 className="text-3xl font-bold text-red-500">Login</h1>
          <p className="text-gray-400">Hey, welcome back! 👋</p>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">Email address</label>
              <div className="relative mt-1">
                <input
                  type="email"
                  placeholder="Email address"
                  className="w-full rounded-lg border border-red-600 bg-black px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">Password</label>
              <div className="relative mt-1">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-lg border border-red-600 bg-black px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-red-600 py-2 font-medium text-white transition duration-200 hover:bg-red-700"
            >
              Login
            </button>

            <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox border-red-600 bg-black text-red-600"
                  defaultChecked
                />
                Stay logged in
              </label>
              <a href="#" className="text-gray-300 hover:underline">
                Forgot password?
              </a>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-400">
            Don’t have an account yet?{' '}
            <Link href="/" className="font-medium text-red-500 hover:underline">
              SignUp
            </Link>
          </p>
        </div>

        {/* Right Section: Promo Box */}
        <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-red-600 bg-[#0e0e0e] px-6 py-8 text-center shadow-lg">
          <h2 className="text-lg leading-snug font-semibold text-red-500">
            Receive a 30% <br />
            lifetime commission <br />
            for every new referral 💰
          </h2>
          <a href="#" className="font-medium text-red-400 hover:underline">
            Become an Affiliate &rsaquo;
          </a>

          {/* Emoji Icons */}
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-2xl">
            <span>📢</span>
            <span>👏</span>
            <span>🎁</span>
            <span>💪</span>
            <span>🎉</span>
            <span>🤘</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-sm text-gray-600">
        © Saphala Inc. •{' '}
        <a href="#" className="hover:underline">
          TOS
        </a>{' '}
        •{' '}
        <a href="#" className="hover:underline">
          Privacy
        </a>{' '}
        •{' '}
        <a href="#" className="hover:underline">
          Imprint
        </a>{' '}
        • <span className="ml-2">🇺🇸 English</span>
      </div>
    </div>
  );
};

export default Signin;

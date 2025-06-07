import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-indigo-950 px-4 pt-10 text-neutral-200 sm:px-0">
      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-1 gap-8 text-xs sm:grid-cols-3">
          <div className="flex flex-col gap-2 text-center text-neutral-400 sm:text-left">
            <Link href="" className="mx-auto sm:mx-0">
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </Link>
            <p>Look Engineering, Inc</p>
            <Link href="" className="duration-300 hover:text-white">
              support@look.tech
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-center text-neutral-400 sm:text-left">
            <p className="font-bold text-neutral-200">Discover More</p>
            <Link href="" className="duration-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="" className="duration-300 hover:text-white">
              Terms of Use
            </Link>
            <Link href="" className="duration-300 hover:text-white">
              PressKit
            </Link>
          </div>
          <div className="flex flex-col gap-2 text-center text-neutral-400 sm:text-left">
            <p className="font-bold text-neutral-200">Follow us</p>
            <Link href="" className="duration-300 hover:text-white">
              X (Twitter)
            </Link>
            <Link href="" className="duration-300 hover:text-white">
              TikTok
            </Link>
          </div>
        </div>
        <h1 className="font-cabinet text-center text-[4rem] font-black text-white/10 sm:text-[10rem] md:text-[13rem]">
          Saphala
        </h1>
      </div>
    </footer>
  );
}

import AuthButtons from '@/components/common/auth-buttons';
import FAQ from '@/components/common/faq';
import { faqItems } from '@/constants/home';
import { BatteryFullIcon, WifiIcon } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-2 sm:px-0">
      <div className="mt-32 flex flex-col items-center justify-center">
        <div className="relative w-full">
          <div className="mx-auto w-fit overflow-hidden rounded-[3rem] border-8 border-gray-100">
            <div className="grid grid-cols-3 px-8 py-3 text-sm font-medium">
              <p>9:41</p>
              <div className="h-6 rounded-full bg-neutral-900"></div>
              <div className="flex items-center justify-end gap-2">
                <WifiIcon className="size-4" />
                <BatteryFullIcon fill="#000" className="size-5" />
              </div>
            </div>
            <Image
              src="/home/screen.jpg"
              alt="Description"
              className="h-[30rem]"
              width={290}
              height={100}
            />
          </div>
          <Image
            src="/home/cloud_right.svg"
            alt=""
            className="absolute -bottom-12 left-1/4 w-[30rem] rotate-3"
            width={200}
            height={100}
          />
          <Image
            src="/home/cloud_left.svg"
            alt=""
            className="absolute right-1/4 -bottom-8 w-[30rem] -rotate-3"
            width={200}
            height={100}
          />
        </div>
      </div>

      <div className="mx-auto mt-8 w-fit space-y-8 text-center">
        <div className="font-cabinet space-y-8 text-center text-5xl font-black sm:text-8xl">
          <h1 className="">Your space</h1>
          <h1 className="text-blue-600">Your friends</h1>
        </div>
        <p>The best way to hang out on your phone.</p>
        <AuthButtons />
      </div>

      <div className="mx-auto mt-20 grid auto-rows-[10rem] grid-cols-1 gap-4 px-4 sm:grid-cols-6">
        <div className="rounded-3xl bg-yellow-200 sm:col-span-3"></div>
        <div className="rounded-3xl bg-blue-200 sm:col-span-3 sm:row-span-2"></div>
        <div className="rounded-3xl bg-pink-200 sm:col-span-3 sm:row-span-2"></div>
        <div className="rounded-3xl bg-green-200 sm:col-span-3"></div>
        <div className="h-[15rem] rounded-3xl bg-red-100 sm:col-span-6"></div>
      </div>

      <div className="mt-40 space-y-32">
        <div className="grid grid-cols-1 items-center gap-4 text-center sm:grid-cols-2 sm:text-left">
          <div className="mx-auto size-[20rem] rounded-3xl bg-green-500 sm:mx-0"></div>
          <div>
            <h1 className="font-cabinet mb-2 text-3xl font-black text-green-500">
              A new way to hangout
            </h1>
            <p className="text-sm text-neutral-500">
              Group chats? Kinda over it. Abode lets you chill with friends using shared widgets—we
              call &apos;em magnets—to keep things fun, fresh, and actually interesting.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 items-center gap-4 text-center sm:grid-cols-2 sm:text-left">
          <div>
            <h1 className="font-cabinet mb-2 text-3xl font-black text-yellow-500">
              Your Home Screen, Now With Friends
            </h1>
            <p className="text-sm text-neutral-500">
              Magnets aren&apos;t just an Abode thing—put &apos;em right on your home screen and
              stay looped in with your squad. One glance is all you need.
            </p>
          </div>
          <div className="mx-auto size-[20rem] rounded-3xl bg-yellow-500 sm:mx-0"></div>
        </div>

        <div className="grid grid-cols-1 items-center gap-4 text-center sm:grid-cols-2 sm:text-left">
          <div className="mx-auto size-[20rem] rounded-3xl bg-red-600 sm:mx-0"></div>
          <div>
            <h1 className="font-cabinet mb-2 text-3xl font-black text-red-600">
              Personalize your space
            </h1>
            <p className="text-sm text-neutral-500">
              Every friend group has its own vibe—your Abode should too. Customize magnets, express
              your personality, and create a space that feels totally you.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-40 w-fit">
        <div className="relative">
          <h1 className="font-cabinet px-10 py-28 text-5xl font-black text-neutral-800">
            Available Magnets
          </h1>
          <Image src="/home/cloud_right.svg" alt="" className="absolute -z-10" fill />
        </div>
      </div>

      <div className="my-40 grid grid-cols-1 gap-8 sm:grid-cols-2">
        <h1 className="font-cabinet text-5xl font-black text-neutral-800">
          Frequently asked questions
        </h1>
        <FAQ items={faqItems} />
      </div>
    </main>
  );
}

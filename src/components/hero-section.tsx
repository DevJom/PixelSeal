import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { HeroHeader } from "./header";
import { InfiniteSlider } from "@/components/ui/infinite-slider";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import { Logo } from "./logo";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section>
          <div className="pb-24 pt-12 md:pb-32 lg:pb-56 lg:pt-44">
            <div className="relative mx-auto flex max-w-6xl flex-col px-6 lg:block">
              <div className="mx-auto max-w-lg text-center lg:ml-0 lg:w-1/2 lg:text-left">
                <div className="flex justify-center lg:justify-start">
                  <Logo className="mb-4" />
                </div>

                <h1 className="max-w-2xl text-balance text-5xl font-medium md:text-6xl xl:text-7xl">
                  I will keep you invisible.
                </h1>
                <p className="mt-6 max-w-2xl text-pretty text-m">
                  Secure your sensitive data with military-grade encryption. Our
                  advanced algorithms ensure your information remains protected
                  and accessible only to you.
                </p>

                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row lg:justify-start">
                  <Button asChild size="lg" className="px-5 text-base">
                    <Link href="/encrypt">
                      <span className="text-nowrap">Start Encryption</span>
                    </Link>
                  </Button>
                  <Button
                    key={2}
                    asChild
                    size="lg"
                    variant="ghost"
                    className="px-5 text-base"
                  >
                    <Link href="/decrypt">
                      <span className="text-nowrap">Try Our Decryption</span>
                    </Link>
                  </Button>
                </div>
              </div>
              <Image
                className="-z-10 order-first ml-auto h-56 w-full object-cover invert sm:h-96 lg:absolute lg:inset-0 lg:-right-20 lg:-top-92 lg:order-last lg:h-max lg:w-2/3 lg:object-contain dark:mix-blend-lighten dark:invert-0"
                src="https://ik.imagekit.io/lrigu76hy/tailark/abstract-bg.jpg?updatedAt=1745733473768"
                alt="Abstract Object"
                height="4000"
                width="3000"
              />
            </div>
          </div>
        </section>
        <section className="bg-background pb-16 md:pb-32">
          <div className="group relative m-auto max-w-6xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <div className="md:max-w-44 md:border-r md:pr-6">
                <p className="text-end text-sm">Built this with</p>
              </div>
              <div className="relative py-6 md:w-[calc(100%-11rem)]">
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  <div className="flex">
                    <Image
                      className="mx-auto h-10 w-fit dark:invert"
                      src="https://cdn.worldvectorlogo.com/logos/nodejs-icon.svg"
                      alt="Node.js"
                      width={30}
                      height={30}
                    />
                  </div>

                  <div className="flex">
                    <Image
                      src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
                      alt="React"
                      width={30}
                      height={30}
                      className="mx-auto h-10 w-fit dark:invert"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
                      alt="Next.js"
                      width={40}
                      height={40}
                      className="mx-auto h-10 w-fit dark:invert"
                    />
                  </div>

                  <div className="flex">
                    <Image
                      src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
                      alt="TypeScript"
                      width={40}
                      height={40}
                      className="mx-auto h-10 w-fit dark:invert"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-10 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-10 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-10 w-fit dark:invert"
                      src="https://html.tailus.io/blocks/customers/openai.svg"
                      alt="OpenAI Logo"
                      height="24"
                      width="auto"
                    />
                  </div>
                </InfiniteSlider>

                <div className="bg-linear-to-r from-background absolute inset-y-0 left-0 w-20"></div>
                <div className="bg-linear-to-l from-background absolute inset-y-0 right-0 w-20"></div>
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

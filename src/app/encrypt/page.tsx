import { EncryptionPanel } from "@/components/encryption";
import { Logo } from "@/components/logo";
import React from "react";
import Link from "next/link";
import GridSmallBackgroundDemo from "@/components/ui/grid-small-background-demo";

export default function Page() {
  return (
    <>
      <GridSmallBackgroundDemo />
      <div className="absolute inset-0 min-h-screen w-full max-w-[700px] mx-auto flex flex-col items-center justify-center">
        <Link href="/">
          <Logo />
        </Link>

        <div className="text-4xl mb-8">Encryption Page</div>
        <EncryptionPanel />
      </div>
    </>
  );
}

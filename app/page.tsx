'use client'

import PersepolisFlowFieldLandingPage from "@/app/PersepolisFlowField/page";
import Search from '@/components/SearchButton/Search';
import { useEffect, useState } from "react";
import { Suspense } from "react";

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSearch(true), 11400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main>
      <PersepolisFlowFieldLandingPage />

      <div
        className={[
          "absolute bottom-45 left-1/2 -translate-x-1/2",
          "transition-opacity duration-700 ease-out",
          showSearch ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <Suspense fallback={null}>
          <Search 
          placeholder="Glad you could make it :)" 
          iconColor="white"
          className=" px-14
          py-5
          w-[30rem]
          text-[1.5rem]
          rounded-full
          border border-white/30
          text-white
          placeholder-white/70
          focus:outline-none" />
        </Suspense>
      </div>
    </main>
  );
}

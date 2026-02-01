'use client'

import PersepolisFlowFieldLandingPage from "@/app/PersepolisFlowField/page";
import Search from '@/components/SearchButton/Search';


// export default function Home() {
//   return (
//     <main>
//         <PersepolisFlowFieldLandingPage></PersepolisFlowFieldLandingPage>
//         <div className="absolute bottom-70 left-1/2 transform -translate-x-1/2">
//           <Search placeholder="Glad you could make it"
//           className="px-10 py-5.5 w-[40rem] text-[1.275rem] rounded-full bg-white/15 backdrop-blur-sm border border-white/20 text-white placeholder-white/70"
//           />
//          </div>
//     </main>
//   )
// }

import { useEffect, useState } from "react";

export default function Home() {
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSearch(true), 10500);
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
        <Search 
        placeholder="Glad you could make it" 
        iconColor="white"
        className=" px-14
        py-5
        w-[40rem]
        text-[1.5rem]
        rounded-full
        border border-white/30
        text-white
        placeholder-white/70
        focus:outline-none" />
      </div>
    </main>
  );
}

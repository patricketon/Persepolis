import PersepolisFlowFieldLandingPage from "@/PersepolisFlowField/page";
import Search from '@/ui/Search';



export default function Home() {
  return (
    <main>
        <PersepolisFlowFieldLandingPage></PersepolisFlowFieldLandingPage>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
          <Search placeholder="Search artist"
          className="px-6 py-3 w-96 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/70"
          />
         </div>
    </main>
  )
}
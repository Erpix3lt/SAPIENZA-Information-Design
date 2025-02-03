"use client";

import { IntroScene } from "@/components/intro-scene";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const router = useRouter()

  const handleObjectClick = () => {
    router.push("/viewer");
  };

  const handleObjectEnter = () => {
    setIsHovering(true);
  };

  const handleObjectLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className={`h-screen w-full flex flex-col justify-between`}>
       <div className="absolute top-2 left-2 z-10 flex flex-row gap-2 items-center">
        <Link className="border rounded-full px-1 text-xs text-white hover:opacity-80" href="/viewer">{"viewer >"}</Link>
        <p className="text-black rounded-full px-1 bg-white text-xs hover:bg-gradient-to-r hover:from-green-400 hover:to-pink-500 hover:text-white ">os-vis</p>
      </div>
      {isIntro && (
        <div
          onClick={() => {
            setIsIntro(false);
          }}
          className="cursor-pointer text-6xl sm:text-9xl text-white absolute top-20 left-0 mx-2 z-10 uppercase max-w-full"
        >
            <p className="border border-w rounded-full px-1 ">
            Explore open source vulnerabilities.
            </p>
          <p className="animate-bounce border border-w px-1">Click to explore</p>
        </div>
      )}
      {!isIntro && (
        <div
          className={`text-9xl text-white absolute top-20 left-2 z-0 uppercase transition-all duration-500  ${isHovering ? "opacity-0" : ""}`}
        >
           <p className="border border-w rounded-full px-1">
            <p className="animate-bounce">click</p>the object
          </p>
          <p className="border border-w px-1">
           to explore further.
          </p>
        </div>
      )}
      <div
        className={`transition-all duration-500 ${isIntro ? "blur-xl" : ""}`}
      >
        <IntroScene
          onClick={handleObjectClick}
          onHover={handleObjectEnter}
          onLeave={handleObjectLeave}
        ></IntroScene>
      </div>
      <div>
        <footer className="text-white text-xs my-2 mx-2">
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
            <div className="flex flex-col justify-end">
              <p>© 2025</p>
              <p>Open-Source vulnerabilities</p>
              <p>&nbsp;</p>
              <p>Maximilian Schmalenbach & Adrian Baranowski</p>
              <p>
                <a className="underline mr-2" href="/poster">Poster</a>
                <a className="underline" href="/about">About</a>
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <p>Data source: <a className="underline uppercase" href="https://osv.dev/">osv.dev</a> </p>
              <p>&nbsp;</p>
              <p>Open Source Software (OSS) are heavily hit by an increase of cyber-attacks and a decrease of government funding.</p>
            </div>
            <div className="col-span-2 flex flex-col justify-end">
              <p>ⓘ</p>
              <p>
                This project showcases vulnerabilities in different opensource
                ecosystems. <span className="text-fuchsia-200">In order to explore simply choose an ecosystem and
                interact.</span> Different 3D object represent different vulnerabilities, together they create the vulnerability landscape of each ecosystem.
              </p>
              <p>&nbsp;</p>
              <p>
                All data is sourced from <a href="https://osv.dev">osv.dev</a>
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <p>
                Open source software has a beneficial impact on the EU.
                Therefore, increased funding is needed. Our data visualisation
                projects aim at creating awareness.
              </p>
              <p>&nbsp;</p>
              <p><a className="underline" href="https://openforumeurope.org/open-source-impact-study/">Follow</a> the EU´s open source report for more details</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

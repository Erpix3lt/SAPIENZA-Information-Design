"use client";

import { IntroScene } from "@/components/intro-scene";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [isHovering, setIsHovering] = useState(false);
  const [isIntro, setIsIntro] = useState(true);
  const router = useRouter()

  const handleObjectClick = () => {
    //TODO set href to /viewer
  };

  const handleObjectEnter = () => {
    setIsHovering(true);
  };

  const handleObjectLeave = () => {
    setIsHovering(false);
  };

  return (
    <div className={`h-screen w-full flex flex-col justify-between`}>
      {isIntro && (
        <div
          onClick={() => {
            setIsIntro(false);
          }}
          className="cursor-pointer text-9xl text-white absolute top-20 left-2 z-10 uppercase"
        >
          <p className="border border-w rounded-full px-1">
            Explore open source vulnerabilities.
          </p>
          <p className="animate-bounce border border-w px-1">Click to explore</p>
        </div>
      )}
      {!isIntro && (
        <div
          onClick={() => {
            router.push('/viewer')
          }}
          className={`text-9xl text-white absolute top-20 left-2 z-0 uppercase transition-all duration-500  ${isHovering ? "blur-xl" : ""}`}
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
        <div className="text-white grid grid-cols-5 gap-4 mx-2 mb-2">
        </div>
        <footer className="text-white text-xs my-2 mx-2">
          <div className="grid grid-cols-5 gap-4">
            <div className="flex flex-col justify-end">
              <p>© 2024</p>
              <p>Open-Source vulnerabilities</p>
              <p>&nbsp;</p>
              <p>A data visualisation project</p>
              <p>
                <a href="/poster">Poster</a>
              </p>
            </div>
            <div className="flex flex-col justify-end">
              <p>23000</p>
              <p>Data samples</p>
              <p>25</p>
              <p>Environments</p>
            </div>
            <div className="col-span-2 flex flex-col justify-end">
              <p>ⓘ</p>
              <p>
                This project showcases vulnerabilities in different opensource
                ecosystems. In order to explore simply choose a ecosystem and
                interact.
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
              <p>Follow the EU´s open source report for more details</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

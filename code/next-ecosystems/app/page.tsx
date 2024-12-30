'use client'

import { ThreeScene } from "@/components/three-scene";
import { useState } from "react";

export default function Home() {
  const [displayBlur, setDisplayBlur] = useState(true);
  const [isBlurred, setIsBlurred] = useState(true);

  const handleDisplayBlur = () => {
    setIsBlurred(false);
    setDisplayBlur(false);
  }

  const handleNoBlur = () => {
    setIsBlurred(false);
  };

  const handleBlur = () => {
    if(displayBlur){
      setIsBlurred(true);
    }
  };
  
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className={`transition-all duration-500 ${isBlurred ? 'blur-xl' : ''}`}>
        <ThreeScene onClick={handleDisplayBlur} onHover={handleNoBlur} onNoHover={handleBlur}></ThreeScene>
      </div>
      <footer className="text-white text-xs my-2 mx-1">
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col justify-end">
            <p>© 2024</p>
            <p>Open-Source vulnerabilities</p>
            <p>&nbsp;</p>
            <p>A data visualisation project</p>
            <p><a href="/poster">Poster</a></p>
          </div>
          <div className="flex flex-col justify-end">
            <p>23000</p>
            <p>Data samples</p>
            <p>25</p>
            <p>Environments</p>
          </div>
          <div className="col-span-2 flex flex-col justify-end">
            <p className={`border w-fit px-1 border-pink-500 transition-all duration-500 ${isBlurred ? 'blur-xl' : ''}`}>Click object to enter scene</p>
            <p>i:</p>
            <p>This project showcases vulnerabilities in different opensource ecosystems. In order to explore simply choose a ecosystem and interact.</p>
            <p>&nbsp;</p>
            <p>All data is sourced from <a href="https://osv.dev">osv.dev</a></p>
          </div>
          <div className="flex flex-col justify-end">
            <p>Open source software has a beneficial impact on the EU. Therefore, increased funding is needed. Our data visualisation projects aim at creating awareness.</p>
            <p>&nbsp;</p>
            <p>Follow the EU´s open source report for more details</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client'

import { ThreeScene } from "@/components/three-scene";
import { useState } from "react";

export type Ecosystem = { 
  ecosystem: string,
  url: string,
  color: string,
 };
const ecosystems: Ecosystem[] = [
  { ecosystem: 'npm', url: 'models/strauch.glb', color: 'red' },
  { ecosystem: 'maven', url: '/models/strauch.glb', color: 'green' },
  { ecosystem: 'pypi', url: '/models/strauch.glb', color: 'blue' },
  { ecosystem: 'rubygems', url: '/models/strauch.glb', color: 'yellow' },
  { ecosystem: 'debian', url: '/models/strauch.glb', color: 'cyan' },
  { ecosystem: 'github', url: '/models/strauch.glb', color: 'magenta' }
];

export default function Home() {
  const [displayBlur, setDisplayBlur] = useState(true);
  const [isBlurred, setIsBlurred] = useState(true);
  const [ecosystem, setEcosystem] = useState<Ecosystem>(ecosystems[0]);

  const handleObjectClick = () => {
    setIsBlurred(false);
    setDisplayBlur(false);
  }

  const handleObjectEnter = () => {
    setIsBlurred(false);
  };

  const handleObjectLeave = () => {
    if(displayBlur){
      setIsBlurred(true);
    }
  };

  const handleDecrementEcosystem = () => {
    setEcosystem((prev) => {
      const currentIndex = ecosystems.indexOf(prev);
      const newIndex = currentIndex === 0 ? ecosystems.length - 1 : currentIndex - 1;
      return ecosystems[newIndex];
    });
  }
  const handleIncrementEcosystem = () => {
    setEcosystem((prev) => {
      const currentIndex = ecosystems.indexOf(prev);
      const newIndex = currentIndex === ecosystems.length - 1 ? 0 : currentIndex + 1;
      return ecosystems[newIndex];
    });
  }

  
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className={`transition-all duration-500 ${isBlurred ? 'blur-xl' : ''}`}>
        <ThreeScene ecosystem={ecosystem} onClick={handleObjectClick} onHover={handleObjectEnter} onNoHover={handleObjectLeave}></ThreeScene>
      </div>
      <div>
      <div className="text-white grid grid-cols-5 gap-4 mx-1 mb-2">
        <button className={`col-start-2 w-fit transition-all duration-500 leading-none ${isBlurred ? '' : 'blur-xl'}`} onClick={handleDecrementEcosystem}>{"<"}</button>
        <p className={`text-xs w-fit ${isBlurred ? '' : 'underline'}`}>Click object to enter scene</p>
        <button className={`col-start-5 w-fit h-fit transition-all duration-500 leading-none ${isBlurred ? '' : 'blur-xl'}`} onClick={handleIncrementEcosystem}>{">"}</button>
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
    </div>
  );
}

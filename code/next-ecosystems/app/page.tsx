"use client";

import { ThreeScene } from "@/components/three-scene";
import { useEffect, useState } from "react";
import { Vulnerability } from "@/app/api/osv/[ecosystem]/route";

export type Ecosystem = {
  ecosystem: string;
  url: string;
  color: string;
};
const ecosystems: Ecosystem[] = [
  { ecosystem: "npm", url: "models/strauch.glb", color: "red" },
  { ecosystem: "maven", url: "/models/bottle.glb", color: "green" },
  { ecosystem: "pypi", url: "/models/strauch.glb", color: "blue" },
  { ecosystem: "rubygems", url: "/models/bottle.glb", color: "yellow" },
  { ecosystem: "debian", url: "/models/strauch.glb", color: "cyan" },
  { ecosystem: "github", url: "/models/bottle.glb", color: "magenta" },
];

export default function Home() {
  const [displayArrows, setDisplayArrows] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_ecosystem, setEcosystem] = useState<Ecosystem>(ecosystems[0]);
  const [isViewer, setIsViewer] = useState(false);
  const [vulnerabilityReport, setVulnerabilityReport] = useState<Vulnerability[]>([]);
  const [vulnerability, setVulnerability] = useState<Vulnerability>();
  const [isIntro, setIsIntro] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('/api/osv/Pub')
      const data = await res.json()
      setVulnerabilityReport(data.vulnerabilityReport)
    }
    fetchPosts()
  }, [])

  const handleObjectClick = (vulnerability: Vulnerability) => {
    setIsViewer(true);
    setVulnerability(vulnerability);
  };

  const handleObjectEnter = () => {
    setDisplayArrows(false);
  };

  const handleObjectLeave = () => {
    setDisplayArrows(true);
  };

  const handleDecrementEcosystem = () => {
    setEcosystem((prev) => {
      const currentIndex = ecosystems.indexOf(prev);
      const newIndex =
        currentIndex === 0 ? ecosystems.length - 1 : currentIndex - 1;
      return ecosystems[newIndex];
    });
  };
  const handleIncrementEcosystem = () => {
    setEcosystem((prev) => {
      const currentIndex = ecosystems.indexOf(prev);
      const newIndex =
        currentIndex === ecosystems.length - 1 ? 0 : currentIndex + 1;
      return ecosystems[newIndex];
    });
  };

  return (
    <div
      className={`h-screen w-full flex flex-col justify-between`}
    >
       {isViewer && <button className="text-xs text-white absolute top-2 left-2 z-10 border border-w rounded-full px-1" onClick={() => setIsViewer(false)} >{"< go back"}</button>}
       {isIntro && <div onClick={() => {setIsIntro(false)}} className="cursor-pointer animate-bounce text-9xl text-white absolute top-20 left-2 z-10 uppercase"><p className="border border-w rounded-full px-1">Explore open source vulnerabilities.</p><p className="border border-w px-1">Click to explore</p></div>}
      <div
        className={`transition-all duration-500 ${isIntro ? "blur-xl" : ""}`}
      >
        <ThreeScene
          vulnerabilityReport={vulnerabilityReport}
          // ecosystem={ecosystem}
          onClick={(vulnerability: Vulnerability) => handleObjectClick(vulnerability)}
          onHover={handleObjectEnter}
          onLeave={handleObjectLeave}
        ></ThreeScene>
      </div>
      <div>
        <div className="text-white grid grid-cols-5 gap-4 mx-2 mb-2">
          <button
            className={`col-start-2 w-fit transition-all duration-500 leading-none ${
              displayArrows ? "" : "blur-xl"
            }`}
            onClick={handleDecrementEcosystem}
          >
            {"<"}
          </button>
            <p className={`text-xs w-fit ${displayArrows ? "" : "underline"}`}>
            {isViewer ? "Click object for more information" : "Click object to enter scene"}
            </p>
          <button
            className={`col-start-5 w-fit h-fit transition-all duration-500 leading-none ${
              displayArrows ? "" : "blur-xl"
            }`}
            onClick={handleIncrementEcosystem}
          >
            {">"}
          </button>
        </div>
        {isViewer && 
          <div className="text-white text-xs mx-2 my-2">
            <div className="grid grid-cols-5 gap-4">
              <div className="col-span-3">
                <p>Vulnerability {vulnerability?.id}</p>
                <p>Description: {vulnerability?.description}</p>
                <p>Date: {vulnerability?.date}</p>
                <p>Status: {vulnerability?.status}</p>
                <p>Severity: {vulnerability?.severity}</p>
              </div>
              <div className="col-span-2">
                <p>Affected packages</p>
                <p>Package: </p>
                <p>Version: </p>
              </div>
            </div>
          </div>}
        {!isViewer && (
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
        )}
      </div>
    </div>
  );
}

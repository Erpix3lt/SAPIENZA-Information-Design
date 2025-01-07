"use client";

import { ViewerScene } from "@/components/viewer-scene";
import { useEffect, useState } from "react";
import { Vulnerability } from "@/app/api/osv/[ecosystem]/route";
import Link from "next/link";

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

export default function Viewer() {
  const [displayArrows, setDisplayArrows] = useState(true);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ecosystem, setEcosystem] = useState<Ecosystem>(ecosystems[0]);
  const [vulnerabilityReport, setVulnerabilityReport] = useState<
    Vulnerability[]
  >([]);
  const [vulnerability, setVulnerability] = useState<Vulnerability>();

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch("/api/osv/Pub");
      const data = await res.json();
      setVulnerabilityReport(data.vulnerabilityReport);
    }
    fetchPosts();
  }, []);

  const handleObjectClick = (vulnerability: Vulnerability) => {
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
    <div className={`h-screen w-full flex flex-col justify-between`}>
      <div className="absolute top-2 left-2 z-10 flex flex-row gap-2 items-center">
        <Link className="border rounded-full px-1 text-xs text-white hover:opacity-80" href="/">{"< back"}</Link>
        <p className="text-black rounded-full px-1 bg-white text-xs hover:bg-gradient-to-r hover:from-green-400 hover:to-pink-500 hover:text-white ">os-vis</p>      
        <p className="text-white text-xs ">{ecosystem.ecosystem}</p>
        <p className="text-white text-xs ">{ecosystem.url}</p>
      </div>
      <div>
        <ViewerScene
          vulnerabilityReport={vulnerabilityReport}
          // ecosystem={ecosystem}
          onClick={(vulnerability: Vulnerability) =>
            handleObjectClick(vulnerability)
          }
          onHover={handleObjectEnter}
          onLeave={handleObjectLeave}
        ></ViewerScene>
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
            Click object for more information
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
          </div>
      </div>
    </div>
  );
}

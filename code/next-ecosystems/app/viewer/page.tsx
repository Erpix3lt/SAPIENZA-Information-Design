"use client";

import { ViewerScene } from "@/components/viewer-scene";
import { useEffect, useState } from "react";
import { Vulnerability } from "@/app/api/osv/[ecosystem]/route";
import Link from "next/link";
import { sortedVulnerabilityReport } from "@/components/scene-helpers";

export type Ecosystem = {
  name: string;
  url: string;
  vulnerabilities: number;
};

const ecosystems: Ecosystem[] = [
  { name: "crates.io", url: "https://crates.io/", vulnerabilities: 0 },
  {
    name: "GitHub Actions",
    url: "https://github.com/features/actions",
    vulnerabilities: 0,
  },
  { name: "Alpine", url: "https://alpinelinux.org/", vulnerabilities: 0 },
  { name: "Go", url: "https://go.dev/", vulnerabilities: 0 },
  { name: "Hex", url: "https://hex.pm/", vulnerabilities: 0 },
  { name: "Maven", url: "https://maven.apache.org/", vulnerabilities: 0 },
  { name: "NuGet", url: "https://www.nuget.org/", vulnerabilities: 0 },
  { name: "Packagist", url: "https://packagist.org/", vulnerabilities: 0 },
  { name: "Pub", url: "https://pub.dev/", vulnerabilities: 0 },
  { name: "PyPI", url: "https://pypi.org/", vulnerabilities: 0 },
  { name: "Red Hat", url: "https://www.redhat.com/", vulnerabilities: 0 },
  { name: "Rocky Linux", url: "https://rockylinux.org/", vulnerabilities: 0 },
  { name: "RubyGems", url: "https://rubygems.org/", vulnerabilities: 0 },
  {
    name: "SwiftURL",
    url: "https://swift.org/package-manager/",
    vulnerabilities: 0,
  },
];

export default function Viewer() {
  const [ecosystem, setEcosystem] = useState<Ecosystem>(ecosystems[0]);
  const [timespan, setTimespan] = useState<{ first: string; last: string }>({
    first: "-",
    last: "-",
  });
  const [vulnerabilityReport, setVulnerabilityReport] = useState<
    Vulnerability[]
  >([]);
  const [isRotate, setIsRotate] = useState(true);
  const [vulnerability, setVulnerability] = useState<Vulnerability>();

  useEffect(() => {
    async function fetchPosts() {
      setVulnerabilityReport([]); // Clear the report to show loading text
      const res = await fetch(`/api/osv/${ecosystem.name}`);
      const data = await res.json();
      setVulnerabilityReport(data.vulnerabilityReport);

      if (data.vulnerabilityReport.length > 0) {
        const sortedReport = sortedVulnerabilityReport(
          data.vulnerabilityReport
        );

        setTimespan({
          first: sortedReport[0].date,
          last: sortedReport[sortedReport.length - 1].date,
        });
      } else {
        setTimespan({ first: "-", last: "-" });
      }
    }
    fetchPosts();
  }, [ecosystem]);

  const handleObjectClick = (vulnerability: Vulnerability) => {
    setVulnerability(vulnerability);
  };

  const handleObjectEnter = () => {};

  const handleObjectLeave = () => {};

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
        <Link
          className="border rounded-full px-1 text-xs text-white hover:opacity-80"
          href="/"
        >
          {"< back"}
        </Link>
        <p className="text-black rounded-full px-1 bg-white text-xs hover:bg-gradient-to-r hover:from-green-400 hover:to-pink-500 hover:text-white ">
          os-vis
        </p>

        <a href={ecosystem.url} className="text-white text-xs ">
          {ecosystem.name}
        </a>
        <a href="https://osv.dev" className="text-white text-xs ">
          https://osv.dev
        </a>
      </div>

      <div>
        <ViewerScene
          autoRotate={isRotate}
          vulnerabilityReport={vulnerabilityReport}
          onClick={(vulnerability: Vulnerability) =>
            handleObjectClick(vulnerability)
          }
          onHover={handleObjectEnter}
          onLeave={handleObjectLeave}
        ></ViewerScene>
      </div>
      <div>
        <div className="absolute top-3/4 px-2 transform -translate-y-1/2 z-10 flex flex-row w-full justify-between items-start">
          <div className="flex flex-col gap-1">
            <button
              className="border rounded-full w-fit px-1 text-xs text-white hover:opacity-80"
              onClick={handleDecrementEcosystem}
            >
              {"< prev"}
            </button>
            <label
              className={`text-xs border rounded-full px-1 select-none cursor-pointer ${
                isRotate ? "bg-white text-black" : "bg-black text-white"
              }`}
            >
              <span>enable rotate</span>
              <input
                type="checkbox"
                checked={isRotate}
                className="hidden"
                onChange={(e) => {
                  setIsRotate(e.target.checked);
                }}
              />
            </label>
          </div>

          <button
            className="border rounded-full px-1 text-xs text-white hover:opacity-80"
            onClick={handleIncrementEcosystem}
          >
            {"next >"}
          </button>
        </div>

        <div className="text-white text-xs mx-2 my-2">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-1 border rounded-lg p-2 border-gray-900">
              <p>
                Current Ecosystem:{" "}
                <a
                  className="text-black rounded-full px-1 bg-white text-xs hover:opacity-80"
                  href=""
                >
                  {ecosystem.name}
                </a>
              </p>
              <p>&nbsp;</p>
              <p>
                Timespan: {timespan.first} - {timespan.last}
              </p>
              <p>Vulnerabilities total: {ecosystem.vulnerabilities}</p>
              <p>
                <a href={ecosystem.url}>{ecosystem.url}</a>
              </p>
            </div>
            <div className="col-span-2 border rounded-lg p-2 border-gray-800">
              <p>
                The following mapping visualises the ecosystems vulnerability
                data.
              </p>
              <p>&nbsp;</p>
              <p>X-Axis: Date of documentation</p>
              <p>Model-Type: Status & Severity</p>
              <p>Size of the model & Z-Axis: Severity</p>
            </div>
            <div className="col-span-2 border rounded-lg p-2 border-gray-800">
              {vulnerability ? (
                <>
                  <p>
                    Current vulnerability:{" "}
                    <a
                      className="text-black rounded-full px-1 bg-white text-xs hover:opacity-80"
                      href=""
                    >
                      {vulnerability.id}
                    </a>
                  </p>
                  <p>Description: {vulnerability.description}</p>
                  <p>&nbsp;</p>
                  <p>
                    {vulnerability.date} {vulnerability.status}
                  </p>
                  <p>Severity: {vulnerability.severity}</p>
                </>
              ) : (
                <p>
                  Click objects to learn more about the ecosystem`s
                  vulnerabilities
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

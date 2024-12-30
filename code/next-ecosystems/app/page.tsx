'use client'

import { ThreeScene } from "@/components/three-scene";

export default function Home() {
  return (
    <div className="h-screen w-full flex flex-col justify-between">
      <div className="blur-xl">
      <ThreeScene></ThreeScene>

      </div>
      <footer className="text-white text-xs my-2 mx-1">
        <div className="grid grid-cols-5 gap-4">
          <div className="flex flex-col justify-end">
            <p>© 2024</p>
            <p>Open-Source vulnerabilities</p>
            <br />
            <p>A data visualisation project</p>
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
            <br />
            <p>All data is sourced from <a href="https://osv.dev">osv.dev</a></p>
          </div>
          <div className="flex flex-col justify-end">
            <p>Open source software has a beneficial impact on the EU. Therefore, increased funding is needed. Our data visualisation projects aim at creating awareness.</p>
            <br />
            <p>Follow the EU´s open source report for more details</p>
            <p><a href="/poster">Poster</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

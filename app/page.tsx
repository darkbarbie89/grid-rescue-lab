'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { BLOG_POSTS } from './lib/blog-data'; // Import your blog data

// --- EXPANDED DATA: PUMP SPECS ---
const PUMPS = {
  "0.33": { name: "1/3 HP Pump", running: 800, surge: 2150 },
  "0.50": { name: "1/2 HP Pump", running: 1050, surge: 3200 },
  "0.75": { name: "3/4 HP Pump", running: 1500, surge: 4100 }
};

// --- EXPANDED DATA: BATTERY SPECS ---
const BATTERIES = {
  // JACKERY
  "jackery240": { name: "Jackery Explorer 240", continuous: 200, surge: 400, link: "#" },
  "jackery300plus": { name: "Jackery Explorer 300 Plus", continuous: 300, surge: 600, link: "#" },
  "jackery500": { name: "Jackery Explorer 500", continuous: 500, surge: 1000, link: "#" },
  "jackery1000": { name: "Jackery Explorer 1000 v2", continuous: 1500, surge: 3000, link: "#" },
  
  // ECOFLOW
  "river2": { name: "EcoFlow River 2", continuous: 300, surge: 600, link: "#" },
  "river2pro": { name: "EcoFlow River 2 Pro", continuous: 800, surge: 1600, link: "#" },
  "delta2": { name: "EcoFlow Delta 2", continuous: 1800, surge: 2700, link: "#" },
  "delta2max": { name: "EcoFlow Delta 2 Max", continuous: 2400, surge: 4800, link: "#" },
  "deltapro": { name: "EcoFlow Delta Pro", continuous: 3600, surge: 7200, link: "#" },

  // BLUETTI
  "eb3a": { name: "Bluetti EB3A", continuous: 600, surge: 1200, link: "#" },
  "ac180": { name: "Bluetti AC180", continuous: 1800, surge: 2700, link: "#" },
  "ac200max": { name: "Bluetti AC200MAX", continuous: 2200, surge: 4800, link: "#" },

  // ANKER
  "anker521": { name: "Anker Solix 521", continuous: 300, surge: 600, link: "#" },
  "ankerf1200": { name: "Anker Solix F1200", continuous: 1800, surge: 2400, link: "#" },
};

export default function Home() {
  const [pumpSize, setPumpSize] = useState("0.33");
  const [batteryModel, setBatteryModel] = useState("delta2");
  const [result, setResult] = useState<null | { passed: boolean; msg: string; link: string; btnText: string }>(null);

  const calculate = () => {
    // @ts-ignore
    const p = PUMPS[pumpSize];
    // @ts-ignore
    const b = BATTERIES[batteryModel];

    let passed = true;
    let msg = `SAFE: The ${b.name} can handle the ${p.surge}W startup surge.`;
    let btnText = "Check Price on Amazon";
    let link = b.link;

    if (b.surge < p.surge) {
      passed = false;
      msg = `CRITICAL FAIL: Your ${p.name} needs ~${p.surge}W to start. The ${b.name} only hits ${b.surge}W. It will trip immediately.`;
      btnText = "View The Safe Upgrade";
      link = "#"; // Recommendation Link
    } else if (b.continuous < p.running) {
      passed = false;
      msg = `FAIL: The battery cannot handle the continuous running watts (${p.running}W).`;
      btnText = "View The Safe Upgrade";
    }

    setResult({ passed, msg, link, btnText });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-orange-500 selection:text-white">
      <Head>
        <title>Sump Pump Surge Auditor | Grid Rescue Lab</title>
      </Head>

      {/* --- HERO SECTION --- */}
      <header className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-bold text-xl tracking-tighter text-white">
            <span className="text-orange-500">GRID</span>RESCUE<span className="text-neutral-600">LAB</span>
          </div>
          <div className="flex space-x-6">
            <Link href="/blog" className="text-sm font-medium hover:text-white transition">Field Reports</Link>
            <a href="#calculator" className="text-sm font-bold text-orange-500 hover:text-orange-400 transition">Run Audit</a>
          </div>
        </div>
      </header>

      <main>
        <section className="py-20 px-6 text-center max-w-4xl mx-auto">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-mono text-orange-400 bg-orange-900/20 border border-orange-900/50 rounded-full">
            ⚠️ DON'T TRUST "RUNNING WATTS"
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
            Will Your Sump Pump <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Survive the Surge?</span>
          </h1>
          <p className="text-lg text-neutral-400 max-w-2xl mx-auto mb-10">
            Most batteries fail because they can't handle the 3-second startup surge. 
            Use our engineering-grade calculator to verify your backup plan before the storm hits.
          </p>
        </section>

        {/* --- CALCULATOR WIDGET --- */}
        <section id="calculator" className="max-w-xl mx-auto px-6 mb-24">
          <div className="bg-neutral-900 border border-neutral-800 p-8 rounded-2xl shadow-2xl shadow-black/50 ring-1 ring-white/10">
            <div className="flex items-center space-x-2 mb-6 border-b border-neutral-800 pb-4">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <h2 className="font-mono text-sm text-neutral-400 uppercase tracking-widest">Surge Auditor v2.1</h2>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Pump Size</label>
                <select 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  value={pumpSize}
                  onChange={(e) => setPumpSize(e.target.value)}
                >
                  <option value="0.33">1/3 HP (Standard Residential)</option>
                  <option value="0.50">1/2 HP (High Capacity)</option>
                  <option value="0.75">3/4 HP (Industrial)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">Battery Model</label>
                <select 
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                  value={batteryModel}
                  onChange={(e) => setBatteryModel(e.target.value)}
                >
                  {Object.entries(BATTERIES).map(([key, data]) => (
                    <option key={key} value={key}>{data.name} ({data.surge}W Surge)</option>
                  ))}
                </select>
              </div>

              <button 
                onClick={calculate}
                className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-orange-900/20 active:scale-95"
              >
                RUN SURGE TEST
              </button>
            </div>

            {/* RESULTS DISPLAY */}
            {result && (
              <div className={`mt-8 p-6 rounded-lg border-l-4 ${result.passed ? 'bg-green-900/10 border-green-500' : 'bg-red-900/10 border-red-500'}`}>
                <h3 className={`font-bold text-lg mb-2 ${result.passed ? 'text-green-400' : 'text-red-400'}`}>
                  {result.passed ? '✅ PASSED' : '❌ FAILED'}
                </h3>
                <p className="text-neutral-300 text-sm mb-4 leading-relaxed">{result.msg}</p>
                <a 
                  href={result.link} 
                  target="_blank" 
                  className={`block w-full text-center py-3 rounded font-bold text-sm uppercase tracking-wide transition-colors ${
                    result.passed 
                    ? 'bg-green-600 hover:bg-green-500 text-white' 
                    : 'bg-red-600 hover:bg-red-500 text-white'
                  }`}
                >
                  {result.btnText}
                </a>
              </div>
            )}
          </div>
        </section>

        {/* --- BLOG SECTION (SEO) --- */}
        <section className="py-20 border-t border-neutral-900 bg-neutral-900/30">
          <div className="max-w-5xl mx-auto px-6">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-bold text-white">Latest Lab Data</h3>
              <Link href="/blog" className="text-sm text-orange-500 hover:text-orange-400">View All Tests &rarr;</Link>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {BLOG_POSTS.slice(0, 2).map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="block p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-orange-500/50 transition">
                  <h4 className="font-bold text-xl text-white mb-2">{post.title}</h4>
                  <p className="text-sm text-neutral-400">{post.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

      </main>

      <footer className="py-8 text-center text-neutral-600 text-xs border-t border-neutral-900">
        <p>© 2025 Grid Rescue Lab. Independent Engineering Audits.</p>
      </footer>
    </div>
  );
}
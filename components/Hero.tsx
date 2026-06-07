"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
  type MotionValue,
} from "framer-motion";
import { Arrow } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";
import InhausBottle from "@/components/InhausBottle";
import { useIsMobile } from "@/hooks/useIsMobile";

// ─── Types ─────────────────────────────────────────────────────────────
type Layer = "back" | "front";
type Obj = {
  id: string;
  x: number; y: number;
  depth: number;
  size: number;
  rotateZ: number;
  floatOffset: number;
  floatAmp: number;
  layer: Layer;
  wobble?: boolean;
};

// ─── Scene configurations ───────────────────────────────────────────────
const SCENES = {
  student: {
    accent:  "#F56B00",
    glow:    "rgba(245,107,0,0.22)",
    image:   "/product-study.jpeg",
    texture: `repeating-linear-gradient(transparent 0,transparent 27px,rgba(245,107,0,0.05) 27px,rgba(245,107,0,0.05) 28px)`,
    objects: [
      { id:"books",      x:11, y:14, depth:0.42, size:130, rotateZ:-12, floatOffset:0.0, floatAmp:12, layer:"back"  },
      { id:"calculator", x:78, y:11, depth:0.58, size:99,  rotateZ: 9,  floatOffset:0.7, floatAmp:10, layer:"back"  },
      { id:"notebook",   x:8,  y:63, depth:0.80, size:90,  rotateZ: 15, floatOffset:1.4, floatAmp:14, layer:"front" },
      { id:"pencil",     x:85, y:66, depth:0.72, size:66,  rotateZ:-20, floatOffset:1.0, floatAmp: 9, layer:"front", wobble:true },
      { id:"clock",      x:50, y:5,  depth:0.36, size:74,  rotateZ:  5, floatOffset:2.0, floatAmp:13, layer:"back"  },
    ] as Obj[],
  },
  professional: {
    accent:  "#00A896",
    glow:    "rgba(0,168,150,0.24)",
    image:   "/product-workflow.jpeg",
    texture: `linear-gradient(rgba(0,168,150,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,168,150,0.05) 1px,transparent 1px)`,
    objects: [
      { id:"laptop",    x:9,  y:12, depth:0.60, size:148, rotateZ: -7, floatOffset:0.0, floatAmp:10, layer:"back"  },
      { id:"calendar",  x:78, y:14, depth:0.52, size:78,  rotateZ:  7, floatOffset:0.8, floatAmp:12, layer:"back"  },
      { id:"checklist", x:7,  y:66, depth:0.82, size:82,  rotateZ: 13, floatOffset:1.2, floatAmp: 9, layer:"front" },
      { id:"chart",     x:82, y:65, depth:0.76, size:72,  rotateZ: -4, floatOffset:1.5, floatAmp:11, layer:"front" },
      { id:"watch",     x:50, y:5,  depth:0.38, size:66,  rotateZ: -2, floatOffset:2.2, floatAmp:14, layer:"back"  },
    ] as Obj[],
  },
  creator: {
    accent:  "#FF2D78",
    glow:    "rgba(255,45,120,0.22)",
    image:   "/creator fuel 4.png",
    texture: `radial-gradient(circle,rgba(255,45,120,0.09) 1px,transparent 1px)`,
    objects: [
      { id:"camera",     x:8,  y:13, depth:0.68, size:153, rotateZ:-9,  floatOffset:0.0, floatAmp:11, layer:"back"  },
      { id:"headphones", x:74, y:10, depth:0.50, size:86,  rotateZ: 8,  floatOffset:0.8, floatAmp:13, layer:"back",  wobble:true },
      { id:"lightbulb",  x:81, y:63, depth:0.70, size:70,  rotateZ:-5,  floatOffset:1.3, floatAmp:10, layer:"front" },
      { id:"mic",        x:6,  y:67, depth:0.82, size:64,  rotateZ:16,  floatOffset:1.1, floatAmp: 9, layer:"front" },
      { id:"music",      x:50, y:4,  depth:0.35, size:62,  rotateZ:-4,  floatOffset:1.9, floatAmp:14, layer:"back"  },
    ] as Obj[],
  },
};

// ─── SVG Object Library ─────────────────────────────────────────────────
function Books({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 90 90" fill="none">
      <defs>
        <linearGradient id="bA" x1="0" y1="0" x2="0" y2="1"><stop stopColor={c}/><stop offset="1" stopColor={c} stopOpacity=".45"/></linearGradient>
        <linearGradient id="bB" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#E8C48A"/><stop offset="1" stopColor="#C48A5A" stopOpacity=".8"/></linearGradient>
        <linearGradient id="bC" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7A9ABF"/><stop offset="1" stopColor="#4A6A8F" stopOpacity=".8"/></linearGradient>
      </defs>
      {/* Book 3 – bottom */}
      <rect x="8" y="56" width="66" height="20" rx="3" fill="url(#bB)"/>
      <rect x="8" y="56" width="8" height="20" rx="2" fill="rgba(0,0,0,.28)"/>
      <line x1="20" y1="62" x2="68" y2="62" stroke="rgba(255,255,255,.22)" strokeWidth="1"/>
      {/* Book 2 – middle */}
      <rect x="12" y="38" width="64" height="20" rx="3" fill="url(#bC)"/>
      <rect x="12" y="38" width="8" height="20" rx="2" fill="rgba(0,0,0,.28)"/>
      <line x1="24" y1="44" x2="70" y2="44" stroke="rgba(255,255,255,.22)" strokeWidth="1"/>
      {/* Book 1 – top */}
      <rect x="14" y="18" width="62" height="22" rx="3" fill="url(#bA)"/>
      <rect x="14" y="18" width="8" height="22" rx="2" fill="rgba(0,0,0,.28)"/>
      <line x1="26" y1="25" x2="70" y2="25" stroke="rgba(255,255,255,.38)" strokeWidth="1.2"/>
      <line x1="26" y1="30" x2="70" y2="30" stroke="rgba(255,255,255,.22)" strokeWidth=".9"/>
      <line x1="26" y1="35" x2="54" y2="35" stroke="rgba(255,255,255,.15)" strokeWidth=".9"/>
      <rect x="74" y="19" width="2" height="20" rx="1" fill="rgba(255,255,255,.45)"/>
    </svg>
  );
}

function Calculator({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="ca" x1="0" y1="0" x2=".25" y2="1"><stop stopColor="#383838"/><stop offset="1" stopColor="#101010"/></linearGradient></defs>
      <rect x="10" y="4" width="60" height="72" rx="9" fill="url(#ca)"/>
      <rect x="66" y="8" width="4" height="64" rx="2" fill="rgba(0,0,0,.45)"/>
      <rect x="16" y="10" width="48" height="20" rx="4" fill="#091409"/>
      <rect x="18" y="12" width="44" height="16" rx="3" fill="#122012"/>
      <text x="57" y="24" textAnchor="end" fill={c} fontSize="11" fontFamily="monospace" fontWeight="bold">42</text>
      {[0,1,2,3].map(row=>[0,1,2].map(col=>(
        <rect key={`${row}${col}`} x={20+col*15} y={36+row*10} width="11" height="7" rx="2"
          fill={row===0&&col===2?c:row===3&&col===2?"rgba(255,255,255,.22)":"rgba(255,255,255,.09)"}/>
      )))}
    </svg>
  );
}

function Notebook({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="16" y="5" width="52" height="70" rx="3" fill={c} opacity=".88"/>
      <rect x="18" y="7" width="48" height="66" rx="2" fill="rgba(255,255,255,.93)"/>
      {[22,29,36,43,50,57,64].map(y=><line key={y} x1="26" x2="62" y1={y} y2={y} stroke="rgba(100,120,200,.28)" strokeWidth=".8"/>)}
      <line x1="29" y1="9" x2="29" y2="71" stroke="rgba(255,80,80,.22)" strokeWidth=".8"/>
      {[13,21,29,37,45,53,61].map(y=><circle key={y} cx="15" cy={y} r="3.2" fill="none" stroke={c} strokeWidth="1.6"/>)}
      <path d="M58 67 L66 67 L58 75 Z" fill="rgba(0,0,0,.07)"/>
      <rect x="32" y="14" width="22" height="4" rx="2" fill={c} opacity=".3"/>
    </svg>
  );
}

function Pencil({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="pe" x1="0" y1="0" x2="1" y2="0"><stop stopColor={c} stopOpacity=".65"/><stop offset=".5" stopColor={c}/><stop offset="1" stopColor={c} stopOpacity=".45"/></linearGradient></defs>
      <rect x="34" y="6" width="12" height="50" fill="url(#pe)"/>
      <polygon points="34,6 38,4 38,56 34,56" fill="rgba(0,0,0,.14)"/>
      <polygon points="46,6 42,4 42,56 46,56" fill="rgba(255,255,255,.14)"/>
      <rect x="34" y="4" width="12" height="9" rx="2" fill="#E8A0A0"/>
      <rect x="33" y="55" width="14" height="4" fill="#C0B070"/>
      <line x1="33" y1="56.5" x2="47" y2="56.5" stroke="rgba(255,255,255,.25)" strokeWidth=".8"/>
      <polygon points="34,59 46,59 40,74" fill="#D4A058"/>
      <polygon points="37,66 43,66 40,74" fill="#F0EEE0"/>
    </svg>
  );
}

function Clock({ c }: { c: string }) {
  const ticks = Array.from({length:12},(_,i)=>i*30);
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="cl" cx="38%" cy="28%" r="70%"><stop stopColor="#484848"/><stop offset="1" stopColor="#161616"/></radialGradient></defs>
      <circle cx="22" cy="16" r="8" fill="#888" opacity=".7"/>
      <circle cx="58" cy="16" r="8" fill="#888" opacity=".7"/>
      <circle cx="40" cy="46" r="29" fill="url(#cl)"/>
      <circle cx="40" cy="46" r="27" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="1"/>
      {ticks.map(a=>{const r=(a-90)*Math.PI/180,big=a%90===0;return(
        <line key={a} x1={40+(big?16:19)*Math.cos(r)} y1={46+(big?16:19)*Math.sin(r)} x2={40+23*Math.cos(r)} y2={46+23*Math.sin(r)}
          stroke={big?"rgba(255,255,255,.6)":"rgba(255,255,255,.2)"} strokeWidth={big?1.5:.8}/>
      )})}
      <line x1="40" y1="46" x2="40" y2="29" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
      <line x1="40" y1="46" x2="54" y2="37" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
      <line x1="40" y1="46" x2="29" y2="56" stroke={c} strokeWidth="1.1" strokeLinecap="round"/>
      <circle cx="40" cy="46" r="2.8" fill={c}/>
      <rect x="36" y="10" width="8" height="3" rx="1.5" fill={c}/>
    </svg>
  );
}

function Laptop({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 90 90" fill="none">
      <defs><linearGradient id="ls" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#0a1a2a"/><stop offset="1" stopColor="#0d2040"/></linearGradient></defs>
      <rect x="8"  y="8"  width="74" height="50" rx="5" fill="#2a2a2a"/>
      <rect x="10" y="10" width="70" height="46" rx="4" fill="url(#ls)"/>
      <rect x="14" y="15" width="62" height="7"  rx="2" fill="rgba(255,255,255,.04)"/>
      <rect x="14" y="25" width="36" height="3"  rx="1" fill={c} opacity=".45"/>
      <rect x="14" y="30" width="55" height="2"  rx="1" fill="rgba(255,255,255,.07)"/>
      <rect x="14" y="34" width="46" height="2"  rx="1" fill="rgba(255,255,255,.06)"/>
      <rect x="14" y="38" width="50" height="2"  rx="1" fill="rgba(255,255,255,.05)"/>
      {/* chart bars on screen */}
      <rect x="56" y="26" width="5" height="18" rx="1.5" fill={c} opacity=".5"/>
      <rect x="63" y="30" width="5" height="14" rx="1.5" fill={c} opacity=".38"/>
      <rect x="70" y="23" width="5" height="21" rx="1.5" fill={c} opacity=".65"/>
      <circle cx="45" cy="12" r="1.8" fill="rgba(255,255,255,.18)"/>
      <path d="M4 58 L86 58 L88 70 L2 70 Z" fill="#333"/>
      {Array.from({length:11},(_,i)=><rect key={i} x={14+i*6} y={61} width="4" height="3" rx=".8" fill="rgba(255,255,255,.07)"/>)}
      <rect x="34" y="64" width="22" height="4" rx="1" fill="rgba(255,255,255,.05)"/>
      <rect x="2"  y="70" width="86" height="5" rx="2" fill="#222"/>
    </svg>
  );
}

function CalendarIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="7"  y="13" width="66" height="62" rx="6" fill="#2a2a2a"/>
      <rect x="7"  y="13" width="66" height="22" rx="6" fill={c} opacity=".88"/>
      <rect x="23" y="7"  width="7"  height="14" rx="3.5" fill="#444"/>
      <rect x="50" y="7"  width="7"  height="14" rx="3.5" fill="#444"/>
      <rect x="22" y="20" width="36" height="4"  rx="2" fill="rgba(255,255,255,.42)"/>
      {Array.from({length:7},(_,col)=><rect key={col} x={13+col*9} y={40} width={6} height={3} rx="1" fill="rgba(255,255,255,.18)"/>)}
      {Array.from({length:5},(_,row)=>Array.from({length:7},(_,col)=>{
        const n=row*7+col+1; const today=row===1&&col===3;
        return n<=31?<rect key={`${row}${col}`} x={13+col*9} y={46+row*8} width={6} height={6} rx="2"
          fill={today?c:"rgba(255,255,255,.06)"} opacity={today?1:.85}/>:null;
      }))}
    </svg>
  );
}

function AnimatedChart({ c }: { c: string }) {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setPhase(p => (p + 1) % 3), 2800);
    return () => clearInterval(id);
  }, []);
  const barSets = [
    [28, 42, 22, 52, 38, 62],
    [38, 32, 48, 42, 58, 50],
    [18, 52, 32, 62, 28, 70],
  ];
  const bars = barSets[phase];
  const xs   = [12, 22, 32, 42, 52, 62];
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="3" y="3" width="74" height="74" rx="8" fill="#141422"/>
      {[20,35,50,65].map(y=><line key={y} x1="9" x2="75" y1={y} y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
      {bars.map((h, i) => (
        <motion.rect key={i} x={xs[i]} rx="2" width="8"
          animate={{ y: 73 - h, height: h }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
          fill={`${c}28`}
        />
      ))}
      {bars.map((h, i) => (
        <motion.rect key={`t${i}`} x={xs[i]} width="8" height="8" rx="2"
          animate={{ y: 73 - h }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
          fill={c} opacity={0.9}
        />
      ))}
      <motion.polyline
        animate={{ points: bars.map((h, i) => `${xs[i]+4},${73-h}`).join(' ') }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".6"
      />
      <line x1="9" y1="73" x2="75" y2="73" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
    </svg>
  );
}

function Checklist({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="9"  y="9"  width="62" height="68" rx="5" fill="#252525"/>
      <rect x="9"  y="9"  width="62" height="9"  rx="5" fill="#353535"/>
      <rect x="27" y="5"  width="26" height="11" rx="3" fill="#444"/>
      <rect x="31" y="7"  width="18" height="7"  rx="2" fill="#333"/>
      <rect x="17" y="24" width="46" height="4"  rx="2" fill="rgba(255,255,255,.13)"/>
      {[0,1,2,3].map(i=>{const y=34+i*12,done=i<2;return(
        <g key={i}>
          <rect x="17" y={y} width="13" height="9" rx="2.5" fill={done?c:"rgba(255,255,255,.07)"} opacity={done?.9:1}/>
          {done&&<path d={`M${19} ${y+4.5} L${23} ${y+7} L${28} ${y+2}`} stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>}
          <rect x="34" y={y+3} width={done?30:20} height="3" rx="1.5" fill="rgba(255,255,255,.1)"/>
          {done&&<rect x="34" y={y+3} width={30} height="3" rx="1.5" fill={c} opacity=".22"/>}
        </g>
      )})}
    </svg>
  );
}

function Watch({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="wt" cx="38%" cy="28%" r="70%"><stop stopColor="#383838"/><stop offset="1" stopColor="#080808"/></radialGradient></defs>
      <rect x="28" y="3"  width="24" height="20" rx="6" fill="#1e1e1e"/>
      {[8,13].map(y=><line key={y} x1="31" y1={y} x2="49" y2={y} stroke="rgba(255,255,255,.06)" strokeWidth="1"/>)}
      <rect x="28" y="57" width="24" height="20" rx="6" fill="#1e1e1e"/>
      {[62,67].map(y=><line key={y} x1="31" y1={y} x2="49" y2={y} stroke="rgba(255,255,255,.06)" strokeWidth="1"/>)}
      <rect x="13" y="19" width="54" height="42" rx="13" fill="url(#wt)"/>
      <rect x="13" y="19" width="54" height="42" rx="13" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="1"/>
      <rect x="19" y="25" width="42" height="30" rx="9" fill="#040404"/>
      <text x="40" y="41" textAnchor="middle" fill="white" fontSize="11" fontFamily="monospace" fontWeight="bold">9:41</text>
      <rect x="27" y="44" width="26" height="2.5" rx="1.25" fill={c} opacity=".42"/>
      <rect x="24" y="48" width="12" height="2" rx="1" fill="rgba(255,255,255,.14)"/>
      <rect x="38" y="48" width="18" height="2" rx="1" fill={c} opacity=".28"/>
      <rect x="65" y="33" width="5" height="14" rx="2.5" fill="#2e2e2e"/>
    </svg>
  );
}

function Camera({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 90 90" fill="none">
      <defs>
        <radialGradient id="ln" cx="44%" cy="34%" r="62%"><stop stopColor="#3a4a6a"/><stop offset=".55" stopColor="#0a1828"/><stop offset="1" stopColor="#050e18"/></radialGradient>
        <linearGradient id="cb" x1="0" y1="0" x2=".18" y2="1"><stop stopColor="#363636"/><stop offset="1" stopColor="#181818"/></linearGradient>
      </defs>
      <rect x="4"  y="22" width="82" height="54" rx="9" fill="url(#cb)"/>
      <rect x="30" y="12" width="30" height="14" rx="5" fill="#252525"/>
      <rect x="10" y="15" width="16" height="10" rx="3" fill="#3a3a3a"/>
      <rect x="11" y="16" width="14" height="8"  rx="2" fill={c} opacity=".72"/>
      <circle cx="45" cy="50" r="22" fill="rgba(0,0,0,.55)"/>
      <circle cx="45" cy="50" r="19" fill={`${c}1a`}/>
      <circle cx="45" cy="50" r="17" fill="url(#ln)"/>
      <circle cx="45" cy="50" r="12" fill="#050e18"/>
      <circle cx="45" cy="50" r="7"  fill="#000"/>
      <circle cx="39" cy="44" r="3.5" fill="rgba(255,255,255,.14)"/>
      <circle cx="38" cy="43" r="1.8" fill="rgba(255,255,255,.26)"/>
      <circle cx="72" cy="26" r="6" fill="#484848"/>
      <circle cx="72" cy="26" r="3.5" fill={c} opacity=".82"/>
      <rect x="82" y="26" width="4" height="44" rx="2" fill="rgba(0,0,0,.42)"/>
    </svg>
  );
}

function Headphones({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="hp" cx="50%" cy="30%" r="70%"><stop stopColor="#3e3e3e"/><stop offset="1" stopColor="#141414"/></radialGradient></defs>
      <path d="M16 46 Q16 13 40 13 Q64 13 64 46" fill="none" stroke="#3a3a3a" strokeWidth="7" strokeLinecap="round"/>
      <path d="M18 46 Q18 17 40 17 Q62 17 62 46" fill="none" stroke="rgba(255,255,255,.07)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M21 44 Q21 22 40 22 Q59 22 59 44" fill="none" stroke={c} strokeWidth="1.6" strokeLinecap="round" opacity=".55"/>
      <rect x="5"  y="42" width="22" height="28" rx="9" fill="url(#hp)"/>
      <rect x="7"  y="44" width="18" height="24" rx="7" fill={`${c}28`}/>
      <circle cx="16" cy="56" r="7" fill={`${c}35`}/>
      <circle cx="16" cy="56" r="3.5" fill={c} opacity=".62"/>
      <rect x="53" y="42" width="22" height="28" rx="9" fill="url(#hp)"/>
      <rect x="55" y="44" width="18" height="24" rx="7" fill={`${c}28`}/>
      <circle cx="64" cy="56" r="7" fill={`${c}35`}/>
      <circle cx="64" cy="56" r="3.5" fill={c} opacity=".62"/>
      <path d="M16 70 Q16 78 40 78" stroke="#2e2e2e" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="40" cy="78" r="3.5" fill="#3a3a3a"/>
    </svg>
  );
}

function LightbulbWithSparks({ c }: { c: string }) {
  const sparks = Array.from({length:8},(_,i)=>i*45);
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs>
        <radialGradient id="lb" cx="44%" cy="34%" r="65%">
          <stop stopColor={c} stopOpacity=".92"/>
          <stop offset=".48" stopColor={c} stopOpacity=".42"/>
          <stop offset="1" stopColor={c} stopOpacity=".08"/>
        </radialGradient>
      </defs>
      <circle cx="40" cy="32" r="25" fill={c} opacity=".07"/>
      <path d="M26 36 Q26 17 40 15 Q54 17 54 36 Q54 46 48 53 L32 53 Q26 46 26 36Z" fill="url(#lb)"/>
      <path d="M30 23 Q32 19 38 19" stroke="rgba(255,255,255,.62)" strokeWidth="2.2" strokeLinecap="round"/>
      <path d="M36 45 L36 38 Q40 34 44 38 L44 45" stroke="rgba(255,255,255,.48)" strokeWidth="1.1" fill="none"/>
      <rect x="32" y="53" width="16" height="5"  rx="1.5" fill="#555"/>
      <rect x="33" y="58" width="14" height="4"  rx="1.5" fill="#444"/>
      <rect x="34" y="62" width="12" height="4"  rx="1.5" fill="#333"/>
      {sparks.map(a=>{const r=a*Math.PI/180;return(
        <motion.line key={a}
          x1={40+25*Math.cos(r)} y1={32+25*Math.sin(r)}
          x2={40+32*Math.cos(r)} y2={32+32*Math.sin(r)}
          stroke={c} strokeWidth="1.6" strokeLinecap="round"
          animate={{ opacity:[.0,.65,.0], x2:[40+28*Math.cos(r),40+33*Math.cos(r),40+28*Math.cos(r)] }}
          transition={{ duration:1.6, delay:a/360*2, repeat:Infinity, ease:"easeInOut" }}
        />
      )})}
    </svg>
  );
}

function Mic({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="mc" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#505050"/><stop offset="1" stopColor="#1e1e1e"/></linearGradient></defs>
      <rect x="28" y="5" width="24" height="42" rx="12" fill="url(#mc)"/>
      {[16,22,28,34,40].map(y=><line key={y} x1="28" x2="52" y1={y} y2={y} stroke="rgba(255,255,255,.1)" strokeWidth="1"/>)}
      <rect x="28" y="5" width="24" height="10" rx="12" fill={c} opacity=".62"/>
      <rect x="30" y="7" width="9" height="22" rx="4.5" fill="rgba(255,255,255,.07)"/>
      <path d="M22 38 Q13 38 13 46 Q13 60 40 60 Q67 60 67 46 Q67 38 58 38" fill="none" stroke="#3e3e3e" strokeWidth="3.2" strokeLinecap="round"/>
      <line x1="40" y1="60" x2="40" y2="72" stroke="#3e3e3e" strokeWidth="3"/>
      <rect x="25" y="70" width="30" height="5" rx="2.5" fill="#2e2e2e"/>
      <circle cx="40" cy="14" r="3.2" fill={c} opacity=".92"/>
    </svg>
  );
}

function Music({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="26" cy="57" r="11" fill={c}/>
      <circle cx="26" cy="57" r="7"  fill={c} opacity=".52"/>
      <rect x="36" y="13" width="4.5" height="46" fill={c}/>
      <path d="M40.5 13 Q63 19 59 37 Q51 29 40.5 31" fill={c}/>
      <circle cx="58" cy="47" r="9"  fill={c} opacity=".42"/>
      <rect x="66" y="9"  width="3.5" height="38" fill={c} opacity=".42"/>
      <path d="M69.5 9 Q88 15 84 29 Q77 22 69.5 25" fill={c} opacity=".42"/>
      <circle cx="16" cy="30" r="2.2" fill={c} opacity=".38"/>
      <circle cx="68" cy="62" r="2.2" fill={c} opacity=".32"/>
      <circle cx="52" cy="8"  r="1.8" fill={c} opacity=".48"/>
    </svg>
  );
}

const OBJ_MAP: Record<string, React.FC<{c: string}>> = {
  books: Books, calculator: Calculator, notebook: Notebook, pencil: Pencil,
  clock: Clock, laptop: Laptop, calendar: CalendarIcon, checklist: Checklist,
  chart: AnimatedChart, watch: Watch, camera: Camera, headphones: Headphones,
  lightbulb: LightbulbWithSparks, mic: Mic, music: Music,
};

// ─── FloatingObject — own component so hooks are valid ──────────────────
function FloatObj({
  obj, accent, smoothX, smoothY, index,
}: {
  obj: Obj; accent: string;
  smoothX: MotionValue<number>; smoothY: MotionValue<number>;
  index: number;
}) {
  const px  = useTransform(smoothX, [0, 1], [-24 * obj.depth, 24 * obj.depth]);
  const py  = useTransform(smoothY, [0, 1], [-16 * obj.depth, 16 * obj.depth]);
  const Svg = OBJ_MAP[obj.id];
  if (!Svg) return null;
  const zClass   = obj.layer === "back" ? "z-[5]" : "z-[15]";
  const floatY   = [obj.floatAmp * 0.5, -obj.floatAmp * 0.5, obj.floatAmp * 0.5];
  const wobbleRZ = obj.wobble
    ? [obj.rotateZ - 4, obj.rotateZ + 4, obj.rotateZ - 4]
    : obj.rotateZ;
  return (
    <motion.div
      className={`absolute ${zClass}`}
      style={{
        left: `${obj.x}%`,
        top:  `${obj.y}%`,
        width: obj.size,
        height: obj.size,
        translateX: "-50%",
        translateY: "-50%",
        x: px,
        filter: `drop-shadow(0 16px 36px ${accent}55) drop-shadow(0 4px 12px rgba(0,0,0,0.4)) blur(${(1 - obj.depth) * 0.65}px)`,
        opacity: 0.55 + obj.depth * 0.4,
      }}
      initial={{ opacity: 0, scale: 0.4, y: 48, rotate: obj.rotateZ - 10 }}
      animate={{
        opacity: 0.55 + obj.depth * 0.4,
        scale: 1,
        rotate: wobbleRZ,
        y: floatY,
      }}
      transition={{
        opacity: { duration: 0.6,  delay: 0.28 + index * 0.09 },
        scale:   { duration: 0.75, delay: 0.28 + index * 0.09, ease: [0.22, 1, 0.36, 1] },
        rotate:  { duration: obj.wobble ? 3.8 + obj.floatOffset : 0.75,
                   repeat: obj.wobble ? Infinity : 0,
                   ease: obj.wobble ? "easeInOut" : [0.22, 1, 0.36, 1],
                   delay: obj.wobble ? obj.floatOffset * 0.5 : 0.28 + index * 0.09 },
        y: { duration: 3.8 + obj.floatOffset, repeat: Infinity, ease: "easeInOut", delay: obj.floatOffset },
      }}
    >
      <Svg c={accent} />
    </motion.div>
  );
}

// ─── Coffee particles ────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x:   (i * 41 + 7)  % 100,
  y:   (i * 59 + 19) % 100,
  s:   1.2 + (i % 4) * 0.9,
  dur: 3.5 + (i % 6) * 1.2,
  del: (i * 0.35) % 7,
  drop: i % 5 === 0,
}));

// ─── Copy defaults ────────────────────────────────────────────────────────
const DEFAULT_C = {
  eyebrow: "Speciality coffee concentrate",
  headline: "Café coffee,\nin seconds.",
  sub: "Pour, add milk or water, and sip. Café-grade coffee at home — no machine, no mess.",
  cta: "Explore",
  ctaSecondary: "How it works",
};

const C_WRAP = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.2 } } };
const ITEM = {
  hidden: { opacity: 0, y: 34, filter: "blur(10px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] } },
};
const ITEM_F = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Hero ─────────────────────────────────────────────────────────────────
export default function Hero() {
  const { persona } = usePersona();
  const copy  = persona ? personaContent[persona].hero : DEFAULT_C;
  const scene = persona ? SCENES[persona] : null;
  const lines = copy.headline.split("\n");

  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 65, damping: 22, mass: 1.0 });
  const smoothY = useSpring(rawY, { stiffness: 65, damping: 22, mass: 1.0 });

  const pouchRotY = useTransform(smoothX, [0, 1], [-10, 10]);
  const pouchRotX = useTransform(smoothY, [0, 1], [6, -6]);

  const onMove  = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top)  / r.height);
  };
  const onLeave = () => { if (!isMobile) { rawX.set(0.5); rawY.set(0.5); } };

  // ── Persona splash transition ─────────────────────────────────────────
  const prevPersona = useRef<string | null>(null);
  const [splash, setSplash] = useState<{ color: string; key: number } | null>(null);
  useEffect(() => {
    if (persona && persona !== prevPersona.current && prevPersona.current !== null) {
      const colors: Record<string, string> = {
        student: "#F56B00", professional: "#00A896", creator: "#FF2D78",
      };
      setSplash({ color: colors[persona] ?? "#F56B00", key: Date.now() });
      const t = setTimeout(() => setSplash(null), 900);
      prevPersona.current = persona;
      return () => clearTimeout(t);
    }
    prevPersona.current = persona;
  }, [persona]);

  return (
    <section
      id="top"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {/* Per-persona ambient glow — wide, strong, immersive */}
      <AnimatePresence>
        {scene && (
          <>
            {/* Wide soft halo */}
            <motion.div key={`${persona}-wide`} className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              style={{ background: `radial-gradient(ellipse 80% 70% at 72% 52%, ${scene.glow} 0%, transparent 72%)` }}
            />
            {/* Tight concentrated glow at product position */}
            <motion.div key={`${persona}-tight`} className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 1.0 }}
              style={{ background: `radial-gradient(ellipse 42% 52% at 72% 52%, ${scene.accent}28 0%, transparent 62%)` }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Persona splash — cinematic ink-burst transition */}
      <AnimatePresence>
        {splash && (
          <>
            {/* Leading white flash */}
            <motion.div
              key={`${splash.key}-flash`}
              className="pointer-events-none fixed inset-0"
              style={{ background: "white", zIndex: 99998 }}
              initial={{ opacity: 0.55 }}
              animate={{ opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            />
            {/* Expanding colour burst */}
            <motion.div
              key={splash.key}
              className="pointer-events-none fixed rounded-full"
              style={{
                width: "220vmax", height: "220vmax",
                top: "50%", left: "50%",
                x: "-50%", y: "-50%",
                background: `radial-gradient(circle, ${splash.color}ee 0%, ${splash.color} 55%, transparent 100%)`,
                zIndex: 99999,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 1, opacity: [1, 0.9, 0] }}
              transition={{ duration: 0.85, ease: [0.12, 0.88, 0.28, 1] }}
            />
          </>
        )}
      </AnimatePresence>

      <div className="container-x grid min-h-[90vh] items-center gap-6 py-12 md:grid-cols-[1fr_1.25fr] md:gap-0 md:py-0">

        {/* ── Copy ── */}
        <motion.div className="order-2 md:order-1 md:py-20" variants={C_WRAP} initial="hidden" animate="show">
          <motion.p variants={ITEM} className="label" style={{ color: scene?.accent ?? "var(--theme-accent)" }}>
            {copy.eyebrow}
          </motion.p>

          <h1 className="mt-4 text-[50px] leading-none tracking-tight md:text-[82px] lg:text-[96px]"
            style={{ fontFamily:"var(--vibe-head-font)", fontStyle:"var(--vibe-head-style)", fontWeight:"var(--vibe-head-weight)" }}>
            {lines.map((line, i) => (
              <motion.span key={i} variants={ITEM} className="block overflow-hidden">{line}</motion.span>
            ))}
          </h1>

          <motion.p variants={ITEM} className="mt-6 max-w-[420px] text-[17px] leading-[1.68] opacity-68">
            {copy.sub}
          </motion.p>

          <motion.div variants={ITEM_F} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 focusable"
              style={{ background: scene?.accent ?? "var(--theme-accent)", boxShadow: scene ? `0 8px 30px ${scene.accent}52` : undefined }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {copy.cta}
                <Arrow className="h-3.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
            <Link href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-current/20 px-7 py-3.5 text-[13px] font-semibold opacity-62 transition-all duration-300 hover:opacity-100 focusable">
              {copy.ctaSecondary}
            </Link>
          </motion.div>

          <motion.div variants={ITEM_F} className="mt-7 flex items-center gap-2">
            {["~20 Cups", "₹25 per Cup", "Ready in 60 Seconds"].map((stat, i) => (
              <span key={stat} className="flex items-center gap-2">
                {i > 0 && <span className="opacity-25">·</span>}
                <span className="text-[13px] font-medium opacity-55">{stat}</span>
              </span>
            ))}
          </motion.div>

          <motion.div variants={ITEM_F} className="mt-7 flex flex-wrap gap-2 border-t pt-6"
            style={{ borderColor: "color-mix(in srgb, var(--theme-ink) 10%, transparent)" }}>
            {["₹25 / cup", "20+ drinks", "60-sec brew", "No machine"].map(f => (
              <span key={f} className="vibe-shape border px-3.5 py-1.5 text-[12px] font-medium opacity-55 transition-colors hover:opacity-80"
                style={{ borderColor:"color-mix(in srgb, var(--theme-ink) 12%, transparent)", background:"color-mix(in srgb, var(--theme-ink) 4%, transparent)" }}>
                {f}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── 3D Scene ── */}
        <div className="order-1 md:order-2">
          <div
            className="relative mx-auto flex h-[560px] max-w-[560px] items-center justify-center md:h-[780px]"
            style={scene ? {
              backgroundImage: scene.texture,
              backgroundSize: persona === "professional" ? "32px 32px" : persona === "creator" ? "22px 22px" : "auto",
            } : undefined}
          >
            {/* Coffee particles — skip on mobile */}
            {!isMobile && PARTICLES.map(p => (
              <motion.div key={p.id} className="pointer-events-none absolute"
                style={{
                  left: `${p.x}%`, top: `${p.y}%`,
                  width: p.s, height: p.drop ? p.s * 1.8 : p.s,
                  background: scene?.accent ?? "var(--theme-accent)",
                  borderRadius: p.drop ? "50% 50% 50% 0" : "50%",
                  opacity: 0.22,
                  zIndex: 2,
                  willChange: "transform, opacity",
                }}
                animate={{ y:[-10, 10, -10], opacity:[0.1, 0.32, 0.1] }}
                transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:"easeInOut" }}
              />
            ))}

            {/* Back-layer objects — skip on mobile */}
            <AnimatePresence>
              {!isMobile && scene && scene.objects.filter(o => o.layer === "back").map((obj, i) => (
                <FloatObj key={`${persona}-${obj.id}`} obj={obj} accent={scene.accent}
                  smoothX={smoothX} smoothY={smoothY} index={i} />
              ))}
            </AnimatePresence>

            {/* ── Central pouch at z-[10] ── */}
            <motion.div className="relative z-[10]"
              style={isMobile ? {} : { rotateY: pouchRotY, rotateX: pouchRotX, transformPerspective: 900 }}
            >
              {/* Deep glow — slow pulse */}
              <motion.div className="absolute inset-[-55%] -z-10 blur-[100px]"
                style={{ background: scene
                  ? `radial-gradient(ellipse at 50% 65%, ${scene.accent}45 0%, transparent 65%)`
                  : "radial-gradient(ellipse at 50% 65%, var(--theme-accent-soft) 0%, transparent 65%)" }}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: [1, 1.15, 1] }}
                transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.3 } }}
              />
              {/* Tight accent glow right behind pouch */}
              <motion.div className="absolute inset-[-20%] -z-10 blur-[48px]"
                style={{ background: scene
                  ? `radial-gradient(ellipse at 50% 68%, ${scene.accent}70 0%, transparent 55%)`
                  : "radial-gradient(ellipse at 50% 68%, var(--theme-accent)55 0%, transparent 55%)" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              <AnimatePresence mode="wait">
                {scene ? (
                  <motion.div key={scene.image}
                    initial={{ opacity: 0, scale: 0.75, filter: "blur(16px)" }}
                    animate={{ opacity: 1, scale: 1,    filter: "blur(0px)",
                      y: [-6, 6, -6] as unknown as number }}
                    exit={{    opacity: 0, scale: 0.92,  filter: "blur(8px)"  }}
                    transition={{
                      opacity: { duration: 0.8 },
                      scale:   { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
                      filter:  { duration: 0.8 },
                      y: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                    }}
                    className="relative h-[470px] w-[316px] md:h-[660px] md:w-[445px]"
                  >
                    <Image src={scene.image} alt="INHAUS product" fill priority
                      className="object-contain"
                      style={{ filter:`contrast(1.1) saturate(1.2) drop-shadow(0 32px 64px rgba(0,0,0,0.7)) drop-shadow(0 0 40px ${scene.accent}48)` }}
                    />
                    {/* Gloss highlight */}
                    <div className="pointer-events-none absolute inset-0"
                      style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.06) 30%, transparent 60%)", borderRadius: "inherit" }}
                    />
                  </motion.div>
                ) : (
                  <motion.div key="bottle"
                    initial={{ opacity: 0, scale: 0.88, filter: "blur(14px)" }}
                    animate={{ opacity: 1, scale: 1,    filter: "blur(0px)"  }}
                    exit={{    opacity: 0, scale: 0.94,  filter: "blur(8px)"  }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 w-[220px] md:w-[300px]"
                  >
                    <InhausBottle className="w-full max-h-[520px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Front-layer objects — skip on mobile */}
            <AnimatePresence>
              {!isMobile && scene && scene.objects.filter(o => o.layer === "front").map((obj, i) => (
                <FloatObj key={`${persona}-${obj.id}`} obj={obj} accent={scene.accent}
                  smoothX={smoothX} smoothY={smoothY} index={i + 3} />
              ))}
            </AnimatePresence>

          </div>
        </div>

      </div>
    </section>
  );
}

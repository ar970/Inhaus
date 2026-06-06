"use client";

import { useRef } from "react";
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
import { Arrow, Stars } from "@/components/Doodles";
import { usePersona } from "@/context/PersonaContext";
import { personaContent } from "@/lib/personas";
import InhausBottle from "@/components/InhausBottle";

// ─── Types ────────────────────────────────────────────────────────────────────
type Obj = {
  id: string;
  x: number; y: number;       // % position in scene
  depth: number;               // 0.2 far → 1.0 near (parallax + opacity)
  size: number;                // px
  rotateZ: number;
  floatOffset: number;
  floatAmp: number;
};

// ─── Per-persona scene data ───────────────────────────────────────────────────
const SCENES = {
  student: {
    accent: "#F56B00",
    glow:   "rgba(245,107,0,0.18)",
    image:  "/product-study.jpeg",
    objects: [
      { id:"book",       x:10,  y:20, depth:0.65, size:80,  rotateZ:-14, floatOffset:0.0, floatAmp:13 },
      { id:"calculator", x:78,  y:14, depth:0.80, size:68,  rotateZ: 10, floatOffset:0.6, floatAmp:10 },
      { id:"notebook",   x:7,   y:65, depth:0.55, size:72,  rotateZ: 16, floatOffset:1.3, floatAmp:15 },
      { id:"pencil",     x:84,  y:62, depth:0.75, size:58,  rotateZ:-22, floatOffset:0.9, floatAmp: 9 },
      { id:"clock",      x:50,  y:7,  depth:0.45, size:64,  rotateZ:  6, floatOffset:1.9, floatAmp:12 },
      { id:"cup",        x:56,  y:88, depth:0.90, size:56,  rotateZ: -8, floatOffset:2.3, floatAmp: 8 },
    ] as Obj[],
  },
  creator: {
    accent: "#FF2D78",
    glow:   "rgba(255,45,120,0.18)",
    image:  "/product-creator.jpeg",
    objects: [
      { id:"camera",     x:9,   y:18, depth:0.75, size:82,  rotateZ:-10, floatOffset:0.0, floatAmp:12 },
      { id:"headphones", x:74,  y:12, depth:0.55, size:78,  rotateZ:  8, floatOffset:0.7, floatAmp:14 },
      { id:"lightbulb",  x:82,  y:60, depth:0.65, size:64,  rotateZ: -6, floatOffset:1.2, floatAmp:11 },
      { id:"mic",        x:5,   y:66, depth:0.80, size:58,  rotateZ: 16, floatOffset:1.0, floatAmp:10 },
      { id:"music",      x:48,  y:5,  depth:0.42, size:56,  rotateZ: -4, floatOffset:1.8, floatAmp:13 },
      { id:"cup",        x:60,  y:87, depth:0.90, size:52,  rotateZ: 10, floatOffset:2.1, floatAmp: 8 },
    ] as Obj[],
  },
  professional: {
    accent: "#1545A8",
    glow:   "rgba(21,69,168,0.22)",
    image:  "/product-workflow.jpeg",
    objects: [
      { id:"laptop",    x:8,   y:16, depth:0.65, size:86,  rotateZ: -8, floatOffset:0.0, floatAmp:10 },
      { id:"calendar",  x:76,  y:16, depth:0.72, size:68,  rotateZ:  7, floatOffset:0.8, floatAmp:12 },
      { id:"chart",     x:82,  y:62, depth:0.55, size:64,  rotateZ: -5, floatOffset:1.4, floatAmp:11 },
      { id:"checklist", x:6,   y:66, depth:0.82, size:64,  rotateZ: 13, floatOffset:1.1, floatAmp: 9 },
      { id:"watch",     x:50,  y:5,  depth:0.42, size:60,  rotateZ: -3, floatOffset:2.2, floatAmp:14 },
      { id:"cup",       x:58,  y:86, depth:0.90, size:56,  rotateZ:  8, floatOffset:1.7, floatAmp: 8 },
    ] as Obj[],
  },
};

// ─── 3D SVG Objects ───────────────────────────────────────────────────────────
function Book({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs>
        <linearGradient id="b1" x1="0" y1="0" x2="0" y2="1"><stop stopColor={c}/><stop offset="1" stopColor={c} stopOpacity=".5"/></linearGradient>
        <linearGradient id="b2" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#E8C49A"/><stop offset="1" stopColor="#C4906A" stopOpacity=".8"/></linearGradient>
      </defs>
      <rect x="10" y="44" width="58" height="22" rx="3" fill="url(#b2)"/>
      <rect x="10" y="44" width="7" height="22" rx="2" fill="rgba(0,0,0,.3)"/>
      <line x1="22" y1="49" x2="62" y2="49" stroke="rgba(255,255,255,.25)" strokeWidth="1"/>
      <line x1="22" y1="54" x2="62" y2="54" stroke="rgba(255,255,255,.15)" strokeWidth=".8"/>
      <rect x="14" y="20" width="56" height="26" rx="3" fill="url(#b1)"/>
      <rect x="14" y="20" width="7" height="26" rx="2" fill="rgba(0,0,0,.28)"/>
      <line x1="26" y1="27" x2="64" y2="27" stroke="rgba(255,255,255,.35)" strokeWidth="1"/>
      <line x1="26" y1="32" x2="64" y2="32" stroke="rgba(255,255,255,.2)" strokeWidth=".8"/>
      <line x1="26" y1="37" x2="52" y2="37" stroke="rgba(255,255,255,.15)" strokeWidth=".8"/>
      <rect x="68" y="21" width="2" height="24" rx="1" fill="rgba(255,255,255,.4)"/>
    </svg>
  );
}

function Calculator({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="ca" x1="0" y1="0" x2=".3" y2="1"><stop stopColor="#3a3a3a"/><stop offset="1" stopColor="#111"/></linearGradient></defs>
      <rect x="12" y="4" width="56" height="72" rx="8" fill="url(#ca)"/>
      <rect x="64" y="8" width="4" height="64" rx="2" fill="rgba(0,0,0,.4)"/>
      <rect x="18" y="10" width="44" height="18" rx="4" fill="#0a1a0a"/>
      <rect x="20" y="12" width="40" height="14" rx="3" fill="#152015"/>
      <text x="54" y="23" textAnchor="end" fill={c} fontSize="10" fontFamily="monospace" fontWeight="bold">42</text>
      {[0,1,2,3].map(row=>[0,1,2].map(col=>(
        <rect key={`${row}-${col}`} x={20+col*14} y={34+row*10} width="10" height="7" rx="2"
          fill={row===0&&col===2?c:"rgba(255,255,255,.1)"}/>
      )))}
    </svg>
  );
}

function Notebook({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="16" y="6" width="52" height="68" rx="3" fill={c} opacity=".85"/>
      <rect x="18" y="8" width="48" height="64" rx="2" fill="rgba(255,255,255,.92)"/>
      {[22,29,36,43,50,57].map(y=><line key={y} x1="26" x2="62" y1={y} y2={y} stroke="rgba(100,120,200,.3)" strokeWidth=".8"/>)}
      <line x1="29" y1="10" x2="29" y2="70" stroke="rgba(255,80,80,.25)" strokeWidth=".8"/>
      {[14,22,30,38,46,54,62].map(y=><circle key={y} cx="16" cy={y} r="3" fill="none" stroke={c} strokeWidth="1.5"/>)}
      <path d="M58 66 L66 66 L58 74 Z" fill="rgba(0,0,0,.07)"/>
    </svg>
  );
}

function Pencil({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="pe" x1="0" y1="0" x2="1" y2="0"><stop stopColor={c} stopOpacity=".7"/><stop offset=".5" stopColor={c}/><stop offset="1" stopColor={c} stopOpacity=".5"/></linearGradient></defs>
      <rect x="34" y="8" width="12" height="48" fill="url(#pe)"/>
      <polygon points="34,8 38,6 38,56 34,56" fill="rgba(0,0,0,.14)"/>
      <polygon points="46,8 42,6 42,56 46,56" fill="rgba(255,255,255,.14)"/>
      <rect x="34" y="6" width="12" height="8" rx="2" fill="#E8A0A0"/>
      <rect x="33" y="54" width="14" height="4" fill="#C0B080"/>
      <polygon points="34,58 46,58 40,72" fill="#D4A060"/>
      <polygon points="37,65 43,65 40,72" fill="#F0EEE0"/>
    </svg>
  );
}

function Clock({ c }: { c: string }) {
  const ticks = Array.from({length:12},(_,i)=>i*30);
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="cl" cx="40%" cy="30%" r="70%"><stop stopColor="#484848"/><stop offset="1" stopColor="#181818"/></radialGradient></defs>
      <circle cx="22" cy="18" r="8" fill="#888" opacity=".7"/>
      <circle cx="58" cy="18" r="8" fill="#888" opacity=".7"/>
      <circle cx="40" cy="46" r="28" fill="url(#cl)"/>
      <circle cx="40" cy="46" r="23" fill="rgba(255,255,255,.03)"/>
      {ticks.map(a=>{const r=(a-90)*Math.PI/180,big=a%90===0,r1=big?17:20,r2=22;return(
        <line key={a} x1={40+r1*Math.cos(r)} y1={46+r1*Math.sin(r)} x2={40+r2*Math.cos(r)} y2={46+r2*Math.sin(r)}
          stroke={big?"rgba(255,255,255,.6)":"rgba(255,255,255,.2)"} strokeWidth={big?1.5:.8}/>
      )})}
      <line x1="40" y1="46" x2="40" y2="30" stroke="white" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="46" x2="53" y2="38" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="40" y1="46" x2="30" y2="56" stroke={c} strokeWidth="1" strokeLinecap="round"/>
      <circle cx="40" cy="46" r="2.5" fill={c}/>
      <rect x="36" y="12" width="8" height="3" rx="1.5" fill={c}/>
    </svg>
  );
}

function Cup({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="cu" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5a3a2a"/><stop offset="1" stopColor="#2a1a0a"/></linearGradient></defs>
      <path d="M30 17 Q26 11 30 5" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".6"/>
      <path d="M40 15 Q36 9 40 3"  stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".5"/>
      <path d="M50 17 Q46 11 50 5" stroke={c} strokeWidth="2" strokeLinecap="round" fill="none" opacity=".4"/>
      <ellipse cx="40" cy="70" rx="26" ry="5" fill="rgba(255,255,255,.1)"/>
      <path d="M18 30 L24 64 Q40 68 56 64 L62 30 Z" fill="url(#cu)"/>
      <ellipse cx="40" cy="30" rx="22" ry="4.5" fill="rgba(255,255,255,.1)"/>
      <ellipse cx="40" cy="30" rx="19" ry="3.5" fill="#2a1a0a"/>
      <ellipse cx="40" cy="30" rx="17" ry="3" fill="#3d2010"/>
      <path d="M36 29 Q40 26 44 29 Q40 32 36 29" fill={c} opacity=".4"/>
      <path d="M62 38 Q74 38 74 46 Q74 54 62 54" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="4" strokeLinecap="round"/>
    </svg>
  );
}

function Camera({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs>
        <radialGradient id="ln" cx="45%" cy="35%" r="60%"><stop stopColor="#3a4a6a"/><stop offset=".6" stopColor="#0a1a2a"/><stop offset="1" stopColor="#050e18"/></radialGradient>
        <linearGradient id="cb" x1="0" y1="0" x2=".2" y2="1"><stop stopColor="#3a3a3a"/><stop offset="1" stopColor="#1a1a1a"/></linearGradient>
      </defs>
      <rect x="6" y="22" width="68" height="46" rx="8" fill="url(#cb)"/>
      <rect x="28" y="14" width="24" height="12" rx="4" fill="#2a2a2a"/>
      <rect x="12" y="16" width="12" height="8" rx="2" fill="#444"/>
      <rect x="13" y="17" width="10" height="6" rx="1" fill={c} opacity=".7"/>
      <circle cx="40" cy="46" r="18" fill="rgba(0,0,0,.5)"/>
      <circle cx="40" cy="46" r="15" fill="url(#ln)"/>
      <circle cx="40" cy="46" r="10" fill="#050e18"/>
      <circle cx="40" cy="46" r="6"  fill="#000"/>
      <circle cx="35" cy="41" r="3" fill="rgba(255,255,255,.15)"/>
      <circle cx="34" cy="40" r="1.5" fill="rgba(255,255,255,.25)"/>
      <circle cx="62" cy="26" r="5" fill="#555"/>
      <circle cx="62" cy="26" r="3" fill={c} opacity=".8"/>
      <rect x="70" y="26" width="4" height="38" rx="2" fill="rgba(0,0,0,.4)"/>
    </svg>
  );
}

function Headphones({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="hp" cx="50%" cy="30%" r="70%"><stop stopColor="#444"/><stop offset="1" stopColor="#1a1a1a"/></radialGradient></defs>
      <path d="M16 46 Q16 14 40 14 Q64 14 64 46" fill="none" stroke="#444" strokeWidth="6" strokeLinecap="round"/>
      <path d="M18 46 Q18 18 40 18 Q62 18 62 46" fill="none" stroke="rgba(255,255,255,.08)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M22 44 Q22 22 40 22 Q58 22 58 44" fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".55"/>
      <rect x="6"  y="42" width="20" height="26" rx="8" fill="url(#hp)"/>
      <rect x="8"  y="44" width="16" height="22" rx="6" fill={`${c}28`}/>
      <circle cx="16" cy="55" r="6" fill={`${c}35`}/>
      <circle cx="16" cy="55" r="3" fill={c} opacity=".6"/>
      <rect x="54" y="42" width="20" height="26" rx="8" fill="url(#hp)"/>
      <rect x="56" y="44" width="16" height="22" rx="6" fill={`${c}28`}/>
      <circle cx="64" cy="55" r="6" fill={`${c}35`}/>
      <circle cx="64" cy="55" r="3" fill={c} opacity=".6"/>
    </svg>
  );
}

function Lightbulb({ c }: { c: string }) {
  const rays = Array.from({length:8},(_,i)=>i*45);
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="lb" cx="45%" cy="35%" r="65%"><stop stopColor={c} stopOpacity=".9"/><stop offset=".5" stopColor={c} stopOpacity=".4"/><stop offset="1" stopColor={c} stopOpacity=".1"/></radialGradient></defs>
      <circle cx="40" cy="32" r="24" fill={c} opacity=".07"/>
      <path d="M26 36 Q26 18 40 16 Q54 18 54 36 Q54 46 48 52 L32 52 Q26 46 26 36Z" fill="url(#lb)"/>
      <path d="M30 24 Q32 20 38 20" stroke="rgba(255,255,255,.6)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M36 44 L36 38 Q40 34 44 38 L44 44" stroke="rgba(255,255,255,.45)" strokeWidth="1" fill="none"/>
      <rect x="32" y="52" width="16" height="5" rx="1" fill="#555"/>
      <rect x="33" y="57" width="14" height="4" rx="1" fill="#444"/>
      <rect x="34" y="61" width="12" height="4" rx="1" fill="#333"/>
      {rays.map(a=>{const r=a*Math.PI/180;return(
        <line key={a} x1={40+26*Math.cos(r)} y1={32+26*Math.sin(r)} x2={40+31*Math.cos(r)} y2={32+31*Math.sin(r)}
          stroke={c} strokeWidth="1.5" strokeLinecap="round" opacity=".38"/>
      )})}
    </svg>
  );
}

function Mic({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="mc" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#555"/><stop offset="1" stopColor="#222"/></linearGradient></defs>
      <rect x="28" y="6" width="24" height="40" rx="12" fill="url(#mc)"/>
      {[16,22,28,34,40].map(y=><line key={y} x1="28" x2="52" y1={y} y2={y} stroke="rgba(255,255,255,.1)" strokeWidth="1"/>)}
      <rect x="28" y="6" width="24" height="8" rx="12" fill={c} opacity=".6"/>
      <rect x="30" y="8" width="8" height="20" rx="4" fill="rgba(255,255,255,.07)"/>
      <path d="M22 36 Q14 36 14 44 Q14 58 40 58 Q66 58 66 44 Q66 36 58 36" fill="none" stroke="#444" strokeWidth="3" strokeLinecap="round"/>
      <line x1="40" y1="58" x2="40" y2="70" stroke="#444" strokeWidth="3"/>
      <rect x="26" y="68" width="28" height="5" rx="2.5" fill="#333"/>
      <circle cx="40" cy="14" r="3" fill={c} opacity=".9"/>
    </svg>
  );
}

function Music({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <circle cx="28" cy="56" r="10" fill={c}/>
      <circle cx="28" cy="56" r="6"  fill={c} opacity=".55"/>
      <rect x="37" y="14" width="4" height="44" fill={c}/>
      <path d="M41 14 Q62 20 58 36 Q50 28 41 30" fill={c}/>
      <circle cx="58" cy="46" r="8"  fill={c} opacity=".45"/>
      <rect x="65" y="10" width="3" height="36" fill={c} opacity=".45"/>
      <path d="M68 10 Q84 16 80 28 Q74 22 68 24" fill={c} opacity=".45"/>
      <circle cx="18" cy="30" r="2" fill={c} opacity=".35"/>
      <circle cx="66" cy="60" r="2" fill={c} opacity=".3"/>
    </svg>
  );
}

function Laptop({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><linearGradient id="ls" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#0a1a2a"/><stop offset="1" stopColor="#0d2040"/></linearGradient></defs>
      <rect x="10" y="8"  width="60" height="42" rx="4" fill="#2a2a2a"/>
      <rect x="12" y="10" width="56" height="38" rx="3" fill="url(#ls)"/>
      <rect x="16" y="14" width="48" height="6"  rx="2" fill="rgba(255,255,255,.04)"/>
      <rect x="16" y="22" width="30" height="3"  rx="1" fill={c} opacity=".4"/>
      <rect x="16" y="27" width="44" height="2"  rx="1" fill="rgba(255,255,255,.07)"/>
      <rect x="16" y="31" width="38" height="2"  rx="1" fill="rgba(255,255,255,.06)"/>
      <rect x="38" y="22" width="4"  height="16" rx="1" fill={c} opacity=".5"/>
      <rect x="44" y="26" width="4"  height="12" rx="1" fill={c} opacity=".38"/>
      <rect x="50" y="20" width="4"  height="18" rx="1" fill={c} opacity=".6"/>
      <circle cx="40" cy="12" r="1.5" fill="rgba(255,255,255,.18)"/>
      <path d="M6 50 L74 50 L76 62 L4 62 Z" fill="#333"/>
      {Array.from({length:9},(_,i)=><rect key={i} x={14+i*6} y={53} width="4" height="3" rx=".8" fill="rgba(255,255,255,.07)"/>)}
      <rect x="32" y="56" width="16" height="4" rx="1" fill="rgba(255,255,255,.05)"/>
      <rect x="4"  y="62" width="72" height="4" rx="2" fill="#222"/>
    </svg>
  );
}

function CalendarIcon({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="8"  y="14" width="64" height="60" rx="6" fill="#2a2a2a"/>
      <rect x="8"  y="14" width="64" height="20" rx="6" fill={c} opacity=".85"/>
      <rect x="24" y="8"  width="6"  height="14" rx="3" fill="#444"/>
      <rect x="50" y="8"  width="6"  height="14" rx="3" fill="#444"/>
      <rect x="24" y="19" width="32" height="4"  rx="2" fill="rgba(255,255,255,.38)"/>
      {Array.from({length:7},(_,col)=><rect key={col} x={14+col*8} y={38} width={5} height={3} rx="1" fill="rgba(255,255,255,.18)"/>)}
      {Array.from({length:5},(_,row)=>Array.from({length:7},(_,col)=>{
        const n=row*7+col+1; const today=row===1&&col===3;
        return n<=31?<rect key={`${row}${col}`} x={14+col*8} y={44+row*7} width={5} height={5} rx="1.5" fill={today?c:"rgba(255,255,255,.06)"}/>:null;
      }))}
    </svg>
  );
}

function Chart({ c }: { c: string }) {
  const bars=[{h:28,x:14},{h:42,x:24},{h:22,x:34},{h:52,x:44},{h:38,x:54},{h:60,x:64}];
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="4" y="4" width="72" height="72" rx="8" fill="#1a1a2a"/>
      {[20,35,50,65].map(y=><line key={y} x1="10" x2="74" y1={y} y2={y} stroke="rgba(255,255,255,.05)" strokeWidth="1"/>)}
      {bars.map((b,i)=><g key={i}><rect x={b.x} y={72-b.h} width="8" height={b.h} rx="2" fill={`${c}28`}/><rect x={b.x} y={72-b.h} width="8" height={Math.min(8,b.h)} rx="2" fill={c} opacity=".9"/></g>)}
      <polyline points={bars.map(b=>`${b.x+4},${72-b.h}`).join(' ')} fill="none" stroke={c} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity=".55"/>
      {bars.map((b,i)=><circle key={i} cx={b.x+4} cy={72-b.h} r="2.5" fill={c} opacity=".8"/>)}
      <line x1="10" y1="72" x2="74" y2="72" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
      <line x1="10" y1="10" x2="10" y2="72" stroke="rgba(255,255,255,.12)" strokeWidth="1"/>
    </svg>
  );
}

function Checklist({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <rect x="10" y="10" width="60" height="66" rx="5" fill="#2a2a2a"/>
      <rect x="10" y="10" width="60" height="8"  rx="5" fill="#3a3a3a"/>
      <rect x="28" y="6"  width="24" height="10" rx="3" fill="#444"/>
      <rect x="32" y="8"  width="16" height="6"  rx="2" fill="#333"/>
      <rect x="18" y="24" width="44" height="4"  rx="2" fill="rgba(255,255,255,.13)"/>
      {[0,1,2,3].map(i=>{const y=34+i*12,done=i<2;return(
        <g key={i}>
          <rect x="18" y={y} width="12" height="9" rx="2" fill={done?c:"rgba(255,255,255,.07)"} opacity={done?.9:1}/>
          {done&&<path d={`M${20} ${y+4.5} L${23} ${y+7} L${28} ${y+2}`} stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>}
          <rect x="34" y={y+3} width={done?32:22} height="3" rx="1.5" fill="rgba(255,255,255,.1)"/>
        </g>
      )})}
    </svg>
  );
}

function Watch({ c }: { c: string }) {
  return (
    <svg viewBox="0 0 80 80" fill="none">
      <defs><radialGradient id="wt" cx="40%" cy="30%" r="70%"><stop stopColor="#3a3a3a"/><stop offset="1" stopColor="#0a0a0a"/></radialGradient></defs>
      <rect x="28" y="4"  width="24" height="20" rx="6" fill="#222"/>
      <line x1="31" y1="8" x2="49" y2="8" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
      <line x1="31" y1="12" x2="49" y2="12" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
      <rect x="28" y="56" width="24" height="20" rx="6" fill="#222"/>
      <line x1="31" y1="60" x2="49" y2="60" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
      <line x1="31" y1="64" x2="49" y2="64" stroke="rgba(255,255,255,.05)" strokeWidth="1"/>
      <rect x="14" y="20" width="52" height="40" rx="12" fill="url(#wt)"/>
      <rect x="20" y="26" width="40" height="28" rx="8" fill="#050505"/>
      <text x="40" y="41" textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">9:41</text>
      <rect x="28" y="44" width="24" height="2" rx="1" fill={c} opacity=".38"/>
      <rect x="64" y="34" width="5" height="12" rx="2" fill="#333"/>
    </svg>
  );
}

const OBJ_MAP: Record<string, React.FC<{c: string}>> = {
  book: Book, calculator: Calculator, notebook: Notebook, pencil: Pencil,
  clock: Clock, cup: Cup, camera: Camera, headphones: Headphones,
  lightbulb: Lightbulb, mic: Mic, music: Music, laptop: Laptop,
  calendar: CalendarIcon, chart: Chart, checklist: Checklist, watch: Watch,
};

// ─── Floating object (own component so hooks are valid) ───────────────────────
function FloatObj({
  obj, accent, smoothX, smoothY, index,
}: {
  obj: Obj;
  accent: string;
  smoothX: MotionValue<number>;
  smoothY: MotionValue<number>;
  index: number;
}) {
  const px = useTransform(smoothX, [0, 1], [-22 * obj.depth, 22 * obj.depth]);
  const py = useTransform(smoothY, [0, 1], [-14 * obj.depth, 14 * obj.depth]);
  const Svg = OBJ_MAP[obj.id];
  if (!Svg) return null;
  return (
    <motion.div
      className="absolute"
      style={{
        left: `${obj.x}%`,
        top:  `${obj.y}%`,
        width: obj.size,
        height: obj.size,
        translateX: "-50%",
        translateY: "-50%",
        x: px,
        y: py,
        rotate: obj.rotateZ,
        opacity: 0.6 + obj.depth * 0.35,
        filter: `drop-shadow(0 10px 24px ${accent}50) blur(${(1 - obj.depth) * 0.5}px)`,
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{
        opacity: 0.6 + obj.depth * 0.35,
        scale: 1,
        y: [obj.floatAmp * 0.5, -obj.floatAmp * 0.5, obj.floatAmp * 0.5],
      }}
      transition={{
        opacity: { duration: 0.5, delay: index * 0.07 },
        scale:   { duration: 0.65, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] },
        y: { duration: 3.5 + obj.floatOffset, repeat: Infinity, ease: "easeInOut", delay: obj.floatOffset },
      }}
    >
      <Svg c={accent} />
    </motion.div>
  );
}

// ─── Particles ────────────────────────────────────────────────────────────────
const PARTICLES = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x:  (i * 37 + 11) % 100,
  y:  (i * 53 + 17) % 100,
  s:  1.4 + (i % 3) * 1.1,
  dur: 4 + (i % 5) * 1.4,
  del: (i * 0.38) % 6,
  drop: i % 4 === 0,
}));

// ─── Hero content ─────────────────────────────────────────────────────────────
const DEFAULT_C = {
  eyebrow: "Speciality coffee concentrate",
  headline: "Café coffee,\nin seconds.",
  sub: "Pour, add milk or water, and sip. Café-grade coffee at home — no machine, no mess.",
  cta: "Explore",
  ctaSecondary: "How it works",
};

const C_VARIANTS = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const ITEM = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  show:   { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const ITEM_FAST = {
  hidden: { opacity: 0, y: 18 },
  show:   { opacity: 1, y: 0,  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { persona } = usePersona();
  const c = persona ? personaContent[persona].hero : DEFAULT_C;
  const scene = persona ? SCENES[persona] : null;
  const headlineLines = c.headline.split("\n");

  const sectionRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const smoothX = useSpring(rawX, { stiffness: 70, damping: 22, mass: 0.9 });
  const smoothY = useSpring(rawY, { stiffness: 70, damping: 22, mass: 0.9 });

  const pouchRotY = useTransform(smoothX, [0, 1], [-9, 9]);
  const pouchRotX = useTransform(smoothY, [0, 1], [5, -5]);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top)  / r.height);
  };
  const onMouseLeave = () => { rawX.set(0.5); rawY.set(0.5); };

  return (
    <section
      id="top"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Persona background glow */}
      <AnimatePresence>
        {scene && (
          <motion.div
            key={persona}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            style={{ background: `radial-gradient(ellipse 65% 60% at 68% 50%, ${scene.glow} 0%, transparent 70%)` }}
          />
        )}
      </AnimatePresence>

      <div className="container-x grid min-h-[90vh] items-center gap-6 py-12 md:grid-cols-[1fr_1.1fr] md:gap-0 md:py-0">

        {/* ── Copy ── */}
        <motion.div className="order-2 md:order-1 md:py-20" variants={C_VARIANTS} initial="hidden" animate="show">
          <motion.p variants={ITEM} className="label" style={{ color: scene?.accent ?? "var(--theme-accent)" }}>
            {c.eyebrow}
          </motion.p>

          <h1
            className="mt-4 text-[52px] leading-none tracking-tight md:text-[86px] lg:text-[100px]"
            style={{ fontFamily:"var(--vibe-head-font)", fontStyle:"var(--vibe-head-style)", fontWeight:"var(--vibe-head-weight)" }}
          >
            {headlineLines.map((line, i) => (
              <motion.span key={i} variants={ITEM} className="block overflow-hidden">{line}</motion.span>
            ))}
          </h1>

          <motion.p variants={ITEM} className="mt-6 max-w-[420px] text-[17px] leading-[1.65] opacity-70">
            {c.sub}
          </motion.p>

          <motion.div variants={ITEM_FAST} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="#products"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-[13px] font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 focusable"
              style={{ background: scene?.accent ?? "var(--theme-accent)", boxShadow: scene ? `0 8px 28px ${scene.accent}50` : undefined }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {c.cta}
                <Arrow className="h-3.5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </Link>
            <Link href="#how"
              className="inline-flex items-center gap-2 rounded-full border border-current/20 px-7 py-3.5 text-[13px] font-semibold opacity-65 transition-all duration-300 hover:opacity-100 focusable"
            >
              {c.ctaSecondary}
            </Link>
          </motion.div>

          <motion.div variants={ITEM_FAST} className="mt-7 flex items-center gap-3">
            <Stars />
            <span className="text-sm opacity-50">Loved by 2,000+ home baristas</span>
          </motion.div>

          <motion.div variants={ITEM_FAST} className="mt-7 flex flex-wrap gap-2 border-t pt-6"
            style={{ borderColor: "color-mix(in srgb, var(--theme-ink) 10%, transparent)" }}>
            {["₹22 / cup", "20+ drinks", "60-sec brew", "No machine"].map(f => (
              <span key={f} className="vibe-shape border px-3.5 py-1.5 text-[12px] font-medium opacity-55 transition-colors hover:opacity-80"
                style={{ borderColor:"color-mix(in srgb, var(--theme-ink) 12%, transparent)", background:"color-mix(in srgb, var(--theme-ink) 4%, transparent)" }}>
                {f}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* ── 3D Scene ── */}
        <div className="order-1 md:order-2">
          <div className="relative mx-auto flex h-[460px] max-w-[480px] items-center justify-center md:h-[580px]">

            {/* Particles */}
            {PARTICLES.map(p => (
              <motion.div key={p.id} className="pointer-events-none absolute rounded-full"
                style={{
                  left:`${p.x}%`, top:`${p.y}%`,
                  width: p.s, height: p.drop ? p.s * 1.7 : p.s,
                  background: scene?.accent ?? "var(--theme-accent)",
                  borderRadius: p.drop ? "50% 50% 50% 0" : "50%",
                  opacity: 0.2,
                }}
                animate={{ y:[-8,8,-8], opacity:[0.1,0.3,0.1] }}
                transition={{ duration:p.dur, delay:p.del, repeat:Infinity, ease:"easeInOut" }}
              />
            ))}

            {/* Floating 3D objects */}
            <AnimatePresence>
              {scene && scene.objects.map((obj, i) => (
                <FloatObj key={`${persona}-${obj.id}`} obj={obj} accent={scene.accent} smoothX={smoothX} smoothY={smoothY} index={i} />
              ))}
            </AnimatePresence>

            {/* Central pouch / bottle */}
            <motion.div
              className="relative z-10"
              style={{ rotateY: pouchRotY, rotateX: pouchRotX, transformPerspective: 900 }}
            >
              {/* Glow halo */}
              <motion.div className="absolute inset-[-25%] -z-10 blur-[70px]"
                style={{ background: scene
                  ? `radial-gradient(ellipse at 50% 60%, ${scene.accent}45 0%, transparent 70%)`
                  : "radial-gradient(ellipse at 50% 60%, var(--theme-accent-soft) 0%, transparent 70%)" }}
                animate={{ scale:[1,1.08,1] }}
                transition={{ duration:4.5, repeat:Infinity, ease:"easeInOut" }}
              />

              <AnimatePresence mode="wait">
                {scene ? (
                  <motion.div key={scene.image}
                    initial={{ opacity:0, scale:0.88, filter:"blur(12px)" }}
                    animate={{ opacity:1, scale:1,    filter:"blur(0px)"  }}
                    exit={{    opacity:0, scale:0.94,  filter:"blur(6px)"  }}
                    transition={{ duration:0.7, ease:[0.22,1,0.36,1] }}
                    className="relative h-[300px] w-[200px] md:h-[400px] md:w-[270px]"
                  >
                    <Image src={scene.image} alt="INHAUS product" fill priority
                      className="object-contain"
                      style={{ filter:`contrast(1.1) saturate(1.18) drop-shadow(0 28px 56px rgba(0,0,0,0.65)) drop-shadow(0 0 36px ${scene.accent}45)` }}
                    />
                  </motion.div>
                ) : (
                  <motion.div key="bottle"
                    initial={{ opacity:0, scale:0.9, filter:"blur(12px)" }}
                    animate={{ opacity:1, scale:1,   filter:"blur(0px)"  }}
                    exit={{    opacity:0, scale:0.95, filter:"blur(6px)"  }}
                    transition={{ duration:0.9, ease:[0.22,1,0.36,1] }}
                    className="relative z-10 w-[220px] md:w-[280px]"
                  >
                    <InhausBottle className="w-full max-h-[500px]" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

          </div>
        </div>

      </div>
    </section>
  );
}

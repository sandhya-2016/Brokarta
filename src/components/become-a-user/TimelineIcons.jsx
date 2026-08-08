import React from "react";

export function ShieldSphere() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,204,156,0.3)]">
      <defs>
        {/* Outer glass sphere gradient */}
        <radialGradient id="sphereGrad" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="50%" stopColor="#00cc9c" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#013144" stopOpacity="0.8" />
        </radialGradient>
        {/* Glowing shield gradient */}
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc9c" />
          <stop offset="100%" stopColor="#f6a200" />
        </linearGradient>
        {/* Glow filter */}
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer glow ring */}
      <circle cx="100" cy="100" r="75" fill="none" stroke="#00cc9c" strokeWidth="1.5" strokeOpacity="0.25" strokeDasharray="5 3" />

      {/* Main glass sphere body */}
      <circle cx="100" cy="100" r="70" fill="url(#sphereGrad)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

      {/* Elegant orbital network lines */}
      <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke="url(#shieldGrad)" strokeWidth="1.5" strokeOpacity="0.6" transform="rotate(-30 100 100)" strokeDasharray="6 4" />
      <ellipse cx="100" cy="100" rx="70" ry="25" fill="none" stroke="#00cc9c" strokeWidth="1" strokeOpacity="0.4" transform="rotate(30 100 100)" />

      {/* Core glowing nodes representing verified network endpoints */}
      <circle cx="50" cy="70" r="4" fill="#00cc9c" filter="url(#glow)" />
      <circle cx="150" cy="130" r="4" fill="#f6a200" filter="url(#glow)" />
      <circle cx="100" cy="30" r="3" fill="#ffffff" />
      <circle cx="100" cy="170" r="3" fill="#00cc9c" />

      {/* Glowing Shield at the center */}
      <g transform="translate(75, 70) scale(0.5)" filter="url(#glow)">
        {/* Shield Path */}
        <path
          d="M50,15 C80,15 90,5 90,5 C90,5 90,55 90,65 C90,95 50,115 50,115 C50,115 10,95 10,65 C10,55 10,5 10,5 C10,5 20,15 50,15 Z"
          fill="url(#shieldGrad)"
          stroke="#ffffff"
          strokeWidth="3"
          opacity="0.9"
        />
        {/* Inner Checkmark representing "Verified" */}
        <path
          d="M33,60 L45,72 L68,45"
          fill="none"
          stroke="#013144"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

export function DealPipeline() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,204,156,0.3)]">
      <defs>
        <linearGradient id="dealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc9c" />
          <stop offset="100%" stopColor="#f6a200" />
        </linearGradient>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Curved tracking pipeline route */}
      <path d="M40,130 C70,130 60,70 100,70 C140,70 130,130 160,130" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="4" />
      <path d="M40,130 C70,130 60,70 100,70 C140,70 130,130 160,130" fill="none" stroke="url(#dealGrad)" strokeWidth="2" strokeDasharray="6 4" />

      {/* Stage 1: Lead/Deal Start */}
      <circle cx="40" cy="130" r="12" fill="#013144" stroke="#00cc9c" strokeWidth="2" />
      <circle cx="40" cy="130" r="5" fill="#00cc9c" />
      <text x="40" y="155" fill="#ffffff" fillOpacity="0.7" fontSize="10" fontWeight="bold" textAnchor="middle">LEAD</text>

      {/* Stage 2: Active Mandate / Negotiate */}
      <circle cx="100" cy="70" r="14" fill="#013144" stroke="#f6a200" strokeWidth="2" filter="url(#glow)" />
      <path d="M93,70 L107,70 M100,63 L100,77" fill="none" stroke="#f6a200" strokeWidth="2.5" />
      <text x="100" y="95" fill="#ffffff" fillOpacity="0.7" fontSize="10" fontWeight="bold" textAnchor="middle">NEGOTIATE</text>

      {/* Stage 3: Closed Deal (Handshake / Checked Badge) */}
      <circle cx="160" cy="130" r="16" fill="url(#dealGrad)" filter="url(#glow)" />
      {/* Checkmark inside closed badge */}
      <path d="M152,130 L157,135 L168,124" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="160" y="160" fill="#ffffff" fillOpacity="0.9" fontSize="10" fontWeight="bold" textAnchor="middle">WON</text>
    </svg>
  );
}

export function ListingsSheets() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(246,162,0,0.25)]">
      <defs>
        <linearGradient id="g3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc9c" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#013144" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="g3Border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f6a200" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      <g transform="rotate(-10 100 100)">
        {/* Back Card */}
        <rect x="50" y="60" width="90" height="90" rx="12" fill="#012535" fillOpacity="0.8" stroke="url(#g3Border)" strokeWidth="1.5" />
        {/* Middle Card */}
        <rect x="65" y="45" width="90" height="90" rx="12" fill="url(#g3)" fillOpacity="0.6" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.5" />
        {/* Front Card */}
        <rect x="80" y="30" width="90" height="90" rx="12" fill="#013144" fillOpacity="0.9" stroke="#00cc9c" strokeWidth="2" />

        {/* Card Content details (Reputation badge & stats lines) */}
        <circle cx="105" cy="55" r="12" fill="#f6a200" fillOpacity="0.9" />
        <path d="M101,55 L104,58 L110,52" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />

        <rect x="125" y="48" width="30" height="5" rx="2.5" fill="#ffffff" fillOpacity="0.8" />
        <rect x="125" y="58" width="20" height="4" rx="2" fill="#ffffff" fillOpacity="0.5" />

        <rect x="98" y="78" width="55" height="4" rx="2" fill="#ffffff" fillOpacity="0.3" />
        <rect x="98" y="88" width="45" height="4" rx="2" fill="#ffffff" fillOpacity="0.3" />
        <rect x="98" y="98" width="35" height="4" rx="2" fill="#ffffff" fillOpacity="0.3" />
      </g>
    </svg>
  );
}

export function SignalScanner() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,204,156,0.3)]">
      <defs>
        <linearGradient id="sigGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc9c" />
          <stop offset="100%" stopColor="#f6a200" />
        </linearGradient>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* Radar Sweep Arc */}
      <circle cx="100" cy="100" r="70" fill="none" stroke="#00cc9c" strokeWidth="1.5" strokeOpacity="0.2" />
      <circle cx="100" cy="100" r="45" fill="none" stroke="#00cc9c" strokeWidth="1" strokeOpacity="0.15" />

      {/* Dotted Radar Lines */}
      <line x1="30" y1="100" x2="170" y2="100" stroke="#00cc9c" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />
      <line x1="100" y1="30" x2="100" y2="170" stroke="#00cc9c" strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 4" />

      {/* Faded Background noise nodes */}
      <circle cx="60" cy="70" r="3" fill="#ffffff" opacity="0.2" />
      <circle cx="140" cy="65" r="3" fill="#ffffff" opacity="0.2" />
      <circle cx="70" cy="130" r="3" fill="#ffffff" opacity="0.2" />

      {/* One SHARP Targeted Signal Beam focusing on target */}
      <path d="M100,100 L130,120" stroke="url(#sigGrad)" strokeWidth="3" strokeLinecap="round" filter="url(#glow)" />
      <circle cx="100" cy="100" r="8" fill="#00cc9c" />

      {/* The Vetted Vigorously Target Signal Lead */}
      <circle cx="130" cy="120" r="12" fill="url(#sigGrad)" filter="url(#glow)" />
      <path d="M125,120 L129,124 L136,116" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Signal waves propagating from target */}
      <circle cx="130" cy="120" r="22" fill="none" stroke="#f6a200" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="4 3" />
    </svg>
  );
}

export function CoBrokingLinks() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,204,156,0.35)]">
      <defs>
        <linearGradient id="avatarTeal" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc9c" />
          <stop offset="100%" stopColor="#013144" />
        </linearGradient>
        <linearGradient id="avatarOrange" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f6a200" />
          <stop offset="100%" stopColor="#013144" />
        </linearGradient>
        <linearGradient id="avatarWhite" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#02647e" />
        </linearGradient>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Connecting Network Pipes forming a triangle */}
      <polygon points="100,55 145,130 55,130" fill="none" stroke="#ffffff" strokeOpacity="0.2" strokeWidth="4" />
      <polygon points="100,55 145,130 55,130" fill="none" stroke="url(#avatarTeal)" strokeWidth="2" strokeDasharray="5 4" filter="url(#glow)" />

      {/* Center glowing mandate/check indicator */}
      <circle cx="100" cy="105" r="14" fill="#012535" stroke="#00cc9c" strokeWidth="2" />
      <path d="M94,105 L98,109 L107,100" fill="none" stroke="#00cc9c" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" filter="url(#glow)" />

      {/* USER 1 (Top) - Teal Theme */}
      <g transform="translate(100, 55)">
        <circle cx="0" cy="0" r="22" fill="url(#avatarTeal)" stroke="#ffffff" strokeWidth="1.5" filter="url(#glow)" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="#00cc9c" strokeWidth="2" />
        {/* Avatar Silhouette */}
        <circle cx="0" cy="-4" r="6" fill="#ffffff" />
        <path d="M-12,12 C-12,5 -6,4 0,4 C6,4 12,5 12,12 Z" fill="#ffffff" />
      </g>

      {/* USER 2 (Bottom-Left) - Orange Theme */}
      <g transform="translate(55, 130)">
        <circle cx="0" cy="0" r="22" fill="url(#avatarOrange)" stroke="#ffffff" strokeWidth="1.5" filter="url(#glow)" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="#f6a200" strokeWidth="2" />
        {/* Avatar Silhouette */}
        <circle cx="0" cy="-4" r="6" fill="#ffffff" />
        <path d="M-12,12 C-12,5 -6,4 0,4 C6,4 12,5 12,12 Z" fill="#ffffff" />
      </g>

      {/* USER 3 (Bottom-Right) - White/Blue Theme */}
      <g transform="translate(145, 130)">
        <circle cx="0" cy="0" r="22" fill="url(#avatarWhite)" stroke="#ffffff" strokeWidth="1.5" filter="url(#glow)" />
        <circle cx="0" cy="0" r="22" fill="none" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.8" />
        {/* Avatar Silhouette */}
        <circle cx="0" cy="-4" r="6" fill="#ffffff" />
        <path d="M-12,12 C-12,5 -6,4 0,4 C6,4 12,5 12,12 Z" fill="#ffffff" />
      </g>
    </svg>
  );
}

export function ToolsDashboard() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_0_25px_rgba(0,204,156,0.35)]">
      <defs>
        <linearGradient id="dashGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00cc9c" />
          <stop offset="100%" stopColor="#f6a200" />
        </linearGradient>
        <filter id="glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      {/* The Central Consolidation Dashboard (Folder/Screen shape) */}
      <rect x="55" y="60" width="90" height="75" rx="8" fill="#012535" stroke="url(#dashGrad)" strokeWidth="3" filter="url(#glow)" />
      <rect x="55" y="60" width="90" height="75" rx="8" fill="#012535" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.4" />

      {/* Layout bars in the unified dashboard */}
      <rect x="68" y="72" width="22" height="18" rx="2" fill="#00cc9c" fillOpacity="0.3" />
      <rect x="96" y="72" width="36" height="6" rx="1.5" fill="#ffffff" fillOpacity="0.7" />
      <rect x="96" y="82" width="26" height="5" rx="1" fill="#ffffff" fillOpacity="0.4" />

      <rect x="68" y="98" width="64" height="6" rx="1.5" fill="#ffffff" fillOpacity="0.3" />
      <rect x="68" y="110" width="50" height="6" rx="1.5" fill="#ffffff" fillOpacity="0.3" />

      {/* Scattered tools merging into the dashboard */}
      {/* Floating File/Sheet Tool */}
      <g transform="translate(35, 45) rotate(-15)">
        <rect x="0" y="0" width="24" height="28" rx="4" fill="#00cc9c" filter="url(#glow)" />
        <line x1="5" y1="8" x2="15" y2="8" stroke="#013144" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="14" x2="19" y2="14" stroke="#013144" strokeWidth="2" strokeLinecap="round" />
        <line x1="5" y1="20" x2="12" y2="20" stroke="#013144" strokeWidth="2" strokeLinecap="round" />
      </g>

      {/* Floating Finance/Deal Tag */}
      <g transform="translate(138, 40) rotate(15)">
        <rect x="0" y="0" width="28" height="24" rx="4" fill="#f6a200" filter="url(#glow)" />
        {/* Dollar sign symbol */}
        <text x="14" y="17" fill="#013144" fontSize="12" fontWeight="black" textAnchor="middle">$</text>
      </g>

      {/* Dotted lines showing inflow to center */}
      <path d="M60,45 C75,55 75,60 80,60" fill="none" stroke="#00cc9c" strokeWidth="1.5" strokeDasharray="3 3" />
      <path d="M140,48 C130,55 125,60 120,60" fill="none" stroke="#f6a200" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

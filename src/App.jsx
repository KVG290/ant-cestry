import React, { useState } from 'react';

// Custom Ant SVG Icon Component with Caste Customization
const AntAvatar = ({ caste = 'worker', size = 48, className = '' }) => {
  const getCasteColors = () => {
    switch (caste) {
      case 'queen':
        return { body: '#c026d3', accent: '#f59e0b', eye: '#fbbf24', crown: true };
      case 'soldier':
        return { body: '#dc2626', accent: '#991b1b', eye: '#fca5a5', crown: false };
      case 'drone':
        return { body: '#2563eb', accent: '#1d4ed8', eye: '#93c5fd', crown: false };
      case 'forager':
        return { body: '#059669', accent: '#047857', eye: '#6ee7b7', crown: false };
      case 'nurse':
      default:
        return { body: '#d97706', accent: '#b45309', eye: '#fde68a', crown: false };
    }
  };

  const colors = getCasteColors();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="filter drop-shadow-md"
      >
        <path d="M22 28L10 20M22 32L8 32M22 36L12 46" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M42 28L54 20M42 32L56 32M42 36L52 46" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M28 16Q24 8 16 10" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M36 16Q40 8 48 10" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" fill="none" />
        <circle cx="32" cy="18" r="7" fill={colors.body} />
        <circle cx="29" cy="16" r="1.8" fill={colors.eye} />
        <circle cx="35" cy="16" r="1.8" fill={colors.eye} />
        <ellipse cx="32" cy="30" rx="5.5" ry="6" fill={colors.body} />
        <ellipse cx="32" cy="45" rx="8.5" ry="11" fill={colors.body} />
        {colors.crown && (
          <path d="M26 12L28 8L32 11L36 8L38 12Z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
        )}
      </svg>
    </div>
  );
};

export default function App() {
  const [isAntiGravity, setIsAntiGravity] = useState(false);
  const [hasCrashed, setHasCrashed] = useState(false);
  const [showGravityToast, setShowGravityToast] = useState(false);
  const [activeTab, setActiveTab] = useState('tree'); // 'tree' | 'census' | 'mingle'
  const [generationFilter, setGenerationFilter] = useState('all');
  const [selectedAnt, setSelectedAnt] = useState(null);

  // Colony Senses State
  const [sensoryData, setSensoryData] = useState({
    olfaction: '1.44 µM/s',
    vibration: '0.02 mm/s²',
    temp: '28.4 °C',
    status: 'Live Feed'
  });
  const [isSweeping, setIsSweeping] = useState(false);

  // Ant-Mingle State
  const [mingleIndex, setMingleIndex] = useState(0);
  const [swipeFeedback, setSwipeFeedback] = useState(null);

  const mingleProfiles = [
    {
      handle: 'Thorax_Lover_99',
      age: '14 days old',
      caste: 'soldier',
      distance: '12 cm away (Outpost Mound #4)',
      mandibleScore: '94.2 MPa',
      bio: 'Looking for someone with 6 long legs and a sweet tooth for honeydew. Swipe right if your mandible score > 80 MPa.',
      tags: ['Non-Cousin Certified', 'Honeydew Addict', 'Night Forager']
    },
    {
      handle: 'Queen_B_Vibes',
      age: '28 days old',
      caste: 'queen',
      distance: '3.4 meters away (Pine Needle Chamber)',
      mandibleScore: '112.0 MPa',
      bio: 'Alate princess seeking an un-related royal consort for next spring’s nuptial flight. No drones without pheromone verification.',
      tags: ['Pre-Flight', 'Royal Bloodline', 'Unrelated Gen 0']
    },
    {
      handle: 'SugarSeeker_404',
      age: '9 days old',
      caste: 'forager',
      distance: '45 cm away (Picnic Table Leg 2)',
      mandibleScore: '76.8 MPa',
      bio: 'I can lead you to the most pristine spilled strawberry soda you have ever tasted. Swipe right for instant trail coordinates.',
      tags: ['Fast Legs', 'Trail Pioneer', 'Sweet Tooth']
    }
  ];

  // Pheromone Translation & Glitch State
  const [isPheromoneMode, setIsPheromoneMode] = useState(false);
  const [showPheromoneToast, setShowPheromoneToast] = useState(false);

  // Paywall Loop Modal State
  const [showPaywallLoopModal, setShowPaywallLoopModal] = useState(false);

  // Magnifying Glass Sunbeam Simulator State
  const [isMagnifyingActive, setIsMagnifyingActive] = useState(false);
  const [sunbeamPos, setSunbeamPos] = useState({ x: -200, y: -200 });
  const [burningAntId, setBurningAntId] = useState(null);
  const [showMagToast, setShowMagToast] = useState(false);
  const [smokePuffs, setSmokePuffs] = useState([]);

  const handleToggleGravity = () => {
    if (!isAntiGravity) {
      setIsAntiGravity(true);
      setHasCrashed(false);
      setShowGravityToast(true);
    } else {
      setIsAntiGravity(false);
      setShowGravityToast(false);
      setHasCrashed(true);
      setTimeout(() => setHasCrashed(false), 550);
    }
  };

  const handleToggleMagnifying = () => {
    setIsMagnifyingActive(prev => {
      const next = !prev;
      setShowMagToast(next);
      if (!next) setBurningAntId(null);
      return next;
    });
  };

  const handleMouseMove = (e) => {
    if (!isMagnifyingActive) return;
    setSunbeamPos({ x: e.clientX, y: e.clientY });

    // Spawn smoke puff if burning
    if (burningAntId && Math.random() > 0.65) {
      const newPuff = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 12 + 10,
        driftX: Math.random() * 30 - 15
      };
      setSmokePuffs(prev => [...prev.slice(-12), newPuff]);
      setTimeout(() => {
        setSmokePuffs(prev => prev.filter(p => p.id !== newPuff.id));
      }, 850);
    }
  };


  const handleRunSensorySweep = () => {
    setIsSweeping(true);
    setSensoryData(prev => ({ ...prev, status: 'SWEEPING CHAMBERS...' }));

    setTimeout(() => {
      setSensoryData({
        olfaction: (Math.random() * 0.4 + 1.2).toFixed(2) + ' µM/s',
        vibration: (Math.random() * 0.04 + 0.01).toFixed(3) + ' mm/s²',
        temp: (Math.random() * 0.4 + 28.2).toFixed(1) + ' °C',
        status: 'SWEEP COMPLETE (99.9% SYNC)'
      });
      setIsSweeping(false);
    }, 700);
  };

  const handleSwipe = (direction) => {
    setSwipeFeedback(direction === 'like' ? 'MATCH REQUEST SENT (0.01% COUSIN OVERLAP)' : 'PHEROMONE REJECTED');
    setTimeout(() => {
      setSwipeFeedback(null);
      setMingleIndex((prev) => (prev + 1) % mingleProfiles.length);
    }, 450);
  };

  const p = (originalText) => {
    if (!isPheromoneMode) return originalText;
    const glyphs = ['⌬', '⚗', '≋', '𓆣', '𓆦', '░', '▒', '▓', '🜂', '🜁', '∿', '☍', 'ꙮ', '☣', '☿', '⚶'];
    return originalText
      .split('')
      .map((char) => (char === ' ' ? ' ' : glyphs[char.charCodeAt(0) % glyphs.length]))
      .join('');
  };

  const currentMingleProfile = mingleProfiles[mingleIndex];

  const antDatabase = [
    {
      id: 'queen-1',
      name: 'Her Majesty Chrysalis IV',
      caste: 'queen',
      role: 'Imperial Founding Matriarch',
      generation: '0',
      genLabel: 'Gen 0 • Founding Dynasty',
      clutchSize: '1,450,000 brood eggs',
      mandibleScore: '98.5 MPa (Nutrient Shearing)',
      floatClass: 'float-queen',
      badge: 'Dynasty Head',
      bio: 'Emerged during the Great Nuptial Flight of Year 4. Founded Colony 774 from a solitary subterranean quartz vault. Mother to all living castes in the mound.'
    },
    {
      id: 'consort-1',
      name: 'Drone Zephyr-Prime',
      caste: 'drone',
      role: 'Royal Consort Lineage',
      generation: '0',
      genLabel: 'Gen 0 • Alate Consort',
      clutchSize: 'Sire of Gen 1 Guilds',
      mandibleScore: '64.2 MPa',
      floatClass: 'float-node-1',
      badge: 'Alate Line',
      bio: 'Flew against 30km/h headwinds to reach the royal nuptial cluster. Genetic progenitor of the primary soldier and worker guilds.'
    },
    {
      id: 'princess-1',
      name: 'Princess Formica-9',
      caste: 'queen',
      role: 'Alate Crown Princess',
      generation: '1',
      genLabel: 'Gen 1 • Alate Princess',
      clutchSize: '94% Flight Wing Prep',
      mandibleScore: '92.1 MPa',
      floatClass: 'float-node-2',
      badge: 'Next Matriarch',
      bio: 'Currently developing wing muscles and nutrient fat bodies in Chamber A. Designated to lead the next spring territorial expansion.'
    },
    {
      id: 'soldier-1',
      name: 'General Mandible',
      caste: 'soldier',
      role: 'Chief Nest Sentinel',
      generation: '1',
      genLabel: 'Gen 1 • Major Soldier',
      clutchSize: '14 Termite Victories',
      mandibleScore: '184.7 MPa (Crushing Jaws)',
      floatClass: 'float-node-3',
      badge: 'Iron Jaws',
      bio: 'Armored head capsule acts as an impenetrable living barricade in Tunnel Chokepoints. Personally repelled 14 termite attacks.'
    },
    {
      id: 'forager-1',
      name: 'Scout Six-Legs',
      caste: 'forager',
      role: 'Master Sugar Pioneer',
      generation: '1',
      genLabel: 'Gen 1 • Master Forager',
      clutchSize: '42 Aphid Pastures Found',
      mandibleScore: '88.3 MPa',
      floatClass: 'float-node-4',
      badge: 'Top Forager',
      bio: 'Charted the 380-meter picnic table corridor. Master of pheromone trail precision, guiding thousands of workers to sweet nectar daily.'
    },
    {
      id: 'nurse-1',
      name: 'Nurse Velvet',
      caste: 'nurse',
      role: 'Egg & Larval Custodian',
      generation: '1',
      genLabel: 'Gen 1 • Brood Nurse',
      clutchSize: '85,000 Larvae Tended',
      mandibleScore: '72.0 MPa (±0.2°C temp control)',
      floatClass: 'float-node-2',
      badge: 'Golden Brood',
      bio: 'Maintains optimal 28.4°C humidity in Chamber B incubation vaults. Feeds royal larvae specialized royal jelly secretions.'
    },
    {
      id: 'cohort-102',
      name: 'Brood Cohort #102',
      caste: 'forager',
      role: 'Excavation & Tunnel Architecture',
      generation: '2',
      genLabel: 'Gen 2 • Minor Workers',
      clutchSize: '420,000 Minor Workers',
      mandibleScore: '65.0 MPa',
      floatClass: 'float-node-1',
      badge: 'Diggers',
      bio: '420,000 newly hatched minor workers actively expanding the southern gallery tunnels into nutrient-rich loam.'
    },
    {
      id: 'cohort-sentry',
      name: 'Iron Phalanx Guard',
      caste: 'soldier',
      role: 'Perimeter Defense Squadron',
      generation: '2',
      genLabel: 'Gen 2 • Defensive Legion',
      clutchSize: '85,000 Sentry Soldiers',
      mandibleScore: '175.2 MPa',
      floatClass: 'float-node-3',
      badge: 'Defenders',
      bio: '85,000 soldiers on permanent standby guarding the central food stores against rival Formica colonies.'
    }
  ];

  const filteredAnts = antDatabase.filter(
    ant => generationFilter === 'all' || ant.generation === generationFilter
  );

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`min-h-screen bg-slate-950 text-slate-100 transition-colors duration-700 relative overflow-x-hidden selection:bg-red-500 selection:text-white ${
        isAntiGravity ? 'antigravity-active' : ''
      } ${hasCrashed ? 'just-crashed camera-shake' : ''} ${isPheromoneMode ? 'screen-glitched' : ''}`}
    >

      {/* Zero-G Dust Particles Container */}
      {isAntiGravity && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-purple-950/10 to-slate-950/40" />
          {[...Array(24)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-400/40"
              style={{
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `particleAscent ${Math.random() * 6 + 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
        </div>
      )}

      {/* RIDICULOUS PAYWALL BANNER */}
      <div className="float-paywall sticky top-0 z-50 paywall-gradient text-slate-950 font-bold px-4 py-2 border-b border-amber-400/60 shadow-lg flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
        <div className="flex items-center space-x-2">
          <span className="p-1 bg-slate-950 text-amber-400 rounded-md text-[10px] uppercase font-mono tracking-widest">
            {p("FREE TIER")}
          </span>
          <span className="font-semibold tracking-tight">
            {p("You are on the Free Tier (5 Ants Remaining). Upgrade to Enterprise Swarm Management for $49.99/month.")}
          </span>
        </div>
        <button
          onClick={() => setShowPaywallLoopModal(true)}
          className="px-3.5 py-1 bg-slate-950 hover:bg-slate-900 text-amber-400 font-mono text-xs font-bold rounded-lg border border-amber-300 shadow-sm transition-transform active:scale-95 cursor-pointer"
        >
          {p("Upgrade Now →")}
        </button>
      </div>

      {/* Main Navigation Bar */}
      <header className="relative z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('tree')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-red-600 to-amber-400 p-0.5 shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <AntAvatar caste="queen" size={26} />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-extrabold text-lg sm:text-xl tracking-tight bg-gradient-to-r from-amber-400 via-orange-300 to-red-400 bg-clip-text text-transparent">
                  {p("Ant-cestry Pro™")}
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                  {p("Colony 774")}
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                {p("Colony Pedigree & Sensory Matrix Explorer")}
              </p>
            </div>
          </div>

          {/* Fully Operational Navigation Tabs */}
          <nav className="flex items-center space-x-2 sm:space-x-4 text-xs sm:text-sm font-medium">
            <button
              onClick={() => setActiveTab('tree')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'tree'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              <span>👑</span>
              <span>{p("Family Tree")}</span>
            </button>

            <button
              onClick={() => setActiveTab('census')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'census'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold'
                  : 'text-slate-400 hover:text-emerald-300 hover:bg-slate-800 border border-transparent'
              }`}
            >
              <span>📊</span>
              <span>{p("Colony Census & Senses")}</span>
            </button>

            <button
              onClick={() => setActiveTab('mingle')}
              className={`px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === 'mingle'
                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold'
                  : 'text-slate-400 hover:text-pink-300 hover:bg-slate-800 border border-transparent'
              }`}
            >
              <span>🐜💕</span>
              <span>{p("Ant-Mingle")}</span>
            </button>
          </nav>

          {/* SLEEK RED TOGGLE: "import antigravity" */}
          <div className="flex items-center space-x-3 bg-slate-950/80 border border-slate-800/90 rounded-full px-3.5 py-1.5 shadow-inner">
            <div className="flex flex-col items-end">
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-mono tracking-widest">
                  {p("sys.protocol")}
                </span>
                {isAntiGravity && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                )}
              </div>
              <span className="font-mono text-xs font-semibold tracking-tight text-slate-200">
                <span className="text-red-400">import</span> antigravity
              </span>
            </div>

            <button
              onClick={handleToggleGravity}
              role="switch"
              aria-checked={isAntiGravity}
              aria-label="Toggle Anti-Gravity Protocol"
              className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 transition-all duration-300 ease-in-out focus:outline-none ${
                isAntiGravity
                  ? 'bg-red-600 border-red-500 red-toggle-glow'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ease-in-out mt-[2px] ml-[2px] flex items-center justify-center ${
                  isAntiGravity ? 'translate-x-7 bg-white' : 'translate-x-0 bg-slate-400'
                }`}
              >
                {isAntiGravity ? (
                  <svg className="w-3 h-3 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L4 10h5v10h6V10h5L12 2z" />
                  </svg>
                ) : (
                  <svg className="w-2.5 h-2.5 text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22l8-8h-5V4h-6v10H4l8 8z" />
                  </svg>
                )}
              </span>
            </button>
          </div>

          {/* MAGNIFYING GLASS SUNBEAM TOGGLE */}
          <button
            onClick={handleToggleMagnifying}
            className={`px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all text-xs font-mono font-bold cursor-pointer ${
              isMagnifyingActive
                ? 'bg-orange-600 text-white border-2 border-yellow-300 shadow-lg shadow-orange-600/40 animate-pulse'
                : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/40'
            }`}
            title="Neighbor's Kid Magnifying Glass Mode"
          >
            <span>🔍☀️</span>
            <span>{isMagnifyingActive ? 'Sunbeam: ACTIVE 🔥' : 'Sunbeam: OFF'}</span>
          </button>

        </div>
      </header>

      {/* SUNBEAM FOCAL SPOT CURSOR (Tracks mouse in Magnifying Glass Mode) */}
      {isMagnifyingActive && (
        <div
          className="fixed pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2"
          style={{ left: sunbeamPos.x, top: sunbeamPos.y }}
        >
          <div className="relative flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border border-amber-300/40 bg-amber-400/10 blur-[2px] animate-ping" />
            <div className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-yellow-100 via-amber-300 to-orange-500 sunbeam-focal-spot" />
            <div className="absolute text-[9px] font-mono font-black text-amber-950 bg-amber-300/90 px-1.5 py-0.5 rounded shadow top-12 whitespace-nowrap">
              🔥 450°C FOCAL BEAM
            </div>
          </div>
        </div>
      )}

      {/* DYNAMIC SMOKE PUFFS */}
      {smokePuffs.map(puff => (
        <div
          key={puff.id}
          className="fixed rounded-full bg-slate-200/60 blur-[2px] smoke-puff z-50"
          style={{
            left: puff.x - puff.size / 2,
            top: puff.y - puff.size / 2,
            width: puff.size,
            height: puff.size,
            '--smoke-x': `${puff.driftX}px`
          }}
        />
      ))}

      {/* TOAST NOTIFICATION 3: MAGNIFYING GLASS PANIC ALERT */}
      {showMagToast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 max-w-lg w-full px-4 animate-toast">
          <div className="bg-orange-950/95 border-2 border-orange-500 rounded-2xl p-4 shadow-2xl shadow-orange-950/90 backdrop-blur-xl flex items-start space-x-3 text-slate-100">
            <div className="p-2.5 bg-orange-500/20 text-orange-400 rounded-xl border border-orange-500/40 shrink-0 text-2xl animate-bounce">
              ☀️🔍
            </div>
            <div className="flex-1 pr-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold font-mono tracking-wider uppercase text-orange-300 bg-orange-900/80 px-2 py-0.5 rounded border border-orange-500/40 animate-pulse">
                  CODE RED: SUNBEAM INCURSION
                </span>
              </div>
              <p className="mt-1 text-sm font-black text-orange-200 leading-snug">
                EMERGENCY: THE NEIGHBOR'S KID HAS A MAGNIFYING GLASS! EVACUATE TO CHAMBER 4 IMMEDIATELY!
              </p>
              <p className="text-xs text-orange-300/80 mt-1">
                Hover over any ant card or avatar to focus burning heat. Ants will panic scurry and emit smoke!
              </p>
            </div>
            <button
              onClick={() => setShowMagToast(false)}
              className="text-orange-400 hover:text-orange-200 transition-colors p-1 rounded-lg hover:bg-orange-900/50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}


      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8 relative z-10">

        {/* Quick Vitals Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div
            onClick={() => setActiveTab('census')}
            className="float-widget-1 bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 backdrop-blur-sm cursor-pointer transition-colors"
          >
            <div className="text-[10px] uppercase font-mono text-slate-400">{p("Colony Census")}</div>
            <div className="text-xl sm:text-2xl font-black text-slate-100 font-mono">1,248,500</div>
            <div className="text-[11px] text-emerald-400">{p("↑ +4,200 hatched")}</div>
          </div>

          <div
            onClick={() => setActiveTab('census')}
            className="float-widget-2 bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 backdrop-blur-sm cursor-pointer transition-colors"
          >
            <div className="text-[10px] uppercase font-mono text-slate-400">{p("Aphid Honeydew")}</div>
            <div className="text-xl sm:text-2xl font-black text-amber-400 font-mono">94,200 µg</div>
            <div className="text-[11px] text-emerald-400">{p("18 pastures active")}</div>
          </div>

          <div
            onClick={() => setActiveTab('census')}
            className="float-widget-3 bg-slate-900/70 border border-slate-800 hover:border-amber-500/40 rounded-2xl p-4 backdrop-blur-sm cursor-pointer transition-colors"
          >
            <div className="text-[10px] uppercase font-mono text-slate-400">{p("Colony Senses")}</div>
            <div className="text-xl sm:text-2xl font-black text-purple-400 font-mono">99.8% Sync</div>
            <div className="text-[11px] text-purple-300">{p("Chemoreception optimal")}</div>
          </div>

          <div className="float-widget-4 bg-slate-900/70 border border-slate-800 rounded-2xl p-4 backdrop-blur-sm">
            <div className="text-[10px] uppercase font-mono text-slate-400">{p("Chamber Depth")}</div>
            <div className="text-xl sm:text-2xl font-black text-blue-400 font-mono">-42.8 cm</div>
            <div className="text-[11px] text-slate-400">{p("Subterranean Sector 4-B")}</div>
          </div>
        </div>

        {/* TAB 1: THE INTERACTIVE FAMILY TREE */}
        {activeTab === 'tree' && (
          <div className="space-y-8">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <div>
                <h2 className="text-lg sm:text-xl font-black text-slate-100 flex items-center gap-2">
                  <span>👑</span>
                  <span>{p("The Royal Ant Pedigree Hierarchy")}</span>
                  <span className="text-xs font-mono font-normal text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                    Interactive Tree
                  </span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  {p("Click any ant card below to inspect pedigree credentials, mandible strength, and lineage dossier.")}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 mr-1">Filter Gen:</span>
                {['all', '0', '1', '2'].map((g) => (
                  <button
                    key={g}
                    onClick={() => setGenerationFilter(g)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono transition-all ${
                      generationFilter === g
                        ? 'bg-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                    }`}
                  >
                    {g === 'all' ? 'All' : `Gen ${g}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAnts.map((ant) => (
                <div
                  key={ant.id}
                  onClick={() => setSelectedAnt(ant)}
                  onMouseEnter={() => {
                    if (isMagnifyingActive) setBurningAntId(ant.id);
                  }}
                  onMouseLeave={() => {
                    if (burningAntId === ant.id) setBurningAntId(null);
                  }}
                  className={`${ant.floatClass} ${
                    burningAntId === ant.id ? 'ant-burning' : ''
                  } group relative bg-slate-900/80 border border-slate-800 hover:border-amber-500/60 rounded-3xl p-6 transition-all duration-300 shadow-xl cursor-pointer hover:shadow-2xl hover:shadow-amber-500/10`}
                >

                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-14 h-14 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center p-2 group-hover:border-amber-500/40 transition-colors shadow-inner">
                        <AntAvatar caste={ant.caste} size={42} />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded">
                          {ant.genLabel}
                        </span>
                        <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-400 transition-colors mt-0.5">
                          {p(ant.name)}
                        </h3>
                        <p className="text-xs text-slate-400">{ant.role}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                      {ant.badge}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-800/80 text-xs">
                    <div>
                      <span className="text-slate-500 block font-mono text-[10px]">MANDIBLE PSI</span>
                      <span className="font-semibold text-slate-200">{ant.mandibleScore}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block font-mono text-[10px]">RECORD</span>
                      <span className="font-semibold text-slate-200 truncate block">{ant.clutchSize}</span>
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {p(ant.bio)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: COLONY CENSUS & COLONY SENSES */}
        {activeTab === 'census' && (
          <div className="space-y-8">
            <div className="bg-slate-900/60 p-5 rounded-3xl border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-black text-white flex items-center gap-2">
                  <span>📊</span>
                  <span>{p("Colony Census & Sensory Matrix")}</span>
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {p("Real-time biological demographics and subterranean antenna sensor feeds.")}
                </p>
              </div>
              <button
                onClick={handleRunSensorySweep}
                disabled={isSweeping}
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-mono text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
              >
                <span>📡</span>
                <span>{isSweeping ? 'Sweeping...' : 'Run Sensory Sweep'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Census Demographics */}
              <div className="float-census-card bg-slate-900/80 border-2 border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>🐜</span>
                      <span>{p("Colony Census by Caste")}</span>
                    </h3>
                    <p className="text-xs text-slate-400">Total verified ants: 1,248,500</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    100% Accounted
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Workers & Foragers (68%)</span>
                      <span className="font-mono text-emerald-400 font-bold">849,000 ants</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                      <div className="bg-gradient-to-r from-emerald-600 to-green-400 h-full rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Major Soldiers & Sentinels (18%)</span>
                      <span className="font-mono text-red-400 font-bold">224,700 ants</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                      <div className="bg-gradient-to-r from-red-600 to-rose-400 h-full rounded-full" style={{ width: '18%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Brood Tenders & Nurses (10%)</span>
                      <span className="font-mono text-amber-400 font-bold">124,800 ants</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                      <div className="bg-gradient-to-r from-amber-600 to-yellow-400 h-full rounded-full" style={{ width: '10%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Alate Drones (3%)</span>
                      <span className="font-mono text-blue-400 font-bold">37,500 ants</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full rounded-full" style={{ width: '3%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">Royal Matriarchs & Alate Princesses (1%)</span>
                      <span className="font-mono text-purple-400 font-bold">12,500 ants</span>
                    </div>
                    <div className="w-full bg-slate-950 rounded-full h-3 border border-slate-800 overflow-hidden">
                      <div className="bg-gradient-to-r from-purple-600 to-fuchsia-400 h-full rounded-full" style={{ width: '1%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Colony Senses Telemetry */}
              <div className="float-senses-card bg-slate-900/80 border-2 border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span>📡</span>
                      <span>{p("Colony Senses Telemetry")}</span>
                    </h3>
                    <p className="text-xs text-slate-400">Subterranean sensory receiver nodes</p>
                  </div>
                  <span className={`text-xs font-mono px-2.5 py-1 rounded-full border ${isSweeping ? 'text-amber-400 bg-amber-950/60 border-amber-500/40 animate-pulse' : 'text-purple-400 bg-purple-950/60 border-purple-500/30'}`}>
                    {sensoryData.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-mono">Antennal Olfaction</span>
                      <span className="text-emerald-400 font-bold">99.8%</span>
                    </div>
                    <div className="text-lg font-black text-white font-mono">{sensoryData.olfaction}</div>
                    <p className="text-[10px] text-slate-500 mt-1">Formic acid vapor gradient</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-mono">Substrate Vibration</span>
                      <span className="text-blue-400 font-bold">4.2 Hz</span>
                    </div>
                    <div className="text-lg font-black text-white font-mono">{sensoryData.vibration}</div>
                    <p className="text-[10px] text-slate-500 mt-1">Termite burrow seismic echo</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-mono">Polarized Vision</span>
                      <span className="text-amber-400 font-bold">Locked</span>
                    </div>
                    <div className="text-lg font-black text-white font-mono">248° Azimuth</div>
                    <p className="text-[10px] text-slate-500 mt-1">Solar orientation compass</p>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-slate-400 font-mono">Nest Temperature</span>
                      <span className="text-purple-400 font-bold">Optimal</span>
                    </div>
                    <div className="text-lg font-black text-white font-mono">{sensoryData.temp}</div>
                    <p className="text-[10px] text-slate-500 mt-1">Larval vault humidity: 91%</p>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-2xl bg-purple-950/30 border border-purple-500/30 text-xs text-purple-300 flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                    <span>Pheromone broadcast antenna operational across 14 galleries.</span>
                  </span>
                  <span className="font-mono font-bold text-white">CH 1-14 OK</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ANT-MINGLE */}
        {activeTab === 'mingle' && (
          <div className="max-w-2xl mx-auto space-y-6">
            <div className="bg-gradient-to-b from-slate-900/90 via-slate-900/80 to-pink-950/30 border-2 border-pink-500/40 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🐜💕</span>
                  <div>
                    <h3 className="text-base font-extrabold text-white">{p("Ant-Mingle™ Pedigree Matchmaker")}</h3>
                    <p className="text-xs text-pink-300 font-mono">Find non-kin mates across neighboring mounds</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-pink-400 bg-pink-950/80 border border-pink-500/40 px-3 py-1 rounded-full">
                  Profile {mingleIndex + 1} of {mingleProfiles.length}
                </span>
              </div>

              <div className="mb-4 bg-emerald-950/80 border border-emerald-400/60 rounded-xl p-3 shadow-inner">
                <div className="flex items-center space-x-1.5 text-emerald-400 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>🛡️ Incest-Blocker Enabled</span>
                </div>
                <p className="text-xs text-emerald-300/90 mt-1">
                  Cross-references all 1,248,500 ants in Colony 774 to guarantee zero cousin or aunt matching.
                </p>
              </div>

              <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 relative shadow-lg">
                {swipeFeedback && (
                  <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm z-20 rounded-2xl flex items-center justify-center p-3 text-center">
                    <span className="text-sm font-mono font-bold text-pink-400 animate-bounce">
                      {swipeFeedback}
                    </span>
                  </div>
                )}

                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-pink-950/40 border border-pink-500/40 flex items-center justify-center p-2">
                    <AntAvatar caste={currentMingleProfile.caste} size={42} />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="text-base font-bold text-white">@{currentMingleProfile.handle}</h4>
                      <span className="text-xs text-slate-400 font-mono">({currentMingleProfile.age})</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">📍 {currentMingleProfile.distance}</p>
                  </div>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                  "{currentMingleProfile.bio}"
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-xs font-mono bg-pink-950/60 text-pink-300 px-2.5 py-1 rounded border border-pink-500/30">
                    Mandible: {currentMingleProfile.mandibleScore}
                  </span>
                  {currentMingleProfile.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <button
                    onClick={() => handleSwipe('pass')}
                    className="py-3 bg-slate-900 hover:bg-red-950/50 border border-slate-700 hover:border-red-500 text-slate-200 hover:text-red-400 font-mono text-sm font-bold rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>❌ Pass</span>
                  </button>
                  <button
                    onClick={() => handleSwipe('like')}
                    className="py-3 bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-500 hover:to-rose-400 text-white font-mono text-sm font-bold rounded-xl shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                  >
                    <span>💘 Ant-Mingle</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* DETAIL DOSSIER MODAL */}
      {selectedAnt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-slate-700 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              onClick={() => setSelectedAnt(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-950 border border-slate-700 flex items-center justify-center p-2 shadow-inner">
                <AntAvatar caste={selectedAnt.caste} size={48} />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400">{selectedAnt.genLabel}</span>
                <h3 className="text-xl font-bold text-white">{selectedAnt.name}</h3>
                <p className="text-sm text-slate-400">{selectedAnt.role}</p>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-5 leading-relaxed bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
              {selectedAnt.bio}
            </p>

            <div className="bg-slate-950 rounded-2xl p-4 border border-slate-800 grid grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-slate-500 block">MANDIBLE METRIC</span>
                <span className="text-slate-200 text-sm font-bold">{selectedAnt.mandibleScore}</span>
              </div>
              <div>
                <span className="text-slate-500 block">RECORD / SECTOR</span>
                <span className="text-slate-200 text-sm font-bold">{selectedAnt.clutchSize}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-between items-center">
              <span className="text-xs font-mono text-emerald-400">✓ Pedigree Verified Clean</span>
              <button
                onClick={() => setSelectedAnt(null)}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-sm font-medium transition-colors cursor-pointer"
              >
                Close Pedigree Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paywall Loop Modal */}
      {showPaywallLoopModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="bg-slate-900 border-2 border-amber-500/80 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center text-3xl">
              🐜💎
            </div>
            <h3 className="text-lg font-extrabold text-white">Enterprise Swarm Gateway</h3>
            <p className="text-xs text-amber-300/90 font-mono mt-1">Colony Invoicing: $49.99 / month</p>
            <div className="my-4 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400 leading-relaxed text-left">
              <p className="font-semibold text-slate-200 mb-1">Redirecting to scanner...</p>
              Free Tier limit reached. Your complimentary 5 ants are still active in Colony 774. Please enjoy them or consult Her Majesty Chrysalis IV for credit approval.
            </div>
            <button
              onClick={() => {
                setShowPaywallLoopModal(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-mono font-black text-sm rounded-xl transition-all shadow-lg shadow-amber-500/30 cursor-pointer"
            >
              Return to Free Ant Scanner ↺
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

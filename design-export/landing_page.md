# Landing Page (`src/app/page.tsx`) - Exhaustive DOM Blueprint

This document details *every single text node, CSS class, component, and structural div* used in the current landing page. Use this as a literal 1:1 blueprint to write the vanilla HTML replica.

---

## 1. Hero Section (`<Hero />`)
**Component Root**: `<section className="relative flex min-h-screen flex-col justify-center overflow-hidden px-5 md:px-12">`

### 1a. Typographic Backdrop
- **Wrapper**: `<div className="hero-backdrop hero-rows pointer-events-none absolute -inset-x-[12%] inset-y-0 flex -rotate-3 flex-col justify-center gap-[3vw]">`
- **Content**: Contains 3 rows of marquee tracks (speeds: 85s normal, 62s reverse, 74s normal).
- **Text Node**: Each row contains `<span className="backdrop-word backdrop-word-warm font-poster whitespace-nowrap px-6 text-[8.5vw] uppercase">` wrapping the string `"ANTARAGNI ✦ "` repeated 5 times.

### 1b. Atmosphere Effects
- **Stage Beam**: `<div className="hero-beam pointer-events-none absolute left-[38%] top-[-24%] h-[95%] w-[48vw] -translate-x-1/2" />`
- **Embers**: `<Embers count={72} />` (Renders a full-screen canvas with 72 floating sparks).
- **Vignette**: `<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_100%_at_45%_42%,transparent_52%,rgba(12,7,8,0.6)_100%)]" />`

### 1c. Top Right Ticket Stamp
- **Wrapper**: `<div className="hero-stamp absolute right-5 top-24 rotate-6 md:right-14 md:top-28">`
- **Content**: `<div className="flex flex-col items-center gap-1.5">`
- **Text Nodes**:
  - `<span className="tape tape-pink !text-sm">61ST EDITION</span>`
  - `<span className="tape">OCT 2026</span>`
  - `<span className="tape tape-cyan">IIT KANPUR</span>`

### 1d. Main Content Block
- **Wrapper**: `<div className="relative max-w-[1500px]">`
- **Eyebrow**: `<p className="hero-eyebrow mb-5 flex items-center gap-3 text-sm font-bold uppercase tracking-[0.3em] text-foreground/85 md:text-lg">`
  - Contains a diamond bullet: `<span className="inline-block h-3.5 w-3.5 rotate-45" style={{ background: "var(--gold)" }} />`
  - Text: `North India's biggest college cultural festival`
- **Main Title**: `<div className="hero-title relative w-fit select-none">`
  - `<h1 className="hero-word hero-fire-shadow font-title relative text-[10.5vw] font-black md:text-[9.3vw]" aria-label="ANTARAGNI">`
  - The word "ANTARAGNI" is split. Each letter is wrapped in: `<span className="inline-block overflow-hidden align-bottom"><span className="hero-letter text-chrome inline-block">A</span></span>` (and so on).
- **Subtitle & CTAs Container**: `<div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">`
  - **Subtitle**: `<p className="hero-sub max-w-md text-base leading-relaxed text-foreground/70 md:text-lg">`
  - Text: `Four days. Hundreds of stages. One incredible story — and you're in it. The 61st edition returns louder than ever.`
  - **CTA Wrapper**: `<div className="flex flex-wrap items-center gap-5">`
  - **CTA 1**: `<Link href="/events" className="hero-cta btn-lime" data-cursor-text="GO">Explore Events</Link>`
  - **CTA 2**: `<Link href="/roadtrips" className="hero-cta btn-festival" data-cursor-text="GO">Ride the Roadtrips</Link>`

### 1e. Scroll Indicator
- **Wrapper**: `<div className="hero-scroll absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-foreground/40">`
- **Text**: `<span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>`
- **Line**: `<span className="block h-10 w-px animate-pulse bg-gradient-to-b from-foreground/60 to-transparent" />`

---

## 2. Crossing Marquee Bands (`<Band />`)
**Component Root**: `<div className="relative z-10 -my-6 overflow-hidden py-10">`

### 2a. Top Band (Categories)
- **Wrapper**: `<div className="-rotate-2 scale-[1.04]" style={{ background: "var(--lime)" }}>`
- **Content**: A `<Marquee duration={22} className="py-3">`
- **Items**: Iterates over `["Music", "Dance", "Dramatics", "Comedy", "Fashion", "Quiz", "Fine Arts", "Literary", "Films", "Rock", "Rap", "EDM"]`
- **Node**: `<span className="font-title mx-4 flex items-center gap-8 text-xl font-bold uppercase tracking-wide text-[#0a0612]"> {word} <span className="text-[#0a0612]/60">✦</span> </span>`

### 2b. Bottom Band (Stats)
- **Wrapper**: `<div className="rotate-1 scale-[1.04] border-y-2 border-[#1c1218]" style={{ background: "var(--sun)", marginTop: "-0.5rem" }}>`
- **Content**: A `<Marquee duration={30} reverse className="py-2">`
- **Items**: Repeated 6 times.
- **Node**: `<span className="font-poster mx-6 flex items-center gap-6 text-lg uppercase tracking-wider text-[#0a0612]"> Oct 2026 <span>★</span> IIT Kanpur <span>★</span> 300+ colleges <span>★</span> 40+ competitions </span>`

---

## 3. Portals Section (`<Portals />`)
**Component Root**: `<section className="relative mx-auto max-w-6xl px-4 py-28">`
- **Background Text**: `<div className="backdrop-word font-poster pointer-events-none absolute left-1/2 top-10 -translate-x-1/2 text-[16vw] uppercase">Two Worlds</div>`

### 3a. Header
- **Wrapper**: `<Reveal className="relative mb-20 max-w-lg">`
- **Eyebrow**: `<span className="tape tape-pink mb-4 inline-block -rotate-2">Pick your universe</span>`
- **Title**: `<h2 className="font-title text-4xl font-black uppercase leading-none md:text-6xl">One fest.<br /><span className="text-gradient-live">Two worlds.</span></h2>`

### 3b. Cards Grid
- **Wrapper**: `<div className="relative grid gap-14 md:grid-cols-2 md:gap-8">`
- **Events Card (Left)**: 
  - `<Link href="/events" className="group relative block -rotate-2 border-2 border-white/15 shadow-[10px_10px_0_rgba(0,0,0,0.5)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0">`
  - **Tape**: `<span className="tape absolute -top-3 left-8 z-10 rotate-3">On campus</span>`
  - **Image Container**: `<div className="relative h-[520px] overflow-hidden">` (contains artwork, bottom-gradient overlay, and text padding wrapper).
  - **Text**: `<h3 className="font-poster text-7xl uppercase leading-none">Events</h3>`
  - **Description**: `<p className="mt-3 max-w-sm text-sm text-foreground/75">40+ competitions across dance, music, drama, literary arts, quizzing and fashion. The main arena awaits.</p>`
  - **Action**: `<span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--lime)]">Enter the arena &rarr;</span>`
- **Roadtrips Card (Right)**:
  - Offset logic: Same structure as Events, but wrapped in `<Reveal delay={0.12} className="md:mt-24">`.
  - Link has `rotate-2` instead of `-rotate-2`.
  - **Tape**: `<span className="tape tape-cyan absolute -top-3 right-8 z-10 -rotate-3">Across India</span>`
  - **Text**: `<h3 className="font-poster text-7xl uppercase leading-none">Roadtrips</h3>`
  - **Description**: `<p className="mt-3 max-w-sm text-sm text-foreground/75">Rock, rap, beatboxing, comedy and DJ battles hit your city before the grand finale at IIT Kanpur.</p>`
  - **Action**: `<span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--pink)]">Hit the road &rarr;</span>`

---

## 4. About & Stats (`<About />`)
**Component Root**: `<section className="relative mx-auto max-w-6xl overflow-hidden px-4 py-28">`
- **Grid Wrapper**: `<div className="grid items-start gap-16 md:grid-cols-[1.1fr_1fr]">`

### 4a. Left Column (Text)
- **Wrapper**: `<Reveal>`
- **Eyebrow**: `<span className="tape mb-5 inline-block rotate-1">Unleashing the fire within</span>`
- **Title**: `<h2 className="font-title text-4xl font-black leading-tight md:text-5xl">Six decades of <span className="marker-pink marker -rotate-1 inline-block">goosebumps.</span></h2>`
- **P1**: `<p className="mt-6 leading-relaxed text-foreground/70">Since 1966, Antaragni has been where India's most fearless performers collide. From midnight jam sessions to roaring pronites, from street plays that stop crowds to quizzes that break brains — this is the stage where legends take their first bow.</p>`
- **P2**: `<p className="mt-4 leading-relaxed text-foreground/70">In 2026 we return <span className="marker">louder, brighter and bolder</span>. Register, compete, and write yourself into the story.</p>`

### 4b. Right Column (Counter Stack)
- **Wrapper**: `<Reveal className="flex flex-col gap-2" stagger={0.12}>`
- **Logic**: Iterates over an array of stats. 
  - `60+ years of legacy` (Style: solid)
  - `300+ colleges` (Style: outline)
  - `40+ competitions` (Style: gradient)
  - `15+ roadtrip cities` (Style: solid)
- **Node**: `<div className="flex items-baseline gap-4" style={{ transform: rotate(1deg) translateX(14px) }}>` (Calculated dynamically)
- **Number Element**: `<span className="font-poster text-7xl leading-[0.9] md:text-8xl ..."> 0+ </span>` (Animated counting).
- **Label Element**: `<span className="tape tape-pink shrink-0 -rotate-2 !text-[10px]">years of legacy</span>`

---

## 5. Legacy Wall (`<Legacy />`)
**Component Root**: `<section className="relative overflow-hidden py-28">`

### 5a. Backdrop & Title
- **Background Image**: `<Cinema src="/cinema/home-crowd.jpg" a="#ff6b35" b="#8c2333" opacity={0.4} />` (A full-screen background image of a crowd with a blend mode/opacity).
- **Background Text**: `<div className="backdrop-word font-poster pointer-events-none absolute left-0 top-6 w-full text-center text-[13vw] uppercase">Legends</div>`
- **Foreground Header**: `<Reveal className="relative mx-auto mb-16 max-w-6xl px-4">`
  - **Tape**: `<span className="tape tape-cyan mb-4 inline-block -rotate-1">The wall of legends</span>`
  - **Title**: `<h2 className="font-title max-w-xl text-4xl font-black uppercase leading-none md:text-6xl">They played <span className="text-gradient-live">our stage.</span></h2>`

### 5b. Poster Carousel (Marquee)
- **Wrapper**: `<Marquee duration={45} pauseOnHover className="mb-12">`
- **Items**: 8 poster cards (`musicals, junoon, dance, djwar, dramatics, nationals, ritambhara, comickaun`).
- **Node**: `<div className="relative mx-4 h-64 w-48 shrink-0 border-2 border-white/15 shadow-[7px_7px_0_rgba(0,0,0,0.5)] md:h-80 md:w-60 translate-y-4 rotate-2">`
  - **Tape on Poster**: `<span className="tape absolute -top-3 left-1/2 z-10 -translate-x-1/2 tape-pink" style={{ width: 70, height: 18, padding: 0 }} />`
  - **Image**: Renders the event poster artwork.

### 5c. Artist Name Marquee
- **Wrapper**: `<Marquee duration={30} reverse className="py-2">`
- **Items**: `["Sunidhi Chauhan", "Amit Trivedi", "Farhan Akhtar", "Mohit Chauhan", "KK", "Javed Ali", "Nucleya", "The Local Train", "Shaan", "Salim–Sulaiman"]`
- **Node**: `<span className="font-poster mx-6 flex items-center gap-12 text-4xl uppercase md:text-6xl"> <span className="text-stroke transition-colors duration-300 hover:text-[var(--lime)]">{Artist}</span> <span style={{ color: "var(--pink)" }}>✦</span> </span>`

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, Play, ArrowLeft, Link } from 'lucide-react';

import twinFlamesThumb  from './assets/thumbnails/twin_flames.png';
import kaandePoheThumb  from './assets/thumbnails/kaande_pohe.png';
import aparichitThumb   from './assets/thumbnails/aparichit.png';
import heroImg          from './assets/hero.png';
import kandeStill1      from './assets/stills/kaande_pohe/still_1.png';
import kandeStill2      from './assets/stills/kaande_pohe/still_2.png';
import kandeStill3      from './assets/stills/kaande_pohe/still_3.png';

// ── Animation variants ────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const stagger = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } }
};

const gridStagger = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.14, delayChildren: 0.1 } }
};

const cardReveal = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const pageFade = {
  initial:    { opacity: 0, y: 8 },
  animate:    { opacity: 1, y: 0 },
  exit:       { opacity: 0, y: -8 },
  transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] }
};

const spring = { type: 'spring', stiffness: 280, damping: 22 };

// ── App ───────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab]     = useState('FILMS');
  const [film, setFilm]   = useState(null);

  const nav = ['BIO', 'FILMS', 'WORK', 'BOOK', 'CONTACT'];

  const openFilm = (f) => { setFilm(f); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const closeFilm = () => setFilm(null);

  return (
    <div style={{ backgroundColor: '#080808', color: '#EDE8E0', minHeight: '100vh', fontFamily: '"Inter", sans-serif' }}>

      {/* ── Nav ─────────────────────────────────────────────── */}
      <motion.nav
        initial={{ y: -80, x: '-50%' }}
        animate={{ y: 0,   x: '-50%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 28, left: '50%',
          backgroundColor: 'rgba(12,12,12,0.92)',
          backdropFilter: 'blur(16px)',
          border: '1px solid #242424',
          borderRadius: 999,
          display: 'flex', gap: 36,
          padding: '14px 32px',
          zIndex: 50,
        }}
      >
        {nav.map(id => (
          <button
            key={id}
            onClick={() => { setTab(id); setFilm(null); }}
            style={{
              fontSize: '0.6rem', letterSpacing: '0.18em', fontWeight: 500,
              textTransform: 'uppercase', fontFamily: '"Inter", sans-serif',
              color: tab === id && !film ? '#C8892A' : 'rgba(237,232,224,0.35)',
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '4px 0', position: 'relative', transition: 'color 0.25s',
            }}
          >
            {id}
            {tab === id && !film && (
              <motion.div
                layoutId="underline"
                style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 1, background: '#C8892A' }}
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.nav>

      {/* ── Main ─────────────────────────────────────────────── */}
      <main style={{ paddingTop: 128, paddingBottom: 80, paddingLeft: '5%', paddingRight: '5%', maxWidth: 1440, margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          {film ? (
            <motion.div key="detail" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
              <FilmDetail film={film} onBack={closeFilm} />
            </motion.div>
          ) : (
            <motion.div key={tab} {...pageFade}>
              {tab === 'FILMS'   && <Films   onSelect={openFilm} />}
              {tab === 'BIO'     && <Bio />}
              {tab === 'WORK'    && <Work />}
              {tab === 'BOOK'    && <Book />}
              {tab === 'CONTACT' && <Contact />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer style={{ borderTop: '1px solid #1E1E1E', padding: '40px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#080808' }}>
        <span style={{ fontFamily: '"Fraunces", serif', fontStyle: 'italic', fontSize: '1.1rem', color: 'rgba(237,232,224,0.5)', letterSpacing: '-0.02em' }}>
          Damini Gupta
        </span>
        <div style={{ display: 'flex', gap: 20, color: 'rgba(237,232,224,0.25)' }}>
          {[Link, Link].map((Icon, i) => (
            <motion.div key={i} whileHover={{ y: -3, color: '#C8892A' }} transition={spring} style={{ cursor: 'pointer' }}>
              <Icon size={16} />
            </motion.div>
          ))}
        </div>
        <span style={{ fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(237,232,224,0.2)' }}>
          © 2024
        </span>
      </footer>
    </div>
  );
}

// ── FILMS ─────────────────────────────────────────────────────
function Films({ onSelect }) {
  const films = [
    {
      title: 'Twin Flames',
      subtitle: 'A Romantic Short Film',
      year: '2024', type: 'Romance',
      studio: 'The Storygraphers',
      views: '4M+ Views',
      youtubeId: 'c2iFiaPr5dY',
      img: twinFlamesThumb,
      description: 'A deeply felt romantic short film about two souls drawn together across distance and doubt. Produced by The Storygraphers, Twin Flames earned 4 million views and selections at the Short Film Festival, Pune and Kalakari — WideScreen Film & Music Video Festival 2024.',
      stills: [twinFlamesThumb],
    },
    {
      title: 'Aparichit',
      subtitle: 'Heavy rain brings a stranger…',
      year: '2023', type: 'Suspense',
      studio: 'Setups & Payoffs Studios',
      views: '3M+ Views',
      youtubeId: 'sbMkZSHA5UY',
      start: 52,
      img: aparichitThumb,
      description: 'Directed by Rahat Jain for Setups & Payoffs Studios (7.05K subscribers), Aparichit is a taut psychological short about a woman home alone when a stranger knocks during a downpour. Earned 3 million views and was screened at IDSF1K.',
      stills: [aparichitThumb],
    },
    {
      title: 'PIDLEGAON',
      subtitle: 'Horror Short Film',
      year: '2023', type: 'Horror',
      studio: 'Be YouNick',
      views: '',
      youtubeId: 'qPROCEXScHY',
      img: 'https://img.youtube.com/vi/qPROCEXScHY/maxresdefault.jpg',
      description: 'Produced by Be YouNick, PIDLEGAON is a rural horror short film steeped in local myth and dread. A study in atmosphere over spectacle — and a bold genre departure that showcases Damini\'s range as a performer.',
      stills: ['https://img.youtube.com/vi/qPROCEXScHY/maxresdefault.jpg'],
    },
    {
      title: 'Kaande Pohe',
      subtitle: "Valentine's Day Film",
      year: '2022', type: 'Romance',
      studio: 'Terribly Tiny Tales',
      views: '',
      youtubeId: 'HZ-4K2IN7DY',
      img: kaandePoheThumb,
      description: 'Produced by Terribly Tiny Tales (TTT), Kaande Pohe is a Valentine\'s Day film about the quiet awkwardness of a traditional first meeting. Sharp, funny, and true — a performance that landed Damini on one of India\'s most-watched storytelling platforms.',
      stills: [kandeStill1, kandeStill2, kandeStill3],
    },
  ];

  return (
    <motion.div variants={gridStagger} initial="hidden" animate="visible"
      style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4rem 3rem' }}
    >
      {films.map((f, i) => (
        <motion.div
          key={i} variants={cardReveal}
          whileHover={{ y: -6 }} transition={spring}
          onClick={() => onSelect(f)}
          style={{ cursor: 'pointer' }}
        >
          {/* Thumbnail */}
          <div style={{ position: 'relative', aspectRatio: '16/9', borderRadius: 4, overflow: 'hidden', marginBottom: 20, backgroundColor: '#111' }}>
            <img src={f.img} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.9s ease', display: 'block' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />
            {/* Overlay */}
            <div className="film-hover-overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.1) 50%, transparent 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 16 }}>
              {/* Genre stamp top-left */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <span className="genre-stamp">{f.type}</span>
                {f.views && (
                  <span style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(237,232,224,0.5)', fontWeight: 500 }}>{f.views}</span>
                )}
              </div>
              {/* Studio bottom-left */}
              <span style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(237,232,224,0.35)', fontWeight: 500 }}>
                {f.studio}
              </span>
            </div>
            {/* Play button — center, appears on hover via CSS */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.4s ease' }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(200,137,42,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(4px)' }}>
                <Play fill="#080808" color="#080808" size={20} style={{ marginLeft: 3 }} />
              </div>
            </div>
          </div>

          {/* Meta */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
            <h2 style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: '1.75rem', fontWeight: 400, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#EDE8E0', margin: 0, transition: 'color 0.25s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#C8892A'}
              onMouseLeave={e => e.currentTarget.style.color = '#EDE8E0'}
            >
              {f.title}
            </h2>
            <span style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6560', fontStyle: 'italic', whiteSpace: 'nowrap', marginLeft: 16 }}>
              {f.year}
            </span>
          </div>
          <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6560', margin: 0 }}>
            {f.subtitle}
          </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// ── FILM DETAIL ───────────────────────────────────────────────
function FilmDetail({ film, onBack }) {
  const src = `https://www.youtube.com/embed/${film.youtubeId}${film.start ? `?start=${film.start}` : ''}`;
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {/* Back */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        whileHover={{ x: -3 }} transition={{ duration: 0.4 }}
        style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6560', background: 'none', border: '1px solid #242424', borderRadius: 999, padding: '8px 16px', cursor: 'pointer', marginBottom: 40, fontFamily: '"Inter",sans-serif', transition: 'color 0.2s, border-color 0.2s' }}
        onMouseEnter={e => { e.currentTarget.style.color = '#C8892A'; e.currentTarget.style.borderColor = '#C8892A'; }}
        onMouseLeave={e => { e.currentTarget.style.color = '#6B6560'; e.currentTarget.style.borderColor = '#242424'; }}
      >
        <ArrowLeft size={12} /> Back to Films
      </motion.button>

      {/* Title block */}
      <motion.div variants={stagger} initial="hidden" animate="visible" style={{ marginBottom: 48 }}>
        <motion.div variants={fadeUp} style={{ marginBottom: 8 }}>
          <span className="genre-stamp">{film.type}</span>
        </motion.div>
        <motion.h1 variants={fadeUp} style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,6vw,5rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#EDE8E0', margin: '12px 0 8px' }}>
          {film.title}
        </motion.h1>
        <motion.p variants={fadeUp} style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6560' }}>
          {film.year} · {film.studio}
        </motion.p>
      </motion.div>

      {/* Content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 48, alignItems: 'start' }}>
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.9, ease: [0.16,1,0.3,1] }}
            style={{ aspectRatio: '16/9', borderRadius: 4, overflow: 'hidden', border: '1px solid #1E1E1E', marginBottom: 36 }}
          >
            <iframe src={src} title={film.title} style={{ width: '100%', height: '100%', display: 'block' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </motion.div>

          <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: 28 }}>
            <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6560', marginBottom: 14 }}>Synopsis</p>
            <motion.p
              initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.8 }}
              style={{ fontFamily: '"Fraunces",serif', fontWeight: 300, fontSize: '1.15rem', lineHeight: 1.75, color: 'rgba(237,232,224,0.75)', margin: 0 }}
            >
              {film.description}
            </motion.p>
          </div>
        </div>

        {/* Right — stills */}
        <div>
          <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6560', marginBottom: 16 }}>Stills & Gallery</p>
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {film.stills.map((s, i) => (
              <motion.img key={i} variants={fadeUp} src={s} alt={`Still ${i+1}`}
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', borderRadius: 3, filter: 'grayscale(1)', transition: 'filter 0.7s ease', display: 'block' }}
                onMouseEnter={e => e.currentTarget.style.filter = 'grayscale(0)'}
                onMouseLeave={e => e.currentTarget.style.filter = 'grayscale(1)'}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

// ── BIO ───────────────────────────────────────────────────────
function Bio() {
  const stats = [
    { value: '7M+',   label: 'Combined Views' },
    { value: '4',     label: 'Short Films'     },
    { value: '4',     label: 'Major Studios'   },
  ];

  return (
    <div>
      {/* Hero name block */}
      <div style={{ borderBottom: '1px solid #1E1E1E', paddingBottom: 40, marginBottom: 56 }}>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}
          style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#C8892A', marginBottom: 16 }}
        >
          Actress · Mumbai
        </motion.p>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            initial={{ y: '100%', opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: 'clamp(4rem,10vw,9rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.9, color: '#EDE8E0', margin: 0 }}
          >
            Malati<br />Rao
          </motion.h1>
        </div>
      </div>

      {/* Two-column */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: 64 }}>
        {/* Portrait */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }} whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1, ease: [0.16,1,0.3,1] }}
          style={{ position: 'relative' }}
        >
          <div style={{ aspectRatio: '3/4', borderRadius: 3, overflow: 'hidden', backgroundColor: '#111' }}>
            <img src={heroImg} alt="Damini Gupta" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.05) brightness(0.95)' }} />
          </div>
          {/* Amber corner accent */}
          <div style={{ position: 'absolute', bottom: -1, right: -1, width: 48, height: 48, borderBottom: '1px solid #C8892A', borderRight: '1px solid #C8892A' }} />
        </motion.div>

        {/* Text + stats */}
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} style={{ paddingTop: 8 }}>
          <motion.p variants={fadeUp} style={{ fontFamily: '"Fraunces",serif', fontWeight: 300, fontSize: '1.2rem', lineHeight: 1.75, color: 'rgba(237,232,224,0.7)', marginBottom: 32 }}>
            Damini Gupta is an actress whose work lives in the space between ordinary moments and unexpected feeling. She has appeared in films produced by India's most-watched digital studios — from Terribly Tiny Tales to Be YouNick — accumulating over 7 million views across a span of four films and three years.
          </motion.p>

          <motion.p variants={fadeUp} style={{ fontFamily: '"Fraunces",serif', fontWeight: 300, fontSize: '1.2rem', lineHeight: 1.75, color: 'rgba(237,232,224,0.7)', marginBottom: 48 }}>
            Comfortable across romance, psychological suspense, and horror, she brings an instinctive naturalism to every genre — a quality that has made her collaborators return, and her audiences stay.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid #1E1E1E', paddingTop: 28, gap: 0 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ borderRight: i < 2 ? '1px solid #1E1E1E' : 'none', paddingRight: i < 2 ? 24 : 0, paddingLeft: i > 0 ? 24 : 0 }}>
                <p style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: '2.5rem', fontWeight: 400, letterSpacing: '-0.04em', color: '#C8892A', margin: '0 0 4px' }}>{s.value}</p>
                <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.52rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6560', margin: 0 }}>{s.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Download reel button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.8 }}
        style={{ display: 'flex', gap: 16 }}
      >
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={spring}
          style={{ padding: '14px 32px', background: '#C8892A', color: '#080808', border: 'none', borderRadius: 999, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: '"Inter",sans-serif', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Download size={13} /> Download Portfolio
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={spring}
          style={{ padding: '14px 32px', background: 'transparent', color: '#EDE8E0', border: '1px solid #242424', borderRadius: 999, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: '"Inter",sans-serif', fontWeight: 500, cursor: 'pointer', transition: 'border-color 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.borderColor = '#C8892A'}
          onMouseLeave={e => e.currentTarget.style.borderColor = '#242424'}
        >
          Watch Reel
        </motion.button>
      </motion.div>
    </div>
  );
}

// ── WORK ──────────────────────────────────────────────────────
function Work() {
  const productions = [
    { studio: 'The Storygraphers',      film: 'Twin Flames',              role: 'Lead',       year: '2024', note: 'Short Film Festival, Pune · Kalakari 2024' },
    { studio: 'Setups & Payoffs Studios', film: 'Aparichit',              role: 'Lead',       year: '2023', note: 'IDSF1K Selection · Directed by Rahat Jain' },
    { studio: 'Be YouNick',             film: 'PIDLEGAON',                role: 'Protagonist', year: '2023', note: 'Horror · 7M+ channel reach' },
    { studio: 'Terribly Tiny Tales',    film: "Kaande Pohe",              role: 'Lead',       year: '2022', note: "Valentine's Day · TTT Platform" },
  ];

  return (
    <div style={{ maxWidth: 880, margin: '0 auto', paddingTop: 24 }}>
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.p variants={fadeUp} style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8892A', marginBottom: 20 }}>
          Filmography
        </motion.p>
        <motion.h2 variants={fadeUp} style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.05, color: '#EDE8E0', margin: '0 0 56px' }}>
          Productions &<br />Recognition
        </motion.h2>
      </motion.div>

      <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
        {productions.map((p, i) => (
          <motion.div key={i} variants={fadeUp}
            whileHover={{ x: 6 }} transition={spring}
            style={{ display: 'grid', gridTemplateColumns: '1fr auto', alignItems: 'start', gap: 24, padding: '28px 0', borderBottom: '1px solid #1E1E1E', cursor: 'default' }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8 }}>
                <span className="genre-stamp">{p.role}</span>
                <h3 style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: '1.5rem', fontWeight: 400, letterSpacing: '-0.03em', color: '#EDE8E0', margin: 0 }}>{p.film}</h3>
              </div>
              <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#6B6560', margin: '0 0 6px' }}>{p.studio}</p>
              <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.12em', color: 'rgba(200,137,42,0.6)', margin: 0 }}>{p.note}</p>
            </div>
            <span style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.58rem', letterSpacing: '0.18em', color: '#6B6560', paddingTop: 4, whiteSpace: 'nowrap' }}>{p.year}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

// ── BOOK ──────────────────────────────────────────────────────
function Book() {
  const modes = [
    { label: 'Mode I',  title: 'Casting & Projects',  desc: 'For directors, producers, and casting directors looking for a committed lead or supporting performer.', dark: false },
    { label: 'Mode II', title: 'Brand Collaborations', desc: 'For brands seeking authentic storytelling through performance — digital, commercial, and campaign work.', dark: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', paddingTop: 80, paddingBottom: 80, textAlign: 'center', gap: 56 }}>
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.p variants={fadeUp} style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8892A', marginBottom: 16 }}>
          Available For
        </motion.p>
        <motion.h2 variants={fadeUp} style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: 'clamp(2.5rem,6vw,4.5rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 1.1, color: '#EDE8E0', margin: 0 }}>
          Let's Make<br />Something Real
        </motion.h2>
      </motion.div>

      <motion.div
        variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, width: '100%', maxWidth: 640 }}
      >
        {modes.map((m, i) => (
          <motion.button key={i} variants={fadeUp}
            whileHover={{ y: -5, scale: 1.01 }} whileTap={{ scale: 0.98 }} transition={spring}
            style={{
              padding: 36, borderRadius: 4, textAlign: 'left', cursor: 'pointer',
              background:     m.dark ? '#C8892A'   : '#111111',
              border:         m.dark ? 'none'      : '1px solid #242424',
              color:          m.dark ? '#080808'   : '#EDE8E0',
              transition: 'border-color 0.2s',
            }}
            onMouseEnter={e => { if (!m.dark) e.currentTarget.style.borderColor = '#C8892A'; }}
            onMouseLeave={e => { if (!m.dark) e.currentTarget.style.borderColor = '#242424'; }}
          >
            <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 600, marginBottom: 14, color: m.dark ? 'rgba(8,8,8,0.6)' : '#6B6560' }}>{m.label}</p>
            <p style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: '1.4rem', fontWeight: 400, letterSpacing: '-0.02em', marginBottom: 14, lineHeight: 1.2 }}>{m.title}</p>
            <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.8rem', lineHeight: 1.6, fontWeight: 300, color: m.dark ? 'rgba(8,8,8,0.7)' : 'rgba(237,232,224,0.45)', margin: 0 }}>{m.desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}

// ── CONTACT ───────────────────────────────────────────────────
function Contact() {
  const inputStyle = {
    width: '100%', background: 'transparent', border: 'none', borderBottom: '1px solid #242424',
    outline: 'none', padding: '10px 0', fontSize: '1.1rem', fontFamily: '"Fraunces",serif',
    fontWeight: 300, color: '#EDE8E0', boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  };
  const labelStyle = {
    fontFamily: '"Inter",sans-serif', fontSize: '0.48rem', letterSpacing: '0.22em',
    textTransform: 'uppercase', color: '#6B6560', display: 'block', marginBottom: 6,
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6rem', paddingTop: 24, alignItems: 'start' }}>
      {/* Left */}
      <motion.div variants={stagger} initial="hidden" animate="visible">
        <motion.p variants={fadeUp} style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.55rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#C8892A', marginBottom: 20 }}>
          Get In Touch
        </motion.p>
        <motion.h2 variants={fadeUp} style={{ fontFamily: '"Fraunces",serif', fontStyle: 'italic', fontSize: 'clamp(3rem,7vw,5.5rem)', fontWeight: 400, letterSpacing: '-0.04em', lineHeight: 0.95, color: '#EDE8E0', margin: '0 0 48px' }}>
          Say<br /><span style={{ color: '#C8892A' }}>Hello.</span>
        </motion.h2>

        <motion.div variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }} transition={spring}
            style={{ width: 48, height: 48, borderRadius: '50%', background: '#111', border: '1px solid #242424', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0, transition: 'border-color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#C8892A'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#242424'}
          >
            <Mail size={16} color="#C8892A" />
          </motion.div>
          <div>
            <p style={{ fontFamily: '"Inter",sans-serif', fontSize: '0.48rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#6B6560', margin: '0 0 4px' }}>Primary Contact</p>
            <p style={{ fontFamily: '"Fraunces",serif', fontSize: '1.1rem', fontWeight: 300, color: '#EDE8E0', margin: 0 }}>daminigupta@email.com</p>
          </div>
        </motion.div>
      </motion.div>

      {/* Right — form */}
      <motion.div
        initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.16,1,0.3,1] }}
        style={{ background: '#111111', border: '1px solid #1E1E1E', borderRadius: 4, padding: 40, display: 'flex', flexDirection: 'column', gap: 28 }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div>
            <label style={labelStyle}>First Name</label>
            <input type="text" style={inputStyle}
              onFocus={e => e.currentTarget.style.borderBottomColor = '#C8892A'}
              onBlur={e => e.currentTarget.style.borderBottomColor = '#242424'}
            />
          </div>
          <div>
            <label style={labelStyle}>Last Name</label>
            <input type="text" style={inputStyle}
              onFocus={e => e.currentTarget.style.borderBottomColor = '#C8892A'}
              onBlur={e => e.currentTarget.style.borderBottomColor = '#242424'}
            />
          </div>
        </div>
        <div>
          <label style={labelStyle}>Email</label>
          <input type="email" style={inputStyle}
            onFocus={e => e.currentTarget.style.borderBottomColor = '#C8892A'}
            onBlur={e => e.currentTarget.style.borderBottomColor = '#242424'}
          />
        </div>
        <div>
          <label style={labelStyle}>Message</label>
          <textarea rows={4} style={{ ...inputStyle, resize: 'none' }}
            onFocus={e => e.currentTarget.style.borderBottomColor = '#C8892A'}
            onBlur={e => e.currentTarget.style.borderBottomColor = '#242424'}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#E0A840' }}
          whileTap={{ scale: 0.97 }} transition={spring}
          style={{ padding: '14px 0', background: '#C8892A', color: '#080808', border: 'none', borderRadius: 999, fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', fontFamily: '"Inter",sans-serif', fontWeight: 600, cursor: 'pointer' }}
        >
          Send Message
        </motion.button>
      </motion.div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Download, Camera, Globe, Video, ExternalLink, Play, ArrowLeft } from 'lucide-react';

// --- LOCAL ASSET IMPORTS ---
import twinFlamesThumb from './assets/thumbnails/twin_flames.png';
import kaandePoheThumb from './assets/thumbnails/kaande_pohe.png';
import aparichitThumb from './assets/thumbnails/aparichit.png';
import kandeStill1 from './assets/stills/kaande_pohe/still_1.png';
import kandeStill2 from './assets/stills/kaande_pohe/still_2.png';
import kandeStill3 from './assets/stills/kaande_pohe/still_3.png';

// --- ANIMATION VARIANTS ---

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
  }
};

const pageTransition = {
  initial: { opacity: 0, x: 10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
};

// Shared reusable variants
const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } }
};

const springTap = { type: 'spring', stiffness: 300, damping: 20 };

// --- MAIN APP COMPONENT ---
export default function App() {
  const [activeTab, setActiveTab] = useState('FILMS');
  const [selectedFilm, setSelectedFilm] = useState(null);

  const navLinks = [
    { id: 'BIO', numeral: 'I' },
    { id: 'VIEW', numeral: 'II' },
    { id: 'ABOUT', numeral: 'III' },
    { id: 'FILMS', numeral: 'IV' },
    { id: 'CONTACT', numeral: 'V' }
  ];

  const handleFilmClick = (film) => {
    setSelectedFilm(film);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeFilmDetail = () => {
    setSelectedFilm(null);
  };

  return (
    <div className="min-h-screen font-sans selection:bg-sunrise selection:text-white bg-beige-default text-charcoal">
      {/* --- NAVIGATION --- */}
      <motion.nav
        initial={{ y: -100, x: '-50%' }}
        animate={{ y: 0, x: '-50%' }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-8 left-1/2 bg-charcoal/90 backdrop-blur-lg px-8 py-4 rounded-full flex gap-10 z-50 shadow-2xl border border-white/10"
      >
        {navLinks.map((link) => (
          <button
            key={link.id}
            onClick={() => { setActiveTab(link.id); setSelectedFilm(null); }}
            className={`sans-label-base transition-all duration-300 relative group text-[0.65rem] uppercase tracking-widest font-medium py-1 ${activeTab === link.id && !selectedFilm ? 'text-sunrise' : 'text-white/40 hover:text-white'}`}
          >
            {link.id}
            {activeTab === link.id && !selectedFilm && (
              <motion.div
                layoutId="nav-underline"
                className="absolute -bottom-1 left-0 right-0 h-px bg-sunrise"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        ))}
      </motion.nav>

      {/* Main Content Area */}
      <main className="pt-40 pb-20 px-[5%] max-w-[1600px] mx-auto overflow-hidden">
        <AnimatePresence mode="wait">
          {selectedFilm ? (
            <motion.div
              key="film-detail"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <FilmDetail film={selectedFilm} onBack={closeFilmDetail} />
            </motion.div>
          ) : (
            <motion.div key={activeTab} {...pageTransition}>
              {activeTab === 'FILMS' && <Films onFilmSelect={handleFilmClick} />}
              {activeTab === 'BIO' && <Bio />}
              {activeTab === 'ABOUT' && <About />}
              {activeTab === 'VIEW' && <ViewPage />}
              {activeTab === 'CONTACT' && <Contact />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="border-t border-beige-dark py-12 px-[5%] flex justify-between items-center bg-white/50">
        <span className="serif-title italic text-xl opacity-80 font-serif tracking-tight">Elena Vance</span>
        <div className="flex gap-8 text-charcoal/40">
          {[Camera, Globe, Video].map((Icon, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -3, scale: 1.2, color: 'var(--color-sunrise)' }}
              transition={springTap}
              className="cursor-pointer"
            >
              <Icon className="w-5 h-5" />
            </motion.div>
          ))}
        </div>
      </footer>
    </div>
  );
}

// --- PAGE COMPONENTS ---

function Films({ onFilmSelect }) {
  const films = [
    {
      title: 'Twin Flames - A Romantic Short Film',
      year: '2024',
      type: 'Romantic',
      youtubeId: 'c2iFiaPr5dY',
      img: twinFlamesThumb,
      description: 'A romantic short film produced by The Storygraphers about connection and emotional resonance.',
      stills: [twinFlamesThumb]
    },
    {
      title: 'Aparichit: Heavy rain brings a stranger...',
      year: '2023',
      type: 'Suspense/Short Film',
      youtubeId: 'sbMkZSHA5UY',
      start: 52,
      img: aparichitThumb,
      description: 'Directed by Rahat Jain and produced by Setups & Payoffs Studios. A suspenseful exploration of a chance encounter during a storm.',
      stills: [aparichitThumb]
    },
    {
      title: 'PIDLEGAON | Horror Short Film',
      year: '2023',
      type: 'Horror',
      youtubeId: 'qPROCEXScHY',
      img: 'https://img.youtube.com/vi/qPROCEXScHY/maxresdefault.jpg',
      description: 'A horror short film by Be YouNick that dives into local mysteries and chilling atmospheric tension.',
      stills: ['https://img.youtube.com/vi/qPROCEXScHY/maxresdefault.jpg']
    },
    {
      title: "Kaande Pohe | Valentine's Day Film",
      year: '2022',
      type: 'Romantic',
      youtubeId: 'HZ-4K2IN7DY',
      img: kaandePoheThumb,
      description: 'Produced by Terribly Tiny Tales (TTT), this film explores modern relationships and family dynamics during a traditional meeting.',
      stills: [kandeStill1, kandeStill2, kandeStill3]
    }
  ];

  return (
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 gap-20"
    >
      {films.map((film, idx) => (
        <motion.div
          key={idx}
          variants={cardVariants}
          whileHover={{ y: -6 }}
          transition={springTap}
          className="group cursor-pointer"
          onClick={() => onFilmSelect(film)}
        >
          <div className="relative overflow-hidden aspect-video rounded-2xl mb-6 bg-charcoal/5">
            <img
              src={film.img}
              alt={film.title}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 text-white scale-90 group-hover:scale-100 transition-transform duration-500">
                <Play className="fill-white w-6 h-6" />
              </div>
            </div>
          </div>
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="serif-title italic font-serif text-3xl group-hover:text-sunrise transition-colors tracking-tight leading-tight">{film.title}</h2>
            <span className="sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-charcoal/40 font-sans italic">{film.year}</span>
          </div>
          <p className="sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-charcoal/60 font-sans">{film.type}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

function FilmDetail({ film, onBack }) {
  const embedUrl = `https://www.youtube.com/embed/${film.youtubeId}${film.start ? `?start=${film.start}` : ''}`;

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ x: -3 }}
        className="flex items-center gap-2 sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-charcoal hover:text-sunrise transition-colors mb-4 group cursor-pointer relative z-10 px-4 py-2 rounded-full border border-charcoal/20 hover:border-sunrise"
      >
        <ArrowLeft className="w-3 h-3 transition-transform group-hover:-translate-x-1" /> BACK TO FILMS
      </motion.button>

      <motion.div
        className="space-y-4"
        variants={staggerContainerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1 variants={fadeUpVariants} className="serif-title italic font-serif text-7xl tracking-tight leading-tight">{film.title}</motion.h1>
        <motion.p variants={fadeUpVariants} className="sans-label-base text-sm opacity-60 font-medium tracking-widest uppercase">{film.year} • {film.type}</motion.p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="aspect-video w-full bg-charcoal/5 rounded-3xl overflow-hidden shadow-2xl border border-charcoal/5"
          >
            <iframe
              src={embedUrl}
              title={film.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </motion.div>

          <div className="space-y-6">
            <h3 className="sans-label-base text-[0.65rem] uppercase tracking-[0.2em] font-medium text-charcoal/40">Synopsis</h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl leading-relaxed text-charcoal/80 font-light max-w-3xl"
            >
              {film.description}
            </motion.p>
          </div>
        </div>

        {/* Right Column: Stills */}
        <div className="lg:col-span-4 space-y-8">
          <h3 className="sans-label-base text-[0.65rem] uppercase tracking-[0.2em] font-medium text-charcoal/40">Stills & Gallery</h3>
          <motion.div
            className="space-y-4"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {film.stills.map((still, i) => (
              <motion.img
                key={i}
                variants={fadeUpVariants}
                src={still}
                className="w-full rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 aspect-[4/3] object-cover bg-charcoal/5"
                alt={`Still ${i + 1}`}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Bio() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
      <div className="lg:col-span-1 py-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0.5, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="serif-title italic font-serif text-charcoal/10 text-[12rem] leading-none select-none absolute -left-10 tracking-tight"
        >I</motion.span>
      </div>

      <div className="lg:col-span-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-20"
        >
          <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-beige-dark">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=1200"
              alt="Portrait"
              className="w-full h-full object-cover grayscale brightness-110"
            />
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute -bottom-10 -right-10 w-40 h-40 bg-sunrise rounded-full flex items-center justify-center text-white border-8 border-beige-default p-8 text-center leading-tight sans-label-base text-[0.65rem] uppercase tracking-widest font-medium cursor-pointer hover:scale-110 transform transition-transform"
          >
            WATCH REEL
          </motion.div>
        </motion.div>

        <motion.div
          className="space-y-8 text-xl text-charcoal/80 leading-relaxed font-light"
          variants={staggerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          <motion.p variants={fadeUpVariants}>
            Elena Vance is an independent filmmaker and scholar whose practice explores the intersection of memory, archives, and digital archaeology.
          </motion.p>
          <motion.p variants={fadeUpVariants}>
            Her work has been recognized with fellowships from the{' '}
            <span className="underline-reveal relative overflow-hidden inline-block group cursor-pointer hover:before:scale-x-100 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-sunrise before:scale-x-0 before:origin-left before:transition-transform before:duration-500">Guggenheim Foundation</span>
            {' '}and{' '}
            <span className="underline-reveal relative overflow-hidden inline-block group cursor-pointer hover:before:scale-x-100 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-full before:h-px before:bg-sunrise before:scale-x-0 before:origin-left before:transition-transform before:duration-500">Creative Capital</span>.
          </motion.p>
        </motion.div>
      </div>

      <div className="lg:col-span-5 space-y-12">
        <motion.div
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="premium-card relative bg-white/80 border border-beige-dark p-8 rounded-lg overflow-hidden transition-all duration-500 hover:border-charcoal/20 shadow-sm shadow-charcoal/5"
        >
          <div className="absolute top-0 right-0 p-4">
            <ExternalLink className="w-4 h-4 text-charcoal/20" />
          </div>
          <h3 className="serif-title italic font-serif tracking-tight text-2xl mb-6">Current Affiliation</h3>
          <div className="space-y-2 sans-label-base text-[0.65rem] font-sans uppercase tracking-widest text-charcoal/60">
            <p className="text-charcoal font-bold">Professor of Cinema Studies</p>
            <p>Department of Photography & Film</p>
            <p>Virginia Commonwealth University</p>
          </div>
        </motion.div>

        <motion.button
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          transition={springTap}
          className="w-full bg-charcoal text-white rounded-full py-6 sans-label-base text-[0.65rem] uppercase tracking-widest font-medium font-sans hover:bg-sunrise transition-colors flex items-center justify-center gap-3 shadow-lg shadow-charcoal/10"
        >
          <Download className="w-4 h-4" /> DOWNLOAD CURRICULUM VITAE
        </motion.button>
      </div>
    </div>
  );
}

function About() {
  const sections = [
    {
      title: 'Select Writing',
      items: [
        { text: '\u201cThe Archive of the Invisible.\u201d', journal: 'Journal of Contemporary Cinema', year: '2023' },
        { text: '\u201cFragments and Frames: Rethinking the Subject.\u201d', journal: 'Sight & Sound', year: '2021' },
        { text: '\u201cNotes on Asymmetry in the Digital Age,\u201d', journal: 'University Press', year: '2019' }
      ]
    },
    {
      title: 'Featured Press',
      items: [
        { text: "Smith, J. Review of '24 Frames Per Day'.", journal: 'The Film Quarterly', year: '2022' },
        { text: 'Davis, A. Elevating the Everyday: Elena Vance.', journal: 'Modern Art Review', year: '2020' }
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-32 py-20 relative">
      <motion.span
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="serif-title italic font-serif tracking-tight text-charcoal/5 text-[15rem] absolute -top-20 -left-20 pointer-events-none"
      >III</motion.span>

      {sections.map((section, idx) => (
        <section key={idx} className="space-y-12 relative z-10">
          <motion.h2
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="serif-title italic font-serif tracking-tight text-6xl border-b border-charcoal/10 pb-8"
          >
            {section.title}
          </motion.h2>

          <motion.div
            className="space-y-10"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {section.items.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUpVariants}
                whileHover={{ x: 6 }}
                transition={springTap}
                className="group cursor-pointer"
              >
                <div className="flex justify-between items-start gap-10">
                  <div className="space-y-2">
                    <p className="text-2xl font-light leading-tight group-hover:text-sunrise transition-colors">{item.text}</p>
                    <p className="sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-charcoal/40 italic font-sans">{item.journal}</p>
                  </div>
                  <span className="sans-label-base text-[0.65rem] uppercase tracking-widest bg-charcoal/5 px-3 py-1 rounded text-charcoal/40 font-mono">{item.year}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      ))}
    </div>
  );
}

function ViewPage() {
  return (
    <div className="flex flex-col items-center justify-center py-40 space-y-20 relative text-center">
      <span className="serif-title italic font-serif tracking-tight text-charcoal/5 text-[15rem] absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none">II</span>

      <motion.h2
        variants={fadeUpVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="serif-title italic font-serif tracking-tight text-7xl leading-tight"
      >
        Screenings &<br /><span className="italic text-transparent" style={{ WebkitTextStroke: '1px #1A1110' }}>Inquiries</span>
      </motion.h2>

      <motion.div
        className="flex flex-col md:flex-row gap-8 w-full max-w-2xl"
        variants={staggerContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
      >
        <motion.button
          variants={fadeUpVariants}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={springTap}
          className="w-full group bg-white border border-charcoal/10 rounded-3xl p-10 hover:border-sunrise transition-colors text-left space-y-4"
        >
          <span className="sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-charcoal/40 font-sans">Mode I</span>
          <p className="serif-title italic font-serif tracking-tight text-3xl">Institutional Use</p>
          <p className="text-sm text-charcoal/50 font-light">For universities, museums, and educational distribution.</p>
        </motion.button>

        <motion.button
          variants={fadeUpVariants}
          whileHover={{ y: -4, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          transition={springTap}
          className="w-full group bg-charcoal text-white rounded-3xl p-10 hover:bg-sunrise transition-colors text-left space-y-4"
        >
          <span className="sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-white/40 font-sans">Mode II</span>
          <p className="serif-title italic font-serif tracking-tight text-3xl">Home Viewing</p>
          <p className="text-sm text-white/50 font-light">Digital screening access for private individuals.</p>
        </motion.button>
      </motion.div>
    </div>
  );
}

function Contact() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 py-20 relative">
      <span className="serif-title italic font-serif tracking-tight text-charcoal/5 text-[15rem] absolute -top-20 right-0 pointer-events-none">V</span>

      <div className="space-y-16">
        <motion.h2
          variants={fadeUpVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="serif-title italic font-serif tracking-tight text-8xl leading-none"
        >
          Say<br /><span className="italic text-sunrise">Hello</span>
        </motion.h2>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-6 group cursor-pointer">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={springTap}
              className="w-14 h-14 rounded-full bg-charcoal flex items-center justify-center text-white group-hover:bg-sunrise transition-colors shadow-lg"
            >
              <Mail className="w-6 h-6" />
            </motion.div>
            <div>
              <p className="sans-label-base text-[0.65rem] uppercase tracking-widest font-medium text-charcoal/40 font-sans">Primary Contact</p>
              <p className="text-2xl font-light">evance@vcu.edu</p>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white rounded-[2rem] p-12 shadow-2xl shadow-charcoal/5 border border-beige-dark space-y-10"
      >
        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-2 border-b border-beige-dark pb-4 focus-within:border-charcoal transition-colors">
            <label className="sans-label-base text-[0.55rem] uppercase tracking-[0.2em] font-medium text-charcoal/30 font-sans">First Name</label>
            <input type="text" className="w-full bg-transparent focus:outline-none text-xl font-light" />
          </div>
          <div className="space-y-2 border-b border-beige-dark pb-4 focus-within:border-charcoal transition-colors">
            <label className="sans-label-base text-[0.55rem] uppercase tracking-[0.2em] font-medium text-charcoal/30 font-sans">Last Name</label>
            <input type="text" className="w-full bg-transparent focus:outline-none text-xl font-light" />
          </div>
        </div>
        <div className="space-y-2 border-b border-beige-dark pb-4 focus-within:border-charcoal transition-colors">
          <label className="sans-label-base text-[0.55rem] uppercase tracking-[0.2em] font-medium text-charcoal/30 font-sans">Email Address</label>
          <input type="email" className="w-full bg-transparent focus:outline-none text-xl font-light" />
        </div>
        <div className="space-y-2 border-b border-beige-dark pb-8 focus-within:border-charcoal transition-colors">
          <label className="sans-label-base text-[0.55rem] uppercase tracking-[0.2em] font-medium text-charcoal/30 font-sans">Message</label>
          <textarea rows="4" className="w-full bg-transparent focus:outline-none text-xl font-light resize-none"></textarea>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.96 }}
          transition={springTap}
          className="w-full py-6 rounded-full bg-charcoal text-white sans-label-base text-[0.65rem] uppercase tracking-widest font-medium font-sans hover:bg-sunrise transition-colors shadow-lg hover:shadow-sunrise/20"
        >
          SEND MESSAGE
        </motion.button>
      </motion.div>
    </div>
  );
}

import MultiStepForm from "@/components/MultiStepForm";

const STATS = [
  { value: "MIT", label: "Harvard, Columbia & more" },
  { value: "100%", label: "Scholarship recipients" },
  { value: "1st", label: "Uzbeks at elite universities" },
  { value: "10+", label: "Years of proven results" },
];

const TESTIMONIALS = [
  {
    quote: "IvyBek didn't just help me apply — they helped me understand who I am and what I want to achieve. I got into MIT with a full scholarship.",
    name: "Sardor T.",
    detail: "MIT '27 · Full Scholarship",
  },
  {
    quote: "My parents were skeptical at first, but the results speak for themselves. Harvard. I'm still pinching myself.",
    name: "Malika R.",
    detail: "Harvard '26 · Merit Aid",
  },
  {
    quote: "I was the first from my school to apply abroad. IvyBek made the impossible feel achievable. Columbia accepted me.",
    name: "Jasur K.",
    detail: "Columbia '25",
  },
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Free Strategy Session",
    desc: "We assess your profile, goals, and fit — no obligations, just clarity on your path forward.",
  },
  {
    step: "02",
    title: "Personalized Roadmap",
    desc: "Custom plan covering academics, extracurriculars, test prep, and essays — tailored to you.",
  },
  {
    step: "03",
    title: "Application Excellence",
    desc: "We guide every essay, every application, every interview. You focus on your story.",
  },
  {
    step: "04",
    title: "Acceptance & Beyond",
    desc: "Scholarship negotiation, visa support, and community of Uzbek students at top universities.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-navy/95 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-white">Ivy<span className="text-gold">Bek</span></span>
            <span className="hidden sm:block text-white/40 text-xs ml-1">Top University Admissions</span>
          </div>
          <a
            href="#apply"
            className="bg-gold text-white text-sm font-semibold px-5 py-2 rounded-lg hover:bg-gold-dark transition-colors"
          >
            Apply Now
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-16 min-h-screen bg-gradient-to-br from-navy-dark via-navy to-navy-light flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left: Copy */}
          <div className="text-white">
            <div className="inline-flex items-center gap-2 bg-gold/20 text-gold border border-gold/30 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              Admissions Open for 2025–26
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Your Child Belongs at the <span className="text-gold">World's Best</span> Universities
            </h1>

            <p className="text-lg text-white/80 mb-8 leading-relaxed">
              IvyBek is the premier college admissions consultancy for Uzbek students. We've placed students at MIT, Harvard, Columbia, and Carnegie Mellon — many with full scholarships. Your story starts here.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {STATS.map((s) => (
                <div key={s.value} className="text-center">
                  <div className="text-2xl font-bold text-gold">{s.value}</div>
                  <div className="text-white/60 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <a
              href="#apply"
              className="inline-block btn-gold text-lg"
            >
              Get Free Consultation →
            </a>
            <p className="text-white/50 text-sm mt-3">No commitment required · Response within 24 hours</p>
          </div>

          {/* Right: Form */}
          <div id="apply" className="w-full scroll-mt-20">
            <MultiStepForm />
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF BANNER */}
      <section className="bg-gold py-4">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-navy font-semibold text-sm text-center">
            <span>🎓 MIT · Harvard · Stanford · Columbia</span>
            <span>🏆 100% Scholarship Recipients</span>
            <span>🇺🇿 First Uzbeks at Top-10 Universities</span>
            <span>✅ Proven Track Record Since 2014</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">How IvyBek Works</h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              A clear, structured process that's helped dozens of Uzbek students reach their dream universities.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((item) => (
              <div key={item.step} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="text-3xl font-bold text-gold/30 mb-3">{item.step}</div>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 bg-navy">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Student Success Stories</h2>
            <p className="text-white/60 max-w-xl mx-auto">Real results from real students. These are just a few of the families who trusted IvyBek.</p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <div className="text-gold text-4xl leading-none mb-3">"</div>
                <p className="text-white/90 text-sm leading-relaxed mb-5 italic">{t.quote}</p>
                <div>
                  <div className="font-bold text-white">{t.name}</div>
                  <div className="text-gold text-sm">{t.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-navy mb-4">
            Ready to Write Your Admission Story?
          </h2>
          <p className="text-gray-500 mb-8">
            Spots are limited each application cycle. Get your free consultation today and take the first step toward your dream university.
          </p>
          <a
            href="#apply"
            className="inline-block btn-navy text-lg"
          >
            Apply Now — It's Free
          </a>
          <p className="text-gray-400 text-sm mt-4">No commitment · 100% confidential · Results guaranteed</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-dark text-white/60 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <div>
            <span className="text-white font-bold">Ivy<span className="text-gold">Bek</span></span>
            {" · "}Top University Admissions for Uzbek Students
          </div>
          <div className="flex gap-6">
            <a
              href="https://instagram.com/ivybek_com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gold transition-colors"
            >
              @ivybek_com
            </a>
            <span>ivybek.com</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

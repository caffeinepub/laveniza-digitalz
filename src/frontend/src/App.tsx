import {
  ArrowRight,
  ChevronDown,
  Cpu,
  Lightbulb,
  Mail,
  Palette,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

/* ─── Reveal hook ──────────────────────────────────────── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

/* ─── Navbar ───────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastScrollY.current && y > 120);
      lastScrollY.current = y;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navClasses = [
    "navbar",
    "fixed top-0 left-0 right-0 z-50",
    hidden ? "navbar-hidden" : "",
    scrolled ? "navbar-scrolled" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <nav className={navClasses} aria-label="Main navigation">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#hero"
          className="font-display text-xl font-semibold text-ink tracking-tight hover:text-lavender-accent transition-colors duration-200"
          data-ocid="nav.link"
          aria-label="Laveniza Digitalz — back to top"
        >
          Laveniza Digitalz
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors duration-200"
            data-ocid="nav.about.link"
          >
            About
          </a>
          <a
            href="#services"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors duration-200"
            data-ocid="nav.services.link"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-sm font-medium text-ink-soft hover:text-ink transition-colors duration-200"
            data-ocid="nav.contact.link"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger — simple anchor stack */}
        <div className="flex md:hidden items-center gap-5">
          <a
            href="#about"
            className="text-xs font-medium text-ink-soft hover:text-ink transition-colors"
            data-ocid="nav.mobile.about.link"
          >
            About
          </a>
          <a
            href="#services"
            className="text-xs font-medium text-ink-soft hover:text-ink transition-colors"
            data-ocid="nav.mobile.services.link"
          >
            Services
          </a>
          <a
            href="#contact"
            className="text-xs font-medium text-ink-soft hover:text-ink transition-colors"
            data-ocid="nav.mobile.contact.link"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

/* ─── Hero Section ─────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[oklch(0.97_0.02_295)] via-[oklch(0.985_0.006_290)] to-[oklch(0.96_0.028_280)]" />

      {/* Digital grid overlay */}
      <div className="absolute inset-0 digital-grid opacity-60" />

      {/* Floating orbs */}
      <div
        className="orb-1 absolute top-[18%] left-[8%] w-72 h-72 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.1 288 / 0.28) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="orb-2 absolute bottom-[20%] right-[6%] w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.875 0.055 288 / 0.4) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />
      <div
        className="orb-3 absolute top-[55%] left-[60%] w-64 h-64 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(0.52 0.16 285 / 0.12) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <p
          className="reveal visible mb-6 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] uppercase text-lavender-accent border border-lavender-deep/60 rounded-full px-5 py-2"
          style={{ backgroundColor: "oklch(var(--lavender-light) / 0.7)" }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full bg-lavender-accent inline-block"
            aria-hidden="true"
          />
          Digital Exploration
        </p>

        {/* Headline */}
        <h1
          className="reveal reveal-delay-1 font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-ink leading-[1.05] tracking-tight mb-7"
          style={{ willChange: "transform, opacity" }}
        >
          Exploring the
          <br />
          <em className="italic text-lavender-accent">Digital</em>{" "}
          <span className="font-semibold">World</span>
        </h1>

        {/* Subtext */}
        <p className="reveal reveal-delay-2 max-w-xl mx-auto text-base sm:text-lg text-ink-soft leading-[1.75] mb-10">
          Where creative vision meets technological possibility. Laveniza
          Digitalz navigates the frontier of design, technology, and
          innovation—one digital canvas at a time.
        </p>

        {/* CTA */}
        <div className="reveal reveal-delay-3 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <a
            href="#about"
            className="btn-glow inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-white bg-lavender-accent shadow-lavender"
            style={{ backgroundColor: "oklch(var(--lavender-accent))" }}
            data-ocid="hero.primary_button"
          >
            Discover More
            <ChevronDown className="w-4 h-4" aria-hidden="true" />
          </a>
          <a
            href="#services"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-semibold text-ink border border-lavender-deep hover:bg-lavender-light transition-colors duration-200"
            data-ocid="hero.secondary_button"
          >
            Our Services
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="reveal reveal-delay-4 mt-16 flex flex-col items-center gap-2 text-ink-soft/60"
          aria-hidden="true"
        >
          <div className="w-px h-10 bg-gradient-to-b from-transparent via-lavender-accent/40 to-transparent" />
          <p className="text-xs tracking-widest uppercase">Scroll</p>
        </div>
      </div>
    </section>
  );
}

/* ─── About Section ────────────────────────────────────── */
function AboutSection() {
  const revealLeft = useReveal();
  const revealRight = useReveal();

  return (
    <section
      id="about"
      className="relative py-28 md:py-36 overflow-hidden section-bleed-top"
      aria-label="About Laveniza Digitalz"
    >
      {/* Subtle background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(var(--background)) 0%, oklch(var(--lavender-light)) 50%, oklch(var(--background)) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 md:gap-24 items-center">
        {/* Text */}
        <div ref={revealLeft} className="reveal">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-lavender-accent mb-4">
            About Us
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-[1.1] mb-7">
            A Vision Born
            <br />
            <em className="italic font-semibold text-lavender-accent">
              in the Digital Age
            </em>
          </h2>
          <p className="text-ink-soft leading-[1.75] mb-5 text-base">
            Laveniza Digitalz is a digital exploration studio founded on the
            belief that the boundary between art and technology is where the
            most interesting things happen. We craft experiences that are not
            just functional—they're unforgettable.
          </p>
          <p className="text-ink-soft leading-[1.75] mb-8 text-base">
            At the helm is{" "}
            <strong className="text-ink font-semibold">Jiza</strong>, a
            visionary creator who channels curiosity into every project. With a
            background spanning design, engineering, and digital culture, Jiza
            shapes narratives that resonate across the digital landscape.
          </p>

          {/* Stats row */}
          <div className="flex gap-10">
            {[
              { label: "Projects Launched", value: "40+" },
              { label: "Digital Experiences", value: "15+" },
              { label: "Years Exploring", value: "6+" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-3xl font-semibold text-lavender-accent">
                  {stat.value}
                </p>
                <p className="text-xs text-ink-soft mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Decorative — abstract digital geometry */}
        <div
          ref={revealRight}
          className="reveal reveal-delay-2 flex items-center justify-center"
          aria-hidden="true"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80">
            {/* Outer ring */}
            <div className="ring-spin absolute inset-0 rounded-full border-2 border-dashed border-lavender-deep/50" />
            {/* Middle ring */}
            <div
              className="ring-counter absolute inset-6 rounded-full border border-lavender-accent/30"
              style={{
                background:
                  "radial-gradient(circle, oklch(var(--lavender-light)) 0%, transparent 80%)",
              }}
            />
            {/* Center circle */}
            <div
              className="absolute inset-16 rounded-full flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle, oklch(var(--lavender-glow) / 0.25) 0%, oklch(var(--lavender-light) / 0.8) 100%)",
                boxShadow: "0 0 40px oklch(var(--lavender-accent) / 0.2)",
              }}
            >
              <span className="font-display text-4xl font-semibold text-lavender-accent select-none">
                J
              </span>
            </div>
            {/* Orbiting dots */}
            {[0, 72, 144, 216, 288].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-lavender-accent/60"
                style={{
                  transform: `rotate(${deg}deg) translate(140px) rotate(-${deg}deg)`,
                  marginTop: "-5px",
                  marginLeft: "-5px",
                }}
              />
            ))}
            {/* Corner accent squares */}
            {[
              { id: "top", top: "0", left: "50%", translate: "-50%" },
              { id: "bottom", bottom: "0", left: "50%", translate: "-50%" },
              { id: "left", top: "50%", left: "0", translateY: "-50%" },
              { id: "right", top: "50%", right: "0", translateY: "-50%" },
            ].map((pos) => (
              <div
                key={pos.id}
                className="absolute w-2 h-2 bg-lavender-deep/60 rotate-45"
                style={{
                  top: pos.top,
                  bottom: pos.bottom,
                  left: pos.left,
                  right: pos.right,
                  transform: `rotate(45deg) ${pos.translate ? `translateX(${pos.translate})` : `translateY(${pos.translateY ?? "0"})`}`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Services Section ─────────────────────────────────── */
const services = [
  {
    icon: Palette,
    title: "Digital Design",
    description:
      "Crafting visual experiences that merge aesthetics with function. Every pixel is intentional, every interaction a moment of delight.",
    accent: "oklch(0.52 0.16 285)",
    delay: "reveal-delay-1",
  },
  {
    icon: Cpu,
    title: "Technology",
    description:
      "Bridging visionary ideas with the digital frontier through modern technology. Where cutting-edge tools meet purposeful engineering.",
    accent: "oklch(0.45 0.14 290)",
    delay: "reveal-delay-2",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Pushing boundaries and reimagining the digital landscape. We don't follow trends—we contribute to what comes next.",
    accent: "oklch(0.55 0.13 280)",
    delay: "reveal-delay-3",
  },
];

function ServicesSection() {
  const revealTitle = useReveal();

  return (
    <section
      id="services"
      className="relative py-28 md:py-36 overflow-hidden section-bleed-top section-bleed-bottom-light"
      aria-label="Services"
    >
      {/* Background dots */}
      <div className="absolute inset-0 dot-pattern opacity-40" />

      <div className="relative max-w-6xl mx-auto px-6">
        {/* Header */}
        <div ref={revealTitle} className="reveal text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-lavender-accent mb-4">
            What We Do
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-ink leading-[1.1]">
            Digital Explorations
          </h2>
        </div>

        {/* Cards grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          data-ocid="services.list"
        >
          {services.map((svc, i) => (
            <ServiceCard key={svc.title} svc={svc} index={i + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  svc,
  index,
}: {
  svc: (typeof services)[number];
  index: number;
}) {
  const ref = useReveal();
  const Icon = svc.icon;

  return (
    <article
      ref={ref}
      className={`reveal ${svc.delay} service-card rounded-2xl p-8 cursor-default`}
      data-ocid={`services.item.${index}`}
    >
      {/* Icon wrapper */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-7"
        style={{
          background: `color-mix(in oklch, ${svc.accent} 12%, transparent)`,
          boxShadow: `inset 0 0 0 1px color-mix(in oklch, ${svc.accent} 22%, transparent)`,
        }}
        aria-hidden="true"
      >
        <Icon
          className="w-5 h-5"
          style={{ color: svc.accent }}
          strokeWidth={1.7}
        />
      </div>

      <h3 className="font-display text-xl font-bold text-ink mb-3 leading-snug">
        {svc.title}
      </h3>
      <p className="text-ink-soft text-sm leading-[1.7]">{svc.description}</p>

      {/* Subtle arrow */}
      <div
        className="mt-7 flex items-center gap-1.5 text-xs font-semibold tracking-wide"
        style={{ color: svc.accent }}
      >
        <span>Explore</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </article>
  );
}

/* ─── Contact / CTA Section ────────────────────────────── */
function ContactSection() {
  const revealSection = useReveal();

  return (
    <section
      id="contact"
      className="relative py-28 md:py-40 overflow-hidden"
      aria-label="Contact"
    >
      {/* Background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, oklch(var(--lavender-light)) 0%, oklch(0.93 0.035 285) 50%, oklch(var(--lavender-light)) 100%)",
        }}
      />

      {/* Decorative grid */}
      <div className="absolute inset-0 digital-grid opacity-30" />

      {/* Large orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, oklch(var(--lavender-accent) / 0.1) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div
        ref={revealSection}
        className="reveal relative max-w-3xl mx-auto px-6 text-center"
      >
        <p className="text-xs font-semibold tracking-[0.2em] uppercase text-lavender-accent mb-6">
          Get in Touch
        </p>

        <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-ink leading-[1.08] mb-6">
          Let's Build the
          <br />
          <em className="not-italic text-lavender-accent">Digital Future</em>
          <br />
          Together
        </h2>

        <p className="text-ink-soft text-lg leading-relaxed mb-12 max-w-lg mx-auto">
          Whether you have a project in mind, a question, or just want to
          connect—Jiza would love to hear from you.
        </p>

        <a
          href="mailto:hello@lavenizadigitalz.com"
          className="btn-glow inline-flex items-center gap-3 px-10 py-5 rounded-full text-sm font-semibold text-white shadow-lavender-lg"
          style={{ backgroundColor: "oklch(var(--lavender-accent))" }}
          data-ocid="contact.primary_button"
        >
          <Mail className="w-4 h-4" aria-hidden="true" />
          hello@lavenizadigitalz.com
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ───────────────────────────────────────────── */
function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="relative py-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.22 0.05 285) 0%, oklch(0.18 0.04 285) 100%)",
      }}
      aria-label="Footer"
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <p className="font-display text-lg font-semibold text-white/90 tracking-tight">
            Laveniza Digitalz
          </p>
          <nav
            className="flex items-center gap-6"
            aria-label="Footer navigation"
          >
            <a
              href="#about"
              className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200"
              data-ocid="footer.about.link"
            >
              About
            </a>
            <a
              href="#services"
              className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200"
              data-ocid="footer.services.link"
            >
              Services
            </a>
            <a
              href="#contact"
              className="text-xs text-white/50 hover:text-white/80 transition-colors duration-200"
              data-ocid="footer.contact.link"
            >
              Contact
            </a>
          </nav>
        </div>

        {/* Divider */}
        <div
          className="w-full h-px mb-8"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.52 0.16 285 / 0.3), transparent)",
          }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
          <p>
            © {year} Laveniza Digitalz · Created by{" "}
            <span className="text-white/60 font-medium">Jiza</span>
          </p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white/80 transition-colors duration-200"
              data-ocid="footer.caffeine.link"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── App Root ─────────────────────────────────────────── */
export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

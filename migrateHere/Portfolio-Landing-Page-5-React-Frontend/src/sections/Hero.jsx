/**
 * Hero section: full-viewport intro with background photo and animated header.
 * Replaces the 3D planet with Freddy's event photo (freddy5.jpg).
 * Section id="home" is the target for nav scroll links.
 *
 * Layout strategy (always exactly 100dvh):
 *   Mobile  (<lg): text block = top 42%, image = bottom 58% (both absolute)
 *   Desktop (≥lg): text block = right 55% full-height, image = left 50% full-height
 *
 * On mobile the description body is hidden (too little space) –
 * only the title + CTA buttons are shown in the top zone.
 */
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { freddy5Img } from "../constants";

const Hero = () => {
  const text = `
  הפקה והנחיה מלאה של אירוע שמעניק 
  כבוד והערכה לעובד, מנהל או שותף.
  פרדי יפיק עבורכם אירוע מרגש,
   מצחיק ובלתי נשכח.`;

  return (
    <section
      id="home"
      className="relative w-full h-dvh overflow-hidden"
      style={{ background: "#1a1613" }}
    >
      {/* ── Decorative background layers ─────────────────────────── */}

      {/* Warm amber glow – bottom-left (behind Freddy) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 55% at 18% 85%, rgba(180,100,30,0.28) 0%, transparent 65%)",
        }}
      />

      {/* Subtle warm highlight – top centre-right */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 75% 5%, rgba(150,120,80,0.10) 0%, transparent 70%)",
        }}
      />

      {/* Edge vignette – deepens corners */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 90% 90% at 50% 50%, transparent 45%, rgba(8,6,5,0.65) 100%)",
        }}
      />

      {/* Noise texture overlay – adds grain for a cinematic feel */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* ── Background Image ─────────────────────────────────────
          Mobile : absolute, bottom 58% of the section
          Desktop: absolute, left half, full height              */}
      <div className="absolute left-0 bottom-0 w-full lg:w-1/2 h-[58%] lg:h-full z-0 flex items-end pointer-events-none">
        <img
          src={freddy5Img}
          alt="פרדי ברק יושב עם גיטרה"
          className="w-full h-full object-contain object-bottom lg:object-left-bottom pointer-events-auto"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      {/* ── Text Content ─────────────────────────────────────────
          Mobile : absolute top 42%
          Desktop: absolute right 55%, full height               */}
      <div
        className={[
          "absolute z-10 text-white pointer-events-none",
          /* mobile: span the top 42% */
          "top-0 left-0 right-0 h-[42%]",
          /* desktop: right column, full height */
          "lg:left-auto lg:right-0 lg:w-[55%] lg:h-full",
          "flex flex-col justify-center",
          /* padding */
          "pt-14 sm:pt-16 lg:pt-0 px-2 sm:px-6 lg:pl-0 lg:pr-16",
        ].join(" ")}
      >
        {/* ── Mobile-only compact header ── */}
        <div className="pointer-events-auto lg:hidden px-6 flex flex-col justify-center h-full">
          <p className="text-[10px] font-light tracking-[0.4rem] uppercase text-white/60 mb-3">
            ברק הפקות · פרדי ברק
          </p>
          <h1
            className="text-[26px] sm:text-[36px] leading-[1.15] uppercase text-white"
            style={{ textShadow: "0 0 10px rgba(0,0,0,0.8)" }}
          >
            כשמגיע הרגע להגיד תודה על כל השנים
          </h1>

          <p className="text-[12px] sm:text-sm font-light text-white/75 leading-relaxed mt-3 mb-1 text-right whitespace-pre-line">
            {text.trim()}
          </p>

          {/* Mobile CTA */}
          <div className="flex flex-wrap gap-3 mt-3">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-[#c5474a] text-white hover:-translate-y-1 transition-transform duration-200"
              style={{ boxShadow: "0 14px 30px -12px rgba(197,71,74,0.8)" }}
            >
              לקבלת הצעת מחיר
            </a>
            <a
              href="#process"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm bg-white/10 text-white border border-white/50 backdrop-blur-sm hover:bg-white hover:text-[#241f1c] transition-all duration-200"
            >
              איך זה עובד
            </a>
          </div>
        </div>

        {/* ── Desktop: animated header (centered vertically) ── */}
        <div className="pointer-events-auto hidden lg:block w-full pb-20">
          <AnimatedHeaderSection
            subTitle={"ברק הפקות · פרדי ברק"}
            title={"כשמגיע הרגע להגיד תודה על כל השנים"}
            text={text}
            textColor={"text-white"}
          />
        </div>
      </div>
      {/* ── Desktop CTA – absolute, bottom-right, always visible ── */}
      <div className="absolute z-20 bottom-8 right-0 hidden lg:flex flex-wrap gap-3 px-10 pointer-events-auto">
        <a
          href="#contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-[#c5474a] text-white hover:-translate-y-1 transition-transform duration-200"
          style={{ boxShadow: "0 14px 30px -12px rgba(197,71,74,0.8)" }}
        >
          לקבלת הצעת מחיר
        </a>
        <a
          href="#process"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm bg-white/10 text-white border border-white/50 backdrop-blur-sm hover:bg-white hover:text-[#241f1c] transition-all duration-200"
        >
          איך זה עובד
        </a>
      </div>

    </section>
  );
};

export default Hero;

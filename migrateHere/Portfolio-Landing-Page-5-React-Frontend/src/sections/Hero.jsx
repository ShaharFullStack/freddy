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
      className="relative w-full h-dvh bg-[#241f1c] overflow-hidden"
    >
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
          /* desktop: right column, full height – flex-col so CTA sits at bottom */
          "lg:left-auto lg:right-0 lg:w-[55%] lg:h-full",
          "flex flex-col lg:justify-between",
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

          {/* Mobile CTA */}
          <div className="flex flex-wrap gap-3 mt-4">
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

        {/* ── Desktop: animated header (grows to fill space) ── */}
        <div className="pointer-events-auto hidden lg:block lg:flex-1 lg:flex lg:items-center">
          <AnimatedHeaderSection
            subTitle={"ברק הפקות · פרדי ברק"}
            title={"כשמגיע הרגע להגיד תודה על כל השנים"}
            text={text}
            textColor={"text-white"}
          />
        </div>

        {/* ── Desktop CTA – outside the animated block, pinned to bottom ── */}
        <div className="pointer-events-auto hidden lg:flex flex-wrap gap-3 px-6 sm:px-10 pb-12">
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
      </div>

    </section>
  );
};

export default Hero;

/**
 * Hero section: full-viewport intro with background photo and animated header.
 * Replaces the 3D planet with Freddy's event photo (freddy5.jpg).
 * Section id="home" is the target for nav scroll links.
 */
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { freddy5Img } from "../constants";

const Hero = () => {
  const text = `הפקה והנחיה מלאה של אירוע שמעניק כבוד אמיתי
לעובד הוותיק – פרדי לוקח על עצמו
את התחקיר, הכתיבה, הצילום וההנחיה`;

  return (
    <section
      id="home"
      className="relative flex flex-col justify-end min-h-screen overflow-hidden"
    >
      {/* Background photo with dark gradient overlay */}
      <figure className="absolute inset-0 -z-10">
        <img
          src={freddy5Img}
          alt="פרדי ברק מנחה אירוע פרישה"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(36,31,28,0.3) 0%, rgba(36,31,28,0.15) 40%, rgba(36,31,28,0.85) 100%)",
          }}
        />
      </figure>

      {/* Text content */}
      <div className="relative z-10 text-white pb-12">
        <AnimatedHeaderSection
          subTitle={"ברק הפקות · פרדי ברק"}
          title={"חיים שכאלה"}
          text={text}
          textColor={"text-white"}
        />

        {/* Stats row */}
        <div className="flex gap-10 px-10 mt-4 flex-wrap">
          {[
            { n: "20+", l: "שנות ניסיון" },
            { n: "300+", l: "אירועים" },
            { n: "100%", l: "לקוחות מרוצים" },
          ].map(({ n, l }) => (
            <div key={l}>
              <div className="font-bold text-3xl text-[#ffa4a4]" style={{ fontFamily: "Rubik, sans-serif" }}>{n}</div>
              <div className="text-sm text-white/70 mt-1">{l}</div>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex gap-4 px-10 mt-8 flex-wrap">
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

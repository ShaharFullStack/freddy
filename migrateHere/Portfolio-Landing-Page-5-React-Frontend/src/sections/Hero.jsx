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
          className="w-full h-half object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(36,31,28,0.1) 0%, rgba(36,31,28,0.35) 40%, rgba(36,31,28,0.85) 100%)",
          }}
        />
      </figure>

      {/* Text content */}
      <div className="relative z-10 text-white pb-12">
        <AnimatedHeaderSection
          subTitle={"ברק הפקות · פרדי ברק"}
          title={"כשמגיע הרגע להגיד תודה על כל השנים"}
          text={text}
          textColor={"text-white"}
        />



        {/* CTA buttons */}
        <div className="flex gap-8 px-20 flex-wrap">
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

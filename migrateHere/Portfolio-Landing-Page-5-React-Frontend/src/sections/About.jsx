/**
 * About section: Freddy's bio with clip-path image reveal and animated text lines.
 * Section id="about" is the target for nav scroll links.
 */
import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { AnimatedTextLines } from "../components/AnimatedTextLines";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { freddy2Img } from "../constants";

const About = () => {
  const text = `מעל 20 שנה בהפקת אירועים משמעותיים
ייצור תוכן, תחקיר ועריכה ברמה גבוהה
הנחיה חמה ושירה שמחברת את כולם`;

  const aboutText = `מעל 20 שנה אני מלווה ארגונים, מוסדות, רשויות וחברות ביצירת תוכן לאירועים משמעותיים.
ב"חיים שכאלה" אני מפיק ומנחה אירועי פרישה, קידום בתפקיד וימי הוקרה בצורה חמה, אישית ומכובדת, עם אחריות מלאה על כל שלב בהפקה.
בכל אירוע משולבים סיפורים אישיים מהלב, וידאו מרגש, מצגת ושירי ארץ ישראל בשירה בציבור.
בשנים 2016–2018 השתתפתי כמראיין ומתעד בפרויקט ההסתדרות הציונית העולמית – מאות ראיונות השמורים בספרייה הלאומית ע"ש שפילברג.`;

  const imgRef = useRef(null);

  useGSAP(() => {
    gsap.to("#about", {
      scale: 0.95,
      scrollTrigger: {
        trigger: "#about",
        start: "bottom 80%",
        end: "bottom 20%",
        scrub: true,
      },
      ease: "power1.inOut",
    });

    gsap.set(imgRef.current, {
      clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0% 100%)",
    });
    gsap.to(imgRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "power4.out",
      scrollTrigger: { trigger: imgRef.current },
    });
  });

  return (
    <section id="about" className="min-h-screen bg-[#241f1c] rounded-b-4xl">
      <AnimatedHeaderSection
        subTitle={"מנחה ומפיק, יוצר ומספר"}
        title={"אודות"}
        text={text}
        textColor={"text-[#fcf9ea]"}
        withScrollTrigger={true}
      />
      <div className="flex flex-col items-center justify-between gap-16 px-10 pb-16 text-xl font-light tracking-wide lg:flex-row md:text-2xl lg:text-3xl text-[#fcf9ea]/60">
        <img
          ref={imgRef}
          src={freddy2Img}
          alt="פרדי ברק – מנחה ומפיק אירועים"
          className="w-md rounded-3xl object-cover"
        />
        <AnimatedTextLines text={aboutText} className={"w-full"} />
      </div>
    </section>
  );
};

export default About;

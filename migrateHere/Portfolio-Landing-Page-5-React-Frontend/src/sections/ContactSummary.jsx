/**
 * Trust / "למה פרדי" section: two marquee strips with a centered trust statement.
 * ScrollTrigger pins this section while scrolling through (pin: true).
 */
import { useRef } from "react";
import Marquee from "../components/Marquee";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const ContactSummary = () => {
  const containerRef = useRef(null);

  const trustItems = [
    "ניסיון",
    "מקצועיות",
    "אמינות",
    "רגישות"
  ];

  const ctaItems = [
    "לשיחת ייעוץ",
    "להפקת אירוע",
    "לשירה בציבור",
  ];

  useGSAP(() => {
    gsap.to(containerRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
        markers: false,
      },
    });
  }, []);

  return (
    <section
      id="trust"
      ref={containerRef}
      className="flex flex-col items-center justify-between min-h-screen gap-12 mt-16"
    >
      <Marquee items={trustItems} />

      <div className="flex flex-col md:flex-row gap-6 px-6 lg:px-12 w-full max-w-[1400px] z-10">
        {[
          {
            text: "פרדי הפיק עבורנו אירוע פרישה מושלם. היחס האישי, המקצועיות והרגישות היו מעל ומעבר.",
            name: "רונית, מנהלת משאבי אנוש",
          },
          {
            text: "אירוע הוקרה שלא נשכח! התוכן היה מרגש, מצחיק ומדויק להפליא. הצוות כולו לא הפסיק לשבח.",
            name: 'דניאל, מנכ"ל',
          },
          {
            text: "מעבר להפקה המתוקתקת, ההנחיה של פרדי הוסיפה חום ואנושיות שהפכו את הערב לקסום.",
            name: "מיכל, יו״ר ועד עובדים",
          },
        ].map((testimonial, idx) => (
          <div key={idx} className="flex-1 bg-black/5 border border-black/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between transition-transform hover:-translate-y-1 duration-300">
            <div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gold">
                    <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                  </svg>
                ))}
              </div>
              <p className="text-[#241f1c] font-light text-lg md:text-xl leading-relaxed mb-8">
                "{testimonial.text}"
              </p>
            </div>
            <p className="text-gold font-medium text-sm tracking-wide">
              {testimonial.name}
            </p>
          </div>
        ))}
      </div>

      <Marquee
        items={ctaItems}
        reverse={true}
        className="text-black bg-transparent border-y-2"
        iconClassName="stroke-gold stroke-2 text-primary"
        icon="material-symbols-light:square"
      />
    </section>
  );
};

export default ContactSummary;

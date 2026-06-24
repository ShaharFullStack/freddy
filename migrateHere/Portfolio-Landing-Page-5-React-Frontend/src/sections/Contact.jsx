/**
 * Contact section: Freddy's contact info + lead form + footer marquee.
 * Form submits to /api/leads (same endpoint as index2.html).
 * Section id="contact" is the target for nav scroll links.
 */
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import LeadForm from "../components/LeadForm";
import Marquee from "../components/Marquee";
import { contactInfo } from "../constants";



const Contact = () => {
  const text = `השאירו פרטים ופרדי יחזור אליכם
עם כל המידע והצעת מחיר מותאמת
אפשר גם פשוט להרים טלפון`;

  const footerItems = [
    "חיים שכאלה",
    "ברק הפקות",
    "פרדי ברק",
    "חיים שכאלה",
    "ברק הפקות",
  ];

  useGSAP(() => {
    gsap.from(".contact-link", {
      y: 100,
      opacity: 0,
      delay: 0.5,
      duration: 1,
      stagger: 0.3,
      ease: "back.out",
      scrollTrigger: { trigger: ".contact-link" },
    });
  }, []);

  return (
    <section
      id="contact"
      className="flex flex-col justify-between min-h-screen bg-[#241f1c]"
    >
      <div>
        <AnimatedHeaderSection
          subTitle={"בואו נדבר"}
          title={"צור קשר"}
          text={text}
          textColor={"text-[#fcf9ea]"}
          withScrollTrigger={true}
        />

        {/* Contact links + form */}
        <div className="px-10 mb-16 flex flex-col gap-16 lg:flex-row lg:items-start lg:gap-20">
          {/* Left: contact links */}
          <div className="flex flex-col gap-8 text-[#fcf9ea] font-light lg:text-[32px] text-[26px] leading-none flex-shrink-0">
            <div className="contact-link">
              <h2 className="text-[#fcf9ea]/50 text-sm tracking-wider uppercase mb-2">וואטסאפ / טלפון</h2>
              <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
              <a
                href={contactInfo.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl lg:text-3xl tracking-wider hover:text-[#ffa4a4] transition-colors duration-200"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className="contact-link">
              <h2 className="text-[#fcf9ea]/50 text-sm tracking-wider uppercase mb-2">חייגו ישירות</h2>
              <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
              <a
                href={contactInfo.phoneHref}
                className="text-xl md:text-2xl lg:text-3xl lowercase hover:text-[#ffa4a4] transition-colors duration-200"
              >
                חייגו לפרדי
              </a>
            </div>
            <div className="contact-link">
              <h2 className="text-[#fcf9ea]/50 text-sm tracking-wider uppercase mb-2">אתר</h2>
              <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
              <a
                href={contactInfo.websiteHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xl md:text-2xl lg:text-3xl lowercase hover:text-[#ffa4a4] transition-colors duration-200"
              >
                {contactInfo.website}
              </a>
            </div>
          </div>

          {/* Right: lead form */}
          <LeadForm className="flex-1" />
        </div>
      </div>

      {/* Footer marquee */}
      <div>
        <Marquee items={footerItems} className="text-[#fcf9ea] bg-transparent" />
        <div className="text-center py-6 text-[#fcf9ea]/40 text-sm">
          © {new Date().getFullYear()} ברק הפקות · כל הזכויות שמורות
        </div>
      </div>

      {/* Floating WhatsApp button */}
      <a
        href={contactInfo.whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="שלחו הודעה בוואטסאפ"
        className="fixed bottom-5 left-5 z-50 flex items-center bg-[#25d366] text-white rounded-full overflow-hidden"
        style={{ boxShadow: "0 14px 30px -10px rgba(37,211,102,0.6)" }}
      >
        <span className="w-14 h-14 grid place-items-center flex-shrink-0">
          <svg viewBox="0 0 24 24" fill="#fff" width="26" height="26">
            <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.978-1.515zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap font-semibold text-sm transition-all duration-300 hover:max-w-[210px] hover:pl-4">
          דברו עם פרדי בוואטסאפ
        </span>
      </a>
    </section>
  );
};

export default Contact;

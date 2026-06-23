/**
 * Events section: dark block with sticky event-type cards for Freddy Barak.
 * Each card animates in on scroll; on desktop, sticky top + margin create a stacked "stack" effect.
 * Section ids: events (first card acts as the events anchor).
 */
import { useRef } from "react";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";
import { eventsData } from "../constants";
import { useMediaQuery } from "react-responsive";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Services = () => {
  const text = `אירועי פרישה, קידום והוקרה
מותאמים לכל ארגון ולכל אדם
עם הפקה מלאה ותחקיר עומק`;
  const serviceRefs = useRef([]);
  const isDesktop = useMediaQuery({ minWidth: "48rem" });

  useGSAP(() => {
    serviceRefs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        y: 200,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
        duration: 1,
        ease: "circ.out",
      });
    });
  }, []);

  return (
    <section id="events" className="min-h-screen bg-[#241f1c] rounded-t-4xl">
      <AnimatedHeaderSection
        subTitle={"למי זה מתאים"}
        title={"סוגי אירועים"}
        text={text}
        textColor={"text-[#fcf9ea]"}
        withScrollTrigger={true}
      />
      {eventsData.map((event, index) => (
        <div
          ref={(el) => (serviceRefs.current[index] = el)}
          key={index}
          className="sticky px-10 pt-6 pb-12 text-[#fcf9ea] bg-[#241f1c] border-t-2 border-[#fcf9ea]/20"
          style={
            isDesktop
              ? {
                  top: `calc(10vh + ${index * 5}em)`,
                  marginBottom: `${(eventsData.length - index - 1) * 5}rem`,
                }
              : { top: 0 }
          }
        >
          <div className="flex items-center justify-between gap-4 font-light">
            <div className="flex flex-col gap-6">
              <h2 className="text-4xl lg:text-5xl">{event.title}</h2>
              <p className="text-xl leading-relaxed tracking-widest lg:text-2xl text-[#fcf9ea]/60 text-pretty">
                {event.description}
              </p>
              <div className="flex flex-col gap-2 text-2xl sm:gap-4 lg:text-3xl text-[#fcf9ea]/80">
                {event.items.map((item, itemIndex) => (
                  <div key={`item-${index}-${itemIndex}`}>
                    <h3 className="flex">
                      <span className="ml-12 text-lg text-[#ffa4a4]/60">
                        0{itemIndex + 1}
                      </span>
                      {item.title}
                    </h3>
                    {itemIndex < event.items.length - 1 && (
                      <div className="w-full h-px my-2 bg-[#fcf9ea]/20" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Services;

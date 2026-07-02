import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "./ui/utils";

interface CardData {
  id: number | string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export function Workflow() {
  const container = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const workflowCards: CardData[] = [
    {
      id: 1,
      phase: "01",
      title: "Requirements Discovery",
      description: "We deep-dive into your business goals, target audience, and project constraints. Every feature is scoped, documented, and aligned with your timeline before coding.",
      deliverables: ["Scope Document", "Feature Spec Sheet", "Timeline Roadmap"]
    },
    {
      id: 2,
      phase: "02",
      title: "Competitor Benchmarking",
      description: "We reverse-engineer your competition—mapping what they do well and identifying their structural weaknesses to carve out a distinct visual and functional edge.",
      deliverables: ["Competitive Audit", "UX Gap Analysis", "Feature Comparison Grid"]
    },
    {
      id: 3,
      phase: "03",
      title: "Brand & Niche Synthesis",
      description: "We craft the visual system tailored to your industry niche. Curating custom typography, color palettes, and motion parameters to establish premium quality.",
      deliverables: ["Color Palette System", "Typography Guide", "Visual Styleboard"]
    },
    {
      id: 4,
      phase: "04",
      title: "Rough Mockups & Layouts",
      description: "We structure the layout, mapping user flows and key structural wireframes. Visual designs are locked down early to ensure a flawless experience.",
      deliverables: ["Interactive Wireframes", "User Flow Diagrams", "Responsive Layout Sketches"]
    },
    {
      id: 5,
      phase: "05",
      title: "Core Development & Launch",
      description: "We code the vision using modern React and Vite frameworks. Focused on clean semantic HTML, fast loading times, pixel-perfect responsiveness, and smooth animations.",
      deliverables: ["Production Build", "Lighthouse Audit Report", "SEO Integration"]
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const cardElements = cardRefs.current.filter((el): el is HTMLDivElement => el !== null);
    const totalCards = cardElements.length;

    if (totalCards === 0 || !container.current) return;

    // Reset initial card positioning
    gsap.set(cardElements[0], { y: "0%", scale: 1, rotation: 0 });

    for (let i = 1; i < totalCards; i++) {
      gsap.set(cardElements[i], { y: "100%", scale: 1, rotation: 0 });
    }

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: `+=${window.innerHeight * (totalCards - 1)}`,
        pin: true,
        scrub: 0.5,
        pinSpacing: true,
      },
    });

    for (let i = 0; i < totalCards - 1; i++) {
      const currentCard = cardElements[i];
      const nextCard = cardElements[i + 1];
      const position = i;

      scrollTimeline.to(
        currentCard,
        {
          scale: 0.82,
          rotation: 3,
          duration: 1,
          ease: "none",
        },
        position
      );

      scrollTimeline.to(
        nextCard,
        {
          y: "0%",
          duration: 1,
          ease: "none",
        },
        position
      );
    }

    const resizeObserver = new ResizeObserver(() => {
      ScrollTrigger.refresh();
    });

    resizeObserver.observe(container.current);

    return () => {
      resizeObserver.disconnect();
      scrollTimeline.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={container}
      className="relative w-full h-screen bg-[#0B0D0F] text-[#E6EEF3] overflow-hidden"
    >
      <div className="relative flex flex-col h-full w-full items-center justify-center overflow-hidden p-4 md:p-8">
        
        {/* Header Block anchored at the top */}
        <div className="text-center mb-8 relative z-20 select-none">
          <span className="text-xs uppercase tracking-[0.25em] text-[#67E8F9] font-mono font-semibold">
            Execution Path
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#E6EEF3] mt-2">
            Our Agency Workflow
          </h2>
        </div>

        {/* Stacked Cards Container */}
        <div
          className="relative h-[65vh] w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl overflow-hidden rounded-3xl z-10"
        >
          {workflowCards.map((card, i) => (
            <div
              key={card.id}
              className="absolute inset-0 overflow-hidden flex flex-col justify-between p-8 md:p-14 bg-[#131619] border border-[#7C8A96]/15 rounded-3xl shadow-[0_30px_60px_-15px_rgba(91,60,255,0.15)]"
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
            >
              {/* Top Row: Phase Indicator & Huge Background Number */}
              <div className="flex justify-between items-start z-10">
                <span className="font-mono text-xs md:text-sm text-[#67E8F9] font-bold tracking-[0.2em] uppercase">
                  PHASE // {card.phase}
                </span>
                <span className="text-5xl md:text-7xl font-bold text-[#E6EEF3]/[0.02] font-mono select-none leading-none -mt-2">
                  {card.phase}
                </span>
              </div>
              
              {/* Content Panel */}
              <div className="relative z-10 flex-1 flex flex-col justify-center my-6">
                <h3 className="text-2xl md:text-4xl font-bold text-[#E6EEF3] mb-4 tracking-tight leading-[1.15]">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-[#98A3AA] max-w-xl leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {/* Bottom Row: Key Deliverables Tags */}
              <div className="border-t border-[#7C8A96]/10 pt-6 z-10">
                <h4 className="text-xs uppercase tracking-wider text-[#67E8F9] font-semibold mb-3">
                  Key Deliverables
                </h4>
                <div className="flex flex-wrap gap-2 md:gap-3">
                  {card.deliverables.map((item) => (
                    <span 
                      key={item} 
                      className="text-[10px] md:text-xs px-3 py-1.5 bg-[#0B0D0F] border border-[#7C8A96]/10 text-[#E6EEF3] rounded-lg font-mono font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

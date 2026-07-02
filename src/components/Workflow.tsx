import React from "react";

interface CardData {
  id: number | string;
  phase: string;
  title: string;
  description: string;
  deliverables: string[];
}

export function Workflow() {
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

  return (
    <section className="relative w-full bg-[#0B0D0F] text-[#E6EEF3] py-24 px-6 md:px-12 select-none">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] text-[#67E8F9] font-mono font-semibold">
            Execution Path
          </span>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#E6EEF3] mt-2">
            Our Agency Workflow
          </h2>
        </div>

        {/* Stacked Cards Container using pure CSS sticky */}
        <div className="flex flex-col gap-12 relative">
          {workflowCards.map((card, i) => (
            <div
              key={card.id}
              className="sticky bg-[#131619] border border-[#7C8A96]/15 rounded-3xl p-8 md:p-14 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] hover:border-[#67E8F9]/30 transition-all duration-300 flex flex-col justify-between"
              style={{
                top: `${100 + i * 28}px`,
                minHeight: "360px",
                marginBottom: i === workflowCards.length - 1 ? "0" : "80px",
              }}
            >
              {/* Top Row: Phase Indicator & Huge Background Number */}
              <div className="flex justify-between items-start">
                <span className="font-mono text-xs md:text-sm text-[#67E8F9] font-bold tracking-[0.2em] uppercase">
                  PHASE // {card.phase}
                </span>
                <span className="text-5xl md:text-7xl font-bold text-[#E6EEF3]/[0.02] font-mono select-none leading-none -mt-2">
                  {card.phase}
                </span>
              </div>
              
              {/* Content Panel */}
              <div className="flex-1 flex flex-col justify-center my-6">
                <h3 className="text-2xl md:text-4xl font-bold text-[#E6EEF3] mb-4 tracking-tight leading-[1.15]">
                  {card.title}
                </h3>
                <p className="text-sm md:text-base text-[#98A3AA] max-w-3xl leading-relaxed font-light">
                  {card.description}
                </p>
              </div>

              {/* Bottom Row: Key Deliverables Tags */}
              <div className="border-t border-[#7C8A96]/10 pt-6">
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
export default Workflow;

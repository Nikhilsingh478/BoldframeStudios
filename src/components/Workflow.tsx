import { motion, useScroll, useTransform } from "motion/react";
import React, { useRef } from "react";
import { TrendingUp, FileText, Palette, Layers, Cpu } from "lucide-react";

export function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });

  const steps = [
    {
      phase: "01",
      title: "Discovery & Requirements",
      description: "We deep-dive into your project requirements, defining product scope, user goals, and success metrics. Every detail is mapped out to build a rock-solid roadmap.",
      icon: <FileText className="w-6 h-6 text-[#67E8F9]" />,
      alignment: "left"
    },
    {
      phase: "02",
      title: "Competitor Benchmarking",
      description: "We analyze competitor strengths and weaknesses, identifying their best practices and major pitfalls. This research allows us to carve out a distinct edge for your brand.",
      icon: <TrendingUp className="w-6 h-6 text-[#5B3CFF]" />,
      alignment: "right"
    },
    {
      phase: "03",
      title: "Brand & Niche Synthesis",
      description: "We establish visual direction tailored to your niche. This includes typography curation, color palette selection, and setting design standards that speak for themselves.",
      icon: <Palette className="w-6 h-6 text-[#67E8F9]" />,
      alignment: "left"
    },
    {
      phase: "04",
      title: "Rough Mockups & Layouts",
      description: "We prepare structural wireframes and low-fidelity layout concepts, locking down user flows and content hierarchy before entering development.",
      icon: <Layers className="w-6 h-6 text-[#5B3CFF]" />,
      alignment: "right"
    },
    {
      phase: "05",
      title: "Performance-First Dev",
      description: "We turn designs into pixel-perfect code. Focused on light payloads, clean motion, full responsiveness, SEO best practices, and award-winning execution.",
      icon: <Cpu className="w-6 h-6 text-[#67E8F9]" />,
      alignment: "left"
    }
  ];

  return (
    <section
      ref={ref}
      className="relative flex h-[360vh] w-full flex-col items-center overflow-hidden bg-[#0B0D0F] px-6 text-[#E6EEF3]"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none z-0">
        <div className="absolute top-[20%] left-1/4 w-[500px] h-[500px] bg-[#5B3CFF] rounded-full blur-[140px]" />
        <div className="absolute top-[60%] right-1/4 w-[600px] h-[600px] bg-[#67E8F9] rounded-full blur-[160px]" />
      </div>

      {/* Hero Section of Workflow */}
      <div className="mt-32 relative z-10 flex w-fit flex-col items-center justify-center gap-6 text-center max-w-4xl">
        <span className="text-xs uppercase tracking-[0.25em] text-[#67E8F9] font-mono font-semibold">
          Our Process
        </span>
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-[#E6EEF3] leading-[1.1]">
          The Workflow That <br /> Sets Our Standards
        </h2>
        <p className="max-w-2xl text-base md:text-lg text-[#98A3AA]">
          We follow a rigorous, professionally thought-out design and development cycle. 
          Scroll down to trace our line of execution.
        </p>

        {/* Scroll Linked Line Path */}
        <LinePath
          className="absolute -right-[30%] lg:-right-[40%] top-[40vh] z-0 opacity-40 lg:opacity-75"
          scrollYProgress={scrollYProgress}
        />
      </div>

      {/* Workflow Steps Stack */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mt-40 space-y-48">
        {steps.map((step, idx) => (
          <motion.div
            key={step.phase}
            initial={{ opacity: 0, y: 50, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className={`flex w-full ${
              step.alignment === "right" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="relative w-full md:w-[500px] glass p-8 rounded-2xl border border-[#7C8A96]/10 shadow-[0_20px_50px_rgba(91,60,255,0.05)] hover:border-[#67E8F9]/30 transition-colors duration-300">
              <div className="absolute top-0 right-0 p-4 font-mono text-xs text-[#67E8F9]/30 font-bold">
                PHASE // {step.phase}
              </div>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#131619] border border-[#7C8A96]/10 flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold text-[#E6EEF3]">
                  {step.title}
                </h3>
              </div>
              <p className="text-[#98A3AA] text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer Block - adapted from Skiper UI */}
      <div className="rounded-3xl relative z-10 w-full max-w-6xl mt-auto mb-20 bg-[#131619] border border-[#7C8A96]/10 p-12 text-[#E6EEF3]">
        <h1 className="text-center text-[10vw] font-bold leading-[0.9] tracking-tighter uppercase text-transparent bg-clip-text bg-gradient-to-r from-[#5B3CFF] via-[#67E8F9] to-[#5B3CFF] bg-size-200">
          BoldFrame
        </h1>
        <div className="mt-20 flex w-full flex-col items-start gap-8 px-4 font-medium lg:flex-row lg:justify-between border-t border-[#7C8A96]/10 pt-10">
          <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
            <p className="w-fit text-xs text-[#98A3AA] tracking-wider leading-relaxed">
              Punjab, India <br />
              & Online Globally
            </p>
            <p className="w-fit text-right text-xs text-[#98A3AA] tracking-wider leading-relaxed lg:text-left">
              Est. 2025 <br />
              BoldFrame Studios
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
            <p className="w-fit text-xs text-[#98A3AA] tracking-wider leading-relaxed">
              Fast, Responsive <br />
              Tailored Websites
            </p>
            <p className="w-fit text-right text-xs text-[#98A3AA] tracking-wider leading-relaxed lg:text-left">
              Conversion Driven <br />
              Creative Motion
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.4, 1.2]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#5B3CFF"
        strokeWidth="10"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};

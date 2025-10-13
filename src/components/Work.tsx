import { motion } from 'motion/react';
import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { ExternalLink } from 'lucide-react';
import { CaseStudyModal } from './CaseStudyModal';

const projects = [
  {
    title: 'Zenith Commerce',
    category: 'E-Commerce Platform',
    image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc2MDMzOTkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjB3ZWJzaXRlfGVufDF8fHx8MTc2MDMzOTkwNnww&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A complete e-commerce rebuild focused on conversion optimization and blazing-fast performance.',
    timeline: '3 months',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe', 'Vercel'],
    challenge: 'The client had a legacy PHP site with poor mobile experience and a 12s load time that was killing conversions.',
    solution: 'We built a modern JAMstack solution with server-side rendering, edge caching, and optimized images to deliver sub-2s page loads.',
    outcomes: [
      { metric: 'Conversion Rate', value: '+45%' },
      { metric: 'Page Load', value: '1.8s' },
      { metric: 'Mobile Traffic', value: '+68%' },
    ],
    gallery: [],
    highlights: [
      '45% increase in conversion rate',
      'Sub-2s page load time',
      'Fully responsive across all devices',
    ],
  },
  {
    title: 'Pulse Fitness',
    category: 'Mobile Application',
    image: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYwMzQxMzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYwMzQxMzExfDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'A comprehensive fitness tracking platform with real-time social features and personalized workout plans.',
    timeline: '4 months',
    tech: ['React Native', 'Node.js', 'PostgreSQL', 'WebSockets', 'AWS'],
    challenge: 'Building a performant mobile app with real-time features while maintaining battery efficiency and offline support.',
    solution: 'Implemented efficient state management, optimistic UI updates, and smart caching strategies for seamless offline-first experience.',
    outcomes: [
      { metric: 'Active Users', value: '100K+' },
      { metric: 'Session Time', value: '28min' },
      { metric: 'Retention', value: '84%' },
    ],
    gallery: [],
    highlights: [
      '100K+ active users',
      'Real-time workout tracking',
      'Seamless social integration',
    ],
  },
  {
    title: 'Nexus Dashboard',
    category: 'Web Application',
    image: 'https://images.unsplash.com/photo-1677214467820-ab069619bbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYwMzAwMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    heroImage: 'https://images.unsplash.com/photo-1677214467820-ab069619bbb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB3ZWIlMjBkZXNpZ258ZW58MXx8fHwxNzYwMzAwMTQ5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    description: 'An enterprise analytics dashboard handling millions of data points with custom visualizations and real-time updates.',
    timeline: '5 months',
    tech: ['React', 'D3.js', 'GraphQL', 'Redis', 'Docker'],
    challenge: 'Displaying massive datasets with complex visualizations while maintaining 60fps performance and sub-second query times.',
    solution: 'Implemented virtual scrolling, data pagination, worker threads for calculations, and smart caching with incremental loading.',
    outcomes: [
      { metric: 'Load Time', value: '-50%' },
      { metric: 'Data Points', value: '10M+' },
      { metric: 'User Satisfaction', value: '96%' },
    ],
    gallery: [],
    highlights: [
      'Enterprise-grade analytics',
      'Custom data visualization',
      '50% reduction in load time',
    ],
  },
];

export function Work() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedCase, setSelectedCase] = useState<typeof projects[0] | null>(null);

  return (
    <>
      <section id="work" className="py-32 bg-[#0F1316]">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
            className="text-center mb-16"
          >
            <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-4" style={{ fontWeight: 600 }}>
              Featured Work
            </h2>
            <p className="text-[#98A3AA] max-w-2xl mx-auto">
              Case studies showcasing our approach to design, development, and performance optimization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: 'spring',
                  damping: 18,
                  stiffness: 120,
                }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => setSelectedCase(project)}
                className="group relative overflow-hidden rounded-xl cursor-pointer"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-[#0B0D0F]">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Blur overlay on hover */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 backdrop-blur-sm bg-[#0B0D0F]/60 flex flex-col items-center justify-center p-6"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#5B3CFF] flex items-center justify-center mx-auto mb-4">
                        <ExternalLink className="w-6 h-6 text-[#E6EEF3]" />
                      </div>
                      <h3 className="text-xl text-[#E6EEF3] mb-2" style={{ fontWeight: 600 }}>
                        {project.title}
                      </h3>
                      <p className="text-[#67E8F9] text-sm mb-4">
                        {project.category}
                      </p>
                      <div className="space-y-2">
                        {project.highlights.map((highlight) => (
                          <p key={highlight} className="text-[#98A3AA] text-xs">
                            • {highlight}
                          </p>
                        ))}
                      </div>
                      <p className="text-[#67E8F9] text-xs mt-4">
                        Click to see full case study →
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Info bar */}
                <div className="glass p-4">
                  <h3 className="text-[#E6EEF3] mb-1" style={{ fontWeight: 600 }}>
                    {project.title}
                  </h3>
                  <p className="text-[#7C8A96] text-sm">{project.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CaseStudyModal
        isOpen={selectedCase !== null}
        onClose={() => setSelectedCase(null)}
        caseStudy={selectedCase}
      />
    </>
  );
}

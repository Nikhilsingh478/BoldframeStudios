import { motion } from 'motion/react';
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export function Playroom() {
  const [activeView, setActiveView] = useState<'before' | 'after'>('before');

  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 opacity-20">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#5B3CFF] rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, type: 'spring', damping: 18, stiffness: 120 }}
          className="text-center mb-16"
        >
          <h2 className="text-[clamp(2rem,4vw,3rem)] text-[#E6EEF3] mb-4" style={{ fontWeight: 600 }}>
            Impact in Action
          </h2>
          <p className="text-[#98A3AA] max-w-2xl mx-auto text-[clamp(0.875rem,1.5vw,1rem)]">
            See the measurable difference our approach makes.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Toggle Buttons */}
          <div className="flex justify-center gap-4 mb-8">
            <motion.button
              onClick={() => setActiveView('before')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeView === 'before'
                  ? 'bg-[#5B3CFF] text-[#E6EEF3]'
                  : 'glass text-[#98A3AA] hover:text-[#E6EEF3]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Before
            </motion.button>
            <motion.button
              onClick={() => setActiveView('after')}
              className={`px-6 py-3 rounded-lg transition-all ${
                activeView === 'after'
                  ? 'bg-[#5B3CFF] text-[#E6EEF3]'
                  : 'glass text-[#98A3AA] hover:text-[#E6EEF3]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              After
            </motion.button>
          </div>

          {/* Content */}
          <motion.div
            className="glass rounded-2xl p-8 md:p-12"
            layout
            transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Metrics Side */}
              <div>
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.4 }}
                >
                  {activeView === 'before' ? (
                    <>
                      <div className="text-[#98A3AA] text-sm mb-2 tracking-wider">BASELINE METRICS</div>
                      <div className="space-y-6">
                        <div>
                          <div className="text-5xl text-[#E6EEF3] mb-2" style={{ fontWeight: 700 }}>
                            4.2s
                          </div>
                          <div className="text-[#7C8A96]">Page Load Time</div>
                        </div>
                        <div>
                          <div className="text-5xl text-[#E6EEF3] mb-2" style={{ fontWeight: 700 }}>
                            2.3%
                          </div>
                          <div className="text-[#7C8A96]">Conversion Rate</div>
                        </div>
                        <div>
                          <div className="text-5xl text-[#E6EEF3] mb-2" style={{ fontWeight: 700 }}>
                            68
                          </div>
                          <div className="text-[#7C8A96]">Lighthouse Score</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="text-[#67E8F9] text-sm mb-2 tracking-wider">OPTIMIZED RESULTS</div>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-baseline gap-3">
                            <div className="text-5xl text-[#67E8F9]" style={{ fontWeight: 700 }}>
                              1.4s
                            </div>
                            <div className="text-[#67E8F9] text-xl">-67%</div>
                          </div>
                          <div className="text-[#7C8A96]">Page Load Time</div>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-3">
                            <div className="text-5xl text-[#67E8F9]" style={{ fontWeight: 700 }}>
                              5.8%
                            </div>
                            <div className="text-[#67E8F9] text-xl">+152%</div>
                          </div>
                          <div className="text-[#7C8A96]">Conversion Rate</div>
                        </div>
                        <div>
                          <div className="flex items-baseline gap-3">
                            <div className="text-5xl text-[#67E8F9]" style={{ fontWeight: 700 }}>
                              96
                            </div>
                            <div className="text-[#67E8F9] text-xl">+41%</div>
                          </div>
                          <div className="text-[#7C8A96]">Lighthouse Score</div>
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              </div>

              {/* Visual Side */}
              <div className="relative">
                <motion.div
                  key={activeView}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="aspect-square rounded-xl bg-gradient-to-br from-[#0F1316] to-[#0B0D0F] border border-[#7C8A96]/20 flex items-center justify-center relative overflow-hidden"
                >
                  {activeView === 'before' ? (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[#7C8A96]/20 flex items-center justify-center">
                        <div className="w-12 h-12 border-4 border-[#7C8A96] border-t-transparent rounded-full animate-spin" />
                      </div>
                      <div className="text-[#7C8A96] text-sm">Loading...</div>
                    </div>
                  ) : (
                    <div className="w-full h-full p-8 flex flex-col justify-between">
                      <div className="flex items-center justify-between">
                        <div className="w-8 h-8 rounded-full bg-[#5B3CFF]" />
                        <div className="flex gap-2">
                          <div className="w-2 h-2 rounded-full bg-[#67E8F9]" />
                          <div className="w-2 h-2 rounded-full bg-[#67E8F9]" />
                          <div className="w-2 h-2 rounded-full bg-[#67E8F9]" />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="h-3 bg-[#5B3CFF]/30 rounded" />
                        <div className="h-3 bg-[#5B3CFF]/20 rounded w-3/4" />
                      </div>
                      <motion.div
                        className="flex items-center gap-2 text-[#67E8F9] text-sm"
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        <span>Optimized</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </div>
                  )}

                  {/* Badge */}
                  <motion.div
                    className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs ${
                      activeView === 'after'
                        ? 'bg-[#67E8F9]/20 text-[#67E8F9] border border-[#67E8F9]/30'
                        : 'bg-[#7C8A96]/20 text-[#7C8A96] border border-[#7C8A96]/30'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', damping: 15, stiffness: 200 }}
                  >
                    {activeView === 'after' ? '✓ Fast' : '⏱ Slow'}
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

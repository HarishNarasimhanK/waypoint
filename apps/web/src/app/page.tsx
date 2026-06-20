"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease },
  }),
};

const features = [
  {
    title: "Job Radar",
    description: "Fresh postings surfaced within minutes. Stay ahead of the crowd.",
    gradient: "from-[#05AEFC] to-[#0490d4]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Resume Optimizer",
    description: "AI analyzes your resume per job. Actionable tweaks, not rewrites.",
    gradient: "from-[#6366f1] to-[#4f46e5]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Smart Matching",
    description: "Semantic search understands meaning, not just keywords.",
    gradient: "from-[#10b981] to-[#059669]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Track Everything",
    description: "From discovered to offer, never lose track of where you stand.",
    gradient: "from-[#f59e0b] to-[#d97706]",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F6F2EC] bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(5,174,252,0.04),transparent),radial-gradient(ellipse_60%_50%_at_80%_60%,rgba(99,102,241,0.03),transparent),radial-gradient(ellipse_50%_40%_at_10%_80%,rgba(16,185,129,0.03),transparent)]">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-[#F6F2EC]/80 border-b border-black/[0.03]"
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.a
            href="/"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <Image src="/logo.png" alt="Waypoint" width={36} height={36} />
            <span className="text-[16px] font-semibold tracking-tight text-[var(--foreground)]">
              waypoint
            </span>
          </motion.a>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <motion.span
                whileHover={{ color: "#05AEFC" }}
                whileTap={{ scale: 0.97 }}
                className="px-4 py-2 text-[15px] font-medium text-[var(--foreground)] transition-colors cursor-pointer"
              >
                Log in
              </motion.span>
            </Link>
            <Link href="/signup">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.96 }}
                className="px-6 py-2.5 text-[15px] font-medium bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-full shadow-[0_2px_8px_rgba(5,174,252,0.3),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer inline-block"
              >
                Get Started
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6 relative">
        {/* Subtle radial glow behind hero */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-[#05AEFC]/[0.04] to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative">
          <motion.div initial="hidden" animate="visible" className="space-y-7">
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#05AEFC]/[0.08] to-[#05AEFC]/[0.03] border border-[#05AEFC]/10 text-[#05AEFC] text-sm font-medium tracking-wide uppercase">
                <motion.span
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-[#05AEFC]"
                />
                Coming soon
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-[3.2rem] md:text-[4.5rem] font-bold tracking-tight text-[var(--foreground)] leading-[1.05]"
            >
              Every goal needs
              <br />
              <span className="bg-gradient-to-r from-[#05AEFC] via-[#1ab8fc] to-[#0490d4] bg-clip-text text-transparent">
                a waypoint.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-[var(--foreground)]/70 max-w-lg mx-auto leading-[1.7]"
            >
              Stop scrolling job boards. Waypoint discovers opportunities, matches
              them to your profile, and optimizes your resume to apply.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex items-center justify-center gap-3 pt-1">
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-[15px] font-semibold bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white rounded-full shadow-[0_4px_14px_rgba(5,174,252,0.35),inset_0_1px_0_rgba(255,255,255,0.2)] cursor-pointer"
              >
                Start for Free
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 text-[15px] font-semibold text-[var(--foreground)] bg-gradient-to-b from-white to-[#f9f7f4] rounded-full shadow-[0_2px_10px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] cursor-pointer"
              >
                How It Works
              </motion.button>
            </motion.div>
          </motion.div>

          {/* App Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease }}
            className="mt-20 relative"
          >
            <div className="relative mx-auto max-w-3xl rounded-[20px] bg-gradient-to-b from-white to-[#fdfcfa] shadow-[0_8px_40px_rgba(0,0,0,0.06),0_1px_2px_rgba(0,0,0,0.04)] overflow-hidden">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-b from-[#f7f4ef] to-[#f2ede6] border-b border-black/[0.04]">
                <div className="flex gap-1.5">
                  <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-b from-[#FF6B6B] to-[#ee4444]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-b from-[#FFD93D] to-[#f5c518]" />
                  <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-b from-[#6BCB77] to-[#4caf50]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-3 py-1 rounded-lg bg-white/60 backdrop-blur-sm text-[11px] text-[var(--foreground)]/40 font-mono border border-black/[0.03]">
                    waypoint.app/radar
                  </div>
                </div>
              </div>
              {/* Job list */}
              <div className="p-5 space-y-2">
                {[
                  { company: "Google", role: "Software Engineer, New Grad", time: "3m ago", score: 92, gradient: "from-[#4285F4] to-[#2b6ce0]" },
                  { company: "Microsoft", role: "SDE Intern, Cloud Platform", time: "12m ago", score: 87, gradient: "from-[#00A4EF] to-[#0078d4]" },
                  { company: "Stripe", role: "Backend Engineer, Payments", time: "28m ago", score: 79, gradient: "from-[#635BFF] to-[#4b44d4]" },
                ].map((job, i) => (
                  <motion.div
                    key={job.company}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + i * 0.12, duration: 0.4, ease }}
                    whileHover={{
                      scale: 1.01,
                      boxShadow: "0 4px 16px rgba(5, 174, 252, 0.06)",
                      transition: { duration: 0.2 },
                    }}
                    className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5">
                      <motion.div
                        whileHover={{ scale: 1.08, rotate: -3 }}
                        className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm bg-gradient-to-br ${job.gradient}`}
                      >
                        {job.company[0]}
                      </motion.div>
                      <div className="text-left">
                        <p className="text-sm font-medium text-[var(--foreground)]">{job.role}</p>
                        <p className="text-xs text-[var(--foreground)]/40 mt-0.5">{job.company} · {job.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <div className="w-14 h-[5px] rounded-full bg-black/[0.04] overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${job.score}%` }}
                            transition={{ delay: 1 + i * 0.15, duration: 0.8, ease }}
                            className="h-full rounded-full bg-gradient-to-r from-[#05AEFC] to-[#1ab8fc]"
                          />
                        </div>
                        <span className="text-xs font-semibold text-[#05AEFC] tabular-nums">{job.score}%</span>
                      </div>
                      <motion.div
                        whileHover={{ x: 2 }}
                        className="text-[var(--foreground)]/30"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 relative bg-gradient-to-b from-transparent via-white/30 to-transparent">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-3 leading-tight">
              Everything you need to land your next role
            </h2>
            <p className="text-[var(--foreground)]/60 text-base">
              Built for freshers who refuse to miss an opportunity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-4">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: i * 0.06, duration: 0.4, ease }}
                whileHover={{
                  y: -3,
                  transition: { duration: 0.25 },
                }}
                className="group p-6 rounded-2xl bg-gradient-to-br from-white/90 to-white/50 backdrop-blur-sm shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.06)] transition-shadow duration-300 cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: -3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} text-white flex items-center justify-center mb-4 shadow-sm`}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-[17px] font-semibold text-[var(--foreground)] mb-1">
                  {feature.title}
                </h3>
                <p className="text-sm text-[var(--foreground)]/55 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] leading-tight">
              How it works
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              { step: "1", title: "Set your profile", desc: "Upload your resume and set target roles. Takes 2 minutes." },
              { step: "2", title: "Get matched", desc: "Radar scans job boards. AI ranks them by relevance to you." },
              { step: "3", title: "Apply optimized", desc: "Get tailored resume tweaks per job. Apply with confidence." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease }}
                whileHover={{ x: 4, transition: { duration: 0.2 } }}
                className="flex items-center gap-5 p-5 rounded-2xl bg-gradient-to-r from-white/80 to-white/40 backdrop-blur-sm shadow-[0_1px_8px_rgba(0,0,0,0.02)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.04)] transition-shadow duration-300 cursor-default"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-[#1ab8fc] to-[#05AEFC] text-white text-sm font-bold flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(5,174,252,0.25)]">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[var(--foreground)] mb-0.5">{item.title}</h3>
                  <p className="text-sm text-[var(--foreground)]/55 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="max-w-3xl mx-auto text-center p-14 rounded-[2rem] bg-gradient-to-br from-[#05AEFC] via-[#0ba5ec] to-[#0490d4] text-white relative overflow-hidden shadow-[0_20px_60px_rgba(5,174,252,0.2)]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.1),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,0,0,0.08),transparent_60%)]" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Stop missing opportunities.
            </h2>
            <p className="text-white/70 text-base mb-8 max-w-sm mx-auto">
              Let opportunities find you. Free forever for core features.
            </p>
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 text-[15px] font-semibold bg-gradient-to-b from-white to-[#f0f0f0] text-[#05AEFC] rounded-full shadow-[0_4px_16px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.8)] cursor-pointer"
            >
              Get Started Free
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 cursor-pointer">
            <Image src="/logo.png" alt="Waypoint" width={26} height={26} />
            <span className="text-[15px] font-medium text-[var(--foreground)]">waypoint</span>
          </a>
          <p className="text-sm text-[var(--foreground)]/40">
            Every goal needs a waypoint.
          </p>
        </div>
      </footer>
    </div>
  );
}

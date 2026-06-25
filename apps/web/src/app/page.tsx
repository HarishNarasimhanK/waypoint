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
    transition: { delay: i * 0.1, duration: 0.5, ease },
  }),
};

const features = [
  {
    title: "Job Radar",
    description: "Fresh postings from across the web, surfaced in minutes.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Resume Optimizer",
    description: "AI-tailored resume tweaks for every application.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "Smart Matching",
    description: "Semantic search that understands your skills, not just keywords.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
  },
  {
    title: "Track Everything",
    description: "From discovered to offer — know where every application stands.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
      </svg>
    ),
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-zinc-100"
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5">
            <Image src="/logo.png" alt="Waypoint" width={32} height={32} />
            <span className="text-[15px] font-semibold tracking-tight">waypoint</span>
          </a>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="px-5 py-2 text-sm font-medium bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" className="space-y-6">
            <motion.p
              variants={fadeUp}
              custom={0}
              className="text-sm font-medium text-blue-600 tracking-wide"
            >
              INTELLIGENT JOB DISCOVERY PLATFORM
            </motion.p>

            <motion.h1
              variants={fadeUp}
              custom={1}
              className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Every goal needs{" "}
              <span className="text-blue-600">a waypoint.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              custom={2}
              className="text-lg text-zinc-500 max-w-md mx-auto leading-relaxed"
            >
              Stop scrolling job boards. Waypoint discovers opportunities,
              matches them to your profile, and optimizes your resume — automatically.
            </motion.p>

            <motion.div variants={fadeUp} custom={3} className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/signup"
                className="px-7 py-3 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Start for Free
              </Link>
              <a
                href="#how"
                className="px-7 py-3 text-sm font-semibold text-zinc-700 border border-zinc-200 rounded-lg hover:border-zinc-300 hover:bg-zinc-50 transition-colors"
              >
                How It Works
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* App Preview */}
      <section className="px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6, ease }}
          className="max-w-3xl mx-auto"
        >
          <div className="rounded-xl border border-zinc-200 bg-zinc-50 overflow-hidden shadow-sm">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-200 bg-white">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-200" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="px-3 py-1 rounded-md bg-zinc-100 text-[11px] text-zinc-400 font-mono">
                  waypoint.app/radar
                </div>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {[
                { company: "Google", role: "Software Engineer, New Grad", time: "3m ago", score: 92, color: "bg-blue-600" },
                { company: "Microsoft", role: "SDE Intern, Cloud Platform", time: "12m ago", score: 87, color: "bg-emerald-600" },
                { company: "Stripe", role: "Backend Engineer, Payments", time: "28m ago", score: 79, color: "bg-violet-600" },
              ].map((job, i) => (
                <motion.div
                  key={job.company}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.4, ease }}
                  className="flex items-center justify-between p-3.5 rounded-lg bg-white border border-zinc-100 hover:border-zinc-200 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white ${job.color}`}>
                      {job.company[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{job.role}</p>
                      <p className="text-xs text-zinc-400 mt-0.5">{job.company} · {job.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${job.score}%` }}
                          transition={{ delay: 0.9 + i * 0.1, duration: 0.6, ease }}
                          className="h-full rounded-full bg-blue-600"
                        />
                      </div>
                      <span className="text-xs font-medium text-zinc-500 tabular-nums">{job.score}%</span>
                    </div>
                    <svg className="w-4 h-4 text-zinc-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="py-24 px-6 border-t border-zinc-100">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold tracking-tight mb-3">
              Everything you need to land your next role
            </h2>
            <p className="text-zinc-500">
              Built for freshers who refuse to miss an opportunity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
                className="p-6 rounded-xl border border-zinc-100 hover:border-zinc-200 hover:bg-zinc-50/50 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-zinc-100 text-zinc-600 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-semibold mb-1">{feature.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-24 px-6 bg-zinc-50 border-t border-zinc-100">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.4 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold tracking-tight">How it works</h2>
          </motion.div>

          <div className="space-y-3">
            {[
              { step: "1", title: "Set your profile", desc: "Upload your resume and set target roles. Takes 2 minutes." },
              { step: "2", title: "Get matched", desc: "Radar scans job boards and ranks matches by relevance to you." },
              { step: "3", title: "Apply optimized", desc: "Get tailored resume tweaks per job. Apply with confidence." },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="flex items-center gap-5 p-5 rounded-xl bg-white border border-zinc-100"
              >
                <div className="w-9 h-9 rounded-full bg-zinc-900 text-white text-sm font-bold flex items-center justify-center shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold mb-0.5">{item.title}</h3>
                  <p className="text-sm text-zinc-500">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl mx-auto text-center p-12 rounded-2xl bg-zinc-900 text-white"
        >
          <h2 className="text-3xl font-bold mb-3">Stop missing opportunities.</h2>
          <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
            Let opportunities find you. Free forever for core features.
          </p>
          <Link
            href="/signup"
            className="inline-block px-7 py-3 text-sm font-semibold bg-white text-zinc-900 rounded-lg hover:bg-zinc-100 transition-colors"
          >
            Get Started Free
          </Link>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-zinc-100">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Waypoint" width={24} height={24} />
            <span className="text-sm font-medium">waypoint</span>
          </a>
          <p className="text-sm text-zinc-400">Every goal needs a waypoint.</p>
        </div>
      </footer>
    </div>
  );
}

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Bookmark,
  ChevronRight,
  Flame,
  Heart,
  MessageCircle,
  Plus,
  Search,
  Share2,
  TrendingUp,
} from "lucide-react";
import { useT } from "../i18n/LanguageContext";
import FeatureSidebar from "./_layout/FeatureSidebar";

const POST_META = [
  {
    initials: "AC",
    name: "Alex Chen",
    likes: 142,
    comments: 28,
    shares: 14,
    grad: "from-violet-500 to-fuchsia-500",
  },
  {
    initials: "EP",
    name: "Emma Park",
    likes: 98,
    comments: 15,
    shares: 9,
    grad: "from-indigo-500 to-violet-500",
  },
  {
    initials: "RP",
    name: "Rohan Patel",
    likes: 64,
    comments: 9,
    shares: 6,
    grad: "from-pink-500 to-violet-500",
  },
  {
    initials: "SL",
    name: "Sophia Lin",
    likes: 51,
    comments: 12,
    shares: 4,
    grad: "from-sky-500 to-indigo-500",
  },
] as const;

const COMMUNITY_META = [
  { initials: "H", grad: "from-red-500 to-rose-500" },
  { initials: "S", grad: "from-rose-500 to-pink-500" },
  { initials: "M", grad: "from-violet-500 to-indigo-500" },
  { initials: "N", grad: "from-fuchsia-500 to-pink-500" },
  { initials: "P", grad: "from-amber-500 to-orange-500" },
] as const;

const fade = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: 0.04 + i * 0.04,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  }),
};

function PostCard({
  post,
  meta,
  i,
}: {
  post: { meta: string; tags: readonly string[]; title: string; body: string };
  meta: (typeof POST_META)[number];
  i: number;
}) {
  return (
    <motion.article
      initial="hidden"
      animate="show"
      variants={fade}
      custom={3 + i}
      className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/[0.04]"
    >
      <header className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className={`flex h-9 w-9 flex-none items-center justify-center rounded-full bg-gradient-to-br ${meta.grad} text-[12px] font-semibold text-white`}
          >
            {meta.initials}
          </span>
          <div>
            <div className="text-[12.5px] font-semibold text-white">
              {meta.name}
            </div>
            <div className="text-[10.5px] text-white/45">{post.meta}</div>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-white/[0.05] px-2 py-0.5 text-[10px] font-medium text-violet-200 ring-1 ring-white/10"
            >
              {tag}
            </span>
          ))}
        </div>
      </header>

      <h3 className="mt-3 text-[14.5px] font-semibold leading-snug tracking-tight text-white group-hover:text-white">
        {post.title}
      </h3>
      <p className="mt-1.5 line-clamp-2 text-[12.5px] leading-[1.65] text-white/55">
        {post.body}
      </p>

      <footer className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-4 text-white/55">
          <button
            type="button"
            className="flex items-center gap-1.5 text-[11.5px] transition-colors duration-200 hover:text-pink-300"
          >
            <Heart className="h-3.5 w-3.5" strokeWidth={2} />
            {meta.likes}
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-[11.5px] transition-colors duration-200 hover:text-violet-200"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={2} />
            {meta.comments}
          </button>
          <button
            type="button"
            className="flex items-center gap-1.5 text-[11.5px] transition-colors duration-200 hover:text-white/85"
          >
            <Share2 className="h-3.5 w-3.5" strokeWidth={2} />
            {meta.shares}
          </button>
        </div>

        {/* Tiny avatar stack of "people who engaged" */}
        <div className="flex items-center -space-x-1.5">
          {["E1", "E2", "E3"].map((id, idx) => (
            <span
              key={id}
              className="h-5 w-5 rounded-full ring-2 ring-ink-950"
              style={{
                background:
                  idx === 0
                    ? "linear-gradient(135deg,#a855f7,#ec4899)"
                    : idx === 1
                      ? "linear-gradient(135deg,#6366f1,#a855f7)"
                      : "linear-gradient(135deg,#f43f5e,#ec4899)",
              }}
            />
          ))}
          <button
            type="button"
            aria-label="Save post"
            className="ml-3 text-white/40 transition-colors duration-200 hover:text-white/80"
          >
            <Bookmark className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        </div>
      </footer>
    </motion.article>
  );
}

function RightRail() {
  const { t } = useT();

  return (
    <aside className="hidden xl:flex w-[300px] flex-none flex-col gap-6 border-l border-white/[0.06] bg-black/30 px-5 py-7">
      {/* Trending */}
      <section>
        <h3 className="flex items-center gap-2 px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/45">
          <Flame className="h-3.5 w-3.5 text-orange-300" strokeWidth={2} />
          {t.community.trending}
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {t.community.trendingItems.map((tt, i) => (
            <li key={tt.topic}>
              <button
                type="button"
                className="group flex w-full items-start gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3 text-left transition-all duration-200 hover:border-white/15 hover:bg-white/[0.045]"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-white/[0.05] text-[10px] font-semibold text-white/65 ring-1 ring-white/10">
                  {i + 1}
                </span>
                <span className="flex-1">
                  <span className="block text-[12px] font-medium leading-snug text-white">
                    {tt.topic}
                  </span>
                  <span className="mt-0.5 block text-[10.5px] text-white/45">
                    {tt.posts}
                  </span>
                </span>
                <ChevronRight className="mt-1 h-3.5 w-3.5 flex-none text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-white/70" />
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-violet-300 transition-colors duration-200 hover:text-white"
        >
          {t.community.viewAllTrending}
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} />
        </button>
      </section>

      {/* Popular communities */}
      <section>
        <h3 className="flex items-center gap-2 px-1 text-[12px] font-semibold uppercase tracking-[0.08em] text-white/45">
          <TrendingUp className="h-3.5 w-3.5 text-violet-300" strokeWidth={2} />
          {t.community.popularCommunities}
        </h3>
        <ul className="mt-4 flex flex-col gap-2">
          {t.community.communities.map((c, i) => {
            const { initials, grad } = COMMUNITY_META[i];
            return (
              <li key={c.name}>
                <button
                  type="button"
                  className="group flex w-full items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.025] p-2.5 text-left transition-all duration-200 hover:border-white/15 hover:bg-white/[0.045]"
                >
                  <span
                    className={`flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-gradient-to-br ${grad} text-[11.5px] font-semibold text-white`}
                  >
                    {initials}
                  </span>
                  <span className="flex-1">
                    <span className="block text-[12px] font-medium text-white">
                      {c.name}
                    </span>
                    <span className="mt-0.5 block text-[10.5px] text-white/45">
                      {c.members}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className="mt-3 inline-flex items-center gap-1 text-[11.5px] text-violet-300 transition-colors duration-200 hover:text-white"
        >
          {t.community.exploreAll}
          <ArrowUpRight className="h-3 w-3" strokeWidth={2.4} />
        </button>
      </section>
    </aside>
  );
}

export default function CommunityPage() {
  const { t } = useT();

  return (
    <div className="relative flex min-h-screen w-full bg-ink-950 text-white">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          background:
            "radial-gradient(40% 30% at 18% 8%, rgba(124,58,237,0.18), transparent 70%), radial-gradient(35% 30% at 92% 92%, rgba(236,72,153,0.12), transparent 70%)",
        }}
      />

      <div className="relative z-10 flex w-full">
        <FeatureSidebar />

        <main className="relative flex flex-1 flex-col px-6 pb-20 pt-10 sm:px-10 sm:pt-12">
          {/* Header */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={0}
            className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center"
          >
            <div>
              <h1 className="text-[26px] font-bold tracking-[-0.02em] text-white sm:text-[28px]">
                {t.community.title}{" "}
                <span className="inline-block translate-y-[-2px]">🌐</span>
              </h1>
              <p className="mt-1 text-[12.5px] text-white/55">
                {t.community.subtitle}
              </p>
            </div>

            <div className="flex w-full items-center gap-2 md:w-auto">
              {/* Search */}
              <div className="relative w-full max-w-[280px] md:w-[280px]">
                <Search
                  className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-white/40"
                  strokeWidth={2}
                />
                <input
                  type="text"
                  placeholder={t.community.searchPlaceholder}
                  className="h-9 w-full rounded-full border border-white/10 bg-white/[0.04] pl-8 pr-3 text-[12px] text-white placeholder:text-white/40 outline-none transition-colors duration-200 focus:border-violet-400/40 focus:bg-white/[0.06]"
                />
              </div>

              {/* New post */}
              <button
                type="button"
                className="inline-flex h-9 items-center gap-1.5 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 px-3.5 text-[12px] font-semibold text-white shadow-[0_6px_22px_rgba(168,85,247,0.45)] transition-transform duration-200 hover:scale-[1.02]"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.4} />
                {t.community.newPost}
              </button>
            </div>
          </motion.div>

          {/* Tabs */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={1}
            className="mt-7 flex items-center gap-1 border-b border-white/[0.07]"
          >
            {t.community.tabs.map((tab, i) => {
              const active = i === 0;
              return (
                <button
                  type="button"
                  key={tab}
                  className={`relative px-3 py-2.5 text-[12.5px] font-medium transition-colors duration-200 ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {tab}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute inset-x-1 -bottom-px h-[2px] rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg,#a855f7,#ec4899)",
                      }}
                    />
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Filter chips */}
          <motion.div
            initial="hidden"
            animate="show"
            variants={fade}
            custom={2}
            className="mt-4 flex flex-wrap gap-2"
          >
            {t.community.filters.map((f, i) => {
              const active = i === 0;
              return (
                <button
                  type="button"
                  key={f}
                  className={`rounded-full border px-3 py-1.5 text-[11.5px] font-medium transition-all duration-200 ${
                    active
                      ? "border-white/20 bg-white/[0.08] text-white"
                      : "border-white/10 bg-white/[0.025] text-white/65 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {f}
                </button>
              );
            })}
          </motion.div>

          {/* Feed */}
          <div className="mt-6 flex flex-col gap-3">
            {t.community.posts.map((p, i) => (
              <PostCard
                key={POST_META[i].name + p.title}
                post={p}
                meta={POST_META[i]}
                i={i}
              />
            ))}
          </div>
        </main>

        <RightRail />
      </div>
    </div>
  );
}

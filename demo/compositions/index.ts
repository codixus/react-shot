import { lazy } from "react";
import type { CompositionEntry, ScreenshotNarrative } from "react-shot/types";
import { appstore, appstoreIPad } from "react-shot/presets";

function narrative(
  name: string,
  family: ScreenshotNarrative["family"],
  brandColor: string,
  slots: ScreenshotNarrative["slots"],
): ScreenshotNarrative {
  return { name, family, brandColor, slots };
}

export const compositions: CompositionEntry[] = [
  {
    id: "promptjr",
    name: "PromptJr — AI learning for kids",
    component: lazy(() => import("./promptjr")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 5,
    family: "ai-learning",
    narrative: narrative("PromptJr", "ai-learning", "#6C4DFF", [
      { role: "hook", headline: { verb: "LEARN", outcome: "AI LIKE A GAME", support: "Quests, streaks, and real prompts" }, screenshot: "/assets/screenshots/promptjr/home.png" },
      { role: "shift", headline: { verb: "UNLOCK", outcome: "TEN-MINUTE LESSONS", support: "Bite-sized quests" }, screenshot: "/assets/screenshots/promptjr/academy.png" },
      { role: "proof", headline: { verb: "MASTER", outcome: "WITH QUICK QUIZZES", support: "Answer, learn the why" }, screenshot: "/assets/screenshots/promptjr/quiz.png" },
      { role: "feature", headline: { verb: "CREATE", outcome: "IN THE PLAYGROUND", support: "Safe, guided creations" }, screenshot: "/assets/screenshots/promptjr/playground.png" },
      { role: "cta", headline: { verb: "KEEP", outcome: "PARENTS IN THE LOOP", support: "Weekly progress, calm pace" }, screenshot: "/assets/screenshots/promptjr/parent.png" },
    ]),
  },
  {
    id: "flast",
    name: "Flast — AI that works",
    component: lazy(() => import("./flast")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 5,
    family: "ai-assistant",
    narrative: narrative("Flast", "ai-assistant", "#000000", [
      { role: "hook", headline: { verb: "ASK", outcome: "HONESTLY", support: "Feedback you can act on, not validation." }, screenshot: "/assets/screenshots/flast/chat.png" },
      { role: "shift", headline: { verb: "REMEMBER", outcome: "WHAT MATTERS", support: "Every conversation builds on the last." }, screenshot: "/assets/screenshots/flast/search.png" },
      { role: "proof", headline: { verb: "MATCH", outcome: "THE TONE", support: "From patient tutor to ruthless editor." }, screenshot: "/assets/screenshots/flast/persona.png" },
      { role: "feature", headline: { verb: "SHIP", outcome: "IN ONE CHAT", support: "Research, code, design, and ship." }, screenshot: "/assets/screenshots/flast/tools.png" },
      { role: "cta", headline: { verb: "KEEP", outcome: "IT ALL", support: "Chats, drafts, media, prompts." }, screenshot: "/assets/screenshots/flast/library.png" },
    ]),
  },
  {
    id: "creator-captions",
    name: "Creator Captions",
    component: lazy(() => import("./creator-captions")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 5,
    family: "creator-bold",
    narrative: narrative("Creator Captions", "creator-bold", "#C31612", [
      { role: "hook", headline: { verb: "ADD", outcome: "CAPTIONS TO VIDEOS", support: "Hook faster in silent feeds" }, screenshot: "/assets/screenshots/promptjr/home.png", proofItems: ["Auto timing", "Hook-first text"] },
      { role: "shift", headline: { verb: "GET", outcome: "MORE VIEWS", support: "Better retention from the same edit" }, screenshot: "/assets/screenshots/promptjr/academy.png" },
      { role: "proof", headline: { verb: "ADJUST", outcome: "EVERYTHING", support: "Fonts, colors, pacing" }, screenshot: "/assets/screenshots/promptjr/quiz.png" },
      { role: "feature", headline: { verb: "SELECT", outcome: "PRO DESIGNS", support: "Brand-ready looks" }, screenshot: "/assets/screenshots/promptjr/playground.png" },
      { role: "cta", headline: { verb: "AUTO", outcome: "TRANSCRIBE CLEANLY", support: "Timing that lands" }, screenshot: "/assets/screenshots/promptjr/profile.png" },
    ]),
  },
  {
    id: "transit-pulse",
    name: "Transit Pulse",
    component: lazy(() => import("./transit-pulse")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 5,
    family: "transit-utility",
    narrative: narrative("Transit Pulse", "transit-utility", "#050505", [
      { role: "hook", headline: { verb: "MOVE", outcome: "WITH CONFIDENCE", support: "Subway, bus, and rail together" }, screenshot: "/assets/screenshots/promptjr/home.png" },
      { role: "shift", headline: { verb: "SEE", outcome: "NEARBY DEPARTURES", support: "What leaves now" }, screenshot: "/assets/screenshots/promptjr/academy.png" },
      { role: "proof", headline: { verb: "GET", outcome: "BEST ROUTES", support: "The fastest next move" }, screenshot: "/assets/screenshots/promptjr/quiz.png" },
      { role: "feature", headline: { verb: "TRACK", outcome: "YOUR BUS LIVE", support: "Real-time movement" }, screenshot: "/assets/screenshots/promptjr/playground.png" },
      { role: "cta", headline: { verb: "CHECK", outcome: "SERVICE CHANGES", support: "Before they hit" }, screenshot: "/assets/screenshots/promptjr/profile.png" },
    ]),
  },
  {
    id: "quiet-premium",
    name: "Quiet Premium",
    component: lazy(() => import("./quiet-premium")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 4,
    family: "premium-neutral",
    narrative: narrative("Quiet Premium", "premium-neutral", "#F5F3EE", [
      { role: "hook", headline: { verb: "WORK", outcome: "WITHOUT NOISE", support: "No banners. No nagging." }, screenshot: "/assets/screenshots/promptjr/home.png" },
      { role: "shift", headline: { verb: "WRITE", outcome: "IN ONE ROOM", support: "Research, drafts, and published work." }, screenshot: "/assets/screenshots/promptjr/academy.png" },
      { role: "proof", headline: { verb: "SHIP", outcome: "QUIETLY", support: "Digests, not notifications." }, screenshot: "/assets/screenshots/promptjr/quiz.png" },
      { role: "cta", headline: { verb: "START", outcome: "ON A BLANK PAGE", support: "No tour. Just write." }, screenshot: "/assets/screenshots/promptjr/profile.png" },
    ]),
  },
  {
    id: "playful-gifting",
    name: "Playful Gifting",
    component: lazy(() => import("./playful-gifting")),
    preset: appstore,
    ipadPreset: appstoreIPad,
    slices: 5,
    family: "playful-commerce",
    narrative: narrative("Playful Gifting", "playful-commerce", "#F7C6E8", [
      { role: "hook", headline: { verb: "TURN", outcome: "DINNER INTO A DATE", support: "At home, instantly" }, screenshot: "/assets/screenshots/promptjr/home.png" },
      { role: "shift", headline: { verb: "ORDER", outcome: "WITHOUT RESERVATIONS", support: "No plan required" }, screenshot: "/assets/screenshots/promptjr/academy.png" },
      { role: "proof", headline: { verb: "DELIVER", outcome: "TO THEIR DOOR", support: "Flowers, sweets, and more" }, screenshot: "/assets/screenshots/promptjr/quiz.png" },
      { role: "feature", headline: { verb: "TREAT", outcome: "SOMEONE SPECIAL", support: "Tiny gestures, fast" }, screenshot: "/assets/screenshots/promptjr/playground.png" },
      { role: "cta", headline: { verb: "BROWSE", outcome: "GIFTS THAT LAND", support: "Thoughtful ideas in minutes" }, screenshot: "/assets/screenshots/promptjr/profile.png" },
    ]),
  },
];

export function getComposition(id: string): CompositionEntry | undefined {
  return compositions.find((c) => c.id === id);
}

import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import { LanguageProvider } from "./i18n/LanguageContext";
import CommunityPage from "./pages/CommunityPage";
import OverviewPage from "./pages/OverviewPage";
import PathpalAgentPage from "./pages/PathpalAgentPage";

function LandingPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("screen") === "2") {
      requestAnimationFrame(() => {
        document
          .getElementById("how-it-works")
          ?.scrollIntoView({ behavior: "instant", block: "start" });
      });
    }
  }, []);

  return (
    <div className="relative w-full bg-ink-950 text-white">
      <Navbar />

      {/* Hero — first screen with looping video background */}
      <section className="relative min-h-screen w-full overflow-hidden">
        <VideoBackground />
        <div className="relative z-10">
          <Hero />
        </div>
      </section>

      {/* Features — second screen with product showcase */}
      <Features />

      {/* Footer — third / final screen */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/features/overview" element={<OverviewPage />} />
          <Route path="/features/pathpal-agent" element={<PathpalAgentPage />} />
          <Route path="/features/community" element={<CommunityPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
}

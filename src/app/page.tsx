import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import JourneySection from "@/components/JourneySection";
import AchievementsSection from "@/components/AchievementsSection";
import ChatbotWidget from "@/components/ChatbotWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <JourneySection />
      <AchievementsSection />
      <ChatbotWidget />
    </main>
  );
}

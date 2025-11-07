import MyHero from "../components/MyHeroSection";
import ProjectPreviewCard from "../components/project-preview-card";

export default function Home() {
  return (
    <main className="flex-1">
      <MyHero />
      <ProjectPreviewCard count={3} />
    </main>
  )
}
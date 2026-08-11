import About from "@/components/About";
import CareerTimeline from "@/components/CareerTimeline";
import Certifications from "@/components/Certifications";
import Contact from "@/components/Contact";
import Experience from "@/components/Experience";
import Footer from "@/components/Footer";
import GlobalParticles from "@/components/GlobalParticles";
import Hero from "@/components/Hero";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import ProjectDashboard from "@/components/ProjectDashboard";
import Skills from "@/components/Skills";


export default function Home() {
  return (
    <main className="relative isolate min-h-screen overflow-x-clip bg-ink-950">
      <GlobalParticles />

      <div
        className="global-background-glow"
        aria-hidden="true"
      />

      <div className="page-content">
        <Loader />
        <Navbar />
        <Hero />
        <About />
        <Skills />
        <Experience />
        <CareerTimeline />
        <ProjectDashboard />
        <Certifications />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
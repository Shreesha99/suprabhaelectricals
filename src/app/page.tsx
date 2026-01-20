import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Projects } from "@/components/sections/projects";
import { Testimonials } from "@/components/sections/testimonials";
import { Contact } from "@/components/sections/contact";
import ChatBot from "@/components/chat-bot";
import TimelinePage from "@/components/sections/timeline";
import HeaderClient from "@/components/layout/header-client";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background">
      <HeaderClient />
      <main className="flex-1">
        <Hero />
        <About />
        <Services />
        <TimelinePage />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
}

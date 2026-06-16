import Hero from "@/components/Hero";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import Ticker from "@/components/Ticker";
import Events from "@/components/Events";
import Radio from "@/components/Radio";
import Artists from "@/components/Artists";
import Listen from "@/components/Listen";
import InnerCircle from "@/components/InnerCircle";
import Merch from "@/components/Merch";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Ticker />
        <WhatsAppCTA />
        <Events />
        <Radio />
        <Artists />
        <Listen />
        <InnerCircle />
        <Merch />
      </main>
      <Footer />
    </>
  );
}

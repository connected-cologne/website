import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Events from "@/components/Events";
import Radio from "@/components/Radio";
import Artists from "@/components/Artists";
import InnerCircle from "@/components/InnerCircle";
import Merch from "@/components/Merch";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Ticker />
        <Events />
        <Radio />
        <Artists />
        <InnerCircle />
        <Merch />
      </main>
      <Footer />
    </>
  );
}

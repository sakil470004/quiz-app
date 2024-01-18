import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Navbar/Navbar";
import Question from "@/components/Questions/Question";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white">
      <div className="container mx-auto">
        <Navbar />
        <Question />
        <Footer />
      </div>
    </div>
  );
}

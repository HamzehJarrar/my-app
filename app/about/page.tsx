import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/page";
import Image from "next/image";
import CloudImage from "@/public/cloud-hosting.png";
function AboutPage() {
  return (
    <div className=" items-center flex  flex-col gap-4">
      <Header />
      <h1 className="text-4xl text-yellow-300">Welcome to the about page</h1>
      <p className="text-lg text-gray-700">
        This is the about page where you can learn more about our website.
      </p>
      <Image src={CloudImage} alt="About Us" width={400} height={300} />
      <Footer />
    </div>
  );
}

export default AboutPage;

import React from "react";
import Header from "@/components/header/header";
import { DiAndroid } from "react-icons/di";
import Footer from "@/components/footer/page";

const HomePage = () => {
  return (
    <div
      className="h-screen flex flex-col  bg-no-repeat bg-center bg-cover"
      style={{ backgroundImage: "url('/images/bg.png')" }}
    >
      <Header />
      <div className="justify-center items-center flex h-screen flex-col gap-5">
        <div className="flex gap-4 justify-center items-center">
          <h1 className="text-4xl text-red-500">Welcome to my HomePage</h1>
          <DiAndroid className="text-6xl w-full text-green-500" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;

import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function PublicLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <div className="min-h-screen">
        {children}
      </div>
      
      <Footer/>

    </div>
  );
}

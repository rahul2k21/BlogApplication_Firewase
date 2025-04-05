import React from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import BlogList from "../../components/Blog/BlogList/BlogList";



function Home() {



  return (
    <div>
      <Navbar />
      <BlogList />
      <Footer />
    </div>
  );
}

export default Home;

import Featured from "../components/Featured";
import NewProducts from "../components/NewProducts";
import styled from "styled-components";

const BG = styled.div`
  margin-bottom: 100px;
`;

export default function Home({ featuredProduct, newProducts }) {
  return (
    <BG>
      <Featured featuredProduct={featuredProduct} />
      <NewProducts newProducts={newProducts} />
    </BG>
  );
}

// import React from "react";
// import HeroSection from "../components/Homepage/HeroSection";
// import Footer from "../components/Homepage/Footer";
// import Reviews from "../components/Homepage/Reviews";
// import Where from "../components/Homepage/Where";
// import Shining from "../components/Homepage/Shining";
// import Classic from "../components/Homepage/Classic";

// function Home() {
//   return (
//     <>
//       <HeroSection />
//       <Where />
//       <Reviews />
//       <Classic />
//       <Shining />
//       <Footer />
//     </>
//   );
// }

// export default Home;

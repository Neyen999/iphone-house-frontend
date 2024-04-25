"use client";
import LatestSales from "../components/products/LatestSales";
import MostSaledProducts from "../components/products/MostSaledProducts";
import { sales, products } from "@/lib/data.js";

const Home = () => {
  // The home will generete 3 subsections with subcomponents
  // The first section will be a latests sales showing the last 3 sales
  // The second section will be Most Saled products showing the 3 best saled products
  // We will not generate the third section yet.
  // The first two components should be cards with an image, the card should have an optional prop showing the quantity sold for the second section' case. You could make a component to reuse.
  // Also this should be wrapped in a way that each section is shown one on top of the other
  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md mb-8">
      <LatestSales sales={sales}/>
      <MostSaledProducts products={products}/>
      {/* Aquí se agregaría la tercera sección cuando esté lista */}
    </div>
  );
}

export default Home;
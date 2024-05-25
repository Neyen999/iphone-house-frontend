"use client";
import LatestSales from "../components/products/LatestSales";
import ProductsList from "../components/products/ProductsList";
import { sales, products } from "@/lib/data.js";

const Home = () => {
  return (
    <div className="mx-auto p-4 bg-gray-100 rounded-lg shadow-md mb-8">
      <LatestSales sales={sales}/>
      <ProductsList products={products} sortBy="salesLimited" title="Más vendidos" boxSize='' cols='3'/>
      {/* Aquí se agregaría la tercera sección cuando esté lista */}
    </div>
  );
}

export default Home;
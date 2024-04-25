"use client";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {

    console.log("HOME RENDER");
  }, [])
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      {/* Your home page content */}
    </div>
  );
}
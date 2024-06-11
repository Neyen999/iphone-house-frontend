"use client";
import { useEffect } from "react";

export default function FallbackErrorBoundary() {
  useEffect(() => {
    console.log("Render")
  }, [])
  return <h1>Error</h1>
}
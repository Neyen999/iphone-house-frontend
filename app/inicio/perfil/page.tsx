"use client";
import { useAuth } from "@/app/context/context";
import { useEffect } from "react";

export default function Perfil() {
  const { user } = useAuth();
  useEffect(() => {
    console.log("USER ON PERFIL: ", user);
  }, [])
  return <h1>Perfil</h1>
}
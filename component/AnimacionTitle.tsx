"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

export default function Home() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const btnRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    tl.from(titleRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(subtitleRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.7,
      ease: "power2.out"
    }, "-=0.4")
    .from(btnRef.current, {
      opacity: 0,
      y: 20,
      scale: 0.9,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.3")

  }, [])

  /*
  el rebote del boton
    back.out(1) → rebote suave, casi imperceptible
    back.out(3) → rebote exagerado, muy juguetón
    back.out(5) → casi caricaturesco

    EaseSensaciónpower2.out  El más neutro y profesional
    back.out(1.7)            Rebote, orgánico, moderno
    elastic.out(1, 0.3)      Muy elástico, para elementos pequeños
    expo.out                 Arranca rápido y frena suave, muy elegante
    bounce.out               Rebota como pelota, más cartoon
    linear                   Velocidad constante, robótico
  
  */

  return (
    <main style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      height: "100vh",
      gap: "24px"
    }}>
      <h1 ref={titleRef} style={{ fontSize: "3rem", margin: 0 }}>
        Tu SaaS empieza aquí
      </h1>
      <p ref={subtitleRef} style={{ fontSize: "1.2rem", color: "#888", margin: 0 }}>
        La landing que convierte visitantes en clientes
      </p>
      <button ref={btnRef} style={{
        padding: "12px 32px",
        background: "#534AB7",
        color: "white",
        border: "none",
        borderRadius: "8px",
        fontSize: "1rem",
        cursor: "pointer"
      }}>
        Empezar gratis
      </button>
    </main>
  )
}
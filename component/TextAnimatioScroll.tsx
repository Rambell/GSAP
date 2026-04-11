"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// Función que divide un texto en spans por palabra
function splitWords(text: string) {
  return text.split(" ").map((word: string, i: number) => (
    <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
      <span className="word" style={{ display: "inline-block" }}>
        {word}
      </span>
    </span>
  ))
}

export default function Home() {
  const heroRef = useRef(null)
  const revealRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const timer = setTimeout(() => {

      // Animación de palabras del hero
      const words = heroRef.current.querySelectorAll(".word")
      gsap.from(words, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.08,
        ease: "power3.out"
      })

      // Texto que se revela con el scroll palabra por palabra
      const revealWords = revealRef.current.querySelectorAll(".word")
      gsap.from(revealWords, {
        scrollTrigger: {
          trigger: revealRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0.1,
        y: 40,
        stagger: 0.05,
        ease: "none"
      })

      ScrollTrigger.refresh()

    }, 100)

    return () => clearTimeout(timer)

  }, [])

  return (
    <main style={{ fontFamily: "sans-serif", overflowX: "hidden" }}>

      {/* Hero */}
      <section style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        gap: "32px",
        padding: "0 40px"
      }}>

        <div ref={bgRef} style={{
          position: "absolute",
          inset: "-20%",
          background: "linear-gradient(135deg, #534AB7 0%, #1D9E75 100%)",
          zIndex: 0
        }} />

        <h1 ref={heroRef} style={{
          fontSize: "4rem",
          margin: 0,
          textAlign: "center",
          color: "white",
          position: "relative",
          zIndex: 1,
          lineHeight: 1.2
        }}>
          {splitWords("Tu SaaS empieza aquí")}
        </h1>

      </section>

      {/* Sección de texto reveal */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "150px 80px",
        background: "white"
      }}>
        <p ref={revealRef} style={{
          fontSize: "2.5rem",
          fontWeight: 500,
          lineHeight: 1.4,
          maxWidth: "800px",
          textAlign: "center",
          color: "#111"
        }}>
          {splitWords("Construimos productos digitales que convierten visitantes en clientes y clientes en fans de tu marca")}
        </p>
      </section>

    </main>
  )
}
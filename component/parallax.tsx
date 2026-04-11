"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const heroTitleRef = useRef(null)
  const heroSubRef = useRef(null)
  const bgRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

  useEffect(() => {
    const cards = [card1Ref.current, card2Ref.current, card3Ref.current]
    gsap.set(cards, { opacity: 0, y: 80 })

    const timer = setTimeout(() => {

      // Hero: título y subtítulo entran al cargar
      const tl = gsap.timeline()
      tl.from(heroTitleRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "power2.out"
      })
      .from(heroSubRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out"
      }, "-=0.5")

      // Parallax del fondo: se mueve más lento que el scroll
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: 400,
        ease: "none"
      })

      // Parallax del título: se mueve más rápido que el scroll
      gsap.to(heroTitleRef.current, {
        scrollTrigger: {
          trigger: heroTitleRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -150,
        opacity: 0,
        ease: "none"
      })

      // Cards aparecen con scrub
      gsap.to(cards, {
        scrollTrigger: {
          trigger: card1Ref.current,
          start: "top bottom",
          end: "top 30%",
          scrub: true,
        },
        opacity: 1,
        y: 0,
        stagger: 0.1,
        ease: "none"
      })

      ScrollTrigger.refresh()

    }, 100)

    return () => clearTimeout(timer)

  }, [])

  return (
    <main style={{ fontFamily: "sans-serif", overflowX: "hidden" }}>

      {/* Hero con fondo parallax */}
      <section style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        gap: "24px"
      }}>

        {/* Fondo que se mueve lento */}
        <div ref={bgRef} style={{
          position: "absolute",
          inset: "-20%",
          background: "linear-gradient(135deg, #534AB7 0%, #1D9E75 100%)",
          zIndex: 0
        }} />

        {/* Contenido encima del fondo */}
        <h1 ref={heroTitleRef} style={{
          fontSize: "4rem",
          margin: 0,
          textAlign: "center",
          color: "white",
          position: "relative",
          zIndex: 1
        }}>
          Tu SaaS empieza aquí
        </h1>

        <p ref={heroSubRef} style={{
          fontSize: "1.2rem",
          color: "rgba(255,255,255,0.8)",
          margin: 0,
          position: "relative",
          zIndex: 1
        }}>
          La landing que convierte visitantes en clientes
        </p>

      </section>

      {/* Sección de cards */}
      <section style={{
        padding: "150px 40px",
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap",
        background: "white"
      }}>
        {[
          { ref: card1Ref, title: "Rápido", desc: "Carga en menos de 1 segundo" },
          { ref: card2Ref, title: "Seguro", desc: "Encriptación de extremo a extremo" },
          { ref: card3Ref, title: "Escalable", desc: "Crece contigo sin límites" },
        ].map((card) => (
          <div key={card.title} ref={card.ref} style={{
            width: "220px",
            padding: "32px 24px",
            borderRadius: "12px",
            border: "1px solid #e5e5e5",
            textAlign: "center"
          }}>
            <h3 style={{ margin: "0 0 8px" }}>{card.title}</h3>
            <p style={{ margin: 0, color: "#888", fontSize: "14px" }}>{card.desc}</p>
          </div>
        ))}
      </section>

    </main>
  )
}
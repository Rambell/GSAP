"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)


export default function Home() {
  const heroRef = useRef(null)
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const card3Ref = useRef(null)

useEffect(() => {
  const cards = [card1Ref.current, card2Ref.current, card3Ref.current]

  gsap.set(cards, { opacity: 0, y: 60 })

  const timer = setTimeout(() => {

    console.log("card1 existe:", card1Ref.current)
    console.log("altura página:", document.body.scrollHeight)

    gsap.from(heroRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power2.out"
    })

    gsap.to(cards, {
      scrollTrigger: {
        trigger: card1Ref.current,
        start: "top bottom",
        end: "top 30%",
        scrub: true,
      },
      opacity: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.2,
      ease: "power2.out"
    })

    ScrollTrigger.refresh()

  }, 100)

  return () => clearTimeout(timer)

}, [])

/*

gsap.from() → animar desde un estado inicial
gsap.to() → animar hacia un estado final
gsap.set() → establecer un estado sin animación
gsap.timeline() → encadenar animaciones en secuencia
stagger → animar múltiples elementos con delay
ease → controlar la personalidad de cada animación
ScrollTrigger → disparar animaciones con el scroll
scrub → vincular la animación directamente al scroll

*/

  return (
    <main style={{ fontFamily: "sans-serif" }}>

      {/* Hero */}
      <section style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "24px"
      }}>
        <h1 ref={heroRef} style={{ fontSize: "3rem", margin: 0, textAlign: "center" }}>
          Tu SaaS empieza aquí
        </h1>
      </section>

      {/* Sección de cards */}
      <section style={{
        padding: "100px 40px",
        display: "flex",
        gap: "24px",
        justifyContent: "center",
        flexWrap: "wrap"
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
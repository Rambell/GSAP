"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function splitWords(text: string) {
  return text.split(" ").map((word: string, i: number) => (
    <span key={i} style={{ display: "inline-block", overflow: "hidden", marginRight: "0.3em" }}>
      <span className="word" style={{ display: "inline-block" }}>{word}</span>
    </span>
  ))
}

const features = [
  {
    icon: "⚡",
    title: "Velocidad real",
    desc: "Crea, organiza y completa tareas en segundos. Sin fricción, sin distracciones."
  },
  {
    icon: "🎯",
    title: "Foco total",
    desc: "Priorización inteligente que te muestra exactamente qué hacer primero cada día."
  },
  {
    icon: "📊",
    title: "Visibilidad completa",
    desc: "Dashboards que te muestran el progreso de tu equipo en tiempo real."
  }
]

const plans = [
  {
    name: "Free",
    price: "$0",
    desc: "Para empezar",
    features: ["5 proyectos", "1 usuario", "Soporte por email"],
    highlight: false
  },
  {
    name: "Pro",
    price: "$12",
    desc: "Por usuario / mes",
    features: ["Proyectos ilimitados", "Hasta 10 usuarios", "Soporte prioritario", "Analíticas avanzadas"],
    highlight: true
  },
  {
    name: "Team",
    price: "$29",
    desc: "Por usuario / mes",
    features: ["Todo en Pro", "Usuarios ilimitados", "SSO", "API access", "Soporte dedicado"],
    highlight: false
  }
]

export default function Home() {
const heroRef = useRef<HTMLHeadingElement>(null)
const heroSubRef = useRef<HTMLParagraphElement>(null)
const heroBtnRef = useRef<HTMLDivElement>(null)
const featuresRef = useRef<HTMLElement>(null)
const revealRef = useRef<HTMLParagraphElement>(null)
const pricingRef = useRef<HTMLDivElement>(null)
const navRef = useRef<HTMLElement>(null)

useEffect(() => {
  const timer = setTimeout(() => {

    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })

    const heroWords = heroRef.current?.querySelectorAll(".word")
    if (heroWords) {
      const tl = gsap.timeline()
      tl.from(heroWords, {
        y: "100%",
        opacity: 0,
        duration: 0.8,
        stagger: 0.07,
        ease: "power3.out"
      })
      .from(heroSubRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.3")
      .from(heroBtnRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.95,
        duration: 0.5,
        ease: "back.out(1.7)"
      }, "-=0.3")
    }

    const featureCards = document.querySelectorAll(".feature-card")
    gsap.set(featureCards, { opacity: 0, y: 60 })
    gsap.to(featureCards, {
      scrollTrigger: {
        trigger: featureCards[0],
        start: "top bottom",
        end: "top 40%",
        scrub: true,
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "none"
    })

    const revealWords = revealRef.current?.querySelectorAll(".word")
    if (revealWords) {
      gsap.from(revealWords, {
        scrollTrigger: {
          trigger: revealRef.current,
          start: "top bottom",
          end: "top 20%",
          scrub: true,
        },
        opacity: 0.08,
        y: 30,
        stagger: 0.04,
        ease: "none"
      })
    }

    const pricingCards = document.querySelectorAll(".pricing-card")
    gsap.set(pricingCards, { opacity: 0, y: 80 })
    gsap.to(pricingCards, {
      scrollTrigger: {
        trigger: pricingCards[0],
        start: "top bottom",
        end: "top 40%",
        scrub: true,
      },
      opacity: 1,
      y: 0,
      stagger: 0.1,
      ease: "none"
    })

    ScrollTrigger.refresh()

    const timer = setTimeout(() => {

  console.log("1. nav:", navRef.current)
  console.log("2. hero:", heroRef.current)
  console.log("3. feature cards:", document.querySelectorAll(".feature-card").length)
  console.log("4. pricing cards:", document.querySelectorAll(".pricing-card").length)
  console.log("5. reveal:", revealRef.current)

  // ... resto del código
}, 100)

  }, 100)

  return () => clearTimeout(timer)

}, [])
  return (
    <main style={{ overflowX: "hidden" }}>

      {/* Nav */}
      <nav ref={navRef} style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "20px 60px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(250,250,250,0.85)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid #f0f0f0"
      }}>
        <span style={{ fontWeight: 600, fontSize: "1.1rem", letterSpacing: "-0.5px" }}>
          Flowdesk
        </span>
        <div style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {["Features", "Precios", "Blog"].map(item => (
            <span key={item} style={{ fontSize: "0.9rem", color: "#666", cursor: "pointer" }}>
              {item}
            </span>
          ))}
          <button style={{
            padding: "8px 20px",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "0.9rem",
            cursor: "pointer"
          }}>
            Empezar gratis
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 40px 80px",
        gap: "28px"
      }}>
        <div style={{
          display: "inline-block",
          padding: "6px 16px",
          background: "#f0f0f0",
          borderRadius: "100px",
          fontSize: "0.8rem",
          color: "#666",
          marginBottom: "8px"
        }}>
          Nuevo → Integración con Slack disponible
        </div>

        <h1 ref={heroRef} style={{
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: "-2px",
          maxWidth: "800px",
          color: "#111"
        }}>
          {splitWords("Gestiona tu equipo sin perder el foco")}
        </h1>

        <p ref={heroSubRef} style={{
          fontSize: "1.15rem",
          color: "#666",
          maxWidth: "500px",
          lineHeight: 1.6
        }}>
          La herramienta de productividad que tu equipo va a querer usar todos los días.
        </p>

        <div ref={heroBtnRef} style={{ display: "flex", gap: "12px" }}>
          <button style={{
            padding: "14px 32px",
            background: "#111",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: 500
          }}>
            Empezar gratis
          </button>
          <button style={{
            padding: "14px 32px",
            background: "transparent",
            color: "#111",
            border: "1px solid #ddd",
            borderRadius: "10px",
            fontSize: "1rem",
            cursor: "pointer"
          }}>
            Ver demo →
          </button>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} style={{
        padding: "120px 60px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "60px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-1px", marginBottom: "16px" }}>
            Todo lo que necesitas
          </h2>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Sin complejidad innecesaria. Solo lo que importa.
          </p>
        </div>

        <div style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center"
        }}>
          {features.map((f) => (
            <div key={f.title} className="feature-card" style={{
              width: "280px",
              padding: "36px 28px",
              borderRadius: "16px",
              border: "1px solid #f0f0f0",
              background: "#fafafa"
            }}>
              <div style={{ fontSize: "2rem", marginBottom: "16px" }}>{f.icon}</div>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: "10px" }}>{f.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#666", lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Texto reveal */}
      <section style={{
        padding: "160px 80px",
        background: "#fafafa",
        display: "flex",
        justifyContent: "center"
      }}>
        <p ref={revealRef} style={{
          fontSize: "clamp(1.8rem, 3.5vw, 3rem)",
          fontWeight: 600,
          lineHeight: 1.4,
          maxWidth: "820px",
          textAlign: "center",
          letterSpacing: "-0.5px",
          color: "#111"
        }}>
          {splitWords("Los equipos más productivos del mundo no trabajan más horas. Trabajan con mejores herramientas.")}
        </p>
      </section>

      {/* Pricing */}
      <section style={{
        padding: "120px 60px",
        background: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "60px"
      }}>
        <div style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "2.5rem", fontWeight: 700, letterSpacing: "-1px", marginBottom: "16px" }}>
            Precios simples
          </h2>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Sin sorpresas. Cancela cuando quieras.
          </p>
        </div>

        <div ref={pricingRef} style={{
          display: "flex",
          gap: "24px",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "stretch"
        }}>
          {plans.map((plan) => (
            <div key={plan.name} className="pricing-card" style={{
              width: "260px",
              padding: "36px 28px",
              borderRadius: "16px",
              border: plan.highlight ? "2px solid #111" : "1px solid #f0f0f0",
              background: plan.highlight ? "#111" : "#fafafa",
              color: plan.highlight ? "white" : "#111",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              position: "relative"
            }}>
              {plan.highlight && (
                <div style={{
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  background: "#534AB7",
                  color: "white",
                  padding: "4px 16px",
                  borderRadius: "100px",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap"
                }}>
                  Más popular
                </div>
              )}

              <div>
                <p style={{ fontSize: "0.85rem", color: plan.highlight ? "#aaa" : "#999", marginBottom: "8px" }}>
                  {plan.name}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "4px" }}>
                  <span style={{ fontSize: "2.8rem", fontWeight: 700, letterSpacing: "-1px" }}>
                    {plan.price}
                  </span>
                  {plan.price !== "$0" && (
                    <span style={{ fontSize: "0.85rem", color: plan.highlight ? "#aaa" : "#999" }}>
                      /mes
                    </span>
                  )}
                </div>
                <p style={{ fontSize: "0.85rem", color: plan.highlight ? "#aaa" : "#999", marginTop: "4px" }}>
                  {plan.desc}
                </p>
              </div>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {plan.features.map(feat => (
                  <li key={feat} style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "8px", color: plan.highlight ? "#ddd" : "#444" }}>
                    <span style={{ color: plan.highlight ? "#1D9E75" : "#1D9E75", fontWeight: 700 }}>✓</span>
                    {feat}
                  </li>
                ))}
              </ul>

              <button style={{
                marginTop: "auto",
                padding: "12px",
                background: plan.highlight ? "white" : "#111",
                color: plan.highlight ? "#111" : "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "0.95rem",
                cursor: "pointer",
                fontWeight: 500
              }}>
                {plan.price === "$0" ? "Empezar gratis" : "Elegir plan"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "60px",
        borderTop: "1px solid #f0f0f0",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px",
        background: "#fafafa"
      }}>
        <span style={{ fontWeight: 600, fontSize: "1rem" }}>Flowdesk</span>
        <span style={{ fontSize: "0.85rem", color: "#999" }}>
          © 2026 Flowdesk. Todos los derechos reservados.
        </span>
      </footer>

    </main>
  )
}
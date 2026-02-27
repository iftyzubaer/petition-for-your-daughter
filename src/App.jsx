import { useState, useRef, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import candidatePhoto from "./assets/photos/candidate.jpeg"
import photo1 from "./assets/photos/photo1.jpeg"
import photo2 from "./assets/photos/photo2.jpeg"
import photo3 from "./assets/photos/photo3.JPG"
import photo4 from "./assets/photos/photo4.jpeg"
import photo5 from "./assets/photos/photo5.jpeg"

// ─────────────────────────────────────────────
// 📸 PHOTO CONFIG — replace these with your real photos!
// Put your photos inside src/assets/photos/
// Then import them at the top like:
//   import photo1 from "./assets/photos/photo1.jpg"
// And replace the placeholder objects below.
// ─────────────────────────────────────────────
const PHOTOS = [
  {
    src: photo1,
    caption: "That day we took our first photo together. I was trying to be cute and she was just genuinely happy. Look at that smile.",
    rotation: -3,
  },
  {
    src: photo2,
    caption: "She was laughing because we both bought the same bouqutet for her. What a coincidence!",
    rotation: 2,
  },
  {
    src: photo3,
    caption: "She's always been this happy around me. Always. Even when I do dumb things.",
    rotation: -1.5,
  },
  {
    src: photo4,
    caption: "Look at her care for me. Go on. Look at it.",
    rotation: 3,
  },
  {
    src: photo5,
    caption: "Still the same smile. Every single time.",
    rotation: -2,
  },
];

// ─────────────────────────────────────────────
// 🖊️ PERSONAL DETAILS — fill these in!
// ─────────────────────────────────────────────
const DETAILS = {
  candidateName:    "Ifty Zubaer",
  candidateDOB:     "13 April, 2004",
  candidateNation:  "Bangladeshi",
  herName:          "Raya Fatin Mobashera",
  herFatherName:    "Mobasher Ali",
  dateTogether:     "13 January, 2024",
  howYouMet:        "We met as classmates in our college first year, we had our debut in the national debate together as a team on march 2023.",
  sweetQuote:       "She is the kind of person who makes you want to be better without ever asking you to be different. She laughs at my ideas even when they're terrible, and somehow makes them feel worth pursuing anyway. I'm not here to ask for something. I'm here to ask for the chance to spend a very long time making sure she never regrets saying yes.",
  graduationYear:   "2028",
  docDate:          new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
};

// ─────────────────────────────────────────────
// SMALL REUSABLE COMPONENTS
// ─────────────────────────────────────────────

const Divider = () => (
  <div className="text-center my-10" style={{ color: "#7a6a50", letterSpacing: "0.6em", fontSize: "0.85rem" }}>
    ✦ ✦ ✦
  </div>
);

const SectionHeader = ({ number, title }) => (
  <div className="flex items-baseline gap-4 mb-5">
    <span style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "0.72rem",
      color: "#7a6a50",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      borderBottom: "1px solid #c9aa7c",
      paddingBottom: "2px",
      whiteSpace: "nowrap",
    }}>
      § {number}
    </span>
    <h2 style={{
      fontFamily: "'Playfair Display', serif",
      fontSize: "1.25rem",
      color: "#2c1d0e",
      fontWeight: 700,
      letterSpacing: "0.05em",
      textTransform: "uppercase",
      flex: 1,
      borderBottom: "2px solid #c9aa7c",
      paddingBottom: "6px",
    }}>
      {title}
    </h2>
  </div>
);

const SkillBar = ({ skill, level, note }) => (
  <div style={{
    display: "grid",
    gridTemplateColumns: "clamp(120px, 25%, 200px) 1fr auto",
    gap: "1rem",
    alignItems: "center",
    padding: "0.55rem 0",
    borderBottom: "1px dashed #d4b896",
    fontFamily: "'EB Garamond', serif",
  }}>
    <span style={{ color: "#2c1d0e", fontSize: "0.95rem" }}>{skill}</span>
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} style={{
          width: "26px", height: "10px",
          backgroundColor: i <= level ? "#8b5e3c" : "#e8d9c0",
          border: "1px solid #c9aa7c",
        }} />
      ))}
    </div>
    <span style={{ color: "#7a6a50", fontSize: "0.78rem", fontStyle: "italic", textAlign: "right" }}>{note}</span>
  </div>
);

const TimelineItem = ({ year, title, desc, status, last }) => (
  <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
    <div style={{ textAlign: "center", minWidth: "75px" }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.8rem", color: "#8b5e3c", fontWeight: 700, letterSpacing: "0.1em" }}>
        {year}
      </div>
      {!last && <div style={{ width: "2px", height: "52px", backgroundColor: "#c9aa7c", margin: "4px auto 0" }} />}
    </div>
    <div style={{ flex: 1, paddingTop: "2px", marginBottom: last ? 0 : "1.5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginBottom: "4px", flexWrap: "wrap" }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "#2c1d0e", fontSize: "0.95rem" }}>{title}</span>
        {status === "done"        && <Badge text="COMPLETED"   color="#4a7c59" />}
        {status === "in-progress" && <Badge text="IN PROGRESS" color="#8b5e3c" />}
        {status === "pending"     && <Badge text="PENDING"     color="#7a6a50" />}
      </div>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.92rem", color: "#5a4a3a", lineHeight: 1.65 }}>{desc}</p>
    </div>
  </div>
);

const Badge = ({ text, color }) => (
  <span style={{ fontSize: "0.65rem", color, border: `1px solid ${color}`, padding: "1px 6px", letterSpacing: "0.1em", fontFamily: "'EB Garamond', serif", whiteSpace: "nowrap" }}>
    {text}
  </span>
);

// ─────────────────────────────────────────────
// PHOTO GALLERY
// ─────────────────────────────────────────────
const PhotoGallery = ({ photos }) => (
  <div>
    <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem", color: "#5a4a3a", lineHeight: 1.8, marginBottom: "2rem" }}>
      The following photographic evidence has been submitted to the committee. Please note the consistent 
      presence of happiness in Exhibit A through E. The Candidate takes partial credit.
    </p>

    {/* Scattered photo grid */}
    <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", justifyContent: "center", marginBottom: "1.5rem" }}>
      {photos.map((photo, i) => (
        <button
          key={`photo-${photo.caption}`}
          type="button"
          aria-label={`Photo ${i + 1}: ${photo.caption}`}
          style={{
            transform: `rotate(${photo.rotation}deg)`,
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            cursor: "pointer",
            background: "none",
            border: "none",
            padding: 0,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = `rotate(0deg) scale(1.04)`;
            e.currentTarget.style.zIndex = "10";
            e.currentTarget.style.boxShadow = "0 12px 40px rgba(44,29,14,0.25)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = `rotate(${photo.rotation}deg) scale(1)`;
            e.currentTarget.style.zIndex = "auto";
            e.currentTarget.style.boxShadow = "none";
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
            }
          }}
        >
          <div style={{
            backgroundColor: "#fffdf7",
            padding: "10px 10px 36px 10px",
            boxShadow: "0 4px 18px rgba(44,29,14,0.18)",
            width: "clamp(160px, 22vw, 210px)",
          }}>
            {photo.src ? (
              <img
                src={photo.src}
                alt={photo.caption}
                style={{ width: "100%", aspectRatio: "1", objectFit: "cover", display: "block", filter: "sepia(0.15)" }}
              />
            ) : (
              /* Placeholder when no photo is provided yet */
              <div style={{
                width: "100%",
                aspectRatio: "1",
                backgroundColor: "#e8d9c0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "6px",
              }}>
                <span style={{ fontSize: "2rem" }}>📷</span>
                <span style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.7rem", color: "#7a6a50", textAlign: "center", padding: "0 8px" }}>
                  Add photo {i + 1}
                </span>
              </div>
            )}
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "0.75rem",
              color: "#5a4a3a",
              textAlign: "center",
              marginTop: "8px",
              fontStyle: "italic",
              lineHeight: 1.4,
            }}>
              {photo.caption}
            </p>
          </div>
        </button>
      ))}
    </div>

    {/* The punchline */}
    <div style={{
      backgroundColor: "rgba(201,170,124,0.15)",
      border: "1px solid #c9aa7c",
      padding: "1.2rem 1.8rem",
      textAlign: "center",
      marginTop: "1rem",
    }}>
      <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem", color: "#2c1d0e", fontStyle: "italic", lineHeight: 1.7 }}>
        "Look how happy she already is. Now imagine how much happier she's going to be."
      </p>
      <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "0.85rem", color: "#7a6a50", marginTop: "6px" }}>
        — Submitted as Exhibit A–{photos.length}. The defense rests.
      </p>
    </div>
  </div>
);

// ─────────────────────────────────────────────
// CONFETTI
// ─────────────────────────────────────────────
const Confetti = ({ active }) => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    if (!active) return;
    const p = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: ["#c9aa7c","#8b5e3c","#4a7c59","#2c6e49","#d4b896","#f5c842"][Math.floor(Math.random() * 6)],
      delay: Math.random() * 0.8,
      size: 6 + Math.random() * 10,
      duration: 1.5 + Math.random() * 1.5,
      isCircle: Math.random() > 0.5,
    }));
    setPieces(p);
    const timer = setTimeout(() => setPieces([]), 5000);
    return () => clearTimeout(timer);
  }, [active]);

  return (
    <>
      {pieces.map((p) => (
        <div key={p.id} style={{
          position: "fixed",
          left: `${p.x}%`,
          top: "-15px",
          width: p.size,
          height: p.size,
          backgroundColor: p.color,
          borderRadius: p.isCircle ? "50%" : "0",
          animation: `fall ${p.duration}s ${p.delay}s linear forwards`,
          zIndex: 9998,
          pointerEvents: "none",
        }} />
      ))}
    </>
  );
};

// ─────────────────────────────────────────────
// APPROVED OVERLAY
// ─────────────────────────────────────────────
const ApprovedOverlay = ({ visible }) => {
  if (!visible) return null;
  return (
    <div
      className="approved-overlay"
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(74, 124, 89, 0.12)",
        zIndex: 9000,
        pointerEvents: "none",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        padding: "4rem 5rem",
      }}
    >
      {/* Big diagonal approved stamp */}
      <div
        className="approved-stamp"
        style={{
          border: "6px solid #4a7c59",
          color: "#4a7c59",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "clamp(2.5rem, 6vw, 5rem)",
          letterSpacing: "0.15em",
          padding: "0.5rem 1.5rem",
          transform: "rotate(-12deg)",
          opacity: 0.9,
          textTransform: "uppercase",
          userSelect: "none",
          boxShadow: "inset 0 0 0 3px #4a7c59",
          position: "relative",
          textShadow: "2px 2px 0 rgba(74,124,89,0.2)",
        }}
      >
        APPROVED
        <div style={{
          fontSize: "0.8rem",
          letterSpacing: "0.3em",
          textAlign: "center",
          marginTop: "4px",
          opacity: 0.8,
        }}>
          BY ORDER OF THE COMMITTEE
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// WAX SEAL SVG
// ─────────────────────────────────────────────
const WaxSeal = () => (
  <svg width="76" height="76" viewBox="0 0 72 72">
    <circle cx="36" cy="36" r="32" fill="#8b1a1a" />
    <circle cx="36" cy="36" r="27" fill="none" stroke="#c9603a" strokeWidth="1.5" />
    {[0,30,60,90,120,150,180,210,240,270,300,330].map((a) => (
      <polygon key={a} points="36,5 38.5,14 36,11.5 33.5,14" transform={`rotate(${a} 36 36)`} fill="#c9603a" />
    ))}
    <text x="36" y="32" textAnchor="middle" fill="#f5ede0" fontSize="6.5" fontFamily="serif" fontWeight="bold" letterSpacing="0.5">OFFICIAL</text>
    <text x="36" y="44" textAnchor="middle" fill="#f5ede0" fontSize="10" fontFamily="serif">♥</text>
  </svg>
);

// ─────────────────────────────────────────────
// DENY BUTTON with escape logic
// ─────────────────────────────────────────────
const DenyButton = ({ onForceApprove }) => {
  const btnRef = useRef(null);
  const [escaped, setEscaped] = useState(0); // count of escapes
  const [shaking, setShaking] = useState(false);
  const [message, setMessage] = useState(null);

  const escapeMessages = [
    "Nope.",
    "Nice try.",
    "I said no.",
    "You can't click this.",
    "This button doesn't want to be clicked.",
    "Still no.",
    "The button is scared. Please leave it alone.",
    "FINE — I'll make it disappear instead.",
  ];

  const handleMouseEnter = useCallback(() => {
    if (escaped >= 7) {
      // On the 8th attempt, button surrenders and forces approve
      setMessage("The button has given up. Petition auto-approved.");
      setTimeout(() => onForceApprove(), 1000);
      return;
    }

    const btn = btnRef.current;
    if (!btn) return;

    const parent = btn.parentElement;
    const parentRect = parent.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    const maxX = parentRect.width - btnRect.width;
    const maxY = parentRect.height - btnRect.height;

    // Jump to a random spot within the parent container
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;

    btn.style.position = "absolute";
    btn.style.left = `${newX}px`;
    btn.style.top = `${newY}px`;

    setEscaped((prev) => prev + 1);
    setShaking(true);
    setMessage(escapeMessages[Math.min(escaped, escapeMessages.length - 1)]);
    setTimeout(() => setShaking(false), 400);
  }, [escaped, onForceApprove]);

  return (
    <div style={{ position: "relative", height: "80px", minWidth: "260px", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <button
        ref={btnRef}
        onMouseEnter={handleMouseEnter}
        onTouchStart={handleMouseEnter} // mobile too
        className={shaking ? "deny-shake" : ""}
        style={{
          backgroundColor: "#f5ede0",
          color: "#8b1a1a",
          border: "2px solid #8b1a1a",
          padding: "0.75rem 2.2rem",
          fontFamily: "'Playfair Display', serif",
          fontSize: "1rem",
          fontWeight: 700,
          letterSpacing: "0.1em",
          cursor: "not-allowed",
          textTransform: "uppercase",
          transition: "background-color 0.2s",
          opacity: escaped >= 7 ? 0 : 1,
        }}
      >
        ✗ &nbsp; Deny Petition
      </button>
      {message && (
        <div style={{
          position: "absolute",
          bottom: "-28px",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'EB Garamond', serif",
          fontSize: "0.8rem",
          color: "#8b1a1a",
          fontStyle: "italic",
          whiteSpace: "nowrap",
          animation: "fadeInUp 0.3s ease",
        }}>
          {message}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  const [approved, setApproved] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleApprove = () => {
    setApproved(true);
    setShowConfetti(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const bgStyle = {
    backgroundColor: "#f5ede0",
    backgroundImage: `
      radial-gradient(ellipse at 15% 50%, rgba(201,170,124,0.18) 0%, transparent 55%),
      radial-gradient(ellipse at 85% 15%, rgba(139,94,60,0.12) 0%, transparent 50%)
    `,
    transition: "filter 0.8s ease",
    filter: approved ? "sepia(0.25) hue-rotate(55deg) brightness(1.02)" : "none",
  };

  return (
    <div className="parchment" style={bgStyle}>
      <Confetti active={showConfetti} />
      <ApprovedOverlay visible={approved} />

      <div style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem 6rem", position: "relative", zIndex: 1 }}>

        {/* ── LETTERHEAD ── */}
        <div className="section-animate" style={{
          textAlign: "center",
          borderBottom: "3px double #8b5e3c",
          paddingBottom: "2rem",
          marginBottom: "2.5rem",
          position: "relative",
        }}>
          <div style={{ fontSize: "0.72rem", letterSpacing: "0.45em", color: "#7a6a50", textTransform: "uppercase", fontFamily: "'Playfair Display', serif", marginBottom: "0.4rem" }}>
            Official Document — Confidential
          </div>

          <div className="seal-animate" style={{ position: "absolute", top: "8px", right: "8px" }}>
            <WaxSeal />
          </div>

          {approved && (
            <div style={{ position: "absolute", top: "8px", left: "8px", transform: "rotate(12deg)" }}>
              <div style={{
                border: "4px solid #4a7c59",
                color: "#4a7c59",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "0.9rem",
                letterSpacing: "0.2em",
                padding: "4px 12px",
                opacity: 0.9,
                textTransform: "uppercase",
                animation: "approvedStamp 0.5s ease forwards",
              }}>
                APPROVED ✓
              </div>
            </div>
          )}

          <div style={{ fontSize: "0.68rem", letterSpacing: "0.5em", color: "#8b5e3c", textTransform: "uppercase", fontFamily: "'Playfair Display', serif", marginBottom: "0.9rem" }}>
            The Office of Prospective Husbands
          </div>

          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(1.7rem, 5vw, 3rem)",
            color: "#1a0f07",
            marginBottom: "0.5rem",
            fontWeight: 900,
            lineHeight: 1.2,
            letterSpacing: "0.02em",
          }}>
            Formal Petition for the<br />
            <em>Hand of Miss {DETAILS.herName}</em>
          </h1>

          <div style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem", color: "#5a4a3a", fontStyle: "italic", marginTop: "0.4rem" }}>
            Submitted respectfully to the attention of Mr. {DETAILS.herFatherName}
          </div>

          <div style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1.5rem 3rem",
            marginTop: "1.5rem",
            fontSize: "0.8rem",
            color: "#7a6a50",
            fontFamily: "'EB Garamond', serif",
          }}>
            <span>Document No. <strong style={{ color: "#2c1d0e" }}>2024-HUSB-001</strong></span>
            <span>Date: <strong style={{ color: "#2c1d0e" }}>{DETAILS.docDate}</strong></span>
            <span>Status: <strong style={{ color: approved ? "#4a7c59" : "#8b5e3c" }}>{approved ? "✓ Approved" : "Under Review"}</strong></span>
          </div>
        </div>

        {/* ── PREAMBLE ── */}
        <div className="section-animate" style={{
          backgroundColor: "rgba(201,170,124,0.12)",
          border: "1px solid #c9aa7c",
          padding: "1.5rem 2rem",
          marginBottom: "3rem",
          position: "relative",
        }}>
          <div style={{ position: "absolute", top: "-11px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#f5ede0", padding: "0 12px" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.68rem", letterSpacing: "0.3em", color: "#8b5e3c", textTransform: "uppercase" }}>Preamble</span>
          </div>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1.05rem", color: "#2c1d0e", lineHeight: 1.95, textAlign: "justify" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", float: "left", lineHeight: 0.85, marginRight: "6px", marginTop: "6px", color: "#8b5e3c", fontWeight: 900 }}>W</span>
            HEREAS the undersigned applicant, hereinafter referred to as <em>"Candidate"</em> or <em>"The Guy Who Built A Website For This,"</em>{" "}
            does hereby submit this formal petition requesting the consideration and eventual approval of his application 
            for the esteemed and irreplaceable role of <strong>Husband to Miss {DETAILS.herName}</strong>; and whereas 
            said Candidate fully acknowledges this document is premature by approximately 3–5 years and was, initially, 
            a sarcastic suggestion — it has since been executed with full sincerity and an embarrassing amount of CSS.
          </p>
        </div>

        {/* ── § 1 CANDIDATE PROFILE ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="1.0" title="Candidate Profile" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: "1.5rem", alignItems: "start" }}>
            <div>
              {[
                ["Full Name",          DETAILS.candidateName],
                ["Date of Birth",      DETAILS.candidateDOB],
                ["Nationality",        DETAILS.candidateNation],
                ["Current Status",     "Bachelor's Student, Software Engineering & Management"],
                ["Institution",        "University of Gothenburg / Chalmers University of Technology"],
                ["Expected Graduation",DETAILS.graduationYear + " (God willing)"],
                ["Relationship Since", DETAILS.dateTogether],
                ["How We Met",         DETAILS.howYouMet],
              ].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: "0.5rem", marginBottom: "0.6rem", fontFamily: "'EB Garamond', serif" }}>
                  <span style={{ color: "#7a6a50", fontSize: "0.83rem", minWidth: "145px", paddingTop: "1px", flexShrink: 0 }}>{k}:</span>
                  <span style={{ color: "#2c1d0e", fontSize: "0.93rem", fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Candidate photo box */}
            <div style={{
              border: "2px solid #c9aa7c",
              width: "130px",
              flexShrink: 0,
              backgroundColor: "#fffdf7",
              padding: "6px 6px 28px 6px",
              boxShadow: "0 4px 14px rgba(44,29,14,0.15)",
            }}>
              {candidatePhoto ? (
                <img
                  src={candidatePhoto}
                  alt="Candidate"
                  style={{
                    width: "100%",
                    aspectRatio: "1",
                    objectFit: "cover",
                    objectPosition: "center top",
                    display: "block",
                    filter: "sepia(0.1)",
                  }}
                />
              ) : (
                <div style={{
                  width: "100%", aspectRatio: "1",
                  backgroundColor: "#e8d9c0",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: "6px",
                }}>
                  <span style={{ fontSize: "1.8rem" }}>📷</span>
                </div>
              )}
              <p style={{
                fontFamily: "'EB Garamond', serif",
                fontSize: "0.68rem",
                color: "#7a6a50",
                textAlign: "center",
                marginTop: "6px",
                fontStyle: "italic",
              }}>
                {DETAILS.candidateName}<br />
                <span style={{ fontSize: "0.62rem" }}>Candidate</span>
              </p>
            </div>
          </div>
        </section>

        <Divider />

        {/* ── § 2 QUALIFICATIONS ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="2.0" title="Qualifications & Competencies" />
          <p style={{ color: "#5a4a3a", fontSize: "0.93rem", lineHeight: 1.8, marginBottom: "1.2rem" }}>
            The following competencies have been assessed through years of field experience, several difficult 
            conversations, and one very long IKEA visit. Ratings are self-reported and therefore <em>completely objective.</em>
          </p>
          <SkillBar skill="Emotional Support"        level={5} note="Battle-tested ★★★★★" />
          <SkillBar skill="Communication"            level={4} note="Improving daily" />
          <SkillBar skill="Cooking (Basic)"          level={3} note="≥ 3 meals confirmed" />
          <SkillBar skill="Financial Responsibility" level={3} note="Student loans notwithstanding" />
          <SkillBar skill="Patience"                 level={4} note="See: this website" />
          <SkillBar skill="Sense of Humour"          level={5} note="See also: this website" />
          <SkillBar skill="Punctuality"              level={4} note="Honest self-assessment" />
          <SkillBar skill="Arguing Productively"     level={4} note="Not always, but mostly" />
          <SkillBar skill="Family Approval"          level={4} note="Pending this document" />
        </section>

        <Divider />

        {/* ── § 3 PHOTOGRAPHIC EVIDENCE ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="3.0" title="Exhibit A — Photographic Evidence of Happiness" />
          <PhotoGallery photos={PHOTOS} />
        </section>

        <Divider />

        {/* ── § 4 ROADMAP ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="4.0" title="Project Roadmap & Development Timeline" />
          <p style={{ color: "#5a4a3a", fontSize: "0.93rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            The Candidate presents the following development roadmap prior to formal deployment as a fully qualified husband.
            All dates are estimates. Life, as noted, is unpredictable.
          </p>
          <TimelineItem year="2024"     title="Relationship Initiated"            desc="Candidate successfully passed initial screening. Further evaluation ongoing." status="done" />
          <TimelineItem year="2024–25"  title="Year 1 of University"              desc="Enrolled in BSc Software Engineering & Management. Learning to manage deadlines, group projects, and 8am lectures simultaneously." status="in-progress" />
          <TimelineItem year="2025–26"  title={`Miss ${DETAILS.herName} Begins Bachelor's`} desc="The co-applicant enters higher education. A theoretical joint academic household is pencilled in." status="pending" />
          <TimelineItem year={DETAILS.graduationYear} title="Candidate Graduates" desc="Candidate receives degree. Becomes meaningfully more employable. Buys a nice dinner to celebrate." status="pending" />
          <TimelineItem year={+DETAILS.graduationYear + 1 + ""} title="Secure Employment in Field" desc="Candidate obtains 'a decent job' as stipulated in verbal negotiations. See Addendum B." status="pending" />
          <TimelineItem year="TBD"      title="This Document Goes Live"           desc={`Mr. ${DETAILS.herFatherName} receives this petition. The ball is in his court.`} status="pending" last />
        </section>

        <Divider />

        {/* ── § 5 WHY YOUR DAUGHTER ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="5.0" title="Why Your Daughter" />
          <div style={{
            border: "1px solid #c9aa7c",
            padding: "2rem",
            backgroundColor: "rgba(201,170,124,0.08)",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: "-12px", right: "20px", backgroundColor: "#f5ede0", padding: "0 8px" }}>
              <span style={{
                display: "inline-block",
                border: "3px solid #4a7c59",
                color: "#4a7c59",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 900,
                fontSize: "0.75rem",
                letterSpacing: "0.2em",
                padding: "3px 10px",
                transform: "rotate(-8deg)",
                textTransform: "uppercase",
              }}>Sincere</span>
            </div>
            <p style={{
              fontFamily: "'EB Garamond', serif",
              fontSize: "1.1rem",
              color: "#2c1d0e",
              lineHeight: 2,
              fontStyle: "italic",
              textAlign: "justify",
            }}>
              "{DETAILS.sweetQuote}"
            </p>
            <div style={{ textAlign: "right", marginTop: "1rem", color: "#7a6a50", fontSize: "0.85rem", fontFamily: "'Playfair Display', serif" }}>
              — {DETAILS.candidateName}, Candidate
            </div>
          </div>
        </section>

        <Divider />

        {/* ── § 6 REFERENCES ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="6.0" title="References" />
          <p style={{ color: "#5a4a3a", fontSize: "0.93rem", marginBottom: "1rem" }}>
            The following references are available upon request. All have agreed to speak on the Candidate's behalf, conditionally.
          </p>
          {[
            ["Ritasha",                             "Character witness. Has seen worse.",                   "Available weekdays"],
            ["Maati",                               "Can confirm Candidate does his share of the work.",    "Begrudgingly available"],
            ["Jarif",                               "Non-verbal. Welcoming.",                               "Always available"],
          ].map(([name, note, avail]) => (
            <div key={name} style={{
              display: "grid",
              gridTemplateColumns: "clamp(150px, 35%, 220px) 1fr auto",
              gap: "0.75rem",
              padding: "0.55rem 0",
              borderBottom: "1px dashed #d4b896",
              fontFamily: "'EB Garamond', serif",
              fontSize: "0.92rem",
              alignItems: "center",
            }}>
              <span style={{ color: "#2c1d0e", fontWeight: 500 }}>{name}</span>
              <span style={{ color: "#5a4a3a", fontStyle: "italic" }}>{note}</span>
              <span style={{ color: "#7a6a50", fontSize: "0.78rem", textAlign: "right" }}>{avail}</span>
            </div>
          ))}
        </section>

        <Divider />

        {/* ── § 7 TERMS ── */}
        <section className="section-animate" style={{ marginBottom: "3rem" }}>
          <SectionHeader number="7.0" title="Terms & Conditions" />
          <div style={{
            columns: 2,
            columnGap: "2rem",
            fontFamily: "'EB Garamond', serif",
            fontSize: "0.87rem",
            color: "#5a4a3a",
            lineHeight: 1.9,
          }}>
            <p>§ 7.1 — Candidate agrees to attend all significant family gatherings with a smile, even the ones that run four hours past schedule.</p>
            <p>§ 7.2 — Thermostat negotiations shall default to Miss {DETAILS.herName}'s comfort level.</p>
            <p>§ 7.3 — Candidate shall not attempt to fix problems when emotional support is clearly what is required. This clause has been highlighted, initialled, and laminated.</p>
            <p>§ 7.4 — Sunday dinners with the family are, in principle, non-negotiable and, in practice, genuinely looked forward to.</p>
            <p>§ 7.5 — Candidate reserves the right to make terrible jokes at any time. Miss {DETAILS.herName} has been informed and has accepted the terms.</p>
            <p>§ 7.6 — All disputes shall be resolved through calm conversation, followed by food, in that order.</p>
            <p>§ 7.7 — This document shall be exhibited at the wedding, framed, and placed somewhere embarrassing.</p>
          </div>
        </section>

        {/* ── § 8 VERDICT ── */}
        <div style={{
          border: `2px solid ${approved ? "#4a7c59" : "#8b5e3c"}`,
          padding: "2.5rem",
          textAlign: "center",
          backgroundColor: approved ? "rgba(74,124,89,0.08)" : "rgba(139,94,60,0.05)",
          marginTop: "1rem",
          transition: "border-color 0.5s, background-color 0.5s",
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "0.68rem", letterSpacing: "0.4em", color: "#7a6a50", textTransform: "uppercase", marginBottom: "0.75rem" }}>
            § 8.0 — Official Verdict
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", color: "#1a0f07", marginBottom: "0.5rem", fontWeight: 700 }}>
            Mr. {DETAILS.herFatherName}, the decision rests with you.
          </h3>
          <p style={{ fontFamily: "'EB Garamond', serif", fontSize: "1rem", color: "#5a4a3a", marginBottom: "2rem", lineHeight: 1.75, maxWidth: "500px", margin: "0 auto 2rem" }}>
            The Candidate acknowledges this petition is early. Embarrassingly so.
            But consider it a statement of intent — that this is not something taken lightly, and never will be.
          </p>

          {!approved ? (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "2rem", justifyContent: "center", alignItems: "flex-start", marginBottom: "1rem" }}>
              {/* APPROVE */}
              <button
                onClick={handleApprove}
                style={{
                  backgroundColor: "#4a7c59",
                  color: "#fff",
                  border: "2px solid #4a7c59",
                  padding: "0.8rem 2.8rem",
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1rem",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  cursor: "pointer",
                  textTransform: "uppercase",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3a6449"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#4a7c59"; }}
              >
                ✓ &nbsp; Approve Petition
              </button>

              {/* DENY — the escape button */}
              <DenyButton onForceApprove={handleApprove} />
            </div>
          ) : (
            <div style={{
              padding: "1.5rem 2rem",
              backgroundColor: "rgba(74,124,89,0.12)",
              border: "2px solid #4a7c59",
              fontFamily: "'EB Garamond', serif",
              animation: "fadeInUp 0.5s ease",
              maxWidth: "520px",
              margin: "0 auto",
            }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#4a7c59", fontWeight: 900, marginBottom: "0.5rem" }}>
                🎉 Petition Approved.
              </div>
              <p style={{ fontSize: "1rem", color: "#2a5a38", lineHeight: 1.75, fontStyle: "italic" }}>
                The Candidate thanks you sincerely, Mr. {DETAILS.herFatherName}. 
                He will try very hard — every single day — not to let you down.
              </p>
              <div style={{ marginTop: "1rem", fontSize: "0.8rem", color: "#5a7a5a", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                — Document Sealed & Countersigned —
              </div>
            </div>
          )}
        </div>

        {/* ── FOOTER ── */}
        <div style={{
          marginTop: "3.5rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #c9aa7c",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "0.75rem",
          fontFamily: "'EB Garamond', serif",
          fontSize: "0.78rem",
          color: "#7a6a50",
        }}>
          <div>
            <div>Document No. 2024-HUSB-001</div>
            <div>The Office of Prospective Husbands</div>
          </div>
          <div style={{ textAlign: "center", fontStyle: "italic" }}>
            "Built with React, Tailwind CSS, and an unreasonable amount of sincerity."
          </div>
          <div style={{ textAlign: "right" }}>
            <div>Page 1 of 1</div>
            <div>© {DETAILS.candidateName}</div>
          </div>
        </div>

      </div>
    </div>
  );
}

SectionHeader.propTypes = {
  number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
};
SkillBar.propTypes = {
  skill: PropTypes.string.isRequired,
  level: PropTypes.number.isRequired,
  note: PropTypes.string,
};
TimelineItem.propTypes = {
  year: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  status: PropTypes.oneOf(["done", "in-progress", "pending"]).isRequired,
  last: PropTypes.bool,
};
PhotoGallery.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape({
    url: PropTypes.string, // can be null for placeholders
    caption: PropTypes.string.isRequired,
  })).isRequired,
};
Confetti.propTypes = {
  active: PropTypes.bool.isRequired,
};
ApprovedOverlay.propTypes = {
  visible: PropTypes.bool.isRequired,
};
DenyButton.propTypes = {
  onForceApprove: PropTypes.func.isRequired,
};

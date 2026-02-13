"use client";

import React from "react";
import { motion } from "framer-motion";
import { CVData } from "@/lib/cv/templates";

interface CVPreviewProps {
  data: CVData;
  template: string;
}

/* ─── Helpers ─── */
function Initials({ name, size = 56, bg = "#1e293b", color = "#94a3b8", border }: { name: string; size?: number; bg?: string; color?: string; border?: string }) {
  const initials = (name || "VN").split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", backgroundColor: bg, border: border || `3px solid ${color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size * 0.38, fontWeight: 700, color, letterSpacing: 1, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

function ContactItem({ icon, value, color = "#6b7280" }: { icon: string; value?: string; color?: string }) {
  if (!value) return null;
  return <span style={{ fontSize: 9.5, color, display: "flex", alignItems: "center", gap: 4 }}><span style={{ fontSize: 10, opacity: 0.7 }}>{icon}</span>{value}</span>;
}

function SkillBar({ label, pct, accent, bg }: { label: string; pct: number; accent: string; bg: string }) {
  return (
    <div style={{ marginBottom: 7 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 9, fontWeight: 600, color: "#e2e8f0" }}>{label}</span>
        <span style={{ fontSize: 8, color: "#94a3b8" }}>{pct}%</span>
      </div>
      <div style={{ height: 4, backgroundColor: bg, borderRadius: 3 }}>
        <div style={{ height: 4, backgroundColor: accent, borderRadius: 3, width: `${pct}%` }} />
      </div>
    </div>
  );
}

function DotRating({ level, accent }: { level: string; accent: string }) {
  const map: Record<string, number> = { "natif": 5, "native": 5, "bilingue": 5, "courant": 4, "fluent": 4, "avancé": 3, "advanced": 3, "intermédiaire": 2, "intermediate": 2, "débutant": 1, "beginner": 1 };
  const dots = map[level.toLowerCase()] || 3;
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {[...Array(5)].map((_, i) => (
        <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: i < dots ? accent : accent + "25" }} />
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   1. CLASSIC — Refined serif, ornamental, distinguished
   ════════════════════════════════════════════════════════════════ */
function ClassicTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const dark = "#1e293b";
  const gray = "#64748b";
  const sectionHead = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ flex: 1, height: 0.5, backgroundColor: gray + "50" }} />
      <h2 style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 4, color: dark, margin: 0, whiteSpace: "nowrap", fontFamily: "Georgia, serif" }}>{title}</h2>
      <div style={{ flex: 1, height: 0.5, backgroundColor: gray + "50" }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
      {/* Decorative top bar */}
      <div style={{ height: 5, background: `linear-gradient(to right, transparent, ${dark}, transparent)`, marginBottom: 28, borderRadius: 2 }} />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Initials name={p.fullName} size={64} bg="transparent" color={dark} border={`2px solid ${dark}`} />
        <h1 style={{ fontSize: 30, fontWeight: 400, color: dark, letterSpacing: 6, textTransform: "uppercase", margin: "14px 0 0" }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 14, color: gray, marginTop: 6, fontStyle: "italic", letterSpacing: 3 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, margin: "14px 0 0" }}>
          <div style={{ width: 50, height: 1, backgroundColor: dark }} />
          <div style={{ width: 7, height: 7, border: `1.5px solid ${dark}`, transform: "rotate(45deg)" }} />
          <div style={{ width: 50, height: 1, backgroundColor: dark }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 14 }}>
          <ContactItem icon="✉" value={p.email} color={gray} />
          <ContactItem icon="☎" value={p.phone} color={gray} />
          <ContactItem icon="⌂" value={p.location} color={gray} />
          <ContactItem icon="in" value={p.linkedin} color={gray} />
          <ContactItem icon="⌨" value={p.github} color={gray} />
        </div>
      </div>

      {/* Double line separator */}
      <div style={{ borderTop: `2px solid ${dark}`, borderBottom: `1px solid ${dark}`, height: 4, marginBottom: 22 }} />

      {p.summary && <div style={{ marginBottom: 22 }}>{sectionHead("Profil")}<p style={{ fontSize: 11, color: "#374151", lineHeight: 1.7, textAlign: "justify" }}>{p.summary}</p></div>}

      {experiences.length > 0 && (
        <div style={{ marginBottom: 22 }}>{sectionHead("Expérience Professionnelle")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 16, borderLeft: `2px solid ${dark}30` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: dark, margin: 0 }}>{exp.title}</h3>
                <span style={{ fontSize: 9, color: gray, fontStyle: "italic" }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 10.5, color: gray, fontStyle: "italic", margin: "2px 0 5px" }}>{exp.company}{exp.location ? `, ${exp.location}` : ""}</p>
              {exp.description && <p style={{ fontSize: 10, color: "#4b5563", marginBottom: 3 }}>{exp.description}</p>}
              {exp.achievements.length > 0 && exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0", display: "flex", gap: 6 }}><span style={{ color: dark }}>◆</span>{a}</p>)}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: 22 }}>{sectionHead("Formation")}
          {education.map((edu, i) => (
            <div key={i} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div><strong style={{ fontSize: 11.5, color: dark }}>{edu.degree}</strong><span style={{ fontSize: 10.5, color: gray, fontStyle: "italic" }}> — {edu.school}</span></div>
              <span style={{ fontSize: 9, color: gray }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30 }}>
        {skills.length > 0 && <div>{sectionHead("Compétences")}{skills.map((g, i) => <div key={i} style={{ marginBottom: 6 }}><p style={{ fontSize: 10, color: dark, fontWeight: 700, marginBottom: 2 }}>{g.category}</p><p style={{ fontSize: 10, color: "#4b5563" }}>{g.items.join("  ·  ")}</p></div>)}</div>}
        <div>
          {languages.length > 0 && <div style={{ marginBottom: 14 }}>{sectionHead("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}><span style={{ fontSize: 10, fontWeight: 600, color: dark }}>{l.name}</span><DotRating level={l.level} accent={dark} /></div>)}</div>}
          {certifications && certifications.length > 0 && <div>{sectionHead("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 3 }}><strong>{c.name}</strong> <span style={{ color: gray }}>— {c.issuer}</span></p>)}</div>}
        </div>
      </div>

      <div style={{ height: 5, background: `linear-gradient(to right, transparent, ${dark}, transparent)`, marginTop: 26, borderRadius: 2 }} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   2. MODERN — Bold blue, left accent, clean & professional
   ════════════════════════════════════════════════════════════════ */
function ModernTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#2563eb";
  const light = "#eff6ff";
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 5, height: 22, backgroundColor: accent, borderRadius: 2 }} />
      <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: accent, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}30, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", position: "relative" }}>
      {/* Left accent strip */}
      <div style={{ position: "absolute", left: -36, top: -32, bottom: -32, width: 6, background: `linear-gradient(to bottom, ${accent}, #06b6d4)`, borderRadius: 3 }} />

      {/* Header */}
      <div style={{ marginBottom: 26, paddingBottom: 20, borderBottom: `2px solid ${accent}15` }}>
        <h1 style={{ fontSize: 34, fontWeight: 900, color: "#111827", margin: 0, lineHeight: 1.1, letterSpacing: -0.5 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 16, color: accent, fontWeight: 600, marginTop: 6, letterSpacing: 1 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          <ContactItem icon="✉" value={p.email} />
          <ContactItem icon="☎" value={p.phone} />
          <ContactItem icon="⌂" value={p.location} />
          <ContactItem icon="in" value={p.linkedin} />
          <ContactItem icon="⌨" value={p.github} />
          <ContactItem icon="⊕" value={p.website} />
        </div>
      </div>

      {p.summary && <div style={{ marginBottom: 22 }}>{section("Profil")}<p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.75, paddingLeft: 14 }}>{p.summary}</p></div>}

      {experiences.length > 0 && (
        <div style={{ marginBottom: 22 }}>{section("Expérience")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `2px solid ${accent}20`, position: "relative" }}>
              <div style={{ position: "absolute", left: -5, top: 4, width: 8, height: 8, borderRadius: "50%", backgroundColor: i === 0 ? accent : accent + "40", border: "2px solid white" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: "#111827", margin: 0 }}>{exp.title}</h3>
                <span style={{ fontSize: 9.5, color: "#9ca3af", fontWeight: 500 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 10.5, color: accent, fontWeight: 600, margin: "2px 0 4px" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
              {exp.achievements.length > 0 && exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0", paddingLeft: 10 }}>→ {a}</p>)}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div style={{ marginBottom: 22 }}>{section("Formation")}
          {education.map((edu, i) => (
            <div key={i} style={{ paddingLeft: 14, marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <div><strong style={{ fontSize: 12, color: "#111827" }}>{edu.degree}</strong><span style={{ fontSize: 10.5, color: "#6b7280" }}> — {edu.school}</span></div>
              <span style={{ fontSize: 9.5, color: "#9ca3af" }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div style={{ marginBottom: 22 }}>{section("Compétences")}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 7, paddingLeft: 14 }}>
            {skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 10, padding: "4px 14px", borderRadius: 20, backgroundColor: light, color: accent, fontWeight: 600, border: `1px solid ${accent}20` }}>{s}</span>)}
          </div>
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 30, paddingLeft: 14 }}>
        {languages.length > 0 && <div>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5, paddingLeft: 14 }}><span style={{ fontSize: 10.5, fontWeight: 600 }}>{l.name}</span><DotRating level={l.level} accent={accent} /></div>)}</div>}
        {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, margin: "4px 0 4px 14px" }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>· {c.issuer}</span></p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   3. EXECUTIVE — Dark sidebar, professional corporate
   ════════════════════════════════════════════════════════════════ */
function ExecutiveTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const dark = "#0f172a";
  const accent = "#3b82f6";
  const sideH = { fontSize: 10, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 2.5, color: "#94a3b8", marginBottom: 10, marginTop: 20 };
  const mainH = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, paddingBottom: 6, borderBottom: `2px solid ${dark}` }}>
      <h2 style={{ fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: dark, margin: 0 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ display: "flex", fontFamily: "system-ui, sans-serif", minHeight: "100%" }}>
      {/* Sidebar */}
      <div style={{ width: "36%", backgroundColor: dark, color: "#e2e8f0", padding: "32px 22px", flexShrink: 0 }}>
        <Initials name={p.fullName} size={72} bg="#1e293b" color="#94a3b8" border={`3px solid ${accent}`} />
        <div style={{ marginTop: 14 }}>
          <h1 style={{ fontSize: 17, fontWeight: 800, color: "#f1f5f9", margin: 0, lineHeight: 1.2 }}>{p.fullName || "Votre Nom"}</h1>
          <p style={{ fontSize: 10.5, color: accent, marginTop: 4, fontWeight: 600, letterSpacing: 1 }}>{p.title || "Titre"}</p>
        </div>
        <div style={{ width: "100%", height: 1, background: `linear-gradient(to right, ${accent}, transparent)`, margin: "16px 0" }} />

        <h3 style={sideH}>Contact</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <ContactItem icon="✉" value={p.email} color="#94a3b8" />
          <ContactItem icon="☎" value={p.phone} color="#94a3b8" />
          <ContactItem icon="⌂" value={p.location} color="#94a3b8" />
          <ContactItem icon="in" value={p.linkedin} color="#94a3b8" />
          <ContactItem icon="⌨" value={p.github} color="#94a3b8" />
        </div>

        {skills.length > 0 && (<>
          <h3 style={sideH}>Compétences</h3>
          {skills.flatMap(g => g.items).map((s, i) => (
            <SkillBar key={i} label={s} pct={75 + (i * 5) % 20} accent={accent} bg="#1e293b" />
          ))}
        </>)}

        {languages.length > 0 && (<>
          <h3 style={sideH}>Langues</h3>
          {languages.map((l, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "#cbd5e1", fontWeight: 500 }}>{l.name}</span>
              <DotRating level={l.level} accent={accent} />
            </div>
          ))}
        </>)}
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: "32px 28px" }}>
        {p.summary && <div style={{ marginBottom: 24 }}>{mainH("Profil")}<p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.75 }}>{p.summary}</p></div>}

        {experiences.length > 0 && (
          <div style={{ marginBottom: 24 }}>{mainH("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, position: "relative", paddingLeft: 18 }}>
                <div style={{ position: "absolute", left: 0, top: 5, width: 8, height: 8, borderRadius: "50%", backgroundColor: i === 0 ? dark : "#cbd5e1" }} />
                {i < experiences.length - 1 && <div style={{ position: "absolute", left: 3.5, top: 16, bottom: -8, width: 1, backgroundColor: "#e5e7eb" }} />}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: 12.5, fontWeight: 700, margin: 0, color: "#111827" }}>{exp.title}</h3>
                  <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 600 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                </div>
                <p style={{ fontSize: 10, color: accent, fontWeight: 600, margin: "2px 0 4px" }}>{exp.company}{exp.location ? ` — ${exp.location}` : ""}</p>
                {exp.achievements.length > 0 && exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0", paddingLeft: 8 }}>▸ {a}</p>)}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div style={{ marginBottom: 24 }}>{mainH("Formation")}
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 8, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <div><strong style={{ fontSize: 12 }}>{edu.degree}</strong><br /><span style={{ fontSize: 10, color: "#6b7280" }}>{edu.school}{edu.location ? `, ${edu.location}` : ""}</span></div>
                <span style={{ fontSize: 9, color: "#9ca3af" }}>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}

        {certifications && certifications.length > 0 && <div>{mainH("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 11, marginBottom: 4 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>— {c.issuer}, {c.date}</span></p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. CREATIVE — Gradient header, playful, bold
   ════════════════════════════════════════════════════════════════ */
function CreativeTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#7c3aed";
  const pink = "#ec4899";
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <div style={{ width: 10, height: 10, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, ${pink})`, flexShrink: 0 }} />
      <h2 style={{ fontSize: 14, fontWeight: 800, color: accent, margin: 0, textTransform: "uppercase", letterSpacing: 1.5 }}>{title}</h2>
      <div style={{ flex: 1, height: 1.5, background: `linear-gradient(to right, ${accent}30, transparent)`, borderRadius: 1 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Gradient header with decorative shapes */}
      <div style={{ background: `linear-gradient(135deg, ${accent}, ${pink})`, padding: "36px 32px 28px", marginBottom: 24, borderRadius: "0 0 24px 24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -30, left: "40%", width: 140, height: 140, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "relative" }}>
          <Initials name={p.fullName} size={56} bg="rgba(255,255,255,0.15)" color="#fff" border="3px solid rgba(255,255,255,0.3)" />
          <h1 style={{ fontSize: 30, fontWeight: 900, color: "#fff", margin: "12px 0 0", letterSpacing: 1 }}>{p.fullName || "Votre Nom"}</h1>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.9)", marginTop: 4, fontWeight: 500 }}>{p.title || "Titre Professionnel"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
            {[p.email && `✉ ${p.email}`, p.phone && `☎ ${p.phone}`, p.location && `⌂ ${p.location}`, p.linkedin, p.github].filter(Boolean).map((item, i) => (
              <span key={i} style={{ fontSize: 9.5, color: "#fff", backgroundColor: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 14, backdropFilter: "blur(4px)" }}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      <div style={{ padding: "0 10px" }}>
        {p.summary && (
          <div style={{ marginBottom: 22, backgroundColor: "#faf5ff", padding: "16px 18px", borderRadius: 14, borderLeft: `4px solid ${accent}` }}>
            {section("Profil")}
            <p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.75 }}>{p.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div style={{ marginBottom: 22 }}>{section("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, padding: "14px 18px", backgroundColor: "#faf5ff", borderRadius: 12, border: "1px solid #ede9fe" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#111", margin: 0 }}>{exp.title}</h3>
                  <span style={{ fontSize: 9, color: accent, fontWeight: 700, backgroundColor: accent + "15", padding: "2px 8px", borderRadius: 8 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                </div>
                <p style={{ fontSize: 10.5, color: accent, fontWeight: 600, margin: "3px 0 5px" }}>{exp.company}</p>
                {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "3px 0" }}>✦ {a}</p>)}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && <div style={{ marginBottom: 22 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 8, paddingLeft: 18 }}><strong style={{ fontSize: 12, color: "#111" }}>{edu.degree}</strong><p style={{ fontSize: 10, color: "#6b7280", margin: "2px 0" }}>{edu.school} · {edu.startDate} – {edu.endDate}</p></div>)}</div>}

        {skills.length > 0 && (
          <div style={{ marginBottom: 22 }}>{section("Compétences")}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 10.5, padding: "5px 14px", borderRadius: 20, background: `linear-gradient(135deg, ${accent}12, ${pink}12)`, color: accent, fontWeight: 600, border: `1.5px solid ${accent}25` }}>{s}</span>)}
            </div>
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {languages.length > 0 && <div>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}><span style={{ fontSize: 10.5, fontWeight: 600 }}>{l.name}</span><DotRating level={l.level} accent={accent} /></div>)}</div>}
          {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 4 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>· {c.issuer}</span></p>)}</div>}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. COMPACT — Dense two-column, ATS-optimized, green
   ════════════════════════════════════════════════════════════════ */
function CompactTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#059669";
  const h2 = (title: string) => (
    <div style={{ marginBottom: 8, paddingBottom: 4, borderBottom: `2px solid ${accent}` }}>
      <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: accent, margin: 0 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 10 }}>
      {/* Header */}
      <div style={{ textAlign: "center", paddingBottom: 14, marginBottom: 14, position: "relative" }}>
        <h1 style={{ fontSize: 24, fontWeight: 900, color: "#111", margin: 0, letterSpacing: 1 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 13, color: accent, fontWeight: 700, margin: "4px 0 10px", letterSpacing: 0.5 }}>{p.title}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 12 }}>
          <ContactItem icon="✉" value={p.email} />
          <ContactItem icon="☎" value={p.phone} />
          <ContactItem icon="⌂" value={p.location} />
          <ContactItem icon="in" value={p.linkedin} />
          <ContactItem icon="⌨" value={p.github} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 3, background: `linear-gradient(to right, transparent, ${accent}, transparent)`, borderRadius: 2 }} />
      </div>

      {p.summary && <p style={{ fontSize: 10.5, color: "#4b5563", lineHeight: 1.65, marginBottom: 14, textAlign: "justify" }}>{p.summary}</p>}

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "0 24px" }}>
        <div>
          {experiences.length > 0 && (
            <div style={{ marginBottom: 14 }}>{h2("Expérience")}
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: 10, paddingLeft: 10, borderLeft: `2px solid ${accent}20` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <strong style={{ fontSize: 10.5, color: "#111" }}>{exp.title}</strong>
                    <span style={{ fontSize: 8.5, color: "#9ca3af", whiteSpace: "nowrap" }}>{exp.startDate}–{exp.current ? "Auj." : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: 9.5, color: accent, fontWeight: 600, margin: "1px 0 3px" }}>{exp.company}</p>
                  {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 9, margin: "2px 0", color: "#4b5563" }}>• {a}</p>)}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div>{h2("Formation")}
              {education.map((edu, i) => <div key={i} style={{ marginBottom: 6, paddingLeft: 10 }}><strong style={{ fontSize: 10 }}>{edu.degree}</strong><p style={{ fontSize: 9, color: "#6b7280", margin: "1px 0" }}>{edu.school} ({edu.startDate}–{edu.endDate})</p></div>)}
            </div>
          )}
        </div>
        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: 14 }}>{h2("Compétences")}
              {skills.map((g, i) => (
                <div key={i} style={{ marginBottom: 6 }}>
                  <p style={{ fontSize: 9, fontWeight: 700, color: accent, marginBottom: 2, textTransform: "uppercase", letterSpacing: 1 }}>{g.category}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {g.items.map((s, j) => <span key={j} style={{ fontSize: 9, padding: "2px 8px", backgroundColor: accent + "12", color: "#065f46", borderRadius: 4, fontWeight: 500 }}>{s}</span>)}
                  </div>
                </div>
              ))}
            </div>
          )}
          {languages.length > 0 && (
            <div style={{ marginBottom: 14 }}>{h2("Langues")}
              {languages.map((l, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
                  <span style={{ fontSize: 10, fontWeight: 600 }}>{l.name}</span>
                  <DotRating level={l.level} accent={accent} />
                </div>
              ))}
            </div>
          )}
          {certifications && certifications.length > 0 && <div>{h2("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 9.5, marginBottom: 3 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>— {c.issuer}</span></p>)}</div>}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   6. ELEGANT — Serif, gold ornaments, sophisticated
   ════════════════════════════════════════════════════════════════ */
function ElegantTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const gold = "#b45309";
  const goldLight = "#fef3c7";
  const sectionHead = (title: string) => (
    <div style={{ textAlign: "center", marginBottom: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
        <div style={{ flex: 1, height: 0.5, backgroundColor: gold + "30" }} />
        <div style={{ width: 6, height: 6, transform: "rotate(45deg)", backgroundColor: gold }} />
        <div style={{ flex: 1, height: 0.5, backgroundColor: gold + "30" }} />
      </div>
      <h2 style={{ fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: 4, color: gold, margin: 0, fontFamily: "Georgia, serif" }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", padding: "0 12px" }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 8 }}>
        <div style={{ width: 50, height: 2, backgroundColor: gold, margin: "0 auto 18px", borderRadius: 1 }} />
        <Initials name={p.fullName} size={52} bg={goldLight} color={gold} border={`2px solid ${gold}40`} />
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 18, marginTop: 14 }}>
          <div style={{ width: 50, height: 0.5, backgroundColor: gold }} />
          <h1 style={{ fontSize: 28, fontWeight: 400, color: "#1c1917", letterSpacing: 7, textTransform: "uppercase", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
          <div style={{ width: 50, height: 0.5, backgroundColor: gold }} />
        </div>
        <p style={{ fontSize: 14, color: gold, fontStyle: "italic", letterSpacing: 3, marginTop: 6 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 14, marginTop: 14 }}>
          <ContactItem icon="✉" value={p.email} color="#78716c" />
          <ContactItem icon="☎" value={p.phone} color="#78716c" />
          <ContactItem icon="⌂" value={p.location} color="#78716c" />
        </div>
        <div style={{ width: 50, height: 2, backgroundColor: gold, margin: "18px auto 0", borderRadius: 1 }} />
      </div>

      {p.summary && <div style={{ margin: "20px 0" }}>{sectionHead("Profil")}<p style={{ fontSize: 11, color: "#44403c", lineHeight: 1.85, textAlign: "center", fontStyle: "italic", maxWidth: 440, margin: "0 auto" }}>{p.summary}</p></div>}

      {experiences.length > 0 && (
        <div style={{ margin: "20px 0" }}>{sectionHead("Expérience")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 16, textAlign: "center" }}>
              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#1c1917", margin: 0 }}>{exp.title}</h3>
              <p style={{ fontSize: 10.5, color: gold, fontStyle: "italic", margin: "3px 0" }}>{exp.company}{exp.location ? ` — ${exp.location}` : ""}</p>
              <p style={{ fontSize: 9, color: "#a8a29e", letterSpacing: 1 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</p>
              {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10.5, color: "#44403c", margin: "3px 0" }}>— {a}</p>)}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && <div style={{ margin: "20px 0" }}>{sectionHead("Formation")}{education.map((edu, i) => <p key={i} style={{ fontSize: 11.5, textAlign: "center", marginBottom: 6 }}><strong>{edu.degree}</strong> <span style={{ color: "#78716c" }}>— {edu.school}, {edu.startDate}–{edu.endDate}</span></p>)}</div>}

      {skills.length > 0 && <div style={{ margin: "20px 0" }}>{sectionHead("Compétences")}<p style={{ textAlign: "center", fontSize: 11, color: "#44403c", lineHeight: 1.8 }}>{skills.flatMap(g => g.items).join("   ·   ")}</p></div>}

      <div style={{ display: "flex", justifyContent: "center", gap: 50, marginTop: 20 }}>
        {languages.length > 0 && <div style={{ textAlign: "center" }}><h3 style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: gold, marginBottom: 8 }}>Langues</h3>{languages.map((l, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 3 }}>{l.name} — <em>{l.level}</em></p>)}</div>}
        {certifications && certifications.length > 0 && <div style={{ textAlign: "center" }}><h3 style={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: 3, color: gold, marginBottom: 8 }}>Certifications</h3>{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 3 }}>{c.name} — <em>{c.issuer}</em></p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   7. TECH — Developer-focused, dark header, skill bars
   ════════════════════════════════════════════════════════════════ */
function TechTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#0ea5e9";
  const dark = "#0c4a6e";
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
      <span style={{ fontSize: 14, color: accent, fontWeight: 800, fontFamily: "monospace" }}>#</span>
      <h2 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5, color: dark, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}30, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", display: "flex", minHeight: "100%" }}>
      {/* Main content */}
      <div style={{ flex: 1, paddingRight: 22 }}>
        {/* Dark header */}
        <div style={{ background: `linear-gradient(135deg, ${dark}, #164e63)`, padding: "28px 24px", marginBottom: 20, borderRadius: "0 0 16px 0", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, right: 0, width: 120, height: 120, background: `radial-gradient(circle, ${accent}15, transparent)` }} />
          <div style={{ position: "relative" }}>
            <h1 style={{ fontSize: 24, fontWeight: 900, color: "#fff", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
            <p style={{ fontSize: 13, color: accent, fontFamily: "'SF Mono', Consolas, monospace", marginTop: 6 }}>
              <span style={{ color: "#22d3ee" }}>{">"}</span> {p.title || "Titre"}
            </p>
          </div>
        </div>

        {p.summary && <div style={{ marginBottom: 20 }}>{section("À propos")}<p style={{ fontSize: 10.5, color: "#4b5563", lineHeight: 1.75 }}>{p.summary}</p></div>}

        {experiences.length > 0 && (
          <div style={{ marginBottom: 20 }}>{section("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 14, borderLeft: `3px solid ${i === 0 ? accent : accent + "30"}`, paddingLeft: 14 }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "#111" }}>{exp.title}</h3>
                <p style={{ fontSize: 10, color: accent, fontWeight: 600, margin: "2px 0" }}>{exp.company} <span style={{ color: "#9ca3af", fontWeight: 400 }}>| {exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span></p>
                {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0" }}>→ {a}</p>)}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && <div style={{ marginBottom: 20 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 6, paddingLeft: 14 }}><strong style={{ fontSize: 11 }}>{edu.degree}</strong><p style={{ fontSize: 10, color: "#6b7280", margin: "1px 0" }}>{edu.school} ({edu.endDate})</p></div>)}</div>}
        {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 3, paddingLeft: 14 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>— {c.issuer}</span></p>)}</div>}
      </div>

      {/* Right sidebar */}
      <div style={{ width: "32%", backgroundColor: "#f0f9ff", padding: "24px 18px", borderLeft: `3px solid ${accent}20`, flexShrink: 0 }}>
        <h3 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: dark, marginBottom: 10 }}>Contact</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 20 }}>
          <ContactItem icon="✉" value={p.email} color={dark} />
          <ContactItem icon="☎" value={p.phone} color={dark} />
          <ContactItem icon="⌂" value={p.location} color={dark} />
          <ContactItem icon="in" value={p.linkedin} color={dark} />
          <ContactItem icon="⌨" value={p.github} color={dark} />
        </div>

        {skills.length > 0 && (<>
          <h3 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: dark, marginBottom: 10 }}>Stack Tech</h3>
          {skills.flatMap(g => g.items).map((s, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <span style={{ fontSize: 9.5, color: dark, fontWeight: 600 }}>{s}</span>
                <span style={{ fontSize: 8, color: accent }}>{70 + (i * 7) % 25}%</span>
              </div>
              <div style={{ height: 5, backgroundColor: "#e0f2fe", borderRadius: 3 }}>
                <div style={{ height: 5, background: `linear-gradient(to right, ${dark}, ${accent})`, borderRadius: 3, width: `${70 + (i * 7) % 25}%` }} />
              </div>
            </div>
          ))}
        </>)}

        {languages.length > 0 && (<>
          <h3 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: dark, marginTop: 20, marginBottom: 10 }}>Langues</h3>
          {languages.map((l, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 9.5, color: dark, fontWeight: 600 }}>{l.name}</span>
              <DotRating level={l.level} accent={accent} />
            </div>
          ))}
        </>)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   8. IMPACT — Full-bleed header, bold red+black, maximal
   ════════════════════════════════════════════════════════════════ */
function ImpactTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const red = "#dc2626";
  const dark = "#18181b";
  const section = (title: string) => (
    <div style={{ marginBottom: 12, position: "relative", paddingBottom: 8 }}>
      <h2 style={{ fontSize: 14, fontWeight: 900, textTransform: "uppercase", letterSpacing: 3, color: dark, margin: 0 }}>{title}</h2>
      <div style={{ position: "absolute", bottom: 0, left: 0, width: 40, height: 3, backgroundColor: red, borderRadius: 2 }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Full-bleed header */}
      <div style={{ backgroundColor: dark, padding: "36px 32px 28px", marginBottom: 24, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: `radial-gradient(circle at top right, ${red}15, transparent)` }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ width: 50, height: 5, backgroundColor: red, marginBottom: 14, borderRadius: 2 }} />
              <h1 style={{ fontSize: 34, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1, letterSpacing: 1 }}>{p.fullName || "VOTRE NOM"}</h1>
              <p style={{ fontSize: 15, color: red, fontWeight: 800, marginTop: 8, textTransform: "uppercase", letterSpacing: 4 }}>{p.title || "TITRE"}</p>
            </div>
            <Initials name={p.fullName} size={60} bg={red + "20"} color={red} border={`2px solid ${red}40`} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 16 }}>
            <ContactItem icon="✉" value={p.email} color="#a1a1aa" />
            <ContactItem icon="☎" value={p.phone} color="#a1a1aa" />
            <ContactItem icon="⌂" value={p.location} color="#a1a1aa" />
            <ContactItem icon="in" value={p.linkedin} color="#a1a1aa" />
            <ContactItem icon="⌨" value={p.github} color="#a1a1aa" />
          </div>
        </div>
      </div>

      <div style={{ padding: "0 10px" }}>
        {p.summary && (
          <div style={{ marginBottom: 24, padding: "14px 18px", borderLeft: `5px solid ${red}`, backgroundColor: "#fef2f2", borderRadius: "0 8px 8px 0" }}>
            <p style={{ fontSize: 11, color: "#374151", lineHeight: 1.75, margin: 0 }}>{p.summary}</p>
          </div>
        )}

        {experiences.length > 0 && (
          <div style={{ marginBottom: 24 }}>{section("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, display: "flex", gap: 16, position: "relative" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: i === 0 ? red : "#d1d5db", border: `2px solid ${i === 0 ? red : "#e5e7eb"}`, zIndex: 1 }} />
                  {i < experiences.length - 1 && <div style={{ width: 2, flex: 1, backgroundColor: "#e5e7eb", marginTop: 2 }} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: dark, margin: 0 }}>{exp.title}</h3>
                    <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 700, letterSpacing: 0.5 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: 10.5, color: red, fontWeight: 700, margin: "2px 0 5px" }}>{exp.company}</p>
                  {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "3px 0" }}>■ {a}</p>)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
          <div>
            {education.length > 0 && <div style={{ marginBottom: 18 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 8 }}><strong style={{ fontSize: 11.5, color: dark }}>{edu.degree}</strong><p style={{ fontSize: 9.5, color: "#6b7280", margin: "2px 0" }}>{edu.school} · {edu.endDate}</p></div>)}</div>}
            {languages.length > 0 && <div>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}><span style={{ fontSize: 10.5, fontWeight: 700 }}>{l.name}</span><DotRating level={l.level} accent={red} /></div>)}</div>}
          </div>
          <div>
            {skills.length > 0 && <div style={{ marginBottom: 18 }}>{section("Compétences")}<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 9.5, padding: "4px 12px", backgroundColor: dark, color: "#fff", borderRadius: 6, fontWeight: 600 }}>{s}</span>)}</div></div>}
            {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 4 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>— {c.issuer}</span></p>)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   9. MINIMAL — Ultra-clean, airy, indigo accent, no decorations
   ════════════════════════════════════════════════════════════════ */
function MinimalTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#6366f1";
  const section = (title: string) => <h2 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 5, color: accent, marginBottom: 14, paddingBottom: 6, borderBottom: `1px solid ${accent}20` }}>{title}</h2>;

  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", padding: "8px 0" }}>
      <div style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 36, fontWeight: 300, color: "#111", margin: 0, letterSpacing: -0.5, lineHeight: 1.1 }}>{p.fullName || "Votre Nom"}</h1>
        <div style={{ width: 40, height: 2, backgroundColor: accent, margin: "12px 0" }} />
        <p style={{ fontSize: 14, color: "#6b7280", fontWeight: 400, letterSpacing: 1 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16, marginTop: 16 }}>
          <ContactItem icon="✉" value={p.email} color="#9ca3af" />
          <ContactItem icon="☎" value={p.phone} color="#9ca3af" />
          <ContactItem icon="⌂" value={p.location} color="#9ca3af" />
          <ContactItem icon="in" value={p.linkedin} color="#9ca3af" />
          <ContactItem icon="⌨" value={p.github} color="#9ca3af" />
        </div>
      </div>

      {p.summary && <div style={{ marginBottom: 28 }}>{section("Profil")}<p style={{ fontSize: 11, color: "#6b7280", lineHeight: 1.85 }}>{p.summary}</p></div>}

      {experiences.length > 0 && (
        <div style={{ marginBottom: 28 }}>{section("Expérience")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 18 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 13, fontWeight: 600, color: "#111", margin: 0 }}>{exp.title}</h3>
                <span style={{ fontSize: 9, color: "#9ca3af", letterSpacing: 0.5 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 10.5, color: accent, fontWeight: 500, margin: "3px 0 6px" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
              {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#6b7280", margin: "3px 0", paddingLeft: 12, borderLeft: `1px solid ${accent}20` }}>{a}</p>)}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && <div style={{ marginBottom: 28 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 8 }}><span style={{ fontSize: 12, fontWeight: 600, color: "#111" }}>{edu.degree}</span><span style={{ fontSize: 10.5, color: "#9ca3af" }}> — {edu.school}, {edu.startDate}–{edu.endDate}</span></div>)}</div>}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}>
        {skills.length > 0 && <div>{section("Compétences")}{skills.map((g, i) => <div key={i} style={{ marginBottom: 8 }}><p style={{ fontSize: 9, fontWeight: 600, color: accent, letterSpacing: 2, textTransform: "uppercase", marginBottom: 3 }}>{g.category}</p><p style={{ fontSize: 10.5, color: "#6b7280", lineHeight: 1.6 }}>{g.items.join(" · ")}</p></div>)}</div>}
        <div>
          {languages.length > 0 && <div style={{ marginBottom: 16 }}>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ fontSize: 10.5, color: "#374151" }}>{l.name}</span><span style={{ fontSize: 10, color: "#9ca3af" }}>{l.level}</span></div>)}</div>}
          {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 4 }}><strong>{c.name}</strong> <span style={{ color: "#9ca3af" }}>· {c.issuer}</span></p>)}</div>}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   10. BERLIN — Split header, Germanic precision, structured
   ════════════════════════════════════════════════════════════════ */
function BerlinTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const navy = "#1e3a5f";
  const blue = "#3b82f6";
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
      <div style={{ width: 20, height: 2, backgroundColor: blue }} />
      <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: navy, margin: 0 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      {/* Split header */}
      <div style={{ display: "flex", marginBottom: 24 }}>
        <div style={{ flex: 1, backgroundColor: navy, padding: "28px 24px", position: "relative" }}>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1.2 }}>{p.fullName || "Votre Nom"}</h1>
          <p style={{ fontSize: 12, color: blue, fontWeight: 600, marginTop: 6, letterSpacing: 1.5, textTransform: "uppercase" }}>{p.title || "Titre"}</p>
          <div style={{ position: "absolute", right: -12, top: "50%", transform: "translateY(-50%)", width: 24, height: 24, backgroundColor: blue, clipPath: "polygon(0 0, 100% 50%, 0 100%)" }} />
        </div>
        <div style={{ width: "38%", backgroundColor: "#f0f4f8", padding: "20px 22px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 6, flexShrink: 0 }}>
          <ContactItem icon="✉" value={p.email} color={navy} />
          <ContactItem icon="☎" value={p.phone} color={navy} />
          <ContactItem icon="⌂" value={p.location} color={navy} />
          <ContactItem icon="in" value={p.linkedin} color={navy} />
          <ContactItem icon="⌨" value={p.github} color={navy} />
        </div>
      </div>

      <div style={{ padding: "0 4px" }}>
        {p.summary && <div style={{ marginBottom: 22 }}>{section("Profil")}<p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.75, paddingLeft: 30 }}>{p.summary}</p></div>}

        {experiences.length > 0 && (
          <div style={{ marginBottom: 22 }}>{section("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ display: "flex", gap: 18, marginBottom: 16, paddingLeft: 30 }}>
                <div style={{ width: 80, flexShrink: 0, textAlign: "right" }}>
                  <p style={{ fontSize: 9, color: blue, fontWeight: 700, margin: 0 }}>{exp.startDate}</p>
                  <p style={{ fontSize: 9, color: "#9ca3af", margin: "1px 0" }}>{exp.current ? "Présent" : exp.endDate}</p>
                </div>
                <div style={{ width: 2, backgroundColor: blue + "30", flexShrink: 0, position: "relative" }}>
                  <div style={{ position: "absolute", top: 2, left: -3, width: 8, height: 8, borderRadius: "50%", backgroundColor: i === 0 ? blue : blue + "40" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: 12.5, fontWeight: 700, color: "#111", margin: 0 }}>{exp.title}</h3>
                  <p style={{ fontSize: 10, color: navy, fontWeight: 600, margin: "2px 0 4px" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
                  {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0" }}>▹ {a}</p>)}
                </div>
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && <div style={{ marginBottom: 22 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ paddingLeft: 30, marginBottom: 8, display: "flex", justifyContent: "space-between" }}><div><strong style={{ fontSize: 11.5 }}>{edu.degree}</strong><span style={{ fontSize: 10, color: "#6b7280" }}> — {edu.school}</span></div><span style={{ fontSize: 9, color: blue }}>{edu.startDate}–{edu.endDate}</span></div>)}</div>}

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, paddingLeft: 30 }}>
          {skills.length > 0 && <div>{section("Compétences")}{skills.map((g, gi) => <div key={gi} style={{ marginBottom: 8 }}><p style={{ fontSize: 9, fontWeight: 700, color: navy, textTransform: "uppercase", letterSpacing: 1, marginBottom: 3 }}>{g.category}</p>{g.items.map((s, si) => <div key={si} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}><div style={{ flex: 1, height: 4, backgroundColor: "#e5e7eb", borderRadius: 2 }}><div style={{ height: 4, backgroundColor: blue, borderRadius: 2, width: `${65 + (si * 8) % 30}%` }} /></div><span style={{ fontSize: 8, color: navy, fontWeight: 600, width: 24, textAlign: "right" }}>{65 + (si * 8) % 30}%</span></div>)}</div>)}</div>}
          <div>
            {languages.length > 0 && <div style={{ marginBottom: 14 }}>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}><span style={{ fontSize: 10.5, fontWeight: 600 }}>{l.name}</span><DotRating level={l.level} accent={blue} /></div>)}</div>}
            {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 3 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>— {c.issuer}</span></p>)}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   11. ARTISAN — Warm terracotta, rounded, handcrafted feel
   ════════════════════════════════════════════════════════════════ */
function ArtisanTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#ea580c";
  const warm = "#fff7ed";
  const section = (title: string) => (
    <div style={{ textAlign: "center", marginBottom: 14 }}>
      <h2 style={{ fontSize: 12, fontWeight: 800, textTransform: "uppercase", letterSpacing: 3, color: accent, margin: 0, display: "inline-block", padding: "4px 20px", backgroundColor: warm, borderRadius: 20, border: `1.5px solid ${accent}25` }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: "'Nunito', system-ui, sans-serif" }}>
      {/* Centered header with decorative elements */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <Initials name={p.fullName} size={70} bg={warm} color={accent} border={`3px solid ${accent}40`} />
        <h1 style={{ fontSize: 28, fontWeight: 800, color: "#292524", margin: "14px 0 0", letterSpacing: 0.5 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 13, color: accent, fontWeight: 600, marginTop: 5 }}>{p.title || "Titre Professionnel"}</p>
        {/* Decorative wave */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, margin: "12px 0" }}>
          <div style={{ width: 30, height: 2, backgroundColor: accent + "40", borderRadius: 2 }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: accent + "20", border: `2px solid ${accent}40` }} />
          <div style={{ width: 30, height: 2, backgroundColor: accent + "40", borderRadius: 2 }} />
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8, marginTop: 8 }}>
          {[p.email && `✉ ${p.email}`, p.phone && `☎ ${p.phone}`, p.location && `⌂ ${p.location}`, p.linkedin, p.github].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: 9.5, color: "#78716c", backgroundColor: warm, padding: "4px 12px", borderRadius: 12, border: "1px solid #fed7aa" }}>{item}</span>
          ))}
        </div>
      </div>

      {p.summary && <div style={{ marginBottom: 22, backgroundColor: warm, padding: "16px 20px", borderRadius: 16, border: `1.5px solid ${accent}15` }}>{section("Profil")}<p style={{ fontSize: 11, color: "#44403c", lineHeight: 1.8, textAlign: "center" }}>{p.summary}</p></div>}

      {experiences.length > 0 && (
        <div style={{ marginBottom: 22 }}>{section("Expérience")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, padding: "14px 18px", backgroundColor: "#fffbeb", borderRadius: 14, border: "1px solid #fde68a50" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: "#292524", margin: 0 }}>{exp.title}</h3>
                <span style={{ fontSize: 9, color: accent, fontWeight: 700, backgroundColor: accent + "12", padding: "2px 10px", borderRadius: 10 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 10, color: accent, fontWeight: 600, margin: "3px 0 5px" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
              {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#57534e", margin: "3px 0" }}>● {a}</p>)}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && <div style={{ marginBottom: 22 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ textAlign: "center", marginBottom: 8 }}><strong style={{ fontSize: 12, color: "#292524" }}>{edu.degree}</strong><p style={{ fontSize: 10, color: "#78716c", margin: "2px 0" }}>{edu.school} · {edu.startDate}–{edu.endDate}</p></div>)}</div>}

      {skills.length > 0 && <div style={{ marginBottom: 22 }}>{section("Compétences")}<div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center" }}>{skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 10.5, padding: "5px 16px", borderRadius: 20, backgroundColor: warm, color: accent, fontWeight: 600, border: `1.5px solid ${accent}30` }}>{s}</span>)}</div></div>}

      <div style={{ display: "flex", justifyContent: "center", gap: 40 }}>
        {languages.length > 0 && <div>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 20, marginBottom: 5 }}><span style={{ fontSize: 10.5, fontWeight: 600 }}>{l.name}</span><DotRating level={l.level} accent={accent} /></div>)}</div>}
        {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 4 }}><strong>{c.name}</strong> <span style={{ color: "#78716c" }}>· {c.issuer}</span></p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   12. LUXE — Navy + gold, right sidebar, prestigious
   ════════════════════════════════════════════════════════════════ */
function LuxeTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const navy = "#1e3a5f";
  const gold = "#c9a84c";
  const mainH = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, paddingBottom: 6 }}>
      <div style={{ width: 8, height: 8, transform: "rotate(45deg)", backgroundColor: gold }} />
      <h2 style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: 3, color: navy, margin: 0, fontFamily: "Georgia, serif" }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${gold}60, transparent)` }} />
    </div>
  );
  const sideH = { fontSize: 9, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 2.5, color: gold, marginBottom: 10, marginTop: 18 };

  return (
    <div style={{ display: "flex", fontFamily: "system-ui, sans-serif", minHeight: "100%" }}>
      {/* Main */}
      <div style={{ flex: 1, padding: "32px 26px 32px 0" }}>
        <div style={{ marginBottom: 24 }}>
          <h1 style={{ fontSize: 30, fontWeight: 300, color: navy, margin: 0, letterSpacing: 4, textTransform: "uppercase", fontFamily: "Georgia, serif" }}>{p.fullName || "Votre Nom"}</h1>
          <div style={{ width: 60, height: 2, background: `linear-gradient(to right, ${gold}, transparent)`, margin: "10px 0" }} />
          <p style={{ fontSize: 13, color: gold, fontStyle: "italic", letterSpacing: 2 }}>{p.title || "Titre Professionnel"}</p>
        </div>

        {p.summary && <div style={{ marginBottom: 24 }}>{mainH("Profil")}<p style={{ fontSize: 11, color: "#374151", lineHeight: 1.8, fontStyle: "italic" }}>{p.summary}</p></div>}

        {experiences.length > 0 && (
          <div style={{ marginBottom: 24 }}>{mainH("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 16, paddingLeft: 16, borderLeft: `2px solid ${gold}40` }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: navy, margin: 0 }}>{exp.title}</h3>
                <p style={{ fontSize: 10, color: gold, fontWeight: 600, margin: "3px 0", fontStyle: "italic" }}>{exp.company}{exp.location ? ` — ${exp.location}` : ""}</p>
                <p style={{ fontSize: 9, color: "#9ca3af", marginBottom: 4 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</p>
                {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0" }}>— {a}</p>)}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && <div style={{ marginBottom: 24 }}>{mainH("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 8, paddingLeft: 16 }}><strong style={{ fontSize: 12, color: navy, fontFamily: "Georgia, serif" }}>{edu.degree}</strong><p style={{ fontSize: 10, color: "#6b7280", margin: "2px 0" }}>{edu.school} · {edu.startDate}–{edu.endDate}</p></div>)}</div>}

        {certifications && certifications.length > 0 && <div>{mainH("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 11, marginBottom: 4, paddingLeft: 16 }}><strong>{c.name}</strong> <span style={{ color: gold }}>— {c.issuer}, {c.date}</span></p>)}</div>}
      </div>

      {/* Right sidebar */}
      <div style={{ width: "33%", backgroundColor: navy, color: "#e2e8f0", padding: "32px 20px", flexShrink: 0, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: `linear-gradient(to right, ${gold}, transparent)` }} />
        <Initials name={p.fullName} size={64} bg={navy} color={gold} border={`2px solid ${gold}50`} />

        <h3 style={sideH}>Contact</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
          <ContactItem icon="✉" value={p.email} color="#94a3b8" />
          <ContactItem icon="☎" value={p.phone} color="#94a3b8" />
          <ContactItem icon="⌂" value={p.location} color="#94a3b8" />
          <ContactItem icon="in" value={p.linkedin} color="#94a3b8" />
          <ContactItem icon="⌨" value={p.github} color="#94a3b8" />
        </div>

        {skills.length > 0 && (<>
          <h3 style={sideH}>Compétences</h3>
          {skills.flatMap(g => g.items).map((s, i) => (
            <div key={i} style={{ marginBottom: 7 }}>
              <span style={{ fontSize: 9, color: "#cbd5e1", fontWeight: 500 }}>{s}</span>
              <div style={{ height: 3, backgroundColor: "#334155", borderRadius: 2, marginTop: 2 }}>
                <div style={{ height: 3, background: `linear-gradient(to right, ${gold}, ${gold}80)`, borderRadius: 2, width: `${70 + (i * 7) % 25}%` }} />
              </div>
            </div>
          ))}
        </>)}

        {languages.length > 0 && (<>
          <h3 style={sideH}>Langues</h3>
          {languages.map((l, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 10, color: "#cbd5e1" }}>{l.name}</span>
              <DotRating level={l.level} accent={gold} />
            </div>
          ))}
        </>)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   13. MOSAIC — Card grid, modular, teal accent
   ════════════════════════════════════════════════════════════════ */
function MosaicTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const teal = "#0d9488";
  const tealLight = "#f0fdfa";
  const card = (children: React.ReactNode, span?: boolean) => (
    <div style={{ backgroundColor: "#fff", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "16px 18px", ...(span ? { gridColumn: "1 / -1" } : {}) }}>{children}</div>
  );
  const section = (title: string) => <h3 style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2.5, color: teal, marginBottom: 10 }}>{title}</h3>;

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", backgroundColor: "#f9fafb", padding: 4, borderRadius: 8 }}>
      {/* Header card */}
      <div style={{ background: `linear-gradient(135deg, ${teal}, #2dd4bf)`, borderRadius: 14, padding: "28px 24px", marginBottom: 10, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -20, right: -20, width: 100, height: 100, borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.08)" }} />
        <div style={{ display: "flex", alignItems: "center", gap: 18, position: "relative" }}>
          <Initials name={p.fullName} size={56} bg="rgba(255,255,255,0.15)" color="#fff" border="2px solid rgba(255,255,255,0.3)" />
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: "#fff", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 500 }}>{p.title || "Titre Professionnel"}</p>
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 14 }}>
          {[p.email && `✉ ${p.email}`, p.phone && `☎ ${p.phone}`, p.location && `⌂ ${p.location}`, p.linkedin, p.github].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: 9, color: "#fff", backgroundColor: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 10 }}>{item}</span>
          ))}
        </div>
      </div>

      {/* Grid of cards */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {p.summary && card(<>{section("Profil")}<p style={{ fontSize: 10.5, color: "#4b5563", lineHeight: 1.75 }}>{p.summary}</p></>, true)}

        {experiences.length > 0 && card(<>{section("Expérience")}{experiences.map((exp, i) => (
          <div key={i} style={{ marginBottom: 12, paddingBottom: 10, borderBottom: i < experiences.length - 1 ? "1px solid #f3f4f6" : "none" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
              <h4 style={{ fontSize: 11.5, fontWeight: 700, color: "#111", margin: 0 }}>{exp.title}</h4>
              <span style={{ fontSize: 8.5, color: teal, fontWeight: 700 }}>{exp.startDate}–{exp.current ? "Auj." : exp.endDate}</span>
            </div>
            <p style={{ fontSize: 9.5, color: teal, fontWeight: 600, margin: "2px 0 4px" }}>{exp.company}</p>
            {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 9.5, color: "#6b7280", margin: "2px 0" }}>• {a}</p>)}
          </div>
        ))}</>, true)}

        {education.length > 0 && card(<>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 6 }}><strong style={{ fontSize: 10.5 }}>{edu.degree}</strong><p style={{ fontSize: 9.5, color: "#6b7280", margin: "1px 0" }}>{edu.school} ({edu.endDate})</p></div>)}</>)}

        {skills.length > 0 && card(<>{section("Compétences")}<div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 9.5, padding: "3px 10px", backgroundColor: tealLight, color: teal, borderRadius: 8, fontWeight: 600, border: `1px solid ${teal}20` }}>{s}</span>)}</div></>)}

        {languages.length > 0 && card(<>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}><span style={{ fontSize: 10.5, fontWeight: 600 }}>{l.name}</span><DotRating level={l.level} accent={teal} /></div>)}</>)}

        {certifications && certifications.length > 0 && card(<>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 3 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>· {c.issuer}</span></p>)}</>)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   14. AURORA — Teal→purple gradient, glassmorphism, trendy
   ════════════════════════════════════════════════════════════════ */
function AuroraTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const purple = "#8b5cf6";
  const teal = "#06b6d4";
  const glass = { backgroundColor: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", borderRadius: 14, padding: "14px 18px", border: "1px solid rgba(255,255,255,0.3)", marginBottom: 10 };
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 6, height: 6, borderRadius: "50%", background: `linear-gradient(135deg, ${teal}, ${purple})` }} />
      <h2 style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: 2, color: purple, margin: 0 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${purple}30, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", background: "linear-gradient(135deg, #f0fdfa 0%, #ede9fe 50%, #fdf4ff 100%)", minHeight: "100%", padding: 6, borderRadius: 8 }}>
      {/* Gradient header */}
      <div style={{ background: `linear-gradient(135deg, ${teal}, ${purple})`, borderRadius: 16, padding: "32px 28px", marginBottom: 12, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: -40, left: "30%", width: 160, height: 160, borderRadius: "50%", background: "rgba(255,255,255,0.05)" }} />
        <div style={{ position: "relative" }}>
          <Initials name={p.fullName} size={52} bg="rgba(255,255,255,0.15)" color="#fff" border="2px solid rgba(255,255,255,0.3)" />
          <h1 style={{ fontSize: 28, fontWeight: 800, color: "#fff", margin: "10px 0 0", letterSpacing: 0.5 }}>{p.fullName || "Votre Nom"}</h1>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 500 }}>{p.title || "Titre Professionnel"}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
            <ContactItem icon="✉" value={p.email} color="rgba(255,255,255,0.8)" />
            <ContactItem icon="☎" value={p.phone} color="rgba(255,255,255,0.8)" />
            <ContactItem icon="⌂" value={p.location} color="rgba(255,255,255,0.8)" />
            <ContactItem icon="in" value={p.linkedin} color="rgba(255,255,255,0.8)" />
            <ContactItem icon="⌨" value={p.github} color="rgba(255,255,255,0.8)" />
          </div>
        </div>
      </div>

      {/* Glassmorphism cards */}
      {p.summary && <div style={glass}>{section("Profil")}<p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.8 }}>{p.summary}</p></div>}

      {experiences.length > 0 && (
        <div style={glass}>{section("Expérience")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 14, paddingLeft: 14, borderLeft: `3px solid ${i === 0 ? purple : purple + "30"}`, position: "relative" }}>
              <div style={{ position: "absolute", left: -6, top: 4, width: 9, height: 9, borderRadius: "50%", background: `linear-gradient(135deg, ${teal}, ${purple})`, border: "2px solid white" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 12.5, fontWeight: 700, color: "#111", margin: 0 }}>{exp.title}</h3>
                <span style={{ fontSize: 9, color: purple, fontWeight: 700, background: `linear-gradient(135deg, ${teal}15, ${purple}15)`, padding: "2px 10px", borderRadius: 8 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 10, color: purple, fontWeight: 600, margin: "3px 0 4px" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
              {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0" }}>→ {a}</p>)}
            </div>
          ))}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        {education.length > 0 && <div style={glass}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 6 }}><strong style={{ fontSize: 11 }}>{edu.degree}</strong><p style={{ fontSize: 10, color: "#6b7280", margin: "1px 0" }}>{edu.school} · {edu.endDate}</p></div>)}</div>}

        {skills.length > 0 && <div style={glass}>{section("Compétences")}<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 10, padding: "4px 12px", borderRadius: 16, background: `linear-gradient(135deg, ${teal}15, ${purple}15)`, color: purple, fontWeight: 600, border: `1px solid ${purple}20` }}>{s}</span>)}</div></div>}

        {languages.length > 0 && <div style={glass}>{section("Langues")}{languages.map((l, i) => <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}><span style={{ fontSize: 10.5, fontWeight: 600 }}>{l.name}</span><DotRating level={l.level} accent={purple} /></div>)}</div>}

        {certifications && certifications.length > 0 && <div style={glass}>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10.5, marginBottom: 3 }}><strong>{c.name}</strong> <span style={{ color: "#6b7280" }}>· {c.issuer}</span></p>)}</div>}
      </div>
    </div>
  );
}

/* ─── Template map ─── */
const templateRenderers: Record<string, React.FC<{ data: CVData }>> = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  executive: ExecutiveTemplate,
  creative: CreativeTemplate,
  compact: CompactTemplate,
  minimal: MinimalTemplate,
  berlin: BerlinTemplate,
  artisan: ArtisanTemplate,
  elegant: ElegantTemplate,
  tech: TechTemplate,
  impact: ImpactTemplate,
  luxe: LuxeTemplate,
  mosaic: MosaicTemplate,
  aurora: AuroraTemplate,
};

/* ─── Main Preview Component ─── */
export default function CVPreview({ data, template }: CVPreviewProps) {
  const hasContent = data.personalInfo.fullName || data.personalInfo.title || data.personalInfo.summary;

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📄</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Aperçu en direct</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Répondez aux questions du chat pour voir votre CV se construire en temps réel ici.
          </p>
        </div>
      </div>
    );
  }

  const Renderer = templateRenderers[template] || ModernTemplate;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full overflow-y-auto">
      <div
        id="cv-preview-content"
        className="bg-white text-gray-900 shadow-xl mx-auto max-w-[210mm] min-h-[297mm]"
        style={{ padding: ["executive", "tech", "luxe", "mosaic", "aurora", "berlin"].includes(template) ? 0 : "32px 36px" }}
      >
        <Renderer data={data} />
      </div>
    </motion.div>
  );
}

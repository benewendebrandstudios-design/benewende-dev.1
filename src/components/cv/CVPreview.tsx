"use client";

import React from "react";
import { motion } from "framer-motion";
import { CVData } from "@/lib/cv/templates";

interface CVPreviewProps {
  data: CVData;
  template: string;
}

/* ─── Shared contact line ─── */
function ContactLine({ info, separator = " | " }: { info: CVData["personalInfo"]; separator?: string }) {
  const items = [info.email, info.phone, info.location, info.linkedin, info.github, info.website].filter(Boolean);
  if (!items.length) return null;
  return <p style={{ fontSize: 10, color: "#6b7280" }}>{items.join(separator)}</p>;
}

/* ─── Shared contact line (vertical) ─── */
function ContactLineVertical({ info, color = "#d1d5db" }: { info: CVData["personalInfo"]; color?: string }) {
  const items = [
    info.email && `✉ ${info.email}`,
    info.phone && `☎ ${info.phone}`,
    info.location && `⌂ ${info.location}`,
    info.linkedin && `in ${info.linkedin}`,
    info.github && `⌨ ${info.github}`,
    info.website && `⊕ ${info.website}`,
  ].filter(Boolean);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {items.map((item, i) => (
        <span key={i} style={{ fontSize: 9, color }}>{item}</span>
      ))}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   1. CLASSIC — Traditional, single-column, serif headings
   ════════════════════════════════════════════════════════════════ */
function ClassicTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const h2 = { fontSize: 13, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 2, borderBottom: "2px solid #1e293b", paddingBottom: 4, marginBottom: 10, color: "#1e293b", fontFamily: "Georgia, serif" };

  return (
    <div style={{ fontFamily: "'Times New Roman', Georgia, serif" }}>
      <div style={{ textAlign: "center", marginBottom: 20, paddingBottom: 16, borderBottom: "3px double #1e293b" }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, color: "#1e293b", letterSpacing: 3, textTransform: "uppercase", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 14, color: "#64748b", marginTop: 4, fontStyle: "italic" }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ marginTop: 8 }}><ContactLine info={p} separator="  •  " /></div>
      </div>
      {p.summary && <div style={{ marginBottom: 16 }}><h2 style={h2}>Profil</h2><p style={{ fontSize: 11, color: "#374151", lineHeight: 1.6 }}>{p.summary}</p></div>}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 16 }}><h2 style={h2}>Expérience Professionnelle</h2>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div><strong style={{ fontSize: 12 }}>{exp.title}</strong><span style={{ fontSize: 11, color: "#6b7280" }}> — {exp.company}{exp.location ? `, ${exp.location}` : ""}</span></div>
                <span style={{ fontSize: 10, color: "#9ca3af", whiteSpace: "nowrap" }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              {exp.description && <p style={{ fontSize: 10, color: "#4b5563", marginTop: 2 }}>{exp.description}</p>}
              {exp.achievements.length > 0 && <ul style={{ margin: "2px 0 0 14px", padding: 0 }}>{exp.achievements.map((a, j) => <li key={j} style={{ fontSize: 10, color: "#4b5563" }}>{a}</li>)}</ul>}
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div style={{ marginBottom: 16 }}><h2 style={h2}>Formation</h2>
          {education.map((edu, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <div><strong style={{ fontSize: 12 }}>{edu.degree}</strong><span style={{ fontSize: 11, color: "#6b7280" }}> — {edu.school}</span></div>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div style={{ marginBottom: 16 }}><h2 style={h2}>Compétences</h2>
          {skills.map((g, i) => <p key={i} style={{ fontSize: 11, marginBottom: 3 }}><strong>{g.category}:</strong> {g.items.join(", ")}</p>)}
        </div>
      )}
      {languages.length > 0 && <div style={{ marginBottom: 16 }}><h2 style={h2}>Langues</h2><p style={{ fontSize: 11 }}>{languages.map(l => `${l.name} (${l.level})`).join("  •  ")}</p></div>}
      {certifications && certifications.length > 0 && <div><h2 style={h2}>Certifications</h2>{certifications.map((c, i) => <p key={i} style={{ fontSize: 11 }}><strong>{c.name}</strong> — {c.issuer}, {c.date}</p>)}</div>}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   2. MODERN — Blue accent left border, clean sans-serif
   ════════════════════════════════════════════════════════════════ */
function ModernTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#2563eb";
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 4, height: 20, backgroundColor: accent, borderRadius: 2 }} />
      <h2 style={{ fontSize: 13, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.5, color: accent, margin: 0 }}>{title}</h2>
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, color: "#111827", margin: 0, lineHeight: 1.1 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 15, color: accent, fontWeight: 500, marginTop: 4 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 10 }}>
          {[p.email, p.phone, p.location, p.linkedin, p.github].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: 10, color: "#6b7280", padding: "2px 8px", backgroundColor: "#f3f4f6", borderRadius: 4 }}>{item}</span>
          ))}
        </div>
      </div>
      <div style={{ width: "100%", height: 1, backgroundColor: "#e5e7eb", marginBottom: 16 }} />
      {p.summary && <div style={{ marginBottom: 20 }}>{section("Profil")}<p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.7, paddingLeft: 12 }}>{p.summary}</p></div>}
      {experiences.length > 0 && (
        <div style={{ marginBottom: 20 }}>{section("Expérience")}
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12, paddingLeft: 12, borderLeft: "2px solid #e5e7eb" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#111827", margin: 0 }}>{exp.title}</h3>
                <span style={{ fontSize: 10, color: "#9ca3af" }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
              </div>
              <p style={{ fontSize: 10, color: accent, fontWeight: 500, margin: "1px 0" }}>{exp.company}{exp.location ? ` · ${exp.location}` : ""}</p>
              {exp.achievements.length > 0 && exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0", paddingLeft: 8 }}>→ {a}</p>)}
            </div>
          ))}
        </div>
      )}
      {education.length > 0 && (
        <div style={{ marginBottom: 20 }}>{section("Formation")}
          {education.map((edu, i) => (
            <div key={i} style={{ paddingLeft: 12, marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
              <div><strong style={{ fontSize: 12, color: "#111827" }}>{edu.degree}</strong><span style={{ fontSize: 10, color: "#6b7280" }}> — {edu.school}</span></div>
              <span style={{ fontSize: 10, color: "#9ca3af" }}>{edu.startDate} – {edu.endDate}</span>
            </div>
          ))}
        </div>
      )}
      {skills.length > 0 && (
        <div style={{ marginBottom: 20 }}>{section("Compétences")}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 12 }}>
            {skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 10, padding: "3px 10px", borderRadius: 20, backgroundColor: "#eff6ff", color: accent, fontWeight: 500 }}>{s}</span>)}
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 40, paddingLeft: 12 }}>
        {languages.length > 0 && <div>{section("Langues")}{languages.map((l, i) => <p key={i} style={{ fontSize: 10, margin: "2px 0 2px 12px" }}><strong>{l.name}</strong> — {l.level}</p>)}</div>}
        {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, margin: "2px 0 2px 12px" }}><strong>{c.name}</strong> · {c.issuer}</p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   3. EXECUTIVE — Dark sidebar left, main content right
   ════════════════════════════════════════════════════════════════ */
function ExecutiveTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const dark = "#0f172a";
  const sideH = { fontSize: 11, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 2, color: "#94a3b8", marginBottom: 8, marginTop: 16 };
  const mainH = { fontSize: 13, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 1.5, color: dark, borderBottom: `2px solid ${dark}`, paddingBottom: 4, marginBottom: 10 };

  return (
    <div style={{ display: "flex", fontFamily: "system-ui, sans-serif", minHeight: "100%" }}>
      {/* Sidebar */}
      <div style={{ width: "34%", backgroundColor: dark, color: "#e2e8f0", padding: "28px 20px", flexShrink: 0 }}>
        <div style={{ width: 60, height: 60, borderRadius: "50%", backgroundColor: "#1e293b", border: "2px solid #334155", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px", fontSize: 24, fontWeight: 700, color: "#94a3b8" }}>
          {(p.fullName || "V")[0]}
        </div>
        <h1 style={{ fontSize: 16, fontWeight: 700, textAlign: "center", color: "#f1f5f9", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 10, textAlign: "center", color: "#94a3b8", marginTop: 2 }}>{p.title || "Titre"}</p>
        <div style={{ width: 30, height: 2, backgroundColor: "#334155", margin: "12px auto" }} />
        <h3 style={sideH}>Contact</h3>
        <ContactLineVertical info={p} color="#94a3b8" />
        {skills.length > 0 && (<>
          <h3 style={sideH}>Compétences</h3>
          {skills.flatMap(g => g.items).map((s, i) => (
            <div key={i} style={{ marginBottom: 5 }}>
              <p style={{ fontSize: 9, color: "#cbd5e1", marginBottom: 2 }}>{s}</p>
              <div style={{ height: 3, backgroundColor: "#1e293b", borderRadius: 2 }}><div style={{ height: 3, backgroundColor: "#3b82f6", borderRadius: 2, width: `${70 + Math.random() * 25}%` }} /></div>
            </div>
          ))}
        </>)}
        {languages.length > 0 && (<>
          <h3 style={sideH}>Langues</h3>
          {languages.map((l, i) => <p key={i} style={{ fontSize: 10, color: "#cbd5e1", marginBottom: 3 }}>{l.name} <span style={{ color: "#64748b" }}>— {l.level}</span></p>)}
        </>)}
      </div>
      {/* Main */}
      <div style={{ flex: 1, padding: "28px 24px" }}>
        {p.summary && <div style={{ marginBottom: 20 }}><h2 style={mainH}>Profil</h2><p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.7 }}>{p.summary}</p></div>}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 20 }}><h2 style={mainH}>Expérience</h2>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <h3 style={{ fontSize: 12, fontWeight: 700, margin: 0, color: "#111827" }}>{exp.title}</h3>
                  <span style={{ fontSize: 9, color: "#9ca3af", whiteSpace: "nowrap" }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                </div>
                <p style={{ fontSize: 10, color: "#6b7280", fontWeight: 600 }}>{exp.company}</p>
                {exp.achievements.length > 0 && exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "1px 0", paddingLeft: 8 }}>▸ {a}</p>)}
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && (
          <div style={{ marginBottom: 20 }}><h2 style={mainH}>Formation</h2>
            {education.map((edu, i) => (
              <div key={i} style={{ marginBottom: 6, display: "flex", justifyContent: "space-between" }}>
                <div><strong style={{ fontSize: 12 }}>{edu.degree}</strong><br /><span style={{ fontSize: 10, color: "#6b7280" }}>{edu.school}</span></div>
                <span style={{ fontSize: 9, color: "#9ca3af" }}>{edu.startDate} – {edu.endDate}</span>
              </div>
            ))}
          </div>
        )}
        {certifications && certifications.length > 0 && <div><h2 style={mainH}>Certifications</h2>{certifications.map((c, i) => <p key={i} style={{ fontSize: 11, marginBottom: 3 }}><strong>{c.name}</strong> — {c.issuer}, {c.date}</p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   4. CREATIVE — Gradient header, colorful, bold
   ════════════════════════════════════════════════════════════════ */
function CreativeTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#7c3aed";
  const section = (title: string) => (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: `linear-gradient(135deg, ${accent}, #ec4899)` }} />
      <h2 style={{ fontSize: 14, fontWeight: 800, color: accent, margin: 0, textTransform: "uppercase", letterSpacing: 1 }}>{title}</h2>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${accent}33, transparent)` }} />
    </div>
  );

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ background: `linear-gradient(135deg, ${accent}, #ec4899)`, padding: "32px 28px", marginBottom: 20, borderRadius: "0 0 20px 20px" }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, color: "#fff", margin: 0, letterSpacing: 1 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", marginTop: 4, fontWeight: 500 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
          {[p.email, p.phone, p.location].filter(Boolean).map((item, i) => (
            <span key={i} style={{ fontSize: 10, color: "#fff", backgroundColor: "rgba(255,255,255,0.15)", padding: "3px 10px", borderRadius: 12 }}>{item}</span>
          ))}
        </div>
      </div>
      <div style={{ padding: "0 8px" }}>
        {p.summary && <div style={{ marginBottom: 20, backgroundColor: "#faf5ff", padding: 14, borderRadius: 12, borderLeft: `3px solid ${accent}` }}>{section("Profil")}<p style={{ fontSize: 11, color: "#4b5563", lineHeight: 1.7 }}>{p.summary}</p></div>}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 20 }}>{section("Expérience")}
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 14, padding: "10px 14px", backgroundColor: "#faf5ff", borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontSize: 12, fontWeight: 700, color: "#111", margin: 0 }}>{exp.title}</h3>
                  <span style={{ fontSize: 9, color: accent, fontWeight: 600 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                </div>
                <p style={{ fontSize: 10, color: "#7c3aed", fontWeight: 600, margin: "2px 0" }}>{exp.company}</p>
                {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0" }}>✦ {a}</p>)}
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && <div style={{ marginBottom: 20 }}>{section("Formation")}{education.map((edu, i) => <div key={i} style={{ marginBottom: 6, paddingLeft: 16 }}><strong style={{ fontSize: 12, color: "#111" }}>{edu.degree}</strong><p style={{ fontSize: 10, color: "#6b7280", margin: 0 }}>{edu.school} · {edu.startDate} – {edu.endDate}</p></div>)}</div>}
        {skills.length > 0 && <div style={{ marginBottom: 20 }}>{section("Compétences")}<div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 10, padding: "4px 12px", borderRadius: 20, background: `linear-gradient(135deg, ${accent}15, #ec489915)`, color: accent, fontWeight: 600, border: `1px solid ${accent}30` }}>{s}</span>)}</div></div>}
        <div style={{ display: "flex", gap: 30 }}>
          {languages.length > 0 && <div>{section("Langues")}{languages.map((l, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2 }}><strong>{l.name}</strong> — {l.level}</p>)}</div>}
          {certifications && certifications.length > 0 && <div>{section("Certifications")}{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2 }}><strong>{c.name}</strong> · {c.issuer}</p>)}</div>}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   5. COMPACT — Two-column dense, ATS-optimized, green
   ════════════════════════════════════════════════════════════════ */
function CompactTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#059669";
  const h2 = { fontSize: 11, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 1.5, color: accent, borderBottom: `1.5px solid ${accent}`, paddingBottom: 3, marginBottom: 6 };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 10 }}>
      <div style={{ textAlign: "center", borderBottom: `2px solid ${accent}`, paddingBottom: 10, marginBottom: 12 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: "#111", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
        <p style={{ fontSize: 12, color: accent, fontWeight: 600, margin: "2px 0 6px" }}>{p.title}</p>
        <ContactLine info={p} separator="  |  " />
      </div>
      {p.summary && <p style={{ fontSize: 10, color: "#4b5563", lineHeight: 1.6, marginBottom: 12, textAlign: "justify" }}>{p.summary}</p>}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
        <div>
          {experiences.length > 0 && (
            <div style={{ marginBottom: 12 }}><h2 style={h2}>Expérience</h2>
              {experiences.map((exp, i) => (
                <div key={i} style={{ marginBottom: 8 }}>
                  <strong style={{ fontSize: 10 }}>{exp.title}</strong> <span style={{ color: "#6b7280" }}>— {exp.company}</span>
                  <span style={{ float: "right", fontSize: 9, color: "#9ca3af" }}>{exp.startDate}–{exp.current ? "Auj." : exp.endDate}</span>
                  {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 9, margin: "1px 0 1px 8px", color: "#4b5563" }}>• {a}</p>)}
                </div>
              ))}
            </div>
          )}
          {education.length > 0 && (
            <div><h2 style={h2}>Formation</h2>
              {education.map((edu, i) => <p key={i} style={{ marginBottom: 3 }}><strong>{edu.degree}</strong> — {edu.school} <span style={{ color: "#9ca3af" }}>({edu.startDate}–{edu.endDate})</span></p>)}
            </div>
          )}
        </div>
        <div>
          {skills.length > 0 && (
            <div style={{ marginBottom: 12 }}><h2 style={h2}>Compétences</h2>
              {skills.map((g, i) => <div key={i} style={{ marginBottom: 4 }}><strong style={{ fontSize: 9, color: accent }}>{g.category}</strong><p style={{ fontSize: 9, color: "#374151", margin: "1px 0" }}>{g.items.join(" · ")}</p></div>)}
            </div>
          )}
          {languages.length > 0 && <div style={{ marginBottom: 12 }}><h2 style={h2}>Langues</h2>{languages.map((l, i) => <p key={i} style={{ fontSize: 9, marginBottom: 2 }}><strong>{l.name}</strong> — {l.level}</p>)}</div>}
          {certifications && certifications.length > 0 && <div><h2 style={h2}>Certifications</h2>{certifications.map((c, i) => <p key={i} style={{ fontSize: 9, marginBottom: 2 }}><strong>{c.name}</strong> — {c.issuer}</p>)}</div>}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   6. ELEGANT — Serif, gold accents, sophisticated
   ════════════════════════════════════════════════════════════════ */
function ElegantTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const gold = "#b45309";
  const h2 = { fontSize: 12, fontWeight: 600 as const, textTransform: "uppercase" as const, letterSpacing: 3, color: gold, textAlign: "center" as const, marginBottom: 8 };
  const divider = <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0 10px" }}><div style={{ flex: 1, height: 0.5, backgroundColor: gold + "40" }} /><div style={{ width: 6, height: 6, transform: "rotate(45deg)", backgroundColor: gold }} /><div style={{ flex: 1, height: 0.5, backgroundColor: gold + "40" }} /></div>;

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", padding: "0 10px" }}>
      <div style={{ textAlign: "center", marginBottom: 10 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 8 }}><div style={{ width: 40, height: 0.5, backgroundColor: gold }} /><h1 style={{ fontSize: 26, fontWeight: 400, color: "#1c1917", letterSpacing: 6, textTransform: "uppercase", margin: 0 }}>{p.fullName || "Votre Nom"}</h1><div style={{ width: 40, height: 0.5, backgroundColor: gold }} /></div>
        <p style={{ fontSize: 13, color: gold, fontStyle: "italic", letterSpacing: 2 }}>{p.title || "Titre Professionnel"}</p>
        <div style={{ marginTop: 10 }}><ContactLine info={p} separator="   ✦   " /></div>
      </div>
      {p.summary && <>{divider}<div style={{ marginBottom: 4 }}><h2 style={h2}>Profil</h2><p style={{ fontSize: 11, color: "#44403c", lineHeight: 1.8, textAlign: "center", fontStyle: "italic" }}>{p.summary}</p></div></>}
      {experiences.length > 0 && (
        <>{divider}<div><h2 style={h2}>Expérience</h2>
          {experiences.map((exp, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ textAlign: "center" }}>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#1c1917", margin: 0 }}>{exp.title}</h3>
                <p style={{ fontSize: 10, color: gold, fontStyle: "italic" }}>{exp.company}{exp.location ? ` — ${exp.location}` : ""} | {exp.startDate} – {exp.current ? "Présent" : exp.endDate}</p>
              </div>
              {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#44403c", textAlign: "center", margin: "2px 0" }}>— {a}</p>)}
            </div>
          ))}
        </div></>
      )}
      {education.length > 0 && <>{divider}<div><h2 style={h2}>Formation</h2>{education.map((edu, i) => <p key={i} style={{ fontSize: 11, textAlign: "center", marginBottom: 4 }}><strong>{edu.degree}</strong> <span style={{ color: "#78716c" }}>— {edu.school}, {edu.startDate}–{edu.endDate}</span></p>)}</div></>}
      {skills.length > 0 && <>{divider}<div><h2 style={h2}>Compétences</h2><p style={{ textAlign: "center", fontSize: 11, color: "#44403c" }}>{skills.flatMap(g => g.items).join("  ·  ")}</p></div></>}
      <div style={{ display: "flex", justifyContent: "center", gap: 40, marginTop: 14 }}>
        {languages.length > 0 && <div><h2 style={{ ...h2, textAlign: "left" }}>Langues</h2>{languages.map((l, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2 }}>{l.name} — <em>{l.level}</em></p>)}</div>}
        {certifications && certifications.length > 0 && <div><h2 style={{ ...h2, textAlign: "left" }}>Certifications</h2>{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2 }}>{c.name} — <em>{c.issuer}</em></p>)}</div>}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   7. TECH — Dark header, skill bars, developer-focused
   ════════════════════════════════════════════════════════════════ */
function TechTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const accent = "#0ea5e9";
  const dark = "#0c4a6e";
  const h2 = { fontSize: 12, fontWeight: 700 as const, textTransform: "uppercase" as const, letterSpacing: 1, color: dark, marginBottom: 8, display: "flex" as const, alignItems: "center" as const, gap: 6 };

  return (
    <div style={{ fontFamily: "'SF Mono', 'Fira Code', Consolas, monospace", display: "flex", minHeight: "100%" }}>
      {/* Main content */}
      <div style={{ flex: 1, paddingRight: 20 }}>
        <div style={{ background: `linear-gradient(135deg, ${dark}, #164e63)`, padding: "24px 20px", marginBottom: 16, borderRadius: "0 0 12px 0" }}>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: "#fff", margin: 0 }}>{p.fullName || "Votre Nom"}</h1>
          <p style={{ fontSize: 12, color: accent, fontFamily: "monospace", marginTop: 4 }}>{">"} {p.title || "Titre"}</p>
        </div>
        {p.summary && <div style={{ marginBottom: 16 }}><h2 style={h2}><span style={{ color: accent }}>{'#'}</span> À propos</h2><p style={{ fontSize: 10, color: "#4b5563", lineHeight: 1.7, fontFamily: "system-ui, sans-serif" }}>{p.summary}</p></div>}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 16 }}><h2 style={h2}><span style={{ color: accent }}>{'#'}</span> Expérience</h2>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 12, borderLeft: `2px solid ${accent}`, paddingLeft: 12 }}>
                <h3 style={{ fontSize: 11, fontWeight: 700, margin: 0, fontFamily: "system-ui" }}>{exp.title}</h3>
                <p style={{ fontSize: 9, color: accent }}>{exp.company} <span style={{ color: "#9ca3af" }}>| {exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span></p>
                {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 9, color: "#4b5563", margin: "1px 0", fontFamily: "system-ui" }}>→ {a}</p>)}
              </div>
            ))}
          </div>
        )}
        {education.length > 0 && <div style={{ marginBottom: 16 }}><h2 style={h2}><span style={{ color: accent }}>{'#'}</span> Formation</h2>{education.map((edu, i) => <p key={i} style={{ fontSize: 10, marginBottom: 4, fontFamily: "system-ui" }}><strong>{edu.degree}</strong> — {edu.school} <span style={{ color: "#9ca3af" }}>({edu.endDate})</span></p>)}</div>}
        {certifications && certifications.length > 0 && <div><h2 style={h2}><span style={{ color: accent }}>{'#'}</span> Certifications</h2>{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2, fontFamily: "system-ui" }}><strong>{c.name}</strong> — {c.issuer}</p>)}</div>}
      </div>
      {/* Right sidebar */}
      <div style={{ width: "30%", backgroundColor: "#f0f9ff", padding: "20px 16px", borderLeft: `2px solid ${accent}20` }}>
        <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: dark, marginBottom: 8 }}>Contact</h3>
        <ContactLineVertical info={p} color="#0c4a6e" />
        {skills.length > 0 && (<>
          <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: dark, marginTop: 16, marginBottom: 8 }}>Stack Tech</h3>
          {skills.flatMap(g => g.items).map((s, i) => (
            <div key={i} style={{ marginBottom: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}><span style={{ fontSize: 9, color: dark, fontWeight: 600 }}>{s}</span></div>
              <div style={{ height: 4, backgroundColor: "#e0f2fe", borderRadius: 2 }}><div style={{ height: 4, backgroundColor: accent, borderRadius: 2, width: `${65 + (i * 7) % 30}%` }} /></div>
            </div>
          ))}
        </>)}
        {languages.length > 0 && (<>
          <h3 style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: dark, marginTop: 16, marginBottom: 8 }}>Langues</h3>
          {languages.map((l, i) => <p key={i} style={{ fontSize: 9, marginBottom: 3, color: dark }}>{l.name} <span style={{ color: "#6b7280" }}>— {l.level}</span></p>)}
        </>)}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   8. IMPACT — Full-width header, bold typography, red+black
   ════════════════════════════════════════════════════════════════ */
function ImpactTemplate({ data }: { data: CVData }) {
  const { personalInfo: p, experiences, education, skills, languages, certifications } = data;
  const red = "#dc2626";
  const h2 = { fontSize: 14, fontWeight: 900 as const, textTransform: "uppercase" as const, letterSpacing: 2, color: "#18181b", margin: "0 0 8px 0", position: "relative" as const, paddingBottom: 6 };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif" }}>
      <div style={{ backgroundColor: "#18181b", padding: "32px 28px 24px", marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <div style={{ width: 40, height: 4, backgroundColor: red, marginBottom: 10, borderRadius: 2 }} />
            <h1 style={{ fontSize: 32, fontWeight: 900, color: "#fff", margin: 0, lineHeight: 1 }}>{p.fullName || "VOTRE NOM"}</h1>
            <p style={{ fontSize: 14, color: red, fontWeight: 700, marginTop: 6, textTransform: "uppercase", letterSpacing: 3 }}>{p.title || "TITRE"}</p>
          </div>
          <div style={{ textAlign: "right" }}>
            {[p.email, p.phone, p.location].filter(Boolean).map((item, i) => <p key={i} style={{ fontSize: 9, color: "#a1a1aa", margin: "2px 0" }}>{item}</p>)}
          </div>
        </div>
      </div>
      <div style={{ padding: "0 8px" }}>
        {p.summary && <div style={{ marginBottom: 20, padding: "12px 16px", borderLeft: `4px solid ${red}`, backgroundColor: "#fef2f2" }}><p style={{ fontSize: 11, color: "#374151", lineHeight: 1.7, margin: 0 }}>{p.summary}</p></div>}
        {experiences.length > 0 && (
          <div style={{ marginBottom: 20 }}>
            <h2 style={h2}>Expérience<div style={{ position: "absolute", bottom: 0, left: 0, width: 40, height: 3, backgroundColor: red, borderRadius: 2 }} /></h2>
            {experiences.map((exp, i) => (
              <div key={i} style={{ marginBottom: 14, display: "flex", gap: 14 }}>
                <div style={{ width: 3, backgroundColor: i === 0 ? red : "#e5e7eb", borderRadius: 2, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                    <h3 style={{ fontSize: 13, fontWeight: 800, color: "#18181b", margin: 0 }}>{exp.title}</h3>
                    <span style={{ fontSize: 9, color: "#9ca3af", fontWeight: 600 }}>{exp.startDate} – {exp.current ? "Présent" : exp.endDate}</span>
                  </div>
                  <p style={{ fontSize: 10, color: red, fontWeight: 700, margin: "1px 0" }}>{exp.company}</p>
                  {exp.achievements.map((a, j) => <p key={j} style={{ fontSize: 10, color: "#4b5563", margin: "2px 0" }}>■ {a}</p>)}
                </div>
              </div>
            ))}
          </div>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div>
            {education.length > 0 && <div style={{ marginBottom: 16 }}><h2 style={{ ...h2, fontSize: 12 }}>Formation<div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, backgroundColor: red }} /></h2>{education.map((edu, i) => <div key={i} style={{ marginBottom: 6 }}><strong style={{ fontSize: 11 }}>{edu.degree}</strong><p style={{ fontSize: 9, color: "#6b7280", margin: 0 }}>{edu.school} · {edu.endDate}</p></div>)}</div>}
            {languages.length > 0 && <div><h2 style={{ ...h2, fontSize: 12 }}>Langues<div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, backgroundColor: red }} /></h2>{languages.map((l, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2 }}><strong>{l.name}</strong> — {l.level}</p>)}</div>}
          </div>
          <div>
            {skills.length > 0 && <div style={{ marginBottom: 16 }}><h2 style={{ ...h2, fontSize: 12 }}>Compétences<div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, backgroundColor: red }} /></h2><div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>{skills.flatMap(g => g.items).map((s, i) => <span key={i} style={{ fontSize: 9, padding: "3px 10px", backgroundColor: "#18181b", color: "#fff", borderRadius: 4, fontWeight: 600 }}>{s}</span>)}</div></div>}
            {certifications && certifications.length > 0 && <div><h2 style={{ ...h2, fontSize: 12 }}>Certifications<div style={{ position: "absolute", bottom: 0, left: 0, width: 30, height: 2, backgroundColor: red }} /></h2>{certifications.map((c, i) => <p key={i} style={{ fontSize: 10, marginBottom: 2 }}><strong>{c.name}</strong> — {c.issuer}</p>)}</div>}
          </div>
        </div>
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
  elegant: ElegantTemplate,
  tech: TechTemplate,
  impact: ImpactTemplate,
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
        style={{ padding: template === "executive" || template === "tech" ? 0 : "32px 36px" }}
      >
        <Renderer data={data} />
      </div>
    </motion.div>
  );
}

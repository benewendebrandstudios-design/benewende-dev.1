"use client";

import React from "react";
import { Plus, Trash2, GripVertical, User, Briefcase, GraduationCap, Wrench, Globe, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CVData } from "@/lib/cv/templates";

interface CVFormProps {
  cvData: CVData;
  onUpdateCV: (data: CVData) => void;
}

function SectionHeader({ icon: Icon, title, onAdd, addLabel }: { icon: React.ElementType; title: string; onAdd?: () => void; addLabel?: string }) {
  return (
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-primary" />
        <h3 className="text-sm font-bold">{title}</h3>
      </div>
      {onAdd && (
        <Button variant="ghost" size="sm" className="gap-1 text-xs text-primary hover:text-primary/80 h-7 px-2" onClick={onAdd}>
          <Plus className="h-3 w-3" /> {addLabel || "Ajouter"}
        </Button>
      )}
    </div>
  );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
  return <label className="text-[11px] font-medium text-muted-foreground mb-1 block">{children}</label>;
}

export default function CVForm({ cvData, onUpdateCV }: CVFormProps) {
  const update = (fn: (d: CVData) => void) => {
    const newData = JSON.parse(JSON.stringify(cvData)) as CVData;
    fn(newData);
    onUpdateCV(newData);
  };

  const addExperience = () => update((d) => d.experiences.push({ title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [] }));
  const removeExperience = (i: number) => update((d) => d.experiences.splice(i, 1));

  const addEducation = () => update((d) => d.education.push({ degree: "", school: "", location: "", startDate: "", endDate: "" }));
  const removeEducation = (i: number) => update((d) => d.education.splice(i, 1));

  const addSkillCategory = () => update((d) => d.skills.push({ category: "", items: [] }));
  const removeSkillCategory = (i: number) => update((d) => d.skills.splice(i, 1));

  const addLanguage = () => update((d) => d.languages.push({ name: "", level: "" }));
  const removeLanguage = (i: number) => update((d) => d.languages.splice(i, 1));

  const addCertification = () => update((d) => { if (!d.certifications) d.certifications = []; d.certifications.push({ name: "", issuer: "", date: "" }); });
  const removeCertification = (i: number) => update((d) => d.certifications?.splice(i, 1));

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b border-border/50">
        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
          <User className="h-4 w-4 text-primary" />
        </div>
        <div>
          <h3 className="text-sm font-bold">Formulaire CV</h3>
          <p className="text-[11px] text-muted-foreground">Remplissez directement vos informations</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* ── Personal Info ── */}
        <section>
          <SectionHeader icon={User} title="Informations personnelles" />
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <FieldLabel>Nom complet</FieldLabel>
              <Input value={cvData.personalInfo.fullName} onChange={(e) => update((d) => d.personalInfo.fullName = e.target.value)} placeholder="Amadou Diallo" className="h-8 text-sm" />
            </div>
            <div className="col-span-2">
              <FieldLabel>Titre professionnel</FieldLabel>
              <Input value={cvData.personalInfo.title} onChange={(e) => update((d) => d.personalInfo.title = e.target.value)} placeholder="Développeur Full Stack" className="h-8 text-sm" />
            </div>
            <div>
              <FieldLabel>Email</FieldLabel>
              <Input type="email" value={cvData.personalInfo.email} onChange={(e) => update((d) => d.personalInfo.email = e.target.value)} placeholder="email@example.com" className="h-8 text-sm" />
            </div>
            <div>
              <FieldLabel>Téléphone</FieldLabel>
              <Input value={cvData.personalInfo.phone} onChange={(e) => update((d) => d.personalInfo.phone = e.target.value)} placeholder="+226 70 00 00 00" className="h-8 text-sm" />
            </div>
            <div className="col-span-2">
              <FieldLabel>Localisation</FieldLabel>
              <Input value={cvData.personalInfo.location} onChange={(e) => update((d) => d.personalInfo.location = e.target.value)} placeholder="Ouagadougou, Burkina Faso" className="h-8 text-sm" />
            </div>
            <div>
              <FieldLabel>LinkedIn (optionnel)</FieldLabel>
              <Input value={cvData.personalInfo.linkedin || ""} onChange={(e) => update((d) => d.personalInfo.linkedin = e.target.value)} placeholder="linkedin.com/in/..." className="h-8 text-sm" />
            </div>
            <div>
              <FieldLabel>GitHub (optionnel)</FieldLabel>
              <Input value={cvData.personalInfo.github || ""} onChange={(e) => update((d) => d.personalInfo.github = e.target.value)} placeholder="github.com/..." className="h-8 text-sm" />
            </div>
            <div className="col-span-2">
              <FieldLabel>Site web (optionnel)</FieldLabel>
              <Input value={cvData.personalInfo.website || ""} onChange={(e) => update((d) => d.personalInfo.website = e.target.value)} placeholder="monsite.dev" className="h-8 text-sm" />
            </div>
            <div className="col-span-2">
              <FieldLabel>Résumé professionnel</FieldLabel>
              <textarea
                value={cvData.personalInfo.summary}
                onChange={(e) => update((d) => d.personalInfo.summary = e.target.value)}
                placeholder="Décrivez votre profil, vos compétences clés et vos objectifs..."
                className="w-full min-h-[80px] rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
              />
            </div>
          </div>
        </section>

        {/* ── Experiences ── */}
        <section>
          <SectionHeader icon={Briefcase} title="Expériences" onAdd={addExperience} addLabel="Ajouter" />
          {cvData.experiences.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-xl">Aucune expérience ajoutée. Cliquez sur « Ajouter » pour commencer.</p>
          )}
          {cvData.experiences.map((exp, i) => (
            <div key={i} className="relative border border-border/50 rounded-xl p-3 mb-3 bg-card/50">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-muted-foreground">
                  <GripVertical className="h-3 w-3" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Expérience {i + 1}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/60 hover:text-destructive" onClick={() => removeExperience(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <FieldLabel>Titre du poste</FieldLabel>
                  <Input value={exp.title} onChange={(e) => update((d) => d.experiences[i].title = e.target.value)} placeholder="Développeur Full Stack" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Entreprise</FieldLabel>
                  <Input value={exp.company} onChange={(e) => update((d) => d.experiences[i].company = e.target.value)} placeholder="Tech Solutions" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Lieu</FieldLabel>
                  <Input value={exp.location} onChange={(e) => update((d) => d.experiences[i].location = e.target.value)} placeholder="Ouagadougou" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Date début</FieldLabel>
                  <Input value={exp.startDate} onChange={(e) => update((d) => d.experiences[i].startDate = e.target.value)} placeholder="Janv. 2023" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Date fin</FieldLabel>
                  <Input value={exp.current ? "Présent" : exp.endDate} onChange={(e) => update((d) => { d.experiences[i].endDate = e.target.value; d.experiences[i].current = e.target.value.toLowerCase().includes("présent") || e.target.value.toLowerCase().includes("present"); })} placeholder="Présent" className="h-8 text-sm" />
                </div>
                <div className="col-span-2">
                  <FieldLabel>Réalisations (une par ligne)</FieldLabel>
                  <textarea
                    value={exp.achievements.join("\n")}
                    onChange={(e) => update((d) => { d.experiences[i].achievements = e.target.value.split("\n").filter(Boolean); d.experiences[i].description = d.experiences[i].achievements[0] || ""; })}
                    placeholder={"Développement d'APIs REST\nMigration cloud AWS\n+40% performance"}
                    className="w-full min-h-[60px] rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-y"
                  />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Education ── */}
        <section>
          <SectionHeader icon={GraduationCap} title="Formation" onAdd={addEducation} addLabel="Ajouter" />
          {cvData.education.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-xl">Aucune formation ajoutée.</p>
          )}
          {cvData.education.map((edu, i) => (
            <div key={i} className="relative border border-border/50 rounded-xl p-3 mb-3 bg-card/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Formation {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/60 hover:text-destructive" onClick={() => removeEducation(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="col-span-2">
                  <FieldLabel>Diplôme</FieldLabel>
                  <Input value={edu.degree} onChange={(e) => update((d) => d.education[i].degree = e.target.value)} placeholder="Master Informatique" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Établissement</FieldLabel>
                  <Input value={edu.school} onChange={(e) => update((d) => d.education[i].school = e.target.value)} placeholder="Université" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Lieu</FieldLabel>
                  <Input value={edu.location} onChange={(e) => update((d) => d.education[i].location = e.target.value)} placeholder="Ouagadougou" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Date début</FieldLabel>
                  <Input value={edu.startDate} onChange={(e) => update((d) => d.education[i].startDate = e.target.value)} placeholder="2019" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Date fin</FieldLabel>
                  <Input value={edu.endDate} onChange={(e) => update((d) => d.education[i].endDate = e.target.value)} placeholder="2022" className="h-8 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Skills ── */}
        <section>
          <SectionHeader icon={Wrench} title="Compétences" onAdd={addSkillCategory} addLabel="Catégorie" />
          {cvData.skills.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-xl">Aucune compétence ajoutée.</p>
          )}
          {cvData.skills.map((g, i) => (
            <div key={i} className="relative border border-border/50 rounded-xl p-3 mb-3 bg-card/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Catégorie {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/60 hover:text-destructive" onClick={() => removeSkillCategory(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="space-y-2">
                <div>
                  <FieldLabel>Nom de la catégorie</FieldLabel>
                  <Input value={g.category} onChange={(e) => update((d) => d.skills[i].category = e.target.value)} placeholder="Frontend" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Compétences (séparées par des virgules)</FieldLabel>
                  <Input value={g.items.join(", ")} onChange={(e) => update((d) => d.skills[i].items = e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="React, Next.js, TypeScript" className="h-8 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* ── Languages ── */}
        <section>
          <SectionHeader icon={Globe} title="Langues" onAdd={addLanguage} addLabel="Ajouter" />
          {cvData.languages.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-xl">Aucune langue ajoutée.</p>
          )}
          {cvData.languages.map((l, i) => (
            <div key={i} className="flex items-center gap-2 mb-2">
              <Input value={l.name} onChange={(e) => update((d) => d.languages[i].name = e.target.value)} placeholder="Français" className="h-8 text-sm flex-1" />
              <select
                value={l.level}
                onChange={(e) => update((d) => d.languages[i].level = e.target.value)}
                className="h-8 rounded-lg border border-input bg-background px-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Niveau</option>
                <option value="Natif">Natif</option>
                <option value="Bilingue">Bilingue</option>
                <option value="Courant">Courant</option>
                <option value="Avancé">Avancé</option>
                <option value="Intermédiaire">Intermédiaire</option>
                <option value="Débutant">Débutant</option>
              </select>
              <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive/60 hover:text-destructive shrink-0" onClick={() => removeLanguage(i)}>
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </section>

        {/* ── Certifications ── */}
        <section>
          <SectionHeader icon={Award} title="Certifications" onAdd={addCertification} addLabel="Ajouter" />
          {(!cvData.certifications || cvData.certifications.length === 0) && (
            <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border/50 rounded-xl">Aucune certification ajoutée.</p>
          )}
          {cvData.certifications?.map((c, i) => (
            <div key={i} className="relative border border-border/50 rounded-xl p-3 mb-3 bg-card/50">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">Certification {i + 1}</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive/60 hover:text-destructive" onClick={() => removeCertification(i)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="col-span-2">
                  <FieldLabel>Nom</FieldLabel>
                  <Input value={c.name} onChange={(e) => update((d) => { if (d.certifications) d.certifications[i].name = e.target.value; })} placeholder="AWS Certified" className="h-8 text-sm" />
                </div>
                <div>
                  <FieldLabel>Date</FieldLabel>
                  <Input value={c.date} onChange={(e) => update((d) => { if (d.certifications) d.certifications[i].date = e.target.value; })} placeholder="2024" className="h-8 text-sm" />
                </div>
                <div className="col-span-3">
                  <FieldLabel>Organisme</FieldLabel>
                  <Input value={c.issuer} onChange={(e) => update((d) => { if (d.certifications) d.certifications[i].issuer = e.target.value; })} placeholder="Amazon Web Services" className="h-8 text-sm" />
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

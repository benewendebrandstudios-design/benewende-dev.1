"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from "lucide-react";
import { CVData } from "@/lib/cv/templates";

interface CVPreviewProps {
  data: CVData;
  template: string;
}

export default function CVPreview({ data, template }: CVPreviewProps) {
  const { personalInfo, experiences, education, skills, languages, certifications } = data;
  const hasContent = personalInfo.fullName || personalInfo.title || personalInfo.summary;

  if (!hasContent) {
    return (
      <div className="h-full flex items-center justify-center text-center p-8">
        <div>
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">📄</span>
          </div>
          <h3 className="text-lg font-semibold mb-2">Aper&ccedil;u en direct</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            R&eacute;pondez aux questions du chat pour voir votre CV se construire en
            temps r&eacute;el ici.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-full overflow-y-auto"
    >
      <div id="cv-preview-content" className="bg-white text-gray-900 shadow-xl mx-auto max-w-[210mm] min-h-[297mm] p-8 md:p-10">
        {/* Header */}
        <div
          className={`mb-6 pb-6 border-b-2 ${
            template === "creative"
              ? "border-purple-500"
              : template === "professional"
              ? "border-gray-800"
              : "border-blue-500"
          }`}
        >
          <h1
            className={`text-2xl md:text-3xl font-bold mb-1 ${
              template === "creative"
                ? "text-purple-700"
                : template === "professional"
                ? "text-gray-900"
                : "text-blue-700"
            }`}
          >
            {personalInfo.fullName || "Votre Nom"}
          </h1>
          <p className="text-base md:text-lg text-gray-600 mb-3">
            {personalInfo.title || "Titre Professionnel"}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                {personalInfo.phone}
              </span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {personalInfo.location}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="h-3 w-3" />
                {personalInfo.linkedin}
              </span>
            )}
            {personalInfo.github && (
              <span className="flex items-center gap-1">
                <Github className="h-3 w-3" />
                {personalInfo.github}
              </span>
            )}
            {personalInfo.website && (
              <span className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                {personalInfo.website}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {personalInfo.summary && (
          <div className="mb-6">
            <h2
              className={`text-sm font-bold uppercase tracking-wider mb-2 ${
                template === "creative"
                  ? "text-purple-700"
                  : template === "professional"
                  ? "text-gray-800"
                  : "text-blue-700"
              }`}
            >
              Profil
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              {personalInfo.summary}
            </p>
          </div>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <div className="mb-6">
            <h2
              className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                template === "creative"
                  ? "text-purple-700"
                  : template === "professional"
                  ? "text-gray-800"
                  : "text-blue-700"
              }`}
            >
              Exp&eacute;rience Professionnelle
            </h2>
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-gray-500">
                        {exp.company}
                        {exp.location ? ` • ${exp.location}` : ""}
                      </p>
                    </div>
                    <span className="text-xs text-gray-400 shrink-0 ml-4">
                      {exp.startDate} - {exp.current ? "Présent" : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className="text-xs text-gray-600 mt-1">{exp.description}</p>
                  )}
                  {exp.achievements.length > 0 && (
                    <ul className="mt-1 space-y-0.5">
                      {exp.achievements.map((a, j) => (
                        <li key={j} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-gray-400 mt-0.5">•</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div className="mb-6">
            <h2
              className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                template === "creative"
                  ? "text-purple-700"
                  : template === "professional"
                  ? "text-gray-800"
                  : "text-blue-700"
              }`}
            >
              Formation
            </h2>
            <div className="space-y-3">
              {education.map((edu, i) => (
                <div key={i} className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-xs text-gray-500">
                      {edu.school}
                      {edu.location ? ` • ${edu.location}` : ""}
                    </p>
                  </div>
                  <span className="text-xs text-gray-400 shrink-0 ml-4">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-6">
            <h2
              className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                template === "creative"
                  ? "text-purple-700"
                  : template === "professional"
                  ? "text-gray-800"
                  : "text-blue-700"
              }`}
            >
              Comp&eacute;tences
            </h2>
            {skills.map((group, i) => (
              <div key={i} className="mb-2">
                {group.category && (
                  <span className="text-xs font-medium text-gray-700">
                    {group.category}:{" "}
                  </span>
                )}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {group.items.map((item, j) => (
                    <span
                      key={j}
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        template === "creative"
                          ? "bg-purple-100 text-purple-700"
                          : template === "professional"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div className="mb-6">
            <h2
              className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                template === "creative"
                  ? "text-purple-700"
                  : template === "professional"
                  ? "text-gray-800"
                  : "text-blue-700"
              }`}
            >
              Langues
            </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {languages.map((lang, i) => (
                <span key={i} className="text-xs text-gray-600">
                  <span className="font-medium text-gray-900">{lang.name}</span>{" "}
                  — {lang.level}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <div>
            <h2
              className={`text-sm font-bold uppercase tracking-wider mb-3 ${
                template === "creative"
                  ? "text-purple-700"
                  : template === "professional"
                  ? "text-gray-800"
                  : "text-blue-700"
              }`}
            >
              Certifications
            </h2>
            <div className="space-y-1">
              {certifications.map((cert, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-gray-900 font-medium">{cert.name}</span>
                  <span className="text-gray-400">
                    {cert.issuer} • {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

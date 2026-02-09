"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { experiences as staticExperiences, Experience as ExperienceType } from "@/data/experience";
import { useContent } from "@/lib/useContent";

export default function Experience() {
  const experiences = useContent<ExperienceType[]>("experiences", staticExperiences);

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/[0.02] to-transparent" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Parcours
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Exp&eacute;rience{" "}
            <span className="gradient-text">Professionnelle</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-8 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative pl-12 md:pl-20"
              >
                <div className="absolute left-0 md:left-4 top-1">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      exp.current
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                  </div>
                </div>

                <div className="text-xs text-primary font-medium uppercase tracking-wider mb-1">
                  {exp.period}
                </div>
                <h3 className="text-lg font-semibold">{exp.title}</h3>
                <div className="text-sm text-muted-foreground mb-3">
                  {exp.company}
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  {exp.description}
                </p>
                <ul className="space-y-1.5">
                  {exp.achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

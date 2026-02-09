"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Search,
  PenTool,
  Code2,
  Rocket,
  Wrench,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const steps = [
  {
    icon: Search,
    title: "Découverte",
    duration: "1-2 jours",
    tasks: ["Analyse besoin", "Audit technique", "Proposition solution"],
  },
  {
    icon: PenTool,
    title: "Design & Architecture",
    duration: "3-5 jours",
    tasks: ["Wireframes", "Architecture technique", "Validation client"],
  },
  {
    icon: Code2,
    title: "Développement",
    duration: "2-6 semaines",
    tasks: ["Sprints hebdomadaires", "Démos régulières", "Feedbacks itératifs"],
  },
  {
    icon: Rocket,
    title: "Déploiement",
    duration: "1 semaine",
    tasks: ["Mise en production", "Formation équipe", "Documentation"],
  },
  {
    icon: Wrench,
    title: "Maintenance",
    duration: "Ongoing",
    tasks: ["Support technique", "Nouvelles features", "Optimisations"],
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Méthodologie
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Comment je{" "}
            <span className="gradient-text">travaille</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Un process éprouvé pour livrer des projets de qualité, dans les
            temps et le budget.
          </p>
        </motion.div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2" />

          <div className="space-y-12 md:space-y-0">
            {steps.map((step, i) => {
              const Icon = step.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative md:grid md:grid-cols-2 md:gap-8 md:mb-12 ${
                    isLeft ? "" : "md:direction-rtl"
                  }`}
                >
                  <div
                    className={`${
                      isLeft ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-3 mb-3 ${
                        isLeft ? "md:flex-row-reverse" : ""
                      }`}
                    >
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">
                          Étape {i + 1}
                        </div>
                        <h3 className="text-lg font-semibold">{step.title}</h3>
                      </div>
                    </div>
                    <div className="text-xs text-primary font-medium mb-2">
                      {step.duration}
                    </div>
                    <ul className="space-y-1">
                      {step.tasks.map((task) => (
                        <li
                          key={task}
                          className={`text-sm text-muted-foreground flex items-center gap-2 ${
                            isLeft ? "md:justify-end" : ""
                          }`}
                        >
                          <div className="h-1 w-1 rounded-full bg-primary shrink-0" />
                          {task}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 items-center justify-center">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

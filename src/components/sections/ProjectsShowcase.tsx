"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Filter,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects as staticProjects, ProjectCategory, ProjectStatus, Project } from "@/data/projects";
import { useContent } from "@/lib/useContent";

const categoryFilters: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "Tous" },
  { value: "saas", label: "SaaS" },
  { value: "webapp", label: "Web App" },
  { value: "mobile", label: "Mobile" },
  { value: "ia", label: "IA" },
  { value: "prototype", label: "Prototype" },
];

const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; dotColor: string }
> = {
  live: {
    label: "En production",
    color: "bg-green-500/10 text-green-500 border-green-500/20",
    dotColor: "bg-green-500",
  },
  "in-progress": {
    label: "En cours",
    color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    dotColor: "bg-yellow-500",
  },
  prototype: {
    label: "Prototype",
    color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    dotColor: "bg-blue-500",
  },
};

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const status = statusConfig[project.status];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group h-full overflow-hidden hover:glow-sm transition-all duration-300 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
        <div className="aspect-video bg-gradient-to-br from-primary/20 via-secondary/10 to-accent/10 relative overflow-hidden">
          {project.image && project.image !== "/projects/placeholder.png" ? (
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-primary/20">
                {project.name.charAt(0)}
              </span>
            </div>
          )}
          <div className="absolute top-3 left-3">
            <Badge variant="outline" className={status.color}>
              <span
                className={`h-1.5 w-1.5 rounded-full ${status.dotColor} mr-1.5`}
              />
              {status.label}
              {project.progress !== undefined && ` - ${project.progress}%`}
            </Badge>
          </div>
          {project.launchDate && (
            <div className="absolute top-3 right-3">
              <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-xs">
                Lancement {project.launchDate}
              </Badge>
            </div>
          )}
        </div>
        <CardContent className="p-5">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
            {project.name}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>

          {project.progress !== undefined && (
            <div className="mb-4">
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                />
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.technologies.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs font-normal"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {project.stats && (
            <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-border">
              {project.stats.users && (
                <div className="text-center">
                  <div className="text-sm font-semibold text-primary">
                    {project.stats.users}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Utilisateurs
                  </div>
                </div>
              )}
              {project.stats.performance && (
                <div className="text-center">
                  <div className="text-sm font-semibold text-secondary">
                    {project.stats.performance}
                  </div>
                  <div className="text-xs text-muted-foreground">Uptime</div>
                </div>
              )}
              {project.stats.roi && (
                <div className="text-center">
                  <div className="text-sm font-semibold text-accent">
                    {project.stats.roi}
                  </div>
                  <div className="text-xs text-muted-foreground">ROI</div>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2">
            {project.liveUrl && (
              <Button size="sm" variant="default" className="gap-1.5 flex-1" asChild>
                <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Voir
                </a>
              </Button>
            )}
            {project.githubUrl && (
              <Button size="sm" variant="outline" className="gap-1.5 flex-1" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-3.5 w-3.5" />
                  Code
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const projects = useContent<Project[]>("projects", staticProjects);
  const [activeFilter, setActiveFilter] = useState<ProjectCategory | "all">(
    "all"
  );

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((p: Project) => p.category === activeFilter);

  const liveProjects = filtered.filter((p) => p.status === "live");
  const inProgressProjects = filtered.filter((p) => p.status === "in-progress");
  const prototypeProjects = filtered.filter((p) => p.status === "prototype");

  return (
    <section id="projets" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">
            Portfolio
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mes <span className="gradient-text">Projets</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes réalisations, des SaaS en production aux prototypes
            expérimentaux.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categoryFilters.map((filter) => (
            <Button
              key={filter.value}
              variant={activeFilter === filter.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(filter.value)}
              className="gap-1.5"
            >
              {filter.value === "all" && <Filter className="h-3.5 w-3.5" />}
              {filter.label}
            </Button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={activeFilter} layout>
            {liveProjects.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  Projets en Production
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {liveProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="#contact">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
                      Intéressé par un projet similaire ? Contactez-moi
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )}

            {inProgressProjects.length > 0 && (
              <div className="mb-12">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  Projets en Cours
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {inProgressProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="#contact">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
                      Intéressé par un projet similaire ? Contactez-moi
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )}

            {prototypeProjects.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                  Prototypes & Expérimentations
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {prototypeProjects.map((project, i) => (
                    <ProjectCard key={project.id} project={project} index={i} />
                  ))}
                </div>
                <div className="mt-6 text-center">
                  <a href="#contact">
                    <Button variant="ghost" className="gap-2 text-muted-foreground hover:text-primary">
                      Intéressé par un projet similaire ? Contactez-moi
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

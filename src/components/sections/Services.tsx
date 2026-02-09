"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check, Rocket, Palette, Bot, FileText, GraduationCap, Lightbulb, Code, Globe, Smartphone, Shield, Zap, Database, LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services as staticServices, Service } from "@/data/services";
import { useContent } from "@/lib/useContent";
import { useCurrency } from "@/components/currency-provider";
import Link from "next/link";

const iconMap: Record<string, LucideIcon> = {
  Rocket, Palette, Bot, FileText, GraduationCap, Lightbulb,
  Code, Globe, Smartphone, Shield, Zap, Database, ArrowRight, Check,
};

function resolveIcon(icon: unknown): LucideIcon {
  if (typeof icon === "string") return iconMap[icon] || Rocket;
  if (typeof icon === "function") return icon as LucideIcon;
  return Rocket;
}

export default function Services() {
  const services = useContent<Service[]>("services", staticServices);
  const { currency } = useCurrency();

  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Services
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ce que je peux faire pour{" "}
            <span className="gradient-text">vous</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Des solutions sur mesure pour transformer vos id&eacute;es en produits
            digitaux performants.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = resolveIcon(service.icon);
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full group hover:glow-sm transition-all duration-300 hover:border-primary/30 bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <div className="relative mb-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent flex items-center justify-center ring-1 ring-primary/10 group-hover:ring-primary/25 group-hover:shadow-lg group-hover:shadow-primary/10 transition-all duration-500">
                        <Icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="absolute -inset-1 rounded-2xl bg-primary/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {service.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2.5 text-sm text-muted-foreground"
                        >
                          <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                            <Check className="h-2.5 w-2.5 text-primary" />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-border">
                      <div className="text-lg font-semibold text-primary">
                        {service.price[currency]}
                      </div>
                      {service.id === "cv-generator" ? (
                        <Link href="/cv-generator">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full gap-2"
                          >
                            Essayer gratuitement
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <a href="#contact">
                          <Button
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full gap-2"
                          >
                            En savoir plus
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

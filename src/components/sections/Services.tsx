"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { services as staticServices, Service } from "@/data/services";
import { useContent } from "@/lib/useContent";
import { useCurrency } from "@/components/currency-provider";
import Link from "next/link";

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
            const Icon = service.icon;
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
                    <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
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

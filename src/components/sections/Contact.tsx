"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Calendar,
  Github,
  Linkedin,
  Twitter,
  Zap,
  Phone,
  MessageCircle,
  Facebook,
  Instagram,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { useContent } from "@/lib/useContent";

interface SiteSettings {
  email?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
  calendly?: string;
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const budgetOptions = [
  "< 500 000 FCFA",
  "500K - 1.5M FCFA",
  "1.5M - 3M FCFA",
  "3M+ FCFA",
  "Je ne sais pas encore",
];

const defaultSiteSettings: SiteSettings = {
  email: "benewende.dev@gmail.com",
  phone: "+226 07 26 71 19",
  whatsapp: "22607267119",
  location: "Ouagadougou, Burkina Faso",
  github: "https://github.com/benewende",
  linkedin: "https://linkedin.com/in/benewende",
  twitter: "https://x.com/benewende",
  facebook: "",
  instagram: "",
  tiktok: "",
};

export default function Contact() {
  const allSettings = useContent<Record<string, SiteSettings>>("settings", {});
  const site = { ...defaultSiteSettings, ...(allSettings.site || {}) };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    project: "",
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Erreur serveur");
      setIsSubmitted(true);
      setTimeout(() => setIsSubmitted(false), 5000);
      setFormData({ name: "", email: "", project: "", budget: "", message: "" });
    } catch {
      alert("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 via-transparent to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Contact
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pr&ecirc;t &agrave; lancer votre{" "}
            <span className="gradient-text">projet</span> ?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Je transforme vos id&eacute;es en produits digitaux rentables. Parlons de
            votre projet.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-3"
          >
            <Card className="p-6 md:p-8 bg-card/50 backdrop-blur-sm">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    Message envoy&eacute; !
                  </h3>
                  <p className="text-muted-foreground">
                    Je vous r&eacute;ponds sous 24h. Merci !
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Nom complet
                      </label>
                      <Input
                        required
                        placeholder="Votre nom"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1.5 block">
                        Email
                      </label>
                      <Input
                        required
                        type="email"
                        placeholder="pro@email.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Type de projet
                    </label>
                    <Input
                      required
                      placeholder="SaaS, Web App, Application mobile..."
                      value={formData.project}
                      onChange={(e) =>
                        setFormData({ ...formData, project: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Budget estim&eacute;
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {budgetOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, budget: option })
                          }
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all border ${
                            formData.budget === option
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-muted/50 text-muted-foreground border-border hover:border-primary/30"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1.5 block">
                      Message
                    </label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="D&eacute;crivez votre projet en quelques lignes..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full gap-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          repeat: Infinity,
                          duration: 1,
                          ease: "linear",
                        }}
                        className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                      />
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Envoyer le message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Email</div>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {site.email}
                  </a>
                </div>
              </div>

              {site.phone && (
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-sm">T&eacute;l&eacute;phone</div>
                    <a
                      href={`tel:${site.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {site.phone}
                    </a>
                  </div>
                </div>
              )}

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Localisation</div>
                  <div className="text-sm text-muted-foreground">
                    {site.location}
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                  <MessageCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <div className="font-medium text-sm">WhatsApp</div>
                  <a
                    href={`https://wa.me/${site.whatsapp}?text=Bonjour%20Benewende%2C%20je%20souhaite%20discuter%20d%27un%20projet.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-green-500 hover:underline"
                  >
                    Envoyer un message
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="font-medium text-sm">Appel découverte</div>
                  {site.calendly ? (
                    <a
                      href={site.calendly}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Réserver un créneau Calendly
                    </a>
                  ) : (
                    <a
                      href={`https://wa.me/${site.whatsapp}?text=Bonjour%20Benewende%2C%20je%20souhaite%20planifier%20un%20appel%20d%C3%A9couverte%20de%2030min.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-primary hover:underline"
                    >
                      Planifier 30min gratuites via WhatsApp
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <div className="text-sm font-medium mb-3">Suivez-moi</div>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Github, href: site.github, label: "GitHub" },
                  { icon: Linkedin, href: site.linkedin, label: "LinkedIn" },
                  { icon: Twitter, href: site.twitter, label: "X / Twitter" },
                  { icon: Facebook, href: site.facebook, label: "Facebook" },
                  { icon: Instagram, href: site.instagram, label: "Instagram" },
                  { icon: TikTokIcon, href: site.tiktok, label: "TikTok" },
                ].filter((s) => s.href).map((social) => (
                  <a
                    key={social.label}
                    href={social.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-10 w-10 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            <Card className="p-5 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold">
                  R&eacute;ponse garantie sous 24h
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Je r&eacute;ponds &agrave; chaque message dans un d&eacute;lai de 24 heures
                maximum. Pour les urgences, contactez-moi directement par
                email.
              </p>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

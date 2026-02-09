"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Heart, Facebook, Instagram } from "lucide-react";
import { useContent } from "@/lib/useContent";

interface SiteSettings {
  github?: string;
  linkedin?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  tiktok?: string;
}

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
  </svg>
);

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "#services" },
      { label: "Projets", href: "#projets" },
      { label: "Compétences", href: "#competences" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Développement SaaS", href: "#services" },
      { label: "Web App", href: "#services" },
      { label: "Solutions IA", href: "#services" },
      { label: "CV Generator", href: "/cv-generator" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Process", href: "#process" },
      { label: "Témoignages", href: "#temoignages" },
      { label: "Expérience", href: "#experience" },
      { label: "Paiement", href: "/payment" },
    ],
  },
];

const defaultSiteSettings: SiteSettings = {
  github: "https://github.com/benewende",
  linkedin: "https://linkedin.com/in/benewende",
  twitter: "https://x.com/benewende",
  facebook: "",
  instagram: "",
  tiktok: "",
};

export default function Footer() {
  const allSettings = useContent<Record<string, SiteSettings>>("settings", {});
  const site = { ...defaultSiteSettings, ...(allSettings.site || {}) };

  const socials = [
    { icon: Github, href: site.github, label: "GitHub" },
    { icon: Linkedin, href: site.linkedin, label: "LinkedIn" },
    { icon: Twitter, href: site.twitter, label: "X / Twitter" },
    { icon: Facebook, href: site.facebook, label: "Facebook" },
    { icon: Instagram, href: site.instagram, label: "Instagram" },
    { icon: TikTokIcon, href: site.tiktok, label: "TikTok" },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold tracking-tight">
              <span className="gradient-text">Benewende</span>
              <span className="text-muted-foreground">.dev</span>
            </Link>
            <p className="text-sm text-muted-foreground mt-3 max-w-xs">
              Développeur Full Stack & Créateur de SaaS basé à Ouagadougou,
              Burkina Faso.
            </p>
            <div className="flex gap-3 mt-4">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-9 w-9 rounded-lg bg-muted/50 hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold mb-4">{group.title}</h4>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith("/") ? (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Benewende.dev. Tous droits
            r&eacute;serv&eacute;s.
          </p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Fait avec <Heart className="h-3 w-3 text-red-500 fill-red-500" />{" "}
            &agrave; Ouagadougou
          </p>
        </div>
      </div>
    </footer>
  );
}

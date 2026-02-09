"use client";

import React from "react";
import Link from "next/link";
import { Github, Linkedin, Twitter, Heart } from "lucide-react";

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { label: "Services", href: "#services" },
      { label: "Projets", href: "#projets" },
      { label: "Comp\u00E9tences", href: "#competences" },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "D\u00E9veloppement SaaS", href: "#services" },
      { label: "Web App", href: "#services" },
      { label: "Solutions IA", href: "#services" },
      { label: "CV Generator", href: "/cv-generator" },
    ],
  },
  {
    title: "Ressources",
    links: [
      { label: "Blog", href: "#" },
      { label: "Process", href: "#process" },
      { label: "T\u00E9moignages", href: "#temoignages" },
      { label: "FAQ", href: "#" },
    ],
  },
];

const socials = [
  { icon: Github, href: "https://github.com/benewende", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

export default function Footer() {
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
              D\u00E9veloppeur Full Stack & Cr\u00E9ateur de SaaS bas\u00E9 \u00E0 Ouagadougou,
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

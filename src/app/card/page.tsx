"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
  MessageCircle,
  Globe,
  Download,
  QrCode,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SiteSettings {
  name?: string;
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

const defaultSettings: SiteSettings = {
  name: "Benewende.dev",
  email: "benewende.dev@gmail.com",
  phone: "+226 07 26 71 19",
  whatsapp: "22607267119",
  location: "Ouagadougou, Burkina Faso",
  github: "https://github.com/benewendebrandstudios-design",
};

export default function CardPage() {
  const [site, setSite] = useState<SiteSettings>(defaultSettings);
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    fetch("/api/content/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.site) setSite({ ...defaultSettings, ...data.site });
      })
      .catch(() => {});
  }, []);

  const copyLink = () => {
    navigator.clipboard.writeText("https://benewende.dev/card");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadVCard = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Benewende
ORG:Benewende.dev
TITLE:Développeur Full Stack & Créateur de SaaS
TEL;TYPE=CELL:${site.phone || ""}
EMAIL:${site.email || ""}
URL:https://benewende.dev
ADR;TYPE=WORK:;;${site.location || ""}
NOTE:Développeur Full Stack · Créateur de SaaS · Expert IA
END:VCARD`;
    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "benewende-dev.vcf";
    a.click();
    URL.revokeObjectURL(url);
  };

  const socials = [
    { icon: Github, href: site.github, label: "GitHub", color: "hover:bg-gray-700 hover:text-white" },
    { icon: Linkedin, href: site.linkedin, label: "LinkedIn", color: "hover:bg-blue-600 hover:text-white" },
    { icon: Twitter, href: site.twitter, label: "X", color: "hover:bg-black hover:text-white" },
    { icon: Facebook, href: site.facebook, label: "Facebook", color: "hover:bg-blue-500 hover:text-white" },
    { icon: Instagram, href: site.instagram, label: "Instagram", color: "hover:bg-pink-500 hover:text-white" },
    { icon: TikTokIcon, href: site.tiktok, label: "TikTok", color: "hover:bg-black hover:text-white" },
  ].filter((s) => s.href);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        {/* Card */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl">
          {/* Gradient Header */}
          <div className="relative h-32 bg-gradient-to-br from-primary via-primary/80 to-purple-600 overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-card/80 to-transparent" />
          </div>

          {/* Avatar */}
          <div className="relative -mt-16 flex justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="relative"
            >
              <div className="h-28 w-28 rounded-2xl bg-gradient-to-br from-primary to-purple-600 p-[3px] shadow-xl shadow-primary/25 rotate-3">
                <div className="h-full w-full rounded-2xl bg-card flex items-center justify-center -rotate-3">
                  <span className="text-4xl font-bold gradient-text">B</span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-green-500 border-[3px] border-card flex items-center justify-center">
                <div className="h-2.5 w-2.5 rounded-full bg-white animate-pulse" />
              </div>
            </motion.div>
          </div>

          {/* Info */}
          <div className="px-6 pt-4 pb-2 text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-2xl font-bold tracking-tight">Benewende</h1>
              <p className="text-sm text-primary font-medium mt-0.5">.dev</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-3"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                <Sparkles className="h-3 w-3" />
                Développeur Full Stack · Créateur de SaaS · Expert IA
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-muted-foreground mt-3 leading-relaxed"
            >
              Je transforme vos idées en produits digitaux performants.
              SaaS, apps web, solutions IA — du concept au déploiement.
            </motion.p>
          </div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="px-6 py-4 space-y-2"
          >
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-all group"
            >
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-4 w-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Email</div>
                <div className="text-sm font-medium truncate">{site.email}</div>
              </div>
              <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            {site.phone && (
              <a
                href={`tel:${site.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/60 transition-all group"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Téléphone</div>
                  <div className="text-sm font-medium">{site.phone}</div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            {site.whatsapp && (
              <a
                href={`https://wa.me/${site.whatsapp}?text=Bonjour%20Benewende%2C%20je%20souhaite%20discuter%20d%27un%20projet.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-green-500/5 hover:bg-green-500/15 border border-green-500/10 transition-all group"
              >
                <div className="h-9 w-9 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0 group-hover:bg-green-500/20 transition-colors">
                  <MessageCircle className="h-4 w-4 text-green-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-green-600 uppercase tracking-wider">WhatsApp</div>
                  <div className="text-sm font-medium text-green-600">Envoyer un message</div>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            )}

            <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/30">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <MapPin className="h-4 w-4 text-primary" />
              </div>
              <div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Localisation</div>
                <div className="text-sm font-medium">{site.location}</div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          {socials.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="px-6 pb-4"
            >
              <div className="text-[10px] text-muted-foreground uppercase tracking-wider mb-2 text-center">Réseaux sociaux</div>
              <div className="flex justify-center gap-2">
                {socials.map((social, i) => (
                  <motion.a
                    key={social.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + i * 0.05 }}
                    href={social.href!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`h-11 w-11 rounded-xl bg-muted/40 flex items-center justify-center transition-all duration-200 ${social.color}`}
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="px-6 pb-6 space-y-2"
          >
            <Link href="/" className="block">
              <Button className="w-full gap-2 h-11 rounded-xl text-sm" size="lg">
                <Globe className="h-4 w-4" />
                Voir mon portfolio
              </Button>
            </Link>

            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                className="gap-1.5 h-10 rounded-xl text-xs"
                onClick={downloadVCard}
              >
                <Download className="h-3.5 w-3.5" />
                vCard
              </Button>

              <Button
                variant="outline"
                className="gap-1.5 h-10 rounded-xl text-xs"
                onClick={() => setShowQR(!showQR)}
              >
                <QrCode className="h-3.5 w-3.5" />
                QR Code
              </Button>

              <Button
                variant="outline"
                className={`gap-1.5 h-10 rounded-xl text-xs ${copied ? "border-green-500 text-green-500" : ""}`}
                onClick={copyLink}
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copié !" : "Lien"}
              </Button>
            </div>

            {/* QR Code */}
            {showQR && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="flex flex-col items-center p-4 rounded-xl bg-white">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://benewende.dev/card&color=0a0a0a&bgcolor=ffffff&format=svg`}
                    alt="QR Code Benewende.dev"
                    width={180}
                    height={180}
                    className="rounded-lg"
                  />
                  <p className="text-xs text-gray-500 mt-2 font-medium">benewende.dev/card</p>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Footer */}
          <div className="px-6 py-3 border-t border-border/30 text-center">
            <p className="text-[10px] text-muted-foreground">
              &copy; {new Date().getFullYear()} Benewende.dev &mdash; Ouagadougou, Burkina Faso
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Users, Mail, FileText, TrendingUp, Eye, Trash2, Archive,
  LogOut, ArrowLeft, Shield, FolderOpen, Briefcase, Code2,
  Clock, Settings, Star,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExtendedUser } from "@/lib/types";
import ContentManager, { FieldDef } from "@/components/admin/ContentManager";

interface ContactMsg {
  id: string;
  name: string;
  email: string;
  project: string | null;
  budget: string | null;
  message: string;
  read: boolean;
  archived: boolean;
  createdAt: string;
}

type TabId = "overview" | "projects" | "services" | "skills" | "testimonials" | "experiences" | "contacts" | "settings";

interface Stats { totalUsers: number; totalContacts: number; unreadContacts: number; totalCVs: number; }

const projectFields: FieldDef[] = [
  { key: "name", label: "Nom", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "image", label: "Image URL", type: "text", placeholder: "/projects/..." },
  { key: "status", label: "Statut", type: "select", options: [{ value: "live", label: "Production" }, { value: "in-progress", label: "En cours" }, { value: "prototype", label: "Prototype" }] },
  { key: "category", label: "Cat\u00e9gorie", type: "select", options: [{ value: "saas", label: "SaaS" }, { value: "webapp", label: "Web App" }, { value: "mobile", label: "Mobile" }, { value: "ia", label: "IA" }, { value: "prototype", label: "Prototype" }] },
  { key: "technologies", label: "Technologies", type: "json-array" },
  { key: "progress", label: "Progression (%)", type: "number" },
  { key: "launchDate", label: "Date de lancement", type: "text", placeholder: "Q1 2026" },
  { key: "liveUrl", label: "URL Live", type: "text" },
  { key: "githubUrl", label: "URL GitHub", type: "text" },
  { key: "statsUsers", label: "Stat: Utilisateurs", type: "text" },
  { key: "statsPerf", label: "Stat: Performance", type: "text" },
  { key: "statsRoi", label: "Stat: ROI", type: "text" },
  { key: "sortOrder", label: "Ordre", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" },
];

const serviceFields: FieldDef[] = [
  { key: "title", label: "Titre", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "icon", label: "Ic\u00f4ne (Lucide)", type: "select", options: [{ value: "Rocket", label: "Rocket" }, { value: "Palette", label: "Palette" }, { value: "Bot", label: "Bot" }, { value: "FileText", label: "FileText" }, { value: "GraduationCap", label: "GraduationCap" }, { value: "Lightbulb", label: "Lightbulb" }, { value: "Code2", label: "Code2" }, { value: "Globe", label: "Globe" }] },
  { key: "priceXOF", label: "Prix XOF", type: "text", required: true },
  { key: "priceEUR", label: "Prix EUR", type: "text", required: true },
  { key: "priceUSD", label: "Prix USD", type: "text", required: true },
  { key: "features", label: "Features", type: "json-array" },
  { key: "sortOrder", label: "Ordre", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" },
];

const skillFields: FieldDef[] = [
  { key: "category", label: "Cat\u00e9gorie", type: "text", required: true },
  { key: "skills", label: "Comp\u00e9tences", type: "json-skills" },
  { key: "sortOrder", label: "Ordre", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" },
];

const testimonialFields: FieldDef[] = [
  { key: "name", label: "Nom", type: "text", required: true },
  { key: "role", label: "R\u00f4le", type: "text", required: true },
  { key: "company", label: "Entreprise", type: "text", required: true },
  { key: "content", label: "T\u00e9moignage", type: "textarea", required: true },
  { key: "rating", label: "Note (1-5)", type: "number" },
  { key: "avatar", label: "Avatar URL", type: "text" },
  { key: "sortOrder", label: "Ordre", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" },
];

const experienceFields: FieldDef[] = [
  { key: "period", label: "P\u00e9riode", type: "text", required: true, placeholder: "2024 - Pr\u00e9sent" },
  { key: "title", label: "Titre", type: "text", required: true },
  { key: "company", label: "Entreprise", type: "text", required: true },
  { key: "description", label: "Description", type: "textarea", required: true },
  { key: "achievements", label: "R\u00e9alisations", type: "json-array" },
  { key: "current", label: "Poste actuel", type: "boolean" },
  { key: "sortOrder", label: "Ordre", type: "number" },
  { key: "visible", label: "Visible", type: "boolean" },
];

const tabs: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
  { id: "projects", label: "Projets", icon: FolderOpen },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "skills", label: "Comp\u00e9tences", icon: Code2 },
  { id: "testimonials", label: "T\u00e9moignages", icon: Star },
  { id: "experiences", label: "Exp\u00e9rience", icon: Clock },
  { id: "contacts", label: "Messages", icon: Mail },
  { id: "settings", label: "Param\u00e8tres", icon: Settings },
];

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState<Stats>({ totalUsers: 0, totalContacts: 0, unreadContacts: 0, totalCVs: 0 });
  const [contacts, setContacts] = useState<ContactMsg[]>([]);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [loading, setLoading] = useState(true);
  const [contentData, setContentData] = useState<Record<string, Record<string, unknown>[]>>({
    projects: [], services: [], skills: [], testimonials: [], experiences: [],
  });
  const [siteSettings, setSiteSettings] = useState<Record<string, Record<string, unknown>>>({});

  const fetchContent = useCallback(async (type: string) => {
    const res = await fetch(`/api/admin/content/${type}`);
    if (res.ok) {
      const data = await res.json();
      if (type === "settings") {
        const map: Record<string, Record<string, unknown>> = {};
        for (const s of data) { try { map[s.id] = JSON.parse(s.value); } catch { map[s.id] = {}; } }
        setSiteSettings(map);
      } else {
        setContentData((prev) => ({ ...prev, [type]: data }));
      }
    }
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/auth/login");
    if (status === "authenticated") {
      if ((session?.user as ExtendedUser)?.role !== "admin") { router.push("/"); return; }
      (async () => {
        try {
          const [statsRes, contactsRes] = await Promise.all([
            fetch("/api/admin/stats"), fetch("/api/admin/contacts"),
          ]);
          if (statsRes.ok) setStats(await statsRes.json());
          if (contactsRes.ok) setContacts(await contactsRes.json());
          await Promise.all(["projects", "services", "skills", "testimonials", "experiences", "settings"].map(fetchContent));
        } catch (e) { console.error("Admin fetch error:", e); }
        finally { setLoading(false); }
      })();
    }
  }, [status, session, router, fetchContent]);

  const crudFor = (type: string) => ({
    onSave: async (item: Record<string, unknown>) => {
      await fetch(`/api/admin/content/${type}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      await fetchContent(type);
    },
    onDelete: async (id: string) => {
      await fetch(`/api/admin/content/${type}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
      await fetchContent(type);
    },
    onCreate: async (item: Record<string, unknown>) => {
      await fetch(`/api/admin/content/${type}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(item) });
      await fetchContent(type);
    },
  });

  const saveSetting = async (key: string, value: Record<string, unknown>) => {
    await fetch("/api/admin/content/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: key, value: JSON.stringify(value) }) });
    await fetchContent("settings");
  };

  const markAsRead = async (id: string) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read: true }),
    });
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, read: true } : c))
    );
    setStats((prev) => ({ ...prev, unreadContacts: prev.unreadContacts - 1 }));
  };

  const archiveMessage = async (id: string) => {
    await fetch(`/api/admin/contacts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const deleteMessage = async (id: string) => {
    await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
    setContacts((prev) => prev.filter((c) => c.id !== id));
    setStats((prev) => ({ ...prev, totalContacts: prev.totalContacts - 1 }));
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="h-8 w-8 border-2 border-primary/30 border-t-primary rounded-full"
        />
      </div>
    );
  }

  if ((session?.user as ExtendedUser)?.role !== "admin") return null;

  const statCards = [
    {
      title: "Utilisateurs",
      value: stats.totalUsers,
      icon: Users,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Messages",
      value: stats.totalContacts,
      icon: Mail,
      color: "text-green-500",
      bg: "bg-green-500/10",
      badge: stats.unreadContacts > 0 ? `${stats.unreadContacts} non lu(s)` : undefined,
    },
    {
      title: "CVs g\u00E9n\u00E9r\u00E9s",
      value: stats.totalCVs,
      icon: FileText,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Taux conversion",
      value: "12%",
      icon: TrendingUp,
      color: "text-amber-500",
      bg: "bg-amber-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <h1 className="text-sm font-semibold">Admin Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground hidden sm:block">
                {session?.user?.email}
              </span>
              <Badge variant="outline" className="text-xs">Admin</Badge>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">D&eacute;connexion</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-1.5 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "ghost"}
              size="sm"
              className="gap-1.5 shrink-0"
              onClick={() => setActiveTab(tab.id)}
            >
              <tab.icon className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.id === "contacts" && stats.unreadContacts > 0 && (
                <span className="h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] flex items-center justify-center">
                  {stats.unreadContacts}
                </span>
              )}
            </Button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {statCards.map((stat, i) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`h-10 w-10 rounded-lg ${stat.bg} flex items-center justify-center`}
                        >
                          <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </div>
                        {stat.badge && (
                          <Badge variant="destructive" className="text-xs">
                            {stat.badge}
                          </Badge>
                        )}
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-xs text-muted-foreground">
                        {stat.title}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Recent contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Messages r&eacute;cents</CardTitle>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucun message pour le moment.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contacts.slice(0, 5).map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-3 rounded-lg border transition-colors ${
                          contact.read
                            ? "bg-card border-border"
                            : "bg-primary/5 border-primary/20"
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium truncate">
                                {contact.name}
                              </span>
                              {!contact.read && (
                                <Badge className="text-[10px]">Nouveau</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground truncate">
                              {contact.email}
                              {contact.project && ` \u2022 ${contact.project}`}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                              {contact.message}
                            </p>
                          </div>
                          <div className="flex gap-1 ml-2 shrink-0">
                            {!contact.read && (
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => markAsRead(contact.id)}
                              >
                                <Eye className="h-3.5 w-3.5" />
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => archiveMessage(contact.id)}
                            >
                              <Archive className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-7 w-7 text-destructive"
                              onClick={() => deleteMessage(contact.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Contacts tab */}
        {activeTab === "contacts" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Tous les messages ({contacts.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {contacts.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    Aucun message.
                  </p>
                ) : (
                  <div className="space-y-3">
                    {contacts.map((contact) => (
                      <div
                        key={contact.id}
                        className={`p-4 rounded-lg border transition-colors ${
                          contact.read
                            ? "bg-card border-border"
                            : "bg-primary/5 border-primary/20"
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm">
                                {contact.name}
                              </span>
                              {!contact.read && (
                                <Badge className="text-[10px]">Nouveau</Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {contact.email}
                            </p>
                          </div>
                          <div className="flex gap-1">
                            {!contact.read && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs h-7"
                                onClick={() => markAsRead(contact.id)}
                              >
                                Marquer lu
                              </Button>
                            )}
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => archiveMessage(contact.id)}
                            >
                              Archiver
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              className="text-xs h-7"
                              onClick={() => deleteMessage(contact.id)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                        {contact.project && (
                          <p className="text-xs text-muted-foreground mb-1">
                            <strong>Projet :</strong> {contact.project}
                            {contact.budget && ` \u2022 Budget : ${contact.budget}`}
                          </p>
                        )}
                        <p className="text-sm text-foreground/80">
                          {contact.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(contact.createdAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Projects tab */}
        {activeTab === "projects" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContentManager
              title="Projets"
              type="projects"
              fields={projectFields}
              items={contentData.projects}
              {...crudFor("projects")}
            />
          </motion.div>
        )}

        {/* Services tab */}
        {activeTab === "services" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContentManager
              title="Services"
              type="services"
              fields={serviceFields}
              items={contentData.services}
              {...crudFor("services")}
            />
          </motion.div>
        )}

        {/* Skills tab */}
        {activeTab === "skills" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContentManager
              title="Comp&eacute;tences"
              type="skills"
              fields={skillFields}
              items={contentData.skills}
              {...crudFor("skills")}
            />
          </motion.div>
        )}

        {/* Testimonials tab */}
        {activeTab === "testimonials" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContentManager
              title="T&eacute;moignages"
              type="testimonials"
              fields={testimonialFields}
              items={contentData.testimonials}
              {...crudFor("testimonials")}
            />
          </motion.div>
        )}

        {/* Experiences tab */}
        {activeTab === "experiences" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <ContentManager
              title="Exp&eacute;riences"
              type="experiences"
              fields={experienceFields}
              items={contentData.experiences}
              {...crudFor("experiences")}
            />
          </motion.div>
        )}

        {/* Settings tab */}
        {activeTab === "settings" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="space-y-6">
              {/* Hero settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Hero / Accueil</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(() => {
                    const hero = siteSettings.hero || {};
                    return (
                      <>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Titre principal</label>
                          <input
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                            value={(hero.title as string) || ""}
                            onChange={(e) => setSiteSettings((p) => ({ ...p, hero: { ...p.hero, title: e.target.value } }))}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Sous-titre</label>
                          <textarea
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[60px]"
                            value={(hero.subtitle as string) || ""}
                            onChange={(e) => setSiteSettings((p) => ({ ...p, hero: { ...p.hero, subtitle: e.target.value } }))}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Textes d&eacute;filants (un par ligne)</label>
                          <textarea
                            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm font-mono min-h-[80px]"
                            value={((hero.typingTexts as string[]) || []).join("\n")}
                            onChange={(e) => setSiteSettings((p) => ({ ...p, hero: { ...p.hero, typingTexts: e.target.value.split("\n").filter(Boolean) } }))}
                          />
                        </div>
                        <div>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={!!hero.available} onChange={(e) => setSiteSettings((p) => ({ ...p, hero: { ...p.hero, available: e.target.checked } }))} />
                            <span className="text-sm">Disponible pour nouveaux projets</span>
                          </label>
                        </div>
                        <Button size="sm" onClick={() => saveSetting("hero", siteSettings.hero || {})}>
                          Sauvegarder Hero
                        </Button>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Site info settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Informations du site</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(() => {
                    const site = siteSettings.site || {};
                    const updateSite = (key: string, val: string) => setSiteSettings((p) => ({ ...p, site: { ...p.site, [key]: val } }));
                    return (
                      <>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {[
                            { key: "name", label: "Nom du site" },
                            { key: "email", label: "Email" },
                            { key: "phone", label: "T\u00e9l\u00e9phone" },
                            { key: "location", label: "Localisation" },
                            { key: "github", label: "GitHub URL" },
                            { key: "linkedin", label: "LinkedIn URL" },
                            { key: "twitter", label: "Twitter URL" },
                          ].map((f) => (
                            <div key={f.key}>
                              <label className="text-xs font-medium text-muted-foreground mb-1 block">{f.label}</label>
                              <input
                                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                                value={(site[f.key] as string) || ""}
                                onChange={(e) => updateSite(f.key, e.target.value)}
                              />
                            </div>
                          ))}
                        </div>
                        <Button size="sm" onClick={() => saveSetting("site", siteSettings.site || {})}>
                          Sauvegarder Infos
                        </Button>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>

              {/* Footer settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Footer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(() => {
                    const footer = siteSettings.footer || {};
                    return (
                      <>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Copyright</label>
                          <input
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                            value={(footer.copyright as string) || ""}
                            onChange={(e) => setSiteSettings((p) => ({ ...p, footer: { ...p.footer, copyright: e.target.value } }))}
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-muted-foreground mb-1 block">Tagline</label>
                          <input
                            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm"
                            value={(footer.tagline as string) || ""}
                            onChange={(e) => setSiteSettings((p) => ({ ...p, footer: { ...p.footer, tagline: e.target.value } }))}
                          />
                        </div>
                        <Button size="sm" onClick={() => saveSetting("footer", siteSettings.footer || {})}>
                          Sauvegarder Footer
                        </Button>
                      </>
                    );
                  })()}
                </CardContent>
              </Card>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun, Globe, LogIn, User, Shield, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/currency-provider";
import { Currency, currencyLabels } from "@/data/services";
import { ExtendedUser } from "@/lib/types";

const navLinks = [
  { href: "#services", label: "Services" },
  { href: "#projets", label: "Projets" },
  { href: "#competences", label: "Compétences" },
  { href: "#process", label: "Process" },
  { href: "#temoignages", label: "Témoignages" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showCurrencyMenu, setShowCurrencyMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const { currency, setCurrency } = useCurrency();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  const user = session?.user as ExtendedUser | undefined;
  const isLoggedIn = !!session;
  const isAdminUser = user?.role === "admin";

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currencies: Currency[] = ["XOF", "EUR", "USD"];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight"
          >
            <span className="gradient-text">Benewende</span>
            <span className="text-muted-foreground">.dev</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
            <Link href="/cv-generator">
              <Button size="sm" className="ml-2">
                CV Generator
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setShowCurrencyMenu(!showCurrencyMenu)}
              >
                <Globe className="h-4 w-4" />
              </Button>
              <AnimatePresence>
                {showCurrencyMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden"
                  >
                    {currencies.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setCurrency(c);
                          setShowCurrencyMenu(false);
                        }}
                        className={`w-full px-4 py-2 text-sm text-left hover:bg-muted transition-colors ${
                          currency === c
                            ? "text-primary font-medium bg-primary/5"
                            : "text-foreground"
                        }`}
                      >
                        {currencyLabels[c]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            )}

            {isLoggedIn ? (
              <div className="flex items-center gap-1.5">
                {isAdminUser && (
                  <Link href="/admin">
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs">
                      <Shield className="h-3.5 w-3.5" />
                      Admin
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1.5 text-xs"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="h-3.5 w-3.5" />
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="gap-1.5">
                  <LogIn className="h-3.5 w-3.5" />
                  Connexion
                </Button>
              </Link>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/cv-generator"
                onClick={() => setIsMobileOpen(false)}
              >
                <Button size="sm" className="w-full mt-2">
                  CV Generator
                </Button>
              </Link>
              {isLoggedIn ? (
                <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
                  <div className="flex items-center gap-2 flex-1">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate">{user?.name}</span>
                  </div>
                  {isAdminUser && (
                    <Link href="/admin" onClick={() => setIsMobileOpen(false)}>
                      <Button variant="outline" size="sm" className="gap-1 text-xs">
                        <Shield className="h-3 w-3" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ) : (
                <Link href="/auth/login" onClick={() => setIsMobileOpen(false)} className="block pt-2 border-t border-border mt-2">
                  <Button variant="outline" size="sm" className="w-full gap-1.5">
                    <LogIn className="h-3.5 w-3.5" />
                    Connexion
                  </Button>
                </Link>
              )}
              <div className="flex items-center gap-2 pt-2 border-t border-border mt-2">
                <div className="flex gap-1">
                  {currencies.map((c) => (
                    <Button
                      key={c}
                      variant={currency === c ? "default" : "ghost"}
                      size="sm"
                      className="text-xs"
                      onClick={() => setCurrency(c)}
                    >
                      {c}
                    </Button>
                  ))}
                </div>
                {mounted && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 ml-auto"
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    {theme === "dark" ? (
                      <Sun className="h-4 w-4" />
                    ) : (
                      <Moon className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

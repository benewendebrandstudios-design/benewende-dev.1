"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Crown,
  FileText,
  Loader2,
  Smartphone,
  Sparkles,
  Shield,
  CreditCard,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const PLANS = [
  {
    id: "cv-pro",
    name: "CV Pro",
    price: "3 000 FCFA",
    priceNum: 3000,
    period: "par CV",
    description: "Créez un CV professionnel optimisé",
    features: [
      "Templates premium",
      "Suggestions IA",
      "Optimisation ATS",
      "Export PDF haute qualité",
    ],
    icon: Sparkles,
    popular: true,
  },
  {
    id: "cv-business",
    name: "CV Business",
    price: "30 000 FCFA",
    priceNum: 30000,
    period: "par mois",
    description: "CV illimités pour les professionnels",
    features: [
      "Tout dans Pro",
      "CV illimités",
      "Support prioritaire",
      "Modèles exclusifs",
      "Personnalisation avancée",
    ],
    icon: Shield,
    popular: false,
  },
];

const PAYMENT_METHODS = [
  {
    id: "orange",
    name: "Orange Money",
    icon: "🟧",
    countries: ["BF", "CI", "SN", "ML"],
    color: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
  },
  {
    id: "moov",
    name: "Moov Money",
    icon: "🟦",
    countries: ["BF", "CI", "BJ", "TG"],
    color: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
  },
  {
    id: "mtn",
    name: "MTN MoMo",
    icon: "🟨",
    countries: ["CI", "GH", "CM"],
    color: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20",
  },
  {
    id: "wave",
    name: "Wave",
    icon: "🌊",
    countries: ["SN", "CI", "BF", "ML"],
    color: "from-cyan-500/20 to-cyan-500/5 border-cyan-500/20",
  },
  {
    id: "card",
    name: "Carte bancaire",
    icon: "💳",
    countries: ["ALL"],
    color: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
  },
];

export default function PaymentPage() {
  const [selectedPlan, setSelectedPlan] = useState<string>("cv-pro");
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    if (!selectedPlan || !selectedMethod) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/payment/init", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId: selectedPlan }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'initialisation");
        return;
      }

      // Redirect to CinetPay payment page
      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      }
    } catch {
      setError("Erreur de connexion. Vérifiez votre réseau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 h-16">
            <Link href="/cv-generator">
              <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <CreditCard className="h-4 w-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-sm font-bold tracking-tight">Paiement</h1>
                <p className="text-xs text-muted-foreground">
                  Mobile Money &amp; Carte bancaire
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Step 1: Choose Plan */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              1
            </div>
            <h2 className="text-lg font-bold">Choisir votre plan</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative text-left p-5 rounded-2xl border-2 transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "border-primary bg-primary/5 shadow-lg shadow-primary/10"
                    : "border-border/50 hover:border-primary/30 bg-card"
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-2.5 left-4 bg-primary text-primary-foreground text-[10px] gap-0.5">
                    <Zap className="h-2.5 w-2.5" /> Populaire
                  </Badge>
                )}
                <div className="flex items-start justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                    <plan.icon className="h-5 w-5 text-primary" />
                  </div>
                  {selectedPlan === plan.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-6 w-6 rounded-full bg-primary flex items-center justify-center"
                    >
                      <Check className="h-3.5 w-3.5 text-primary-foreground" />
                    </motion.div>
                  )}
                </div>
                <h3 className="font-bold text-base mb-1">{plan.name}</h3>
                <p className="text-xs text-muted-foreground mb-3">{plan.description}</p>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-2xl font-extrabold text-primary">{plan.price}</span>
                  <span className="text-xs text-muted-foreground">/{plan.period}</span>
                </div>
                <ul className="space-y-2">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <div className="h-4 w-4 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <Check className="h-2.5 w-2.5 text-primary" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Step 2: Payment Method */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              2
            </div>
            <h2 className="text-lg font-bold">Mode de paiement</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`relative p-4 rounded-2xl border-2 transition-all duration-300 text-center ${
                  selectedMethod === method.id
                    ? `border-primary bg-gradient-to-br ${method.color} shadow-md`
                    : "border-border/50 hover:border-primary/30 bg-card"
                }`}
              >
                <div className="text-2xl mb-2">{method.icon}</div>
                <p className="text-xs font-semibold">{method.name}</p>
                {selectedMethod === method.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1.5 right-1.5 h-5 w-5 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="h-3 w-3 text-primary-foreground" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4 p-3 rounded-xl bg-muted/50">
            <Smartphone className="h-4 w-4 text-muted-foreground shrink-0" />
            <p className="text-xs text-muted-foreground">
              Paiement sécurisé via CinetPay. Vous recevrez une demande de confirmation sur votre téléphone.
            </p>
          </div>
        </motion.div>

        {/* Step 3: Confirm */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              3
            </div>
            <h2 className="text-lg font-bold">Confirmer</h2>
          </div>

          <div className="rounded-2xl border border-border/50 bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm font-semibold">
                    {PLANS.find((p) => p.id === selectedPlan)?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {PLANS.find((p) => p.id === selectedPlan)?.description}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">
                  {PLANS.find((p) => p.id === selectedPlan)?.price}
                </p>
                <p className="text-[10px] text-muted-foreground uppercase">
                  {PLANS.find((p) => p.id === selectedPlan)?.period}
                </p>
              </div>
            </div>

            {selectedMethod && (
              <div className="flex items-center gap-2 mb-4 p-2.5 rounded-xl bg-muted/50">
                <span className="text-lg">
                  {PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.icon}
                </span>
                <span className="text-sm font-medium">
                  {PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.name}
                </span>
              </div>
            )}

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                {error}
              </div>
            )}

            <Button
              className="w-full h-12 rounded-xl text-sm font-semibold gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
              onClick={handlePay}
              disabled={!selectedMethod || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Crown className="h-4 w-4" />
              )}
              {isLoading
                ? "Redirection vers CinetPay..."
                : `Payer ${PLANS.find((p) => p.id === selectedPlan)?.price}`}
            </Button>

            <div className="flex items-center justify-center gap-4 mt-4">
              <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                <Shield className="h-3 w-3" /> Paiement sécurisé
              </span>
              <span className="text-[10px] text-muted-foreground">•</span>
              <span className="text-[10px] text-muted-foreground">
                Propulsé par CinetPay
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

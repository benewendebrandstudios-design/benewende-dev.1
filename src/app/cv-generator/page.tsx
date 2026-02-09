"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  Save,
  ArrowLeft,
  Crown,
  Check,
  FileText,
  Sparkles,
  Eye,
  MessageSquare,
  Zap,
  Shield,
  Palette,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import CVChat from "@/components/cv/CVChat";
import CVPreview from "@/components/cv/CVPreview";
import { CVData, defaultCVData, cvTemplates, chatSteps } from "@/lib/cv/templates";
import { useCurrency } from "@/components/currency-provider";

export default function CVGeneratorPage() {
  const [cvData, setCvData] = useState<CVData>({ ...defaultCVData });
  const [selectedTemplate, setSelectedTemplate] = useState("modern");
  const [isComplete, setIsComplete] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { currency } = useCurrency();

  const totalSteps = chatSteps.length - 2;
  const progress = useMemo(
    () => Math.min(Math.round((currentStep / totalSteps) * 100), 100),
    [currentStep, totalSteps]
  );

  const priceLabels: Record<string, string> = {
    XOF: "3 000 FCFA",
    EUR: "5€",
    USD: "$5",
  };
  const businessLabels: Record<string, string> = {
    XOF: "30 000 FCFA",
    EUR: "50€",
    USD: "$50",
  };

  const [isPdfLoading, setIsPdfLoading] = useState(false);

  const handleDownloadPDF = async () => {
    setIsPdfLoading(true);
    try {
      const { generateCVPdf } = await import("@/lib/generatePDF");
      const fileName = cvData.personalInfo.fullName
        ? `CV-${cvData.personalInfo.fullName.replace(/\s+/g, "_")}`
        : "CV-Benewende";
      await generateCVPdf("cv-preview-content", fileName);
    } catch (err) {
      console.error("PDF generation error:", err);
      alert("Erreur lors de la génération du PDF. Utilisez Ctrl+P (Cmd+P) comme alternative.");
    } finally {
      setIsPdfLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="h-9 w-9 rounded-full">
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-sm font-bold tracking-tight flex items-center gap-2">
                    CV Generator
                    <Badge variant="secondary" className="text-[10px] gap-0.5 font-medium">
                      <Sparkles className="h-2.5 w-2.5" /> IA
                    </Badge>
                  </h1>
                  <p className="text-xs text-muted-foreground">
                    &Eacute;tape {Math.min(currentStep, totalSteps)}/{totalSteps}
                  </p>
                </div>
              </div>
            </div>

            {/* Progress bar - center */}
            <div className="hidden md:flex items-center gap-3 flex-1 max-w-xs mx-8">
              <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground w-8">{progress}%</span>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden gap-1.5 rounded-full"
                onClick={() => setShowPreview(!showPreview)}
              >
                {showPreview ? (
                  <><MessageSquare className="h-3.5 w-3.5" /> Chat</>
                ) : (
                  <><Eye className="h-3.5 w-3.5" /> Aper&ccedil;u</>
                )}
              </Button>

              <AnimatePresence>
                {isComplete && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-2"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 hidden sm:flex rounded-full"
                    >
                      <Save className="h-3.5 w-3.5" />
                      Sauvegarder
                    </Button>
                    <Button
                      size="sm"
                      className="gap-1.5 rounded-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      onClick={handleDownloadPDF}
                      disabled={isPdfLoading}
                    >
                      {isPdfLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                      <span className="hidden sm:inline">{isPdfLoading ? "G\u00e9n\u00e9ration..." : "T\u00e9l\u00e9charger"}</span> {!isPdfLoading && "PDF"}
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile progress bar */}
          <div className="md:hidden pb-2">
            <div className="h-1 bg-muted rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Template selector - sleeker horizontal scroll */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4 text-muted-foreground" />
              <h2 className="text-sm font-semibold">Choisir un template</h2>
            </div>
            <Badge variant="outline" className="text-[10px]">
              {cvTemplates.length} templates
            </Badge>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
            {cvTemplates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => setSelectedTemplate(tmpl.id)}
                className={`group relative shrink-0 rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                  selectedTemplate === tmpl.id
                    ? "border-primary shadow-lg shadow-primary/10 scale-[1.02]"
                    : "border-border/50 hover:border-primary/30 hover:shadow-md"
                }`}
              >
                <div
                  className={`w-28 h-36 bg-gradient-to-br ${tmpl.previewColor} flex items-center justify-center p-3`}
                >
                  <div className="bg-white/95 rounded-lg p-2 w-full shadow-sm">
                    <div className="h-1.5 bg-gray-400/60 rounded-full mb-1.5 w-3/4" />
                    <div className="h-0.5 bg-gray-300/60 rounded-full mb-1 w-full" />
                    <div className="h-0.5 bg-gray-300/60 rounded-full mb-1.5 w-2/3" />
                    <div className="space-y-0.5">
                      <div className="h-0.5 bg-gray-200/60 rounded-full" />
                      <div className="h-0.5 bg-gray-200/60 rounded-full w-5/6" />
                      <div className="h-0.5 bg-gray-200/60 rounded-full w-full" />
                    </div>
                  </div>
                </div>
                <div className="px-3 py-2.5 bg-card text-center">
                  <p className="text-xs font-semibold">{tmpl.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{tmpl.description}</p>
                  {tmpl.isPremium && (
                    <Badge
                      variant="secondary"
                      className="text-[10px] mt-1.5 gap-0.5 bg-amber-500/10 text-amber-600 border-amber-500/20"
                    >
                      <Crown className="h-2.5 w-2.5" />
                      Premium
                    </Badge>
                  )}
                </div>
                {selectedTemplate === tmpl.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow-lg"
                  >
                    <Check className="h-3.5 w-3.5 text-primary-foreground" />
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Main content - Chat + Preview */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6 min-h-[calc(100vh-260px)]">
          {/* Chat panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className={`bg-card/80 backdrop-blur-sm border border-border/50 rounded-2xl overflow-hidden shadow-sm ${
              showPreview ? "hidden lg:flex lg:flex-col" : "flex flex-col"
            }`}
          >
            <CVChat
              cvData={cvData}
              onUpdateCV={setCvData}
              onComplete={() => setIsComplete(true)}
              onStepChange={setCurrentStep}
            />
          </motion.div>

          {/* Preview panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className={`bg-muted/20 border border-border/50 rounded-2xl overflow-hidden shadow-sm ${
              !showPreview ? "hidden lg:block" : "block"
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border/50 bg-card/50">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-semibold">Aper&ccedil;u en direct</span>
              </div>
              <Badge variant="outline" className="text-[10px] gap-1">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
                Live
              </Badge>
            </div>
            <CVPreview data={cvData} template={selectedTemplate} />
          </motion.div>
        </div>

        {/* Bottom pricing bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-r from-card via-card to-card/80 p-6">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/[0.03] via-transparent to-primary/[0.03]" />
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Choisissez votre plan</p>
                  <p className="text-xs text-muted-foreground">
                    Templates premium, optimisation ATS et suggestions IA
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 sm:gap-4">
                {[
                  {
                    name: "Gratuit",
                    price: "0",
                    desc: "1 CV basique",
                    icon: FileText,
                    active: false,
                  },
                  {
                    name: "Pro",
                    price: priceLabels[currency],
                    desc: "par CV",
                    icon: Sparkles,
                    active: true,
                  },
                  {
                    name: "Business",
                    price: `${businessLabels[currency]}/mois`,
                    desc: "Illimité",
                    icon: Shield,
                    active: false,
                  },
                ].map((plan) => (
                  <div
                    key={plan.name}
                    className={`text-center px-4 py-3 rounded-xl transition-all ${
                      plan.active
                        ? "bg-primary/10 border border-primary/20 shadow-sm"
                        : "bg-muted/50 border border-transparent"
                    }`}
                  >
                    <plan.icon className={`h-4 w-4 mx-auto mb-1 ${plan.active ? "text-primary" : "text-muted-foreground"}`} />
                    <div className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">
                      {plan.name}
                    </div>
                    <div className={`text-sm font-bold ${plan.active ? "text-primary" : ""}`}>
                      {plan.price}
                    </div>
                    <div className="text-[10px] text-muted-foreground">{plan.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

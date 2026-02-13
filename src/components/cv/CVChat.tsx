"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Wand2, Loader2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CVData, chatSteps } from "@/lib/cv/templates";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  isAI?: boolean;
  tip?: string;
}

interface CVChatProps {
  cvData: CVData;
  onUpdateCV: (data: CVData) => void;
  onComplete: () => void;
  onStepChange?: (step: number) => void;
}

function findStepIndex(id: string): number {
  return chatSteps.findIndex((s) => s.id === id);
}

function isYes(v: string): boolean {
  const l = v.trim().toLowerCase();
  return l === "oui" || l === "o" || l === "yes" || l === "y";
}

function isSkip(v: string): boolean {
  const l = v.trim().toLowerCase();
  return !l || l === "passer" || l === "skip" || l === "-";
}

export default function CVChat({ cvData, onUpdateCV, onComplete, onStepChange }: CVChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: chatSteps[0].message },
    { id: "step-1", role: "assistant", content: chatSteps[1].message, tip: chatSteps[1].tip },
  ]);
  const [currentStepIdx, setCurrentStepIdx] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);

  // Track current entry index for loops
  const [expIdx, setExpIdx] = useState(0);
  const [eduIdx, setEduIdx] = useState(0);
  const [skillIdx, setSkillIdx] = useState(0);
  const [certIdx, setCertIdx] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStepIdx]);

  const goToStep = useCallback((idx: number) => {
    setCurrentStepIdx(idx);
    onStepChange?.(idx);
  }, [onStepChange]);

  const processInput = (value: string) => {
    const step = chatSteps[currentStepIdx];
    if (!step || !step.field) return;

    const newData = JSON.parse(JSON.stringify(cvData)) as CVData;

    // Personal info
    if (step.field === "personalInfo.fullName") newData.personalInfo.fullName = value;
    else if (step.field === "personalInfo.title") newData.personalInfo.title = value;
    else if (step.field === "personalInfo.email") newData.personalInfo.email = value;
    else if (step.field === "personalInfo.phone") newData.personalInfo.phone = value;
    else if (step.field === "personalInfo.location") newData.personalInfo.location = value;
    else if (step.field === "personalInfo.linkedin") newData.personalInfo.linkedin = value;
    else if (step.field === "personalInfo.github") newData.personalInfo.github = value;
    else if (step.field === "personalInfo.website") newData.personalInfo.website = value;
    else if (step.field === "personalInfo.summary") newData.personalInfo.summary = value;

    // Experience (dynamic index)
    else if (step.field === "experience.title") {
      if (!newData.experiences[expIdx]) {
        newData.experiences[expIdx] = { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [] };
      }
      newData.experiences[expIdx].title = value;
    }
    else if (step.field === "experience.company") {
      if (newData.experiences[expIdx]) newData.experiences[expIdx].company = value;
    }
    else if (step.field === "experience.location") {
      if (newData.experiences[expIdx]) newData.experiences[expIdx].location = value;
    }
    else if (step.field === "experience.period") {
      if (newData.experiences[expIdx]) {
        const parts = value.split("-").map((s) => s.trim());
        newData.experiences[expIdx].startDate = parts[0] || value;
        newData.experiences[expIdx].endDate = parts[1] || "Présent";
        newData.experiences[expIdx].current = !parts[1] || parts[1].toLowerCase().includes("présent") || parts[1].toLowerCase().includes("present");
      }
    }
    else if (step.field === "experience.achievements") {
      if (newData.experiences[expIdx]) {
        const items = value.split(",").map((s) => s.trim()).filter(Boolean);
        newData.experiences[expIdx].achievements = items;
        newData.experiences[expIdx].description = items[0] || "";
      }
    }

    // Education (dynamic index)
    else if (step.field === "education.degree") {
      if (!newData.education[eduIdx]) {
        newData.education[eduIdx] = { degree: "", school: "", location: "", startDate: "", endDate: "" };
      }
      newData.education[eduIdx].degree = value;
    }
    else if (step.field === "education.school") {
      if (newData.education[eduIdx]) newData.education[eduIdx].school = value;
    }
    else if (step.field === "education.location") {
      if (newData.education[eduIdx]) newData.education[eduIdx].location = value;
    }
    else if (step.field === "education.period") {
      if (newData.education[eduIdx]) {
        const parts = value.split("-").map((s) => s.trim());
        newData.education[eduIdx].startDate = parts[0] || value;
        newData.education[eduIdx].endDate = parts[1] || parts[0] || value;
      }
    }

    // Skills (dynamic index)
    else if (step.field === "skills.category") {
      if (!newData.skills[skillIdx]) {
        newData.skills[skillIdx] = { category: "", items: [] };
      }
      newData.skills[skillIdx].category = value;
    }
    else if (step.field === "skills.items") {
      if (newData.skills[skillIdx]) {
        newData.skills[skillIdx].items = value.split(",").map((s) => s.trim()).filter(Boolean);
      }
    }

    // Languages
    else if (step.field === "languages") {
      newData.languages = value.split(",").map((l) => {
        const parts = l.trim().split("-").map((p) => p.trim());
        return { name: parts[0] || "", level: parts[1] || "Courant" };
      });
    }

    // Certifications (dynamic index)
    else if (step.field === "certification.name") {
      if (!newData.certifications) newData.certifications = [];
      if (!newData.certifications[certIdx]) {
        newData.certifications[certIdx] = { name: "", issuer: "", date: "" };
      }
      newData.certifications[certIdx].name = value;
    }
    else if (step.field === "certification.issuer") {
      if (newData.certifications?.[certIdx]) newData.certifications[certIdx].issuer = value;
    }
    else if (step.field === "certification.date") {
      if (newData.certifications?.[certIdx]) newData.certifications[certIdx].date = value;
    }

    onUpdateCV(newData);
  };

  const getNextStepIdx = (value: string): number => {
    const step = chatSteps[currentStepIdx];
    if (!step) return currentStepIdx + 1;

    // Handle optional fields: skip on empty/passer
    if (step.type === "optional" && isSkip(value)) {
      return currentStepIdx + 1;
    }

    // Handle confirm steps
    if (step.type === "confirm") {
      if (isYes(value)) {
        // Loop back or continue
        if (step.loopTo) {
          const loopIdx = findStepIndex(step.loopTo);
          if (loopIdx >= 0) {
            // Increment entry counters for loops
            if (step.id === "experience_more") setExpIdx((p) => p + 1);
            if (step.id === "education_more") setEduIdx((p) => p + 1);
            if (step.id === "skills_more") setSkillIdx((p) => p + 1);
            if (step.id === "certification_more") setCertIdx((p) => p + 1);
            return loopIdx;
          }
        }
        return currentStepIdx + 1;
      } else {
        // Skip to designated step
        if (step.skipTo) {
          const skipIdx = findStepIndex(step.skipTo);
          if (skipIdx >= 0) return skipIdx;
        }
        return currentStepIdx + 1;
      }
    }

    return currentStepIdx + 1;
  };

  const handleSend = () => {
    if (!inputValue.trim() && chatSteps[currentStepIdx]?.type !== "optional") return;

    const val = inputValue.trim();
    const userMsg: Message = { id: `user-${Date.now()}`, role: "user", content: val || "(passé)" };
    setMessages((prev) => [...prev, userMsg]);

    // Process optional: don't save if skipped
    const step = chatSteps[currentStepIdx];
    if (step?.type === "optional" && isSkip(val)) {
      // Don't process, just advance
    } else if (step?.field) {
      processInput(val);
    }

    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const nextIdx = getNextStepIdx(val);

      if (nextIdx < chatSteps.length) {
        const nextStep = chatSteps[nextIdx];
        setMessages((prev) => [
          ...prev,
          { id: `assistant-${Date.now()}`, role: "assistant", content: nextStep.message, tip: nextStep.tip },
        ]);
        goToStep(nextIdx);
        if (nextStep.id === "complete") {
          onComplete();
        }
      }
      setIsTyping(false);
    }, 700);
  };

  const handleAISuggestion = async () => {
    const step = chatSteps[currentStepIdx];
    if (!step) return;
    setIsAILoading(true);
    try {
      const prompt = step.field === "personalInfo.summary"
        ? `Génère un résumé professionnel percutant de 3-4 phrases pour un CV. Le candidat s'appelle ${cvData.personalInfo.fullName || "le candidat"}, il est ${cvData.personalInfo.title || "professionnel"}. Sois concis et impactant.`
        : step.field === "skills.items"
        ? `Suggère 6-10 compétences clés pour un ${cvData.personalInfo.title || "professionnel"} dans la catégorie "${cvData.skills[skillIdx]?.category || "Général"}". Donne juste les noms séparés par des virgules.`
        : step.field === "experience.achievements"
        ? `Suggère 3-5 réalisations professionnelles percutantes pour un ${cvData.personalInfo.title || "professionnel"} chez ${cvData.experiences[expIdx]?.company || "une entreprise"}. Format: phrases courtes séparées par des virgules. Quantifie les résultats.`
        : `Aide-moi pour: "${step.message}". Contexte: ${cvData.personalInfo.title || "professionnel"}.`;

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }], context: cvData.personalInfo }),
      });
      if (res.ok) {
        const { content } = await res.json();
        setMessages((prev) => [...prev, { id: `ai-${Date.now()}`, role: "assistant", content: `✨ Suggestion IA :\n${content}\n\nVous pouvez utiliser cette suggestion telle quelle ou la modifier.`, isAI: true }]);
        setInputValue(content);
      } else {
        setMessages((prev) => [...prev, { id: `ai-err-${Date.now()}`, role: "assistant", content: "Le service IA n'est pas disponible pour le moment. Continuez manuellement.", isAI: true }]);
      }
    } catch {
      setMessages((prev) => [...prev, { id: `ai-err-${Date.now()}`, role: "assistant", content: "Erreur de connexion au service IA.", isAI: true }]);
    } finally {
      setIsAILoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const currentStep = chatSteps[currentStepIdx];
  const canUseAI = currentStep?.field === "personalInfo.summary" || currentStep?.field === "skills.items" || currentStep?.field === "experience.achievements";
  const isCompleted = currentStep?.id === "complete";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Assistant CV</h3>
            <p className="text-[11px] text-muted-foreground">Propulsé par IA</p>
          </div>
        </div>
        {canUseAI && (
          <Button variant="outline" size="sm" className="gap-1.5 text-xs rounded-full border-primary/20 text-primary hover:bg-primary/5" onClick={handleAISuggestion} disabled={isAILoading}>
            {isAILoading ? <Loader2 className="h-3 w-3 animate-spin" /> : <Wand2 className="h-3 w-3" />}
            Suggestion IA
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
              {msg.role === "assistant" && (
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${msg.isAI ? "bg-gradient-to-br from-amber-500/20 to-amber-500/5" : "bg-gradient-to-br from-primary/20 to-primary/5"}`}>
                  {msg.isAI ? <Wand2 className="h-3.5 w-3.5 text-amber-500" /> : <Bot className="h-3.5 w-3.5 text-primary" />}
                </div>
              )}
              <div className="max-w-[80%]">
                <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${msg.role === "user" ? "bg-primary text-primary-foreground rounded-br-md" : msg.isAI ? "bg-amber-500/5 border border-amber-500/10 rounded-bl-md" : "bg-muted rounded-bl-md"}`} style={{ whiteSpace: "pre-line" }}>
                  {msg.content}
                </div>
                {msg.tip && (
                  <div className="flex items-start gap-1.5 mt-1.5 px-2">
                    <Lightbulb className="h-3 w-3 text-amber-500 mt-0.5 shrink-0" />
                    <p className="text-[10px] text-muted-foreground leading-relaxed">{msg.tip}</p>
                  </div>
                )}
              </div>
              {msg.role === "user" && (
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/5 flex items-center justify-center shrink-0">
                  <User className="h-3.5 w-3.5 text-secondary" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
              <Bot className="h-3.5 w-3.5 text-primary" />
            </div>
            <div className="bg-muted rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce" />
                <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.15s]" />
                <span className="h-2 w-2 bg-muted-foreground/40 rounded-full animate-bounce [animation-delay:0.3s]" />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border/50 bg-card/50">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={currentStep?.placeholder || "Tapez votre réponse..."}
            disabled={isCompleted}
            className="flex-1 rounded-xl border-border/50 focus-visible:ring-primary/30"
          />
          <Button onClick={handleSend} disabled={(!inputValue.trim() && currentStep?.type !== "optional") || isCompleted} size="icon" className="rounded-xl shrink-0">
            <Send className="h-4 w-4" />
          </Button>
        </div>
        {currentStep?.type === "optional" && (
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">Champ optionnel — appuyez Entrée pour passer</p>
        )}
        {currentStep?.type === "confirm" && (
          <p className="text-[10px] text-muted-foreground mt-1.5 text-center">Tapez « oui » ou « non »</p>
        )}
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, Sparkles, Wand2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CVData, chatSteps } from "@/lib/cv/templates";

interface Message {
  id: string;
  role: "assistant" | "user";
  content: string;
  isAI?: boolean;
}

interface CVChatProps {
  cvData: CVData;
  onUpdateCV: (data: CVData) => void;
  onComplete: () => void;
  onStepChange?: (step: number) => void;
}

export default function CVChat({ cvData, onUpdateCV, onComplete, onStepChange }: CVChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: chatSteps[0].message,
    },
    {
      id: "step-1",
      role: "assistant",
      content: chatSteps[1].message,
    },
  ]);
  const [currentStep, setCurrentStep] = useState(1);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [currentStep]);

  const updateStep = useCallback((step: number) => {
    setCurrentStep(step);
    onStepChange?.(step);
  }, [onStepChange]);

  const processInput = (value: string) => {
    const step = chatSteps[currentStep];
    if (!step) return;

    const newData = { ...cvData };

    // Personal info fields
    if (step.field === "personalInfo.fullName") {
      newData.personalInfo = { ...newData.personalInfo, fullName: value };
    } else if (step.field === "personalInfo.title") {
      newData.personalInfo = { ...newData.personalInfo, title: value };
    } else if (step.field === "personalInfo.email") {
      newData.personalInfo = { ...newData.personalInfo, email: value };
    } else if (step.field === "personalInfo.phone") {
      newData.personalInfo = { ...newData.personalInfo, phone: value };
    } else if (step.field === "personalInfo.location") {
      newData.personalInfo = { ...newData.personalInfo, location: value };
    } else if (step.field === "personalInfo.summary") {
      newData.personalInfo = { ...newData.personalInfo, summary: value };
    }
    // Experience fields
    else if (step.field === "experiences[0].title") {
      const exp = newData.experiences[0] || { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [] };
      exp.title = value;
      newData.experiences = [exp];
    } else if (step.field === "experiences[0].company") {
      const exp = newData.experiences[0] || { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [] };
      exp.company = value;
      newData.experiences = [exp];
    } else if (step.field === "experiences[0].startDate") {
      const exp = newData.experiences[0] || { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [] };
      const parts = value.split("-").map((s) => s.trim());
      exp.startDate = parts[0] || value;
      exp.endDate = parts[1] || "Pr\u00e9sent";
      exp.current = (parts[1] || "").toLowerCase().includes("pr\u00e9sent") || (parts[1] || "").toLowerCase().includes("present") || !parts[1];
      newData.experiences = [exp];
    } else if (step.field === "experiences[0].achievements") {
      const exp = newData.experiences[0] || { title: "", company: "", location: "", startDate: "", endDate: "", current: false, description: "", achievements: [] };
      exp.achievements = value.split(",").map((s) => s.trim()).filter(Boolean);
      exp.description = exp.achievements[0] || "";
      newData.experiences = [exp];
    }
    // Education fields
    else if (step.field === "education[0].degree") {
      const edu = newData.education[0] || { degree: "", school: "", location: "", startDate: "", endDate: "" };
      edu.degree = value;
      newData.education = [edu];
    } else if (step.field === "education[0].school") {
      const edu = newData.education[0] || { degree: "", school: "", location: "", startDate: "", endDate: "" };
      edu.school = value;
      newData.education = [edu];
    } else if (step.field === "education[0].startDate") {
      const edu = newData.education[0] || { degree: "", school: "", location: "", startDate: "", endDate: "" };
      const parts = value.split("-").map((s) => s.trim());
      edu.startDate = parts[0] || value;
      edu.endDate = parts[1] || parts[0] || value;
      newData.education = [edu];
    }
    // Skills
    else if (step.field === "skills") {
      const skillItems = value.split(",").map((s) => s.trim()).filter(Boolean);
      newData.skills = [{ category: "Comp\u00e9tences", items: skillItems }];
    }
    // Languages
    else if (step.field === "languages") {
      const langs = value.split(",").map((l) => {
        const parts = l.trim().split("-").map((p) => p.trim());
        return { name: parts[0] || "", level: parts[1] || "Courant" };
      });
      newData.languages = langs;
    }

    onUpdateCV(newData);
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, userMsg]);
    processInput(inputValue);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      let nextStepIndex = currentStep + 1;

      // Skip experience steps if user said no
      const step = chatSteps[currentStep];
      if (step?.id === "experience_ask" && inputValue.toLowerCase().startsWith("n")) {
        // Skip to education steps (find education_degree)
        const eduIdx = chatSteps.findIndex((s) => s.id === "education_degree");
        if (eduIdx > 0) nextStepIndex = eduIdx;
      }

      if (nextStepIndex < chatSteps.length) {
        const nextStep = chatSteps[nextStepIndex];
        setMessages((prev) => [
          ...prev,
          {
            id: `assistant-${Date.now()}`,
            role: "assistant",
            content: nextStep.message,
          },
        ]);
        updateStep(nextStepIndex);
        if (nextStep.id === "complete") {
          onComplete();
        }
      }
      setIsTyping(false);
    }, 800);
  };

  const handleAISuggestion = async () => {
    const step = chatSteps[currentStep];
    if (!step) return;

    setIsAILoading(true);
    try {
      const prompt = step.field === "personalInfo.summary"
        ? `Améliore ce résumé professionnel pour un CV. Le candidat s'appelle ${cvData.personalInfo.fullName || "le candidat"}, il est ${cvData.personalInfo.title || "professionnel"}. Génère un résumé de 3-4 phrases percutantes.`
        : step.field === "skills"
        ? `Suggère une liste de compétences clés pour un ${cvData.personalInfo.title || "professionnel"}. Donne juste les noms séparés par des virgules, 8-12 compétences.`
        : `Aide-moi pour la question: "${step.message}". Contexte: ${cvData.personalInfo.title || "professionnel"}.`;

      const res = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: prompt }],
          context: cvData.personalInfo,
        }),
      });

      if (res.ok) {
        const { content } = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-${Date.now()}`,
            role: "assistant",
            content: `✨ **Suggestion IA:** ${content}\n\nVous pouvez copier cette suggestion ou la modifier selon vos besoins.`,
            isAI: true,
          },
        ]);
        setInputValue(content);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            id: `ai-err-${Date.now()}`,
            role: "assistant",
            content: "Désolé, le service IA n'est pas disponible pour le moment. Vous pouvez continuer manuellement.",
            isAI: true,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: "assistant",
          content: "Erreur de connexion au service IA. Continuez manuellement.",
          isAI: true,
        },
      ]);
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

  const currentStepData = chatSteps[currentStep];
  const canUseAI = currentStepData?.field === "personalInfo.summary" || currentStepData?.field === "skills" || currentStepData?.field === "experiences[0].achievements";

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
            <Sparkles className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Assistant CV</h3>
            <p className="text-[11px] text-muted-foreground">
              Propulsé par IA
            </p>
          </div>
        </div>
        {canUseAI && (
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs rounded-full border-primary/20 text-primary hover:bg-primary/5"
            onClick={handleAISuggestion}
            disabled={isAILoading}
          >
            {isAILoading ? (
              <Loader2 className="h-3 w-3 animate-spin" />
            ) : (
              <Wand2 className="h-3 w-3" />
            )}
            Suggestions IA
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${
                msg.role === "user" ? "justify-end" : ""
              }`}
            >
              {msg.role === "assistant" && (
                <div className={`h-8 w-8 rounded-xl flex items-center justify-center shrink-0 ${
                  msg.isAI
                    ? "bg-gradient-to-br from-amber-500/20 to-amber-500/5"
                    : "bg-gradient-to-br from-primary/20 to-primary/5"
                }`}>
                  {msg.isAI ? (
                    <Wand2 className="h-3.5 w-3.5 text-amber-500" />
                  ) : (
                    <Bot className="h-3.5 w-3.5 text-primary" />
                  )}
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : msg.isAI
                    ? "bg-amber-500/5 border border-amber-500/10 rounded-bl-md"
                    : "bg-muted rounded-bl-md"
                }`}
              >
                {msg.content}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
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
            placeholder={currentStepData?.placeholder || "Tapez votre réponse..."}
            disabled={currentStepData?.id === "complete"}
            className="flex-1 rounded-xl border-border/50 focus-visible:ring-primary/30"
          />
          <Button
            onClick={handleSend}
            disabled={!inputValue.trim() || currentStepData?.id === "complete"}
            size="icon"
            className="rounded-xl shrink-0"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

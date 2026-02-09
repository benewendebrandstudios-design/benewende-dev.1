"use client";

import React, { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  Clock,
  ArrowRight,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type PaymentStatus = "PENDING" | "ACCEPTED" | "REFUSED" | "CANCELLED" | "loading" | "error";

const STATUS_CONFIG: Record<string, {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
}> = {
  ACCEPTED: {
    icon: CheckCircle2,
    title: "Paiement réussi !",
    description: "Votre paiement a été accepté. Vous pouvez maintenant accéder à toutes les fonctionnalités premium.",
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  REFUSED: {
    icon: XCircle,
    title: "Paiement refusé",
    description: "Le paiement n'a pas abouti. Veuillez vérifier votre solde et réessayer.",
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
  CANCELLED: {
    icon: XCircle,
    title: "Paiement annulé",
    description: "Vous avez annulé le paiement. Vous pouvez réessayer à tout moment.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  PENDING: {
    icon: Clock,
    title: "Paiement en cours...",
    description: "Votre paiement est en cours de traitement. Veuillez confirmer sur votre téléphone.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
};

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("tx");
  const [status, setStatus] = useState<PaymentStatus>("loading");

  useEffect(() => {
    if (!transactionId) {
      setStatus("error");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await fetch("/api/payment/check", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transactionId }),
        });
        if (res.ok) {
          const data = await res.json();
          setStatus(data.status);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    checkStatus();

    // Poll every 5s if still pending
    const interval = setInterval(async () => {
      if (status === "PENDING" || status === "loading") {
        await checkStatus();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [transactionId, status]);

  const config = STATUS_CONFIG[status] || STATUS_CONFIG.PENDING;
  const StatusIcon = config.icon;

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-xl font-bold mb-2">Erreur</h1>
          <p className="text-sm text-muted-foreground mb-6">
            Impossible de vérifier le statut du paiement.
          </p>
          <Link href="/payment">
            <Button className="rounded-full">Réessayer</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className={`h-20 w-20 rounded-full ${config.bg} flex items-center justify-center mx-auto mb-6`}
        >
          <StatusIcon className={`h-10 w-10 ${config.color}`} />
        </motion.div>

        <h1 className="text-2xl font-bold mb-2">{config.title}</h1>
        <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
          {config.description}
        </p>

        {transactionId && (
          <p className="text-[10px] text-muted-foreground mb-6 font-mono">
            Réf: {transactionId}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {status === "ACCEPTED" && (
            <Link href="/cv-generator">
              <Button className="rounded-full gap-2 bg-gradient-to-r from-primary to-primary/80">
                <FileText className="h-4 w-4" />
                Créer mon CV
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          )}
          {(status === "REFUSED" || status === "CANCELLED") && (
            <Link href="/payment">
              <Button className="rounded-full gap-2">
                Réessayer le paiement
              </Button>
            </Link>
          )}
          {status === "PENDING" && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              Vérification en cours...
            </div>
          )}
          <Link href="/">
            <Button variant="outline" className="rounded-full">
              Retour à l&apos;accueil
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default function PaymentStatusPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <PaymentStatusContent />
    </Suspense>
  );
}

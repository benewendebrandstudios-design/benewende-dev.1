"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";

interface SiteSettings {
  email?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  github?: string;
}

const defaultSettings: SiteSettings = {
  email: "benewende.dev@gmail.com",
  phone: "+226 07 26 71 19",
  whatsapp: "22607267119",
  location: "Ouagadougou, Burkina Faso",
  github: "https://github.com/benewendebrandstudios-design",
};

export default function PrintCard() {
  const [site, setSite] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    fetch("/api/content/settings")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.site) setSite({ ...defaultSettings, ...data.site });
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Print Button - hidden on print */}
      <div className="print:hidden max-w-2xl mx-auto mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Carte de visite — Benewende.dev</h1>
          <p className="text-sm text-gray-500">Format standard 85 &times; 55 mm &mdash; Recto / Verso</p>
        </div>
        <Button onClick={() => window.print()} className="gap-2">
          <Printer className="h-4 w-4" />
          Imprimer
        </Button>
      </div>

      {/* Cards Container */}
      <div className="max-w-2xl mx-auto space-y-8 print:space-y-4">

        {/* RECTO */}
        <div className="print:hidden text-xs font-medium text-gray-400 uppercase tracking-wider">Recto</div>
        <div
          id="card-front"
          className="relative mx-auto overflow-hidden bg-white shadow-lg print:shadow-none"
          style={{ width: "340px", height: "220px", borderRadius: "12px" }}
        >
          {/* Gradient background */}
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #a855f7 100%)" }} />

          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 20.5V18H0v-2h20v-2H0v-2h20v-2H0V8h20V6H0V4h20V2H0V0h22v20.5h2V0h2v20.5h2V0h2v20.5h2V0h2v20.5h2V0h2v22H20v-1.5z' fill='%23fff' fill-opacity='1'/%3E%3C/svg%3E")`,
          }} />

          {/* Content */}
          <div className="relative h-full flex flex-col justify-between p-6">
            {/* Top: Logo + Name */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <div>
                    <h2 className="text-white font-bold text-lg leading-tight">Benewende</h2>
                    <p className="text-white/70 text-[10px] font-medium tracking-wider">.dev</p>
                  </div>
                </div>
              </div>
              {/* Status dot */}
              <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1">
                <div className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-white/90 text-[9px] font-medium">Disponible</span>
              </div>
            </div>

            {/* Middle: Title */}
            <div>
              <p className="text-white/90 text-xs font-semibold">D&eacute;veloppeur Full Stack</p>
              <p className="text-white/60 text-[10px]">Cr&eacute;ateur de SaaS &middot; Expert IA</p>
            </div>

            {/* Bottom: Contact */}
            <div className="flex items-end justify-between">
              <div className="space-y-0.5">
                <p className="text-white/90 text-[10px] flex items-center gap-1.5">
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  {site.email}
                </p>
                <p className="text-white/90 text-[10px] flex items-center gap-1.5">
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" /></svg>
                  {site.phone}
                </p>
                <p className="text-white/70 text-[10px] flex items-center gap-1.5">
                  <svg className="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                  {site.location}
                </p>
              </div>

              {/* QR Code */}
              <div className="bg-white rounded-lg p-1.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=https://benewende.dev/card&color=6366f1&bgcolor=ffffff&format=svg"
                  alt="QR"
                  width={52}
                  height={52}
                />
              </div>
            </div>
          </div>
        </div>

        {/* VERSO */}
        <div className="print:hidden text-xs font-medium text-gray-400 uppercase tracking-wider mt-8">Verso</div>
        <div
          id="card-back"
          className="relative mx-auto overflow-hidden bg-white shadow-lg print:shadow-none"
          style={{ width: "340px", height: "220px", borderRadius: "12px" }}
        >
          {/* Light background */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />

          {/* Content */}
          <div className="relative h-full flex flex-col items-center justify-center p-6">
            {/* Large logo mark */}
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-3 shadow-lg shadow-indigo-500/20">
              <span className="text-white font-bold text-3xl">B</span>
            </div>

            <h3 className="text-gray-900 font-bold text-base">benewende.dev</h3>
            <p className="text-gray-400 text-[10px] mt-1 text-center max-w-[200px]">
              Je transforme vos id&eacute;es en produits digitaux performants
            </p>

            {/* Services tags */}
            <div className="flex flex-wrap gap-1.5 mt-4 justify-center">
              {["SaaS", "Web Apps", "Solutions IA", "CV Generator"].map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full text-[9px] font-medium bg-indigo-50 text-indigo-600 border border-indigo-100"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* WhatsApp */}
            <div className="mt-4 flex items-center gap-1.5 text-[10px] text-green-600 font-medium">
              <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.326 0-4.486-.7-6.29-1.9l-.438-.3-2.644.886.886-2.644-.3-.438A9.965 9.965 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
              </svg>
              WhatsApp: +226 07 26 71 19
            </div>
          </div>

          {/* Bottom accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: "linear-gradient(90deg, #6366f1, #a855f7, #6366f1)" }} />
        </div>
      </div>

      {/* Print-specific styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 10mm;
          }
          body {
            background: white !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          #card-front, #card-back {
            box-shadow: none !important;
            border: 1px solid #e5e7eb;
            page-break-inside: avoid;
          }
        }
      `}</style>
    </div>
  );
}

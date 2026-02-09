"use client";

import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";

export async function generateCVPdf(elementId: string, fileName: string = "CV") {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error("Élément CV introuvable");
  }

  // Temporarily make the element fully visible for capture
  const originalStyle = element.style.cssText;
  element.style.cssText = `
    position: absolute;
    left: -9999px;
    top: 0;
    width: 794px;
    min-height: 1123px;
    overflow: visible;
    background: white;
  `;
  document.body.appendChild(element.cloneNode(true));

  const clone = document.body.lastElementChild as HTMLElement;
  clone.id = "cv-pdf-clone";
  clone.style.cssText = `
    position: absolute;
    left: 0;
    top: 0;
    width: 794px;
    min-height: 1123px;
    overflow: visible;
    background: white;
    z-index: -1;
  `;

  element.style.cssText = originalStyle;

  try {
    const canvas = await html2canvas(clone, {
      scale: 2,
      useCORS: true,
      backgroundColor: "#ffffff",
      width: 794,
      windowWidth: 794,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = pdfWidth / (imgWidth / 2); // /2 because scale=2
    const totalHeight = (imgHeight / 2) * ratio;

    let position = 0;
    let remainingHeight = totalHeight;

    while (remainingHeight > 0) {
      if (position > 0) {
        pdf.addPage();
      }

      pdf.addImage(imgData, "PNG", 0, -position, pdfWidth, totalHeight);
      position += pdfHeight;
      remainingHeight -= pdfHeight;
    }

    pdf.save(`${fileName}.pdf`);
  } finally {
    clone.remove();
  }
}

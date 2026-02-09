"use client";

import { useState, useEffect } from "react";

export function useContent<T>(type: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    fetch(`/api/content/${type}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        if (!d) return;
        // Don't replace fallback with empty arrays or empty objects from DB
        if (Array.isArray(d) && d.length === 0) return;
        if (typeof d === "object" && !Array.isArray(d) && Object.keys(d).length === 0) return;
        setData(d);
      })
      .catch(() => {});
  }, [type]);

  return data;
}

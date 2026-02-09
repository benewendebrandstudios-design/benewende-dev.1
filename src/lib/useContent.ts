"use client";

import { useState, useEffect } from "react";

export function useContent<T>(type: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    fetch(`/api/content/${type}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => {
        // Don't replace fallback with empty arrays from DB
        if (d && !(Array.isArray(d) && d.length === 0)) {
          setData(d);
        }
      })
      .catch(() => {});
  }, [type]);

  return data;
}

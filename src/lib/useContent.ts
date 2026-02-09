"use client";

import { useState, useEffect } from "react";

export function useContent<T>(type: string, fallback: T): T {
  const [data, setData] = useState<T>(fallback);

  useEffect(() => {
    fetch(`/api/content/${type}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((d) => { if (d) setData(d); })
      .catch(() => {});
  }, [type]);

  return data;
}

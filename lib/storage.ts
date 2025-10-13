"use client";
import { Content, defaultContent } from "./content";

const KEY = "jasstejtrace.content.v1";

export function loadContent(): Content {
  if (typeof window === "undefined") return defaultContent;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultContent;
    return { ...defaultContent, ...JSON.parse(raw) } as Content;
  } catch {
    return defaultContent;
  }
}

export function saveContent(data: Content) {
  localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new CustomEvent("content:updated"));
}

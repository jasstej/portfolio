"use client";
import { createContext, useContext, useState, useCallback, useEffect } from "react";

export type Notice = { id: string; message: string; tone?: "success" | "info" | "error"; ttl?: number };
type Ctx = { push: (n: Omit<Notice, "id">) => void };
const NoticeCtx = createContext<Ctx | null>(null);

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Notice[]>([]);
  const push = useCallback((n: Omit<Notice, "id">) => {
    const id = crypto.randomUUID();
    const ttl = n.ttl ?? 4000;
    setItems((i) => [...i, { ...n, id, ttl }]);
    setTimeout(() => setItems((i) => i.filter((x) => x.id !== id)), ttl);
  }, []);

  return (
    <NoticeCtx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-4 left-4 z-[100] flex flex-col gap-2 max-w-sm">
        {items.map((n) => (
          <div
            key={n.id}
            className={`glass px-4 py-2 rounded-md border text-xs font-mono shadow-lg animate-slide-in-left ${
              n.tone === "error" ? "border-red-400/40 text-red-300" : n.tone === "success" ? "border-green-400/40 text-green-300" : "border-cyan-400/40 text-cyan-200"
            }`}
          >
            {n.message}
          </div>
        ))}
        <style>{`
          @keyframes slideInLeft { from { transform: translateX(-20px); opacity:0 } to { transform: translateX(0); opacity:1 } }
          .animate-slide-in-left { animation: slideInLeft .3s ease-out; }
        `}</style>
      </div>
    </NoticeCtx.Provider>
  );
}

export function useNotify() {
  return useContext(NoticeCtx) || { push: () => {} };
}

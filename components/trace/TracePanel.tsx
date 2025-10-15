"use client";
import { useEffect, useState } from "react";
import { loadContent, saveContent } from "@/lib/storage";
import { Achievement, Content, defaultContent } from "@/lib/content";
import { Button } from "@/components/ui/button";
import { useNotify } from "@/components/ui/notifications";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function TracePanel() {
  const [authorized, setAuthorized] = useState(false);
  const [state, setState] = useState<Content>(defaultContent);
  const notify = useNotify();

  useEffect(() => {
    const onUpdate = () => setState(loadContent());
    window.addEventListener("content:updated", onUpdate as any);
    return () => window.removeEventListener("content:updated", onUpdate as any);
  }, []);
  useEffect(() => {
    // Load content snapshot after mount to ensure parity with SSR
    setState(loadContent());
  }, []);

  useEffect(() => {
    const hint = localStorage.getItem("trace.pass");
    if (hint === "1") setAuthorized(true);
  }, []);

  const ask = () => {
    const p = prompt("Enter access key to unlock admin panel:");
    if ((p || "").trim() === (process.env.NEXT_PUBLIC_TRACE_KEY || "jasstej")) {
      setAuthorized(true);
      localStorage.setItem("trace.pass", "1");
    } else {
      alert("Access denied");
    }
  };

  const addAchievement = () => {
    const a: Achievement = {
      id: crypto.randomUUID(),
      title: "",
      issuer: "",
      imageUrl: "",
      verifyUrl: "",
      issuedOn: "",
      note: "",
    };
    setState((s) => ({ ...s, achievements: [a, ...s.achievements] }));
  };

  const save = () => {
    saveContent(state);
    notify.push({ message: "state persisted → local storage", tone: "success" });
  };

  if (!authorized) {
    return (
      <div className="min-h-screen grid place-items-center p-6">
        <Card className="max-w-md w-full glass">
          <CardHeader>
            <h1 className="font-display text-2xl">/trace</h1>
            <p className="text-white/60">Experimental control room</p>
          </CardHeader>
          <CardContent>
            <Button className="w-full" onClick={ask}>Unlock</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 max-w-6xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Hidden Update Panel</h1>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            onClick={() => {
              setState(loadContent());
              notify.push({ message: "state reloaded ↺", tone: "info" });
            }}
            className="hover:brightness-125 active:scale-95"
          >
            Reset
          </Button>
          <Button onClick={save} className="hover:brightness-125 active:scale-95">Save</Button>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Achievements</h2>
          <Button onClick={addAchievement}>Add</Button>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {state.achievements.map((a, idx) => (
            <Card key={a.id} className="glass">
              <CardContent className="space-y-3 pt-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Title</label>
                    <Input value={a.title} onChange={(e) => updateAch(idx, { title: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Issuer</label>
                    <Input value={a.issuer} onChange={(e) => updateAch(idx, { issuer: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Image URL</label>
                  <Input value={a.imageUrl} onChange={(e) => updateAch(idx, { imageUrl: e.target.value })} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Verify URL</label>
                    <Input value={a.verifyUrl || ""} onChange={(e) => updateAch(idx, { verifyUrl: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Issued On</label>
                    <Input value={a.issuedOn || ""} onChange={(e) => updateAch(idx, { issuedOn: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Note</label>
                  <Textarea value={a.note || ""} onChange={(e) => updateAch(idx, { note: e.target.value })} />
                </div>
                <div className="flex justify-end">
                  <Button variant="destructive" onClick={() => removeAch(idx)}>Remove</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-display text-2xl">Links</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(state.links).map(([k, v]) => (
            <div className="space-y-2" key={k}>
              <label className="text-xs text-white/60">{k}</label>
              <Input value={String(v)} onChange={(e) => setState((s) => ({ ...s, links: { ...s.links, [k]: e.target.value } as any }))} />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Skills</h2>
          <Button onClick={() => setState((s) => ({ ...s, skills: ["New Skill", ...s.skills] }))}>Add</Button>
        </div>
        <div className="space-y-2">
          {state.skills.map((skill, i) => (
            <div key={`${skill}-${i}`} className="flex gap-2 items-center">
              <Input value={skill} onChange={(e) => updateSkill(i, e.target.value)} />
              <Button variant="destructive" onClick={() => removeSkill(i)}>Remove</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl">Projects</h2>
          <Button onClick={addProject}>Add</Button>
        </div>
        <div className="space-y-4">
          {state.projects.map((p, i) => (
            <Card key={p.id} className="glass">
              <CardContent className="space-y-3 pt-6">
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Name</label>
                    <Input value={p.name} onChange={(e) => updateProject(i, { name: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Stack (comma separated)</label>
                    <Input value={p.stack.join(", ")} onChange={(e) => updateProject(i, { stack: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs text-white/60">Description</label>
                  <Textarea value={p.desc} onChange={(e) => updateProject(i, { desc: e.target.value })} />
                </div>
                <div className="grid md:grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">GitHub</label>
                    <Input value={p.github || ""} onChange={(e) => updateProject(i, { github: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs text-white/60">Demo</label>
                    <Input value={p.demo || ""} onChange={(e) => updateProject(i, { demo: e.target.value })} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <div className="text-xs text-white/40">id: {p.id}</div>
                  <Button variant="destructive" onClick={() => removeProject(i)}>Remove</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );

  function updateAch(i: number, patch: Partial<Achievement>) {
    setState((s) => {
      const arr = [...s.achievements];
      arr[i] = { ...arr[i], ...patch } as Achievement;
      return { ...s, achievements: arr };
    });
  }
  function removeAch(i: number) {
    setState((s) => ({ ...s, achievements: s.achievements.filter((_, idx) => idx !== i) }));
  }
  function updateSkill(i: number, value: string) {
    setState((s) => {
      const arr = [...s.skills];
      arr[i] = value;
      return { ...s, skills: arr };
    });
  }
  function removeSkill(i: number) {
    setState((s) => ({ ...s, skills: s.skills.filter((_, idx) => idx !== i) }));
  }
  function addProject() {
    setState((s) => ({
      ...s,
      projects: [
        { id: crypto.randomUUID(), name: "New Project", desc: "", stack: [], github: "", demo: "" },
        ...s.projects,
      ],
    }));
  }
  function updateProject(i: number, patch: Partial<Content["projects"][number]>) {
    setState((s) => {
      const arr = [...s.projects];
      arr[i] = { ...arr[i], ...patch };
      return { ...s, projects: arr };
    });
  }
  function removeProject(i: number) {
    setState((s) => ({ ...s, projects: s.projects.filter((_, idx) => idx !== i) }));
  }
}

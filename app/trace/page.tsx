import type { Metadata } from "next";
import TracePanel from "@/components/trace/TracePanel";

export const metadata: Metadata = { title: "trace — JasstejTrace.exe" };

export default function Trace() {
  return <TracePanel />;
}

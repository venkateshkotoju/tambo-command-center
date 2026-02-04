"use client";

import { useState } from "react";
import { TamboProvider, TamboRender, registerComponent } from "@tambo/react";

import PRAnalyzer from "@/components/PRAnalyzer";
import RiskPanel from "@/components/RiskPanel";
import DocsSnippet from "@/components/DocsSnippet";

// Register components with Tambo
registerComponent("pr_analyzer", PRAnalyzer);
registerComponent("risk_panel", RiskPanel);
registerComponent("docs_snippet", DocsSnippet);

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [componentName, setComponentName] = useState<string | null>(null);

  const decideComponent = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes("pull request")) return "pr_analyzer";
    if (lower.includes("risk")) return "risk_panel";
    if (lower.includes("doc")) return "docs_snippet";
    return null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const chosen = decideComponent(input);
    setComponentName(chosen);
  };

  return (
    <TamboProvider>
      <main className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-3xl font-bold">Tambo Command Center</h1>

        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Try: Analyze a pull request"
            className="flex-1 border rounded px-4 py-2"
          />
          <button
            type="submit"
            className="px-5 py-2 bg-black text-white rounded"
          >
            Go
          </button>
        </form>

        {componentName ? (
          <>
            <p className="text-sm text-gray-500">
              AI decided to show this UI:
            </p>
            <TamboRender component={componentName} />
          </>
        ) : (
          <p className="text-gray-400">No component selected yet</p>
        )}
      </main>
    </TamboProvider>
  );
}

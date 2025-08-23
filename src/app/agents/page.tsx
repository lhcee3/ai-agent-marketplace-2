"use client";

import { useState } from "react";

export default function AgentsPage() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch("/api/agents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image, description, systemPrompt }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || "Failed to create agent");
      setSuccess(`Agent "${data.agent.name}" created successfully`);
      setName("");
      setImage("");
      setDescription("");
      setSystemPrompt("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create agent");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header section matching Home/Marketplace vibes */}
      <section className="px-6 md:px-10 lg:px-16 xl:px-24 py-10 md:py-12">
        <div className="flex flex-col gap-2 mb-8">
          <h1 className="h3-work-sans text-[38px]">Create a new AI Agent</h1>
          <p className="body-work-sans text-[#858584] max-w-2xl">
            Provide a name, image URL, description, and an optional system prompt to guide your agent’s behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 items-start rounded-[20px] bg-[var(--background-secondary)] p-6 md:p-10">
          {/* Preview card */}
          <div className="rounded-[16px] overflow-hidden bg-background">
            <div className="relative aspect-[4/3] grid place-items-center text-[#858584]">
              {image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image} alt="Agent" className="object-cover w-full h-full" />
              ) : (
                <span>Image preview</span>
              )}
            </div>
            <div className="p-6">
              <div className="h5-work-sans text-[22px]">{name || "Agent Name"}</div>
              <p className="body-work-sans text-[#858584] mt-2 line-clamp-3 min-h-[3.6em]">
                {description || "Short description of what your agent does."}
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="block mb-2 body-space-mono text-sm text-[#858584]">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full h-12 rounded-[14px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                placeholder="e.g., Research Scholar"
              />
            </div>

            <div>
              <label className="block mb-2 body-space-mono text-sm text-[#858584]">Image URL</label>
              <input
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="w-full h-12 rounded-[14px] px-4 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                placeholder="https://..."
              />
              <p className="mt-2 text-xs text-[#858584]">Tip: You can also use our placeholders like /api/placeholder/chatbot</p>
            </div>

            <div>
              <label className="block mb-2 body-space-mono text-sm text-[#858584]">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full rounded-[14px] px-4 py-3 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                placeholder="What can this agent do?"
              />
            </div>

            <div>
              <label className="block mb-2 body-space-mono text-sm text-[#858584]">System Prompt (optional)</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={6}
                className="w-full rounded-[14px] px-4 py-3 bg-background text-white placeholder:text-[#858584] outline-none border border-white/10"
                placeholder="Instructions that define the agent’s persona and behavior."
              />
            </div>

            {error && (
              <div className="rounded-[12px] border border-red-500/40 bg-red-500/10 text-red-300 px-4 py-3">
                {error}
              </div>
            )}
            {success && (
              <div className="rounded-[12px] border border-green-500/40 bg-green-500/10 text-green-300 px-4 py-3">
                {success}
              </div>
            )}

            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-cta disabled:opacity-60"
              >
                {submitting ? "Creating…" : "Create Agent"}
              </button>
              <a href="/marketplace" className="inline-flex items-center justify-center h-12 px-6 rounded-[20px] bg-background">
                Cancel
              </a>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

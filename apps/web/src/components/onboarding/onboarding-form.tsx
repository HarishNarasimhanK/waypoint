"use client";

import { useState, useTransition } from "react";
import { completeOnboarding } from "@/actions/profile";

const SUGGESTED_ROLES = [
  "Software Engineer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "ML Engineer",
  "DevOps Engineer",
  "Mobile Developer",
  "Product Manager",
  "UI/UX Designer",
];

export function OnboardingForm() {
  const [pending, startTransition] = useTransition();
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [customRole, setCustomRole] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [fileName, setFileName] = useState("");

  function toggleRole(role: string) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  }

  function addCustomRole() {
    if (customRole.trim() && !selectedRoles.includes(customRole.trim())) {
      setSelectedRoles((prev) => [...prev, customRole.trim()]);
      setCustomRole("");
    }
  }

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    if (file.type === "application/pdf" || file.name.endsWith(".pdf")) {
      const pdfjs = await import("pdfjs-dist");
      pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const pages: string[] = [];
      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        pages.push(content.items.map((item) => ("str" in item ? item.str : "")).join(" "));
      }
      setResumeText(pages.join("\n"));
    } else {
      const text = await file.text();
      setResumeText(text);
    }
  }

  function handleSubmit(formData: FormData) {
    formData.set("roles", selectedRoles.join(","));
    formData.set("resumeText", resumeText);
    formData.set("resumeFileName", fileName);
    startTransition(() => completeOnboarding(formData));
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label className="text-sm font-semibold">
          What roles are you interested in?
        </label>
        <div className="flex flex-wrap gap-2">
          {SUGGESTED_ROLES.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => toggleRole(role)}
              className={`px-3 py-1.5 text-sm rounded-lg border transition-colors cursor-pointer ${
                selectedRoles.includes(role)
                  ? "bg-zinc-900 text-white border-zinc-900"
                  : "border-zinc-200 text-zinc-600 hover:border-zinc-300"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addCustomRole();
              }
            }}
            placeholder="Add a custom role..."
            className="flex-1 px-3 py-2 text-sm rounded-lg border border-zinc-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
          />
          <button
            type="button"
            onClick={addCustomRole}
            className="px-3 py-2 text-sm font-medium border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-colors cursor-pointer"
          >
            Add
          </button>
        </div>
        {selectedRoles.length > 0 && (
          <p className="text-xs text-zinc-500">
            Selected: {selectedRoles.join(", ")}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold">
          Upload your resume
        </label>
        <p className="text-xs text-zinc-500">
          We'll use this to match you with relevant jobs. Plain text or .txt files work best for now.
        </p>
        <div className="relative">
          <input
            type="file"
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileChange}
            className="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border file:border-zinc-200 file:text-sm file:font-medium file:bg-white file:text-zinc-700 file:cursor-pointer hover:file:bg-zinc-50"
          />
        </div>
        {fileName && (
          <p className="text-xs text-zinc-500">Uploaded: {fileName}</p>
        )}
        <div>
          <p className="text-xs text-zinc-500 mb-1.5">Or paste your resume text:</p>
          <textarea
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here..."
            className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
            rows={6}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <button
          type="submit"
          disabled={pending || selectedRoles.length === 0}
          className="px-6 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {pending ? "Setting up..." : "Get Started"}
        </button>
        <p className="text-xs text-zinc-400">You can update this anytime in settings.</p>
      </div>
    </form>
  );
}

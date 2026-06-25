"use client";

import { useState, useTransition } from "react";
import { updateProfile } from "@/actions/profile";

type Props = {
  user: {
    name: string;
    email: string;
    interestedRoles: string[];
    resumeText: string | null;
    resumeFileName: string | null;
  };
};

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

export function ProfileForm({ user }: Props) {
  const [pending, startTransition] = useTransition();
  const [selectedRoles, setSelectedRoles] = useState<string[]>(user.interestedRoles);
  const [customRole, setCustomRole] = useState("");
  const [resumeText, setResumeText] = useState(user.resumeText || "");
  const [fileName, setFileName] = useState(user.resumeFileName || "");
  const [saved, setSaved] = useState(false);

  function toggleRole(role: string) {
    setSelectedRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
    setSaved(false);
  }

  function addCustomRole() {
    if (customRole.trim() && !selectedRoles.includes(customRole.trim())) {
      setSelectedRoles((prev) => [...prev, customRole.trim()]);
      setCustomRole("");
      setSaved(false);
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
    setSaved(false);
  }

  function handleSubmit(formData: FormData) {
    formData.set("roles", selectedRoles.join(","));
    formData.set("resumeText", resumeText);
    formData.set("resumeFileName", fileName);
    startTransition(async () => {
      await updateProfile(formData);
      setSaved(true);
    });
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="space-y-3">
        <label htmlFor="name" className="text-sm font-semibold">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={user.name}
          className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 bg-white outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-semibold">Email</label>
        <p className="text-sm text-zinc-500">{user.email}</p>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold">
          Interested roles
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
        {selectedRoles.filter((r) => !SUGGESTED_ROLES.includes(r)).length > 0 && (
          <div className="flex flex-wrap gap-2">
            {selectedRoles
              .filter((r) => !SUGGESTED_ROLES.includes(r))
              .map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => toggleRole(role)}
                  className="px-3 py-1.5 text-sm rounded-lg border bg-zinc-900 text-white border-zinc-900 cursor-pointer"
                >
                  {role} ×
                </button>
              ))}
          </div>
        )}
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
      </div>

      <div className="space-y-3">
        <label className="text-sm font-semibold">
          Resume
        </label>
        {fileName && (
          <p className="text-xs text-zinc-500">Current file: {fileName}</p>
        )}
        <input
          type="file"
          accept=".txt,.pdf,.doc,.docx"
          onChange={handleFileChange}
          className="w-full text-sm file:mr-3 file:px-4 file:py-2 file:rounded-lg file:border file:border-zinc-200 file:text-sm file:font-medium file:bg-white file:text-zinc-700 file:cursor-pointer hover:file:bg-zinc-50"
        />
        <textarea
          value={resumeText}
          onChange={(e) => { setResumeText(e.target.value); setSaved(false); }}
          placeholder="Or paste your resume content..."
          className="w-full px-3 py-2.5 text-sm rounded-lg border border-zinc-200 outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
          rows={8}
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={pending}
          className="px-6 py-2.5 text-sm font-semibold bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer disabled:opacity-50"
        >
          {pending ? "Saving..." : "Save Changes"}
        </button>
        {saved && (
          <span className="text-sm text-emerald-600 font-medium">Saved</span>
        )}
      </div>
    </form>
  );
}

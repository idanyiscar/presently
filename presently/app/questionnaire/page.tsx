"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type FormData = {
  recipientName: string;
  relationship: string;
  occasion: string;
  ageRange: string;
  personality: string[];
  hobbies: string;
  favoriteThings: string;
  budget: string;
  notes: string;
};

const personalityOptions = [
  "Funny",
  "Warm",
  "Creative",
  "Elegant",
  "Adventurous",
  "Romantic",
  "Calm",
  "Trendy",
];

const totalSteps = 4;

export default function QuestionnairePage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>({
    recipientName: "",
    relationship: "",
    occasion: "",
    ageRange: "",
    personality: [],
    hobbies: "",
    favoriteThings: "",
    budget: "",
    notes: "",
  });

  const progress = useMemo(() => (step / totalSteps) * 100, [step]);

  function updateField<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function togglePersonality(value: string) {
    setForm((prev) => {
      const exists = prev.personality.includes(value);
      return {
        ...prev,
        personality: exists
          ? prev.personality.filter((item) => item !== value)
          : [...prev.personality, value],
      };
    });
  }

  function nextStep() {
    if (step < totalSteps) setStep((prev) => prev + 1);
  }

  function prevStep() {
    if (step > 1) setStep((prev) => prev - 1);
  }

  function canContinue() {
    if (step === 1) {
      return form.recipientName && form.relationship && form.occasion;
    }
    if (step === 2) {
      return form.ageRange && form.personality.length > 0;
    }
    if (step === 3) {
      return form.hobbies && form.budget;
    }
    return true;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-cyan-50 px-6 py-8 text-gray-900 md:px-12">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Present<span className="text-pink-500">ly</span>
          </Link>

          <div className="text-sm font-medium text-gray-500">
            Step {step} of {totalSteps}
          </div>
        </header>

        <div className="mb-8 overflow-hidden rounded-full bg-white shadow-sm ring-1 ring-pink-100">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr]">
          <section className="rounded-[32px] bg-white/90 p-6 shadow-xl ring-1 ring-white/70 backdrop-blur md:p-8">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-pink-500">
                Surprise questionnaire
              </p>
              <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">
                Tell us about your special person
              </h1>
              <p className="mt-3 max-w-2xl text-gray-600">
                A few quick answers will help shape a thoughtful surprise.
              </p>
            </div>

            {step === 1 && (
              <div className="space-y-5">
                <InputField
                  label="Recipient name"
                  placeholder="For example: Maya"
                  value={form.recipientName}
                  onChange={(value) => updateField("recipientName", value)}
                />

                <InputField
                  label="Your relationship"
                  placeholder="Friend, partner, sister, son..."
                  value={form.relationship}
                  onChange={(value) => updateField("relationship", value)}
                />

                <InputField
                  label="Occasion"
                  placeholder="Birthday, anniversary, just because..."
                  value={form.occasion}
                  onChange={(value) => updateField("occasion", value)}
                />
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <SelectField
                  label="Age range"
                  value={form.ageRange}
                  onChange={(value) => updateField("ageRange", value)}
                  options={[
                    "Child",
                    "Teen",
                    "20s",
                    "30s",
                    "40s",
                    "50+",
                  ]}
                />

                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-800">
                    Personality
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {personalityOptions.map((option) => {
                      const active = form.personality.includes(option);

                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => togglePersonality(option)}
                          className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                            active
                              ? "bg-gradient-to-r from-pink-500 to-cyan-500 text-white shadow-lg"
                              : "bg-pink-50 text-gray-800 ring-1 ring-pink-100 hover:bg-pink-100"
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-5">
                <InputField
                  label="Hobbies and interests"
                  placeholder="Music, cooking, gaming, sports..."
                  value={form.hobbies}
                  onChange={(value) => updateField("hobbies", value)}
                />

                <InputField
                  label="Favorite things"
                  placeholder="Colors, snacks, style, brands..."
                  value={form.favoriteThings}
                  onChange={(value) => updateField("favoriteThings", value)}
                />

                <SelectField
                  label="Budget"
                  value={form.budget}
                  onChange={(value) => updateField("budget", value)}
                  options={["Up to $25", "$25-$50", "$50-$100", "$100+"]}
                />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-5">
                <TextAreaField
                  label="Anything else we should know?"
                  placeholder="Add details that can help make the surprise feel more personal..."
                  value={form.notes}
                  onChange={(value) => updateField("notes", value)}
                />

                <div className="rounded-3xl bg-gradient-to-r from-pink-50 to-cyan-50 p-5 ring-1 ring-pink-100">
                  <h3 className="text-lg font-bold text-gray-900">
                    Final review
                  </h3>
                  <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">Recipient:</span>{" "}
                      {form.recipientName || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Relationship:</span>{" "}
                      {form.relationship || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Occasion:</span>{" "}
                      {form.occasion || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Age range:</span>{" "}
                      {form.ageRange || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Personality:</span>{" "}
                      {form.personality.length > 0
                        ? form.personality.join(", ")
                        : "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Hobbies:</span>{" "}
                      {form.hobbies || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Favorites:</span>{" "}
                      {form.favoriteThings || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Budget:</span>{" "}
                      {form.budget || "—"}
                    </p>
                    <p>
                      <span className="font-semibold">Notes:</span>{" "}
                      {form.notes || "—"}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <button
                type="button"
                onClick={prevStep}
                disabled={step === 1}
                className="rounded-2xl bg-white px-6 py-4 font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Back
              </button>

              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!canContinue()}
                  className="rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 px-6 py-4 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Continue
                </button>
              ) : (
                <Link
                  href="/payment"
                  className="rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-500 px-6 py-4 text-center font-semibold text-white shadow-lg transition hover:scale-[1.01]"
                >
                  Continue to payment
                </Link>
              )}
            </div>
          </section>

          <aside className="rounded-[32px] bg-white/80 p-6 shadow-lg ring-1 ring-white/70 backdrop-blur md:p-8">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Live preview
                </p>
                <h2 className="text-xl font-bold">Your surprise profile</h2>
              </div>
              <div className="rounded-2xl bg-pink-100 px-3 py-2 text-2xl">
                🎁
              </div>
            </div>

            <div className="space-y-4">
              <PreviewCard
                title="Who is it for?"
                value={form.recipientName || "Someone special"}
              />
              <PreviewCard
                title="Occasion"
                value={form.occasion || "A meaningful moment"}
              />
              <PreviewCard
                title="Style"
                value={
                  form.personality.length > 0
                    ? form.personality.join(", ")
                    : "Still taking shape"
                }
              />
              <PreviewCard
                title="Budget"
                value={form.budget || "Not selected yet"}
              />
            </div>

            <div className="mt-6 rounded-3xl bg-gradient-to-r from-pink-500 to-cyan-500 p-5 text-white shadow-lg">
              <p className="text-sm text-white/80">Magic meter</p>
              <div className="mt-3 h-3 w-full rounded-full bg-white/20">
                <div
                  className="h-3 rounded-full bg-white transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-3 text-sm font-medium">
                {step === 1 && "We’re getting to know them ✨"}
                {step === 2 && "Their personality is coming to life 💫"}
                {step === 3 && "The surprise is getting more personal 🎉"}
                {step === 4 && "Ready for the next step 💖"}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function InputField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border-0 bg-gray-50 px-4 py-4 text-gray-900 ring-1 ring-gray-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-pink-300"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border-0 bg-gray-50 px-4 py-4 text-gray-900 ring-1 ring-gray-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-pink-300"
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

function TextAreaField({
  label,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-800">
        {label}
      </label>
      <textarea
        rows={6}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border-0 bg-gray-50 px-4 py-4 text-gray-900 ring-1 ring-gray-200 outline-none transition focus:bg-white focus:ring-2 focus:ring-pink-300"
      />
    </div>
  );
}

function PreviewCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-4 ring-1 ring-gray-100">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="mt-1 font-semibold text-gray-900">{value}</p>
    </div>
  );
}
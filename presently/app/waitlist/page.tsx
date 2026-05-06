"use client";

import { useState } from "react";
import Link from "next/link";

export default function WaitlistPage() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6 text-gray-900">
        <div className="max-w-md rounded-3xl border border-gray-200 bg-gray-50 p-8 text-center">
          <h1 className="text-3xl font-semibold">You’re on the list 🎁</h1>
          <p className="mt-4 text-gray-600">
            Thanks for joining. We’ll contact you when Presently is ready.
          </p>
          <Link href="/" className="mt-8 inline-block text-sm font-medium underline">
            Back to homepage
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            Presently
          </Link>
          <Link href="/" className="text-sm text-gray-500 hover:text-gray-900">
            Back to site
          </Link>
        </div>
      </header>

      <section className="mx-auto grid min-h-[calc(100vh-73px)] max-w-6xl items-center gap-12 px-6 py-16 md:grid-cols-2">
        <div>
          <p className="mb-4 text-sm font-medium text-gray-500">
            Early access
          </p>

          <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
            Send a surprise gift without knowing what’s inside.
          </h1>

          <p className="mt-6 text-lg leading-8 text-gray-600">
            Presently helps you send a personal mystery gift. You tell us about
            the person, we prepare the surprise, and both of you discover it
            only when it arrives.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-8 rounded-3xl border border-gray-200 bg-gray-50 p-5"
          >
            <div className="grid gap-4">
              <input
                required
                placeholder="Full name"
                className="rounded-2xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-gray-400"
              />

              <input
                required
                type="email"
                placeholder="Email address"
                className="rounded-2xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-gray-400"
              />

              <input
                placeholder="Phone number optional"
                className="rounded-2xl border border-gray-200 bg-white px-4 py-4 outline-none focus:border-gray-400"
              />

              <button
                type="submit"
                className="rounded-2xl bg-gray-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Join the waitlist
              </button>
            </div>
          </form>

          <p className="mt-4 text-sm text-gray-500">
            No payment now. We’re checking real interest before launch.
          </p>
        </div>

        <div className="rounded-[32px] border border-gray-200 bg-gray-50 p-6 shadow-sm">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <p className="text-sm font-medium text-gray-500">How it works</p>

            <div className="mt-6 space-y-6">
              <Step
                number="01"
                title="Describe the person"
                text="Tell us their age, style, interests, occasion and budget."
              />
              <Step
                number="02"
                title="We create the surprise"
                text="A thoughtful gift is selected without revealing what it is."
              />
              <Step
                number="03"
                title="The reveal happens on delivery"
                text="The gift stays hidden until the package arrives."
              />
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-gray-200 bg-white p-6">
            <p className="text-sm text-gray-500">Why it’s different</p>
            <p className="mt-3 text-lg font-medium">
              The surprise is not just the gift — it’s the whole experience.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-sm font-medium text-white">
        {number}
      </div>
      <div>
        <h3 className="font-medium text-gray-900">{title}</h3>
        <p className="mt-1 text-sm leading-6 text-gray-600">{text}</p>
      </div>
    </div>
  );
}
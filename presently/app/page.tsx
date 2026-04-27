"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const messages = [
  "You describe them",
  "We create the surprise",
  "Nobody knows what it is",
  "Until it arrives",
];

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    setLoaded(true);

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % messages.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            Presently
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <a href="#how" className="text-sm text-gray-600 hover:text-gray-900">
              How it works
            </a>
            <Link
              href="/tracking"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Track order
            </Link>
          </nav>
        </div>
      </header>

      <section className="mx-auto flex min-h-[calc(100vh-73px)] max-w-6xl items-center px-6 py-16">
        <div
          className={`grid w-full gap-14 md:grid-cols-2 md:items-center transition-all duration-700 ${
            loaded ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="max-w-xl">
            <p className="mb-4 text-sm font-medium text-gray-500">
              Surprise gifting, simplified
            </p>

            <h1 className="text-4xl font-semibold leading-tight md:text-6xl">
              A gift experience built on mystery.
            </h1>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              You describe the person. We create the surprise. The gift stays
              unknown until it arrives.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/questionnaire"
                className="rounded-2xl bg-gray-900 px-6 py-4 text-center text-sm font-medium text-white transition duration-200 hover:bg-gray-800"
              >
                Start
              </Link>

              <Link
                href="/tracking"
                className="rounded-2xl border border-gray-200 px-6 py-4 text-center text-sm font-medium text-gray-900 transition duration-200 hover:bg-gray-50"
              >
                Track order
              </Link>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="w-full max-w-md rounded-[28px] border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Presently flow</p>
                  <h2 className="text-lg font-semibold text-gray-900">
                    The surprise stays hidden
                  </h2>
                </div>
                <div className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm">
                  Secret
                </div>
              </div>

              <div className="space-y-4">
                <AnimatedRow
                  title="1. Describe someone"
                  text="Style, vibe, occasion"
                  active={active === 0}
                />
                <AnimatedRow
                  title="2. We build the surprise"
                  text="Thoughtful and personal"
                  active={active === 1}
                />
                <AnimatedRow
                  title="3. Mystery remains"
                  text="No one sees the gift yet"
                  active={active === 2}
                />
                <AnimatedRow
                  title="4. It arrives"
                  text="Only then the surprise is revealed"
                  active={active === 3}
                />
              </div>

              <div className="mt-6 rounded-3xl border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Live message</span>
                  <span className="text-sm text-gray-400">
                    {active + 1}/4
                  </span>
                </div>

                <div className="mt-4 min-h-[32px] text-lg font-medium text-gray-900 transition-all duration-300">
                  {messages[active]}
                </div>

                <div className="mt-4 h-2 w-full rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-gray-900 transition-all duration-500"
                    style={{ width: `${((active + 1) / messages.length) * 100}%` }}
                  />
                </div>

                <div className="mt-6 flex items-center justify-center">
                  <div
                    className={`relative flex h-28 w-28 items-center justify-center transition duration-500 ${
                      active === 3 ? "scale-105" : "scale-100"
                    }`}
                  >
                    <div className="absolute bottom-0 h-16 w-24 rounded-b-2xl border border-gray-300 bg-white" />
                    <div
                      className={`absolute top-3 h-8 w-24 rounded-t-xl border border-gray-300 bg-white transition-transform duration-700 ${
                        active === 3 ? "-translate-y-3 rotate-[-6deg]" : ""
                      }`}
                    />
                    <div className="absolute h-16 w-3 rounded-full bg-gray-900/10" />
                    <div className="absolute w-16 h-3 rounded-full bg-gray-900/10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="how" className="border-t border-gray-100 bg-gray-50">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="text-2xl font-semibold">How it works</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">01</p>
              <h3 className="mt-2 text-lg font-medium">You describe the person</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                Share a few simple details about who they are and the occasion.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">02</p>
              <h3 className="mt-2 text-lg font-medium">We create the surprise</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                The gift is prepared based on your answers, without revealing it.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <p className="text-sm text-gray-500">03</p>
              <h3 className="mt-2 text-lg font-medium">The reveal happens on delivery</h3>
              <p className="mt-3 text-sm leading-7 text-gray-600">
                That is the magic: both sides wait for the moment of arrival.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function AnimatedRow({
  title,
  text,
  active,
}: {
  title: string;
  text: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-all duration-300 ${
        active
          ? "border-gray-900 bg-white shadow-sm"
          : "border-gray-200 bg-gray-50"
      }`}
    >
      <p className="text-sm font-medium text-gray-900">{title}</p>
      <p className="mt-1 text-sm text-gray-600">{text}</p>
    </div>
  );
}
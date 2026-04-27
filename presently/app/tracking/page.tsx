"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type OrderStatus =
  | "confirmed"
  | "matching"
  | "preparing"
  | "shipped"
  | "delivered";

type SavedOrder = {
  orderCode: string;
  paymentMethod: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
  };
  createdAt: string;
};

const steps: { key: OrderStatus; title: string; description: string }[] = [
  {
    key: "confirmed",
    title: "Order confirmed",
    description: "Your order has been received successfully.",
  },
  {
    key: "matching",
    title: "Matching the surprise",
    description: "We are selecting the best surprise based on your answers.",
  },
  {
    key: "preparing",
    title: "Preparing the gift",
    description: "Your surprise is being packed and prepared.",
  },
  {
    key: "shipped",
    title: "On the way",
    description: "The package is on its way to the recipient.",
  },
  {
    key: "delivered",
    title: "Delivered",
    description: "The surprise has arrived.",
  },
];

export default function TrackingPage() {
  const [orderCode, setOrderCode] = useState("");
  const [searched, setSearched] = useState(false);
  const [status, setStatus] = useState<OrderStatus>("preparing");
  const [savedOrder, setSavedOrder] = useState<SavedOrder | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("presently_latest_order");
    if (stored) {
      const parsed: SavedOrder = JSON.parse(stored);
      setSavedOrder(parsed);
      setOrderCode(parsed.orderCode);
      setSearched(true);
      applyStatusFromCode(parsed.orderCode);
    }
  }, []);

  const activeStepIndex = useMemo(
    () => steps.findIndex((step) => step.key === status),
    [status]
  );

  function applyStatusFromCode(code: string) {
    const normalized = code.trim().toUpperCase();

    if (normalized.endsWith("1")) setStatus("confirmed");
    else if (normalized.endsWith("2")) setStatus("matching");
    else if (normalized.endsWith("3")) setStatus("preparing");
    else if (normalized.endsWith("4")) setStatus("shipped");
    else if (normalized.endsWith("5")) setStatus("delivered");
    else setStatus("preparing");
  }

  function handleTrack(e: React.FormEvent) {
    e.preventDefault();
    if (!orderCode.trim()) return;

    setSearched(true);
    applyStatusFromCode(orderCode);
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="border-b border-gray-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="text-2xl font-semibold tracking-tight">
            Presently
          </Link>
          <div className="text-sm text-gray-500">Tracking</div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-gray-500">Order tracking</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            Track your surprise
          </h1>
          <p className="mt-3 text-gray-600">
            Enter your order code to see the current status of your gift.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
            <form onSubmit={handleTrack}>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                Order code
              </label>

              <input
                value={orderCode}
                onChange={(e) => setOrderCode(e.target.value)}
                placeholder="For example: PRS-2043"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-gray-900 outline-none transition focus:border-gray-400"
              />

              <button
                type="submit"
                className="mt-4 w-full rounded-2xl bg-gray-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Track order
              </button>
            </form>

            {savedOrder && (
              <div className="mt-8 rounded-2xl border border-gray-200 bg-gray-50 p-5">
                <p className="text-sm font-medium text-gray-700">Latest order</p>
                <div className="mt-3 space-y-2 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-900">Code:</span>{" "}
                    {savedOrder.orderCode}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Customer:</span>{" "}
                    {savedOrder.customer.fullName}
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">City:</span>{" "}
                    {savedOrder.customer.city}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm md:p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Current status
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-gray-900">
                  {steps[activeStepIndex].title}
                </h2>
              </div>

              <div className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-600">
                {searched ? "Updated" : "Waiting for code"}
              </div>
            </div>

            <p className="mt-4 max-w-xl text-gray-600">
              {steps[activeStepIndex].description}
            </p>

            <div className="mt-8">
              <div className="mb-6 h-2 w-full rounded-full bg-gray-200">
                <div
                  className="h-2 rounded-full bg-gray-900 transition-all duration-500"
                  style={{
                    width: `${((activeStepIndex + 1) / steps.length) * 100}%`,
                  }}
                />
              </div>

              <div className="space-y-4">
                {steps.map((step, index) => {
                  const completed = index < activeStepIndex;
                  const active = index === activeStepIndex;

                  return (
                    <div
                      key={step.key}
                      className={`rounded-2xl border p-4 transition ${
                        active
                          ? "border-gray-900 bg-white shadow-sm"
                          : "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className={`mt-0.5 flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                            completed || active
                              ? "bg-gray-900 text-white"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {completed ? "✓" : index + 1}
                        </div>

                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {step.title}
                          </h3>
                          <p className="mt-1 text-sm leading-6 text-gray-600">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-sm text-gray-500">Tracking note</p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                The gift itself stays secret throughout the process. You can
                track the progress, but the surprise remains hidden until
                delivery.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
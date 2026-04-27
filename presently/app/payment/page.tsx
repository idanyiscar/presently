"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type PaymentMethod = "card" | "paypal" | "applepay" | "googlepay";

type PaymentForm = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  cardName: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
};

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState<PaymentForm>({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  function updateField<K extends keyof PaymentForm>(
    key: K,
    value: PaymentForm[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  const baseValid = useMemo(() => {
    return (
      form.fullName &&
      form.email &&
      form.phone &&
      form.address &&
      form.city
    );
  }, [form]);

  const isValid = useMemo(() => {
    if (!baseValid) return false;

    if (paymentMethod === "card") {
      return (
        form.cardName &&
        form.cardNumber &&
        form.expiry &&
        form.cvv
      );
    }

    return true;
  }, [baseValid, paymentMethod, form]);

  function generateOrderCode() {
    const random = Math.floor(1000 + Math.random() * 9000);
    const statusDigit = Math.floor(1 + Math.random() * 5);
    return `PRS-${random}${statusDigit}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;

    const orderCode = generateOrderCode();

    const orderData = {
      orderCode,
      paymentMethod,
      customer: {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        zipCode: form.zipCode,
      },
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("presently_latest_order", JSON.stringify(orderData));

    setSubmitted(true);

    setTimeout(() => {
      window.location.href = `/tracking?code=${orderCode}`;
    }, 1200);
  }

  if (submitted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white px-6">
        <div className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-gray-900 text-white">
            ✓
          </div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Payment received
          </h1>
          <p className="mt-3 text-gray-600">
            Your surprise order is being prepared.
          </p>
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
          <div className="text-sm text-gray-500">Payment</div>
        </div>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10">
          <p className="text-sm font-medium text-gray-500">Checkout</p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">
            Complete your order
          </h1>
          <p className="mt-3 max-w-2xl text-gray-600">
            Enter delivery and payment details to continue your surprise gift order.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm md:p-8"
          >
            <div className="grid gap-5">
              <InputField
                label="Full name"
                value={form.fullName}
                onChange={(value) => updateField("fullName", value)}
                placeholder="Your full name"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="Email"
                  value={form.email}
                  onChange={(value) => updateField("email", value)}
                  placeholder="name@email.com"
                />
                <InputField
                  label="Phone"
                  value={form.phone}
                  onChange={(value) => updateField("phone", value)}
                  placeholder="Phone number"
                />
              </div>

              <InputField
                label="Delivery address"
                value={form.address}
                onChange={(value) => updateField("address", value)}
                placeholder="Street and house number"
              />

              <div className="grid gap-5 md:grid-cols-2">
                <InputField
                  label="City"
                  value={form.city}
                  onChange={(value) => updateField("city", value)}
                  placeholder="City"
                />
                <InputField
                  label="ZIP code"
                  value={form.zipCode}
                  onChange={(value) => updateField("zipCode", value)}
                  placeholder="ZIP code"
                />
              </div>

              <div className="mt-4 border-t border-gray-100 pt-6">
                <h2 className="text-lg font-medium">Payment method</h2>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <MethodButton
                  active={paymentMethod === "card"}
                  onClick={() => setPaymentMethod("card")}
                  label="Credit Card"
                />
                <MethodButton
                  active={paymentMethod === "paypal"}
                  onClick={() => setPaymentMethod("paypal")}
                  label="PayPal"
                />
                <MethodButton
                  active={paymentMethod === "applepay"}
                  onClick={() => setPaymentMethod("applepay")}
                  label="Apple Pay"
                />
                <MethodButton
                  active={paymentMethod === "googlepay"}
                  onClick={() => setPaymentMethod("googlepay")}
                  label="Google Pay"
                />
              </div>

              {paymentMethod === "card" && (
                <div className="mt-2 grid gap-5">
                  <InputField
                    label="Name on card"
                    value={form.cardName}
                    onChange={(value) => updateField("cardName", value)}
                    placeholder="Cardholder name"
                  />

                  <InputField
                    label="Card number"
                    value={form.cardNumber}
                    onChange={(value) => updateField("cardNumber", value)}
                    placeholder="1234 5678 9012 3456"
                  />

                  <div className="grid gap-5 md:grid-cols-2">
                    <InputField
                      label="Expiry"
                      value={form.expiry}
                      onChange={(value) => updateField("expiry", value)}
                      placeholder="MM/YY"
                    />
                    <InputField
                      label="CVV"
                      value={form.cvv}
                      onChange={(value) => updateField("cvv", value)}
                      placeholder="123"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === "paypal" && (
                <PaymentInfoBox text="You will continue with PayPal in the next step." />
              )}

              {paymentMethod === "applepay" && (
                <PaymentInfoBox text="Apple Pay will open on supported devices and browsers." />
              )}

              {paymentMethod === "googlepay" && (
                <PaymentInfoBox text="Google Pay will open on supported devices and browsers." />
              )}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Link
                href="/questionnaire"
                className="rounded-2xl border border-gray-200 px-6 py-4 text-center text-sm font-medium text-gray-900 transition hover:bg-gray-50"
              >
                Back
              </Link>

              <button
                type="submit"
                disabled={!isValid}
                className="rounded-2xl bg-gray-900 px-6 py-4 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {paymentMethod === "card" ? "Pay now" : "Continue"}
              </button>
            </div>
          </form>

          <aside className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm md:p-8">
            <p className="text-sm font-medium text-gray-500">Order summary</p>
            <h2 className="mt-2 text-xl font-semibold">Surprise gift order</h2>

            <div className="mt-6 space-y-4">
              <SummaryRow label="Gift experience" value="Personal surprise" />
              <SummaryRow label="Delivery" value="Standard shipping" />
              <SummaryRow label="Estimated arrival" value="3–5 business days" />
              <SummaryRow
                label="Payment method"
                value={
                  paymentMethod === "card"
                    ? "Credit Card"
                    : paymentMethod === "paypal"
                    ? "PayPal"
                    : paymentMethod === "applepay"
                    ? "Apple Pay"
                    : "Google Pay"
                }
              />
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>Gift</span>
                <span>$59</span>
              </div>
              <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
                <span>Shipping</span>
                <span>$9</span>
              </div>
              <div className="mt-4 flex items-center justify-between text-lg font-semibold text-gray-900">
                <span>Total</span>
                <span>$68</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-4 text-gray-900 outline-none transition focus:border-gray-400"
      />
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}

function MethodButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-2xl border px-4 py-4 text-left text-sm font-medium transition ${
        active
          ? "border-gray-900 bg-gray-900 text-white"
          : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
      }`}
    >
      {label}
    </button>
  );
}

function PaymentInfoBox({ text }: { text: string }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm text-gray-600">
      {text}
    </div>
  );
}
export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-gray-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-semibold">
          Join the Presently waitlist 🎁
        </h1>

        <p className="mt-6 text-lg text-gray-600">
          We are testing interest before launch.
        </p>

        <div className="mt-10 grid gap-4">
          <input
            placeholder="Name"
            className="rounded-2xl border border-gray-200 px-4 py-4"
          />

          <input
            placeholder="Email"
            className="rounded-2xl border border-gray-200 px-4 py-4"
          />

          <button className="rounded-2xl bg-black px-6 py-4 text-white">
            Join waitlist
          </button>
        </div>
      </div>
    </main>
  );
}
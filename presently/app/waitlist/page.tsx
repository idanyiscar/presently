export default function WaitlistPage() {
  return (
    <main className="min-h-screen bg-white px-6 py-20 text-gray-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-5xl font-semibold leading-tight">
          A surprise gift no one sees until it arrives.
        </h1>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Presently creates mystery gifts based on the person you describe.
          We are currently testing interest before launch.
        </p>

        <div className="mt-10 rounded-3xl border border-gray-200 bg-gray-50 p-6">
          <div className="grid gap-4">
            <input
              placeholder="Your name"
              className="rounded-2xl border border-gray-200 px-4 py-4 outline-none"
            />

            <input
              placeholder="Email"
              className="rounded-2xl border border-gray-200 px-4 py-4 outline-none"
            />

            <button className="rounded-2xl bg-black px-6 py-4 text-white">
              Join waitlist
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
const SellerDashboard = () => (
  <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
    <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm sm:p-10">
      <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.7}
          stroke="currentColor"
          className="h-7 w-7"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 10.5l9-7.5 9 7.5M5.25 9v11.25h13.5V9M9 20.25v-6h6v6" />
        </svg>
      </div>
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-indigo-600">
        MYSTORE SELLERS
      </p>
      <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
        Seller dashboard
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        Seller dashboard coming soon! Your seller account is signed in, and this space will be ready for your store tools soon.
      </p>
    </section>
  </main>
);

export default SellerDashboard;

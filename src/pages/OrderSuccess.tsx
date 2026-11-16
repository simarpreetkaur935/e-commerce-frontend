import { Link, useParams } from "react-router-dom";
import { Check, ChevronRight, PackageCheck, Truck } from "lucide-react";

const OrderSuccess = () => {
  const { orderId } = useParams();

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-10 sm:py-14">
      <div className="mx-auto max-w-4xl">
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-emerald-50 px-6 py-9 text-center sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-600 text-white shadow-sm">
              <Check aria-hidden="true" size={34} strokeWidth={3} />
            </div>
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-emerald-700">
              Order confirmed
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Thank you for your order!
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              Your order is placed successfully. We’ll prepare it for dispatch and keep you updated on its progress.
            </p>
          </div>

          <div className="px-6 py-7 sm:px-10">
            <div className="flex flex-col justify-between gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center">
              <div>
                <p className="text-sm text-slate-500">Order number</p>
                <p className="mt-1 break-all font-semibold text-slate-900">{orderId || "Your order"}</p>
              </div>
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1.5 text-sm font-semibold text-emerald-800">
                <Check size={16} aria-hidden="true" /> Confirmed
              </span>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-800">
                  <PackageCheck size={22} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">We’re getting it ready</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">Your order is confirmed and will be packed with care.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <Truck size={22} aria-hidden="true" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900">Updates on the way</h2>
                  <p className="mt-1 text-sm leading-6 text-slate-600">You can check your order page for the latest status and delivery updates.</p>
                </div>
              </div>
            </div>

            <div className="mt-9 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row">
              <Link
                to="/profile"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-amber-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-amber-500"
              >
                Go to your account <ChevronRight size={18} aria-hidden="true" />
              </Link>
              <Link
                to="/products"
                className="inline-flex min-h-12 flex-1 items-center justify-center rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 transition hover:bg-slate-50"
              >
                Continue shopping
              </Link>
            </div>
            <p className="mt-5 text-center text-sm text-slate-500">
              Need help? <Link to="/contact-us" className="font-medium text-blue-700 underline underline-offset-2">Contact support</Link>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderSuccess;

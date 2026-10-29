
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "",
    addressLine: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setError("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (!/^\d{6}$/.test(form.postalCode)) {
      setError("Enter a valid 6-digit PIN code.");
      return;
    }

    navigate("/payment-method", {
      state: { address: form },
    });
  };

  const fields = [
    { name: "fullName", label: "Full name", placeholder: "Enter recipient name" },
    { name: "phone", label: "Mobile number", placeholder: "10-digit mobile number" },
    { name: "addressLine", label: "House no. and street", placeholder: "Enter complete address" },
    { name: "city", label: "City", placeholder: "Enter city" },
    { name: "state", label: "State", placeholder: "Enter state" },
    { name: "postalCode", label: "PIN code", placeholder: "6-digit PIN code" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-2xl rounded-xl border bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Delivery Address
        </h1>
        <p className="mt-2 text-gray-500">
          Where should we deliver your order?
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-sm font-medium text-gray-700"
              >
                {field.label}
              </label>
              <input
                id={field.name}
                name={field.name}
                value={form[field.name as keyof typeof form]}
                onChange={handleChange}
                placeholder={field.placeholder}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-100"
              />
            </div>
          ))}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-yellow-400 py-3 font-semibold text-gray-900 hover:bg-yellow-500"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Address;

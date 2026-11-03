
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";

interface AddressType {
  _id: string;
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
}

interface AddressProps {
  selectedAddressId: string;
  onSelectAddress: (addressId: string) => void;
}

interface AddressFormData {
  street: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
  isDefault: boolean;
}

const initialFormData: AddressFormData = {
  street: "",
  city: "",
  state: "",
  country: "",
  pincode: "",
  isDefault: false,
};

const Address = ({
  selectedAddressId,
  onSelectAddress,
}: AddressProps) => {
  const [addresses, setAddresses] = useState<AddressType[]>([]);
  const [formData, setFormData] =
    useState<AddressFormData>(initialFormData);

  const [showForm, setShowForm] = useState(false);
  const [editingAddressId, setEditingAddressId] =
    useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // GET ALL ADDRESSES
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await api.get("/addresses");

      if (response.data.success) {
        const fetchedAddresses: AddressType[] =
          response.data.data || [];

        setAddresses(fetchedAddresses);

        // Select default address automatically
        if (fetchedAddresses.length > 0) {
          const defaultAddress = fetchedAddresses.find(
            (address) => address.isDefault
          );

          if (!selectedAddressId) {
            onSelectAddress(
              defaultAddress?._id || fetchedAddresses[0]._id
            );
          }
        }
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to fetch addresses"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  // HANDLE FORM INPUTS
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // OPEN ADD ADDRESS FORM
  const handleAddAddress = () => {
    setEditingAddressId(null);
    setFormData(initialFormData);
    setShowForm(true);
  };

  // OPEN EDIT ADDRESS FORM
  const handleEditAddress = (address: AddressType) => {
    setEditingAddressId(address._id);

    setFormData({
      street: address.street,
      city: address.city,
      state: address.state,
      country: address.country,
      pincode: address.pincode,
      isDefault: address.isDefault,
    });

    setShowForm(true);
  };

  // ADD OR UPDATE ADDRESS
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      setSaving(true);

      let response;

      if (editingAddressId) {
        response = await api.put(
          `/addresses/${editingAddressId}`,
          formData
        );
      } else {
        response = await api.post(
          "/addresses/add",
          formData
        );
      }

      if (response.data.success) {
        toast.success(response.data.message);

        setShowForm(false);
        setEditingAddressId(null);
        setFormData(initialFormData);

        await fetchAddresses();
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to save address"
      );
    } finally {
      setSaving(false);
    }
  };

  // DELETE ADDRESS
  const handleDeleteAddress = async (addressId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this address?"
    );

    if (!confirmed) return;

    try {
      const response = await api.delete(
        `/addresses/${addressId}`
      );

      if (response.data.success) {
        toast.success(response.data.message);

        if (selectedAddressId === addressId) {
          onSelectAddress("");
        }

        await fetchAddresses();
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to delete address"
      );
    }
  };

  // SET DEFAULT ADDRESS
  const handleSetDefault = async (addressId: string) => {
    try {
      const response = await api.patch(
        `/addresses/${addressId}/default`
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchAddresses();
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ||
          "Unable to set default address"
      );
    }
  };

  return (
    <div className="space-y-5">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Your Delivery Addresses
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            Select an address for your order.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddAddress}
          className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-4 py-2 rounded-lg transition"
        >
          + Add Address
        </button>
      </div>

      {/* LOADING */}
      {loading && (
        <p className="text-center text-gray-500 py-5">
          Loading addresses...
        </p>
      )}

      {/* ADDRESS LIST */}
      {!loading && addresses.length === 0 && (
        <div className="border border-dashed border-gray-300 rounded-xl p-8 text-center">
          <p className="text-gray-600 font-medium">
            No saved addresses found.
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Add an address to continue with checkout.
          </p>
        </div>
      )}

      {!loading && addresses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {addresses.map((address) => {
            const isSelected =
              selectedAddressId === address._id;

            return (
              <div
                key={address._id}
                onClick={() =>
                  onSelectAddress(address._id)
                }
                className={`relative border rounded-xl p-4 cursor-pointer transition ${
                  isSelected
                    ? "border-yellow-500 bg-yellow-50"
                    : "border-gray-200 hover:border-yellow-400"
                }`}
              >

                {/* RADIO AND DEFAULT BADGE */}
                <div className="flex items-center justify-between mb-3">

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="selectedAddress"
                      checked={isSelected}
                      onChange={() =>
                        onSelectAddress(address._id)
                      }
                      className="accent-yellow-500"
                    />

                    <span className="font-semibold text-gray-900">
                      Deliver to this address
                    </span>
                  </label>

                  {address.isDefault && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>

                {/* ADDRESS DETAILS */}
                <div className="text-sm text-gray-600 space-y-1">
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state}
                  </p>
                  <p>{address.pincode}</p>
                  <p>{address.country}</p>
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-wrap gap-3 mt-4 pt-3 border-t border-gray-200">

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditAddress(address);
                    }}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteAddress(address._id);
                    }}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Delete
                  </button>

                  {!address.isDefault && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSetDefault(address._id);
                      }}
                      className="text-sm font-medium text-gray-600 hover:text-gray-900"
                    >
                      Set as Default
                    </button>
                  )}

                </div>
              </div>
            );
          })}

        </div>
      )}

      {/* ADD / EDIT ADDRESS MODAL */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-lg rounded-xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

            <div className="flex items-center justify-between mb-6">

              <h3 className="text-xl font-semibold text-gray-900">
                {editingAddressId
                  ? "Edit Address"
                  : "Add New Address"}
              </h3>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-900 text-2xl"
              >
                &times;
              </button>

            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* STREET */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Street Address
                </label>

                <input
                  type="text"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter street address"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                />
              </div>

              {/* CITY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                />
              </div>

              {/* STATE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  State
                </label>

                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                />
              </div>

              {/* COUNTRY */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                />
              </div>

              {/* PINCODE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Pincode
                </label>

                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="Enter pincode"
                  required
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-yellow-500"
                />
              </div>

              {/* DEFAULT ADDRESS */}
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  name="isDefault"
                  checked={formData.isDefault}
                  onChange={handleChange}
                  className="accent-yellow-500"
                />

                Set as default address
              </label>

              {/* FORM BUTTONS */}
              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="border border-gray-300 px-5 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-gray-300 text-gray-900 font-semibold px-5 py-2 rounded-lg"
                >
                  {saving
                    ? "Saving..."
                    : editingAddressId
                    ? "Update Address"
                    : "Save Address"}
                </button>

              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

export default Address;

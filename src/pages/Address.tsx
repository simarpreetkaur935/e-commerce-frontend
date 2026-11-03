
// import { useEffect, useRef, useState } from "react";
// import {
//   useLoaderData,
//   useFetcher,
//   useSubmit,
//   useNavigation,
// } from "react-router-dom";

// interface IAddress {
//   _id: string;
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   pincode: string;
//   isDefault: boolean;
// }

// interface AddressFormData {
//   street: string;
//   city: string;
//   state: string;
//   country: string;
//   pincode: string;
//   isDefault: boolean;
// }

// const initialForm: AddressFormData = {
//   street: "",
//   city: "",
//   state: "",
//   country: "India",
//   pincode: "",
//   isDefault: false,
// };

// const Address = () => {
//   const { addresses } = useLoaderData() as {
//     addresses: IAddress[];
//   };

//   const fetcher = useFetcher();
//   const submit = useSubmit();
//   const navigation = useNavigation();

//   const [showForm, setShowForm] = useState(false);
//   const [editingAddressId, setEditingAddressId] =
//     useState<string | null>(null);
//   const [formData, setFormData] =
//     useState<AddressFormData>(initialForm);
//   const [error, setError] = useState("");
//   const [selectedAddressId, setSelectedAddressId] =
//     useState("");

//   const previousFetcherState = useRef(fetcher.state);

//   const isSubmitting = fetcher.state !== "idle";
//   const isCreatingOrder = navigation.state !== "idle";

//   // Automatically select the default address
//   useEffect(() => {
//     if (addresses.length === 0) {
//       setSelectedAddressId("");
//       return;
//     }

//     const selectedExists = addresses.some(
//       (address) => address._id === selectedAddressId
//     );

//     if (!selectedExists) {
//       const defaultAddress = addresses.find(
//         (address) => address.isDefault
//       );

//       setSelectedAddressId(
//         defaultAddress?._id || addresses[0]._id
//       );
//     }
//   }, [addresses, selectedAddressId]);

//   // Close modal after successful add/update
//   useEffect(() => {
//     const wasSubmitting =
//       previousFetcherState.current !== "idle";

//     if (
//       wasSubmitting &&
//       fetcher.state === "idle" &&
//       fetcher.data?.success &&
//       showForm
//     ) {
//       setShowForm(false);
//       setFormData(initialForm);
//       setEditingAddressId(null);
//       setError("");
//     }

//     previousFetcherState.current = fetcher.state;
//   }, [fetcher.state, fetcher.data, showForm]);

//   const actionData = fetcher.data as
//     | { success: boolean; message: string }
//     | undefined;

//   // Open Add Address Form
//   const handleAddAddress = () => {
//     setFormData(initialForm);
//     setEditingAddressId(null);
//     setError("");
//     setShowForm(true);
//   };

//   // Open Edit Address Form
//   const handleEditAddress = (address: IAddress) => {
//     setFormData({
//       street: address.street,
//       city: address.city,
//       state: address.state,
//       country: address.country,
//       pincode: address.pincode,
//       isDefault: address.isDefault,
//     });

//     setEditingAddressId(address._id);
//     setError("");
//     setShowForm(true);
//   };

//   // Handle form input changes
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const { name, value, type, checked } = e.target;

//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   // Add or update address
//   const handleSubmit = (
//     e: React.FormEvent<HTMLFormElement>
//   ) => {
//     e.preventDefault();
//     setError("");

//     const data = new FormData();

//     data.append(
//       "intent",
//       editingAddressId ? "update" : "add"
//     );

//     if (editingAddressId) {
//       data.append("addressId", editingAddressId);
//     }

//     data.append("street", formData.street);
//     data.append("city", formData.city);
//     data.append("state", formData.state);
//     data.append("country", formData.country);
//     data.append("pincode", formData.pincode);
//     data.append("isDefault", String(formData.isDefault));

//     fetcher.submit(data, { method: "post" });
//   };

//   // Delete address
//   const handleDeleteAddress = (addressId: string) => {
//     if (
//       !window.confirm(
//         "Are you sure you want to delete this address?"
//       )
//     ) {
//       return;
//     }

//     const data = new FormData();
//     data.append("intent", "delete");
//     data.append("addressId", addressId);

//     fetcher.submit(data, { method: "post" });
//   };

//   // Set default address
//   const handleSetDefault = (addressId: string) => {
//     const data = new FormData();
//     data.append("intent", "default");
//     data.append("addressId", addressId);

//     fetcher.submit(data, { method: "post" });
//   };

//   // Continue to payment
//   const handleContinueToPayment = () => {
//     if (!selectedAddressId) {
//       setError("Please select a delivery address.");
//       return;
//     }

//     setError("");

//     const data = new FormData();
//     data.append("addressId", selectedAddressId);

//     submit(data, {
//       method: "post",
//       action: "/order",
//     });
//   };

//   const selectedAddress = addresses.find(
//     (address) => address._id === selectedAddressId
//   );

//   return (
//     <div className="min-h-screen bg-[#f5f6fa]">

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

//         {/* Checkout Progress */}
//         <div className="max-w-2xl mx-auto mb-10">
//           <div className="flex items-center justify-center">

//             <div className="flex flex-col items-center">
//               <div className="w-9 h-9 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold">
//                 ✓
//               </div>
//               <span className="text-xs sm:text-sm text-gray-500 mt-2">
//                 Cart
//               </span>
//             </div>

//             <div className="w-16 sm:w-28 h-[2px] bg-green-600 mb-6 mx-2" />

//             <div className="flex flex-col items-center">
//               <div className="w-9 h-9 rounded-full bg-gray-900 text-white flex items-center justify-center font-semibold ring-4 ring-gray-200">
//                 2
//               </div>
//               <span className="text-xs sm:text-sm font-semibold text-gray-900 mt-2">
//                 Address
//               </span>
//             </div>

//             <div className="w-16 sm:w-28 h-[2px] bg-gray-300 mb-6 mx-2" />

//             <div className="flex flex-col items-center">
//               <div className="w-9 h-9 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-semibold">
//                 3
//               </div>
//               <span className="text-xs sm:text-sm text-gray-400 mt-2">
//                 Payment
//               </span>
//             </div>

//           </div>
//         </div>

//         {/* Page Heading */}
//         <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">

//           <div>
//             <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-2">
//               Checkout
//             </p>

//             <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
//               Delivery Address
//             </h1>

//             <p className="text-gray-500 mt-2">
//               Choose where you would like your order delivered.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={handleAddAddress}
//             className="inline-flex items-center justify-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-5 py-3 rounded-xl font-semibold shadow-sm transition"
//           >
//             <span className="text-xl leading-none">+</span>
//             Add New Address
//           </button>

//         </div>

//         {/* Success Message */}
//         {actionData?.message && (
//           <div
//             className={`mb-6 rounded-xl p-4 text-sm font-medium ${
//               actionData.success
//                 ? "bg-green-50 text-green-700 border border-green-200"
//                 : "bg-red-50 text-red-700 border border-red-200"
//             }`}
//           >
//             {actionData.message}
//           </div>
//         )}

//         {/* Error Message */}
//         {error && (
//           <div className="mb-6 rounded-xl p-4 bg-red-50 text-red-700 border border-red-200 text-sm">
//             {error}
//           </div>
//         )}

//         {addresses.length === 0 ? (

//           /* Empty State */
//           <div className="bg-white rounded-2xl border border-gray-200 p-10 sm:p-16 text-center shadow-sm">

//             <div className="w-16 h-16 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-3xl mb-5">
//               📍
//             </div>

//             <h2 className="text-xl font-bold text-gray-900">
//               No delivery addresses yet
//             </h2>

//             <p className="text-gray-500 mt-2 mb-7">
//               Add your address to continue with your purchase.
//             </p>

//             <button
//               type="button"
//               onClick={handleAddAddress}
//               className="bg-gray-900 hover:bg-gray-800 text-white px-7 py-3 rounded-xl font-semibold transition"
//             >
//               Add Your First Address
//             </button>

//           </div>

//         ) : (

//           /* Main Checkout Layout */
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

//             {/* Address List */}
//             <section className="lg:col-span-2">

//               <div className="flex items-center justify-between mb-5">
//                 <div>
//                   <h2 className="text-xl font-bold text-gray-900">
//                     Saved Addresses
//                   </h2>
//                   <p className="text-sm text-gray-500 mt-1">
//                     {addresses.length} saved{" "}
//                     {addresses.length === 1 ? "address" : "addresses"}
//                   </p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

//                 {addresses.map((address) => {
//                   const isSelected =
//                     selectedAddressId === address._id;

//                   return (
//                     <article
//                       key={address._id}
//                       onClick={() =>
//                         setSelectedAddressId(address._id)
//                       }
//                       className={`relative bg-white rounded-2xl p-5 sm:p-6 border-2 cursor-pointer transition-all duration-200 ${
//                         isSelected
//                           ? "border-gray-900 shadow-md"
//                           : "border-gray-200 hover:border-gray-400 shadow-sm"
//                       }`}
//                     >

//                       {/* Selected Indicator */}
//                       <div className="flex items-start justify-between gap-3 mb-5">

//                         <label className="flex items-center gap-3 cursor-pointer">
//                           <input
//                             type="radio"
//                             name="selectedAddress"
//                             value={address._id}
//                             checked={isSelected}
//                             onChange={() =>
//                               setSelectedAddressId(address._id)
//                             }
//                             onClick={(e) => e.stopPropagation()}
//                             className="w-5 h-5 accent-gray-900"
//                           />

//                           <span className="font-bold text-gray-900">
//                             Delivery Address
//                           </span>
//                         </label>

//                         {address.isDefault && (
//                           <span className="shrink-0 text-[11px] font-bold uppercase tracking-wide bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1.5 rounded-full">
//                             Default
//                           </span>
//                         )}

//                       </div>

//                       {/* Address Information */}
//                       <div className="pl-8 space-y-2 text-sm text-gray-600">

//                         <p className="font-semibold text-gray-900 text-base">
//                           {address.street}
//                         </p>

//                         <p>
//                           {address.city}, {address.state}
//                         </p>

//                         <p>{address.country}</p>

//                         <p className="text-gray-500">
//                           PIN Code: {address.pincode}
//                         </p>

//                       </div>

//                       {/* Selected Status */}
//                       {isSelected && (
//                         <div className="mt-5 ml-8 text-xs font-semibold text-green-700 flex items-center gap-2">
//                           <span className="w-2 h-2 rounded-full bg-green-600" />
//                           Selected for delivery
//                         </div>
//                       )}

//                       {/* Actions */}
//                       <div
//                         className="flex flex-wrap items-center gap-5 mt-6 pt-4 border-t border-gray-100"
//                         onClick={(e) => e.stopPropagation()}
//                       >

//                         <button
//                           type="button"
//                           onClick={() => handleEditAddress(address)}
//                           className="text-sm font-semibold text-gray-700 hover:text-black transition"
//                         >
//                           Edit
//                         </button>

//                         <button
//                           type="button"
//                           onClick={() =>
//                             handleDeleteAddress(address._id)
//                           }
//                           disabled={isSubmitting}
//                           className="text-sm font-semibold text-red-600 hover:text-red-800 disabled:opacity-50 transition"
//                         >
//                           Delete
//                         </button>

//                         {!address.isDefault && (
//                           <button
//                             type="button"
//                             onClick={() =>
//                               handleSetDefault(address._id)
//                             }
//                             disabled={isSubmitting}
//                             className="text-sm font-semibold text-amber-700 hover:text-amber-900 disabled:opacity-50 transition"
//                           >
//                             Make Default
//                           </button>
//                         )}

//                       </div>

//                     </article>
//                   );
//                 })}

//               </div>
//             </section>

//             {/* Delivery Summary */}
//             <aside className="lg:col-span-1">

//               <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:sticky lg:top-6">

//                 <h2 className="text-lg font-bold text-gray-900">
//                   Delivery Summary
//                 </h2>

//                 <p className="text-sm text-gray-500 mt-1">
//                   Your selected delivery location
//                 </p>

//                 <div className="border-t border-gray-100 my-5" />

//                 {selectedAddress ? (
//                   <div className="space-y-3">

//                     <div className="flex items-center gap-2 text-sm font-semibold text-gray-900">
//                       <span className="text-lg">📍</span>
//                       Delivering to
//                     </div>

//                     <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">

//                       <p className="font-bold text-gray-900">
//                         {selectedAddress.street}
//                       </p>

//                       <p className="text-sm text-gray-600 mt-2">
//                         {selectedAddress.city},{" "}
//                         {selectedAddress.state}
//                       </p>

//                       <p className="text-sm text-gray-600">
//                         {selectedAddress.country}
//                       </p>

//                       <p className="text-sm text-gray-500 mt-1">
//                         PIN: {selectedAddress.pincode}
//                       </p>

//                       {selectedAddress.isDefault && (
//                         <span className="inline-block mt-3 text-xs text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full font-semibold">
//                           Default address
//                         </span>
//                       )}

//                     </div>

//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500">
//                     Select an address to see the delivery details.
//                   </p>
//                 )}

//                 <div className="border-t border-gray-100 my-6" />

//                 <div className="space-y-3 text-sm text-gray-500">
//                   <div className="flex items-center gap-3">
//                     <span className="text-green-600">✓</span>
//                     Secure checkout
//                   </div>

//                   <div className="flex items-center gap-3">
//                     <span className="text-green-600">✓</span>
//                     Safe and reliable delivery
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleContinueToPayment}
//                   disabled={!selectedAddressId || isCreatingOrder}
//                   className="w-full mt-7 bg-amber-400 hover:bg-amber-500 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-900 font-bold py-3.5 px-5 rounded-xl transition shadow-sm"
//                 >
//                   {isCreatingOrder
//                     ? "Processing..."
//                     : "Continue to Payment"}
//                 </button>

//                 <p className="text-center text-xs text-gray-400 mt-4">
//                   You can review your order before payment.
//                 </p>

//               </div>

//             </aside>

//           </div>
//         )}

//         {/* Add / Edit Address Modal */}
//         {showForm && (

//           <div className="fixed inset-0 bg-gray-950/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">

//             <div className="bg-white rounded-2xl p-6 sm:p-8 w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">

//               {/* Modal Header */}
//               <div className="flex justify-between items-start mb-7">

//                 <div>
//                   <p className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-2">
//                     MyStore Delivery
//                   </p>

//                   <h2 className="text-2xl font-bold text-gray-900">
//                     {editingAddressId
//                       ? "Edit Address"
//                       : "Add New Address"}
//                   </h2>

//                   <p className="text-sm text-gray-500 mt-1">
//                     Enter your delivery details below.
//                   </p>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() => {
//                     setShowForm(false);
//                     setError("");
//                   }}
//                   className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl transition"
//                 >
//                   ×
//                 </button>

//               </div>

//               <form
//                 onSubmit={handleSubmit}
//                 className="space-y-5"
//               >

//                 {/* Street */}
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">
//                     Street Address
//                   </label>

//                   <input
//                     name="street"
//                     value={formData.street}
//                     onChange={handleChange}
//                     required
//                     placeholder="House number, street, area"
//                     className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-100 transition"
//                   />
//                 </div>

//                 {/* City and State */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       City
//                     </label>

//                     <input
//                       name="city"
//                       value={formData.city}
//                       onChange={handleChange}
//                       required
//                       placeholder="Enter city"
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-100 transition"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       State
//                     </label>

//                     <input
//                       name="state"
//                       value={formData.state}
//                       onChange={handleChange}
//                       required
//                       placeholder="Enter state"
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-100 transition"
//                     />
//                   </div>

//                 </div>

//                 {/* Country and PIN */}
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       Country
//                     </label>

//                     <input
//                       name="country"
//                       value={formData.country}
//                       onChange={handleChange}
//                       required
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-100 transition"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-semibold text-gray-700 mb-2">
//                       PIN Code
//                     </label>

//                     <input
//                       name="pincode"
//                       value={formData.pincode}
//                       onChange={handleChange}
//                       required
//                       pattern="[0-9]{6}"
//                       maxLength={6}
//                       inputMode="numeric"
//                       placeholder="6 digit PIN"
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-gray-900 focus:ring-2 focus:ring-gray-100 transition"
//                     />
//                   </div>

//                 </div>

//                 {/* Default Address */}
//                 <label className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border border-gray-100 cursor-pointer">

//                   <input
//                     type="checkbox"
//                     name="isDefault"
//                     checked={formData.isDefault}
//                     onChange={handleChange}
//                     className="w-4 h-4 accent-gray-900"
//                   />

//                   <span className="text-sm font-medium text-gray-700">
//                     Save as my default delivery address
//                   </span>

//                 </label>

//                 {/* Modal Buttons */}
//                 <div className="flex flex-col-reverse sm:flex-row gap-3 pt-3">

//                   <button
//                     type="button"
//                     onClick={() => {
//                       setShowForm(false);
//                       setError("");
//                     }}
//                     className="flex-1 border border-gray-200 rounded-xl py-3 font-semibold text-gray-700 hover:bg-gray-50 transition"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="submit"
//                     disabled={isSubmitting}
//                     className="flex-1 bg-gray-900 hover:bg-gray-800 disabled:opacity-60 text-white rounded-xl py-3 font-semibold transition"
//                   >
//                     {isSubmitting
//                       ? "Saving..."
//                       : editingAddressId
//                         ? "Update Address"
//                         : "Save Address"}
//                   </button>

//                 </div>

//               </form>

//             </div>

//           </div>
//         )}

//       </main>
//     </div>
//   // 
// };

// export default Address;

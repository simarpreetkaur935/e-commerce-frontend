
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { products as getProducts } from "../utils/Loaders";

// function Arrivals() {
//   const [productList, setProductList] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const fetchArrivals = async () => {
//       try {
//         const result = await getProducts();

//         if (result.success) {
//           const latestProducts = [...result.products].sort(
//             (a, b) =>
//               new Date(b.createdAt).getTime() -
//               new Date(a.createdAt).getTime()
//           );

//           setProductList(latestProducts);
//         } else {
//           setError("Could not load new arrivals.");
//         }
//       } catch (err) {
//         setError("Something went wrong while loading products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchArrivals();
//   }, []);

//   if (loading) {
//     return <div className="p-8">Loading new arrivals...</div>;
//   }

//   if (error) {
//     return <div className="p-8 text-red-500">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-2">
//         New Arrivals
//       </h1>

//       <p className="text-gray-500 mb-8">
//         Discover our latest products
//       </p>

//       {productList.length === 0 ? (
//         <p>No new products found.</p>
//       ) : (
//         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {productList.map((product) => {
//             const firstImage = product.images?.[0];

//             const imageUrl =
//               typeof firstImage === "string"
//                 ? firstImage
//                 : firstImage?.url;

//             return (
//               <Link
//                 key={product._id}
//                 to={`/products/${product._id}`}
//                 className="group"
//               >
//                 <div className="overflow-hidden rounded-lg bg-gray-100">
//                   {imageUrl ? (
//                     <img
//                       src={imageUrl}
//                       alt={product.name}
//                       className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
//                     />
//                   ) : (
//                     <div className="h-56 flex items-center justify-center text-gray-400">
//                       No image available
//                     </div>
//                   )}
//                 </div>

//                 <h2 className="mt-3 font-medium">
//                   {product.name}
//                 </h2>

//                 <p className="mt-1 font-semibold">
//                   ₹{product.discountPrice ?? product.price}
//                 </p>
//               </Link>
//             );
//           })}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Arrivals;

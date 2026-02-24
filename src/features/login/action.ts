// // src/features/login/action.ts (Lado Next.js)
// "use server";

// export async function loginAction(formData: LoginDto) {
//   const API_URL =
//     process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/auth";

//   // Constante response
//   const response = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(formData),
//   });

//   return await response.json();
//   // Esto devolverá el { user, backendToken } que definimos en NestJS
// }

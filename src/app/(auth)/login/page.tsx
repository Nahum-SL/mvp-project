import { LoginForm } from "@/src/features/auth/login/components/LoginForm";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full p-8 bg-white shadow-lg rounded-xl">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-900">
          Intranet ASESCON
        </h1>
        <LoginForm />
      </div>
    </main>
  );
}

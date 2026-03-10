// src/features/auth/login/components/LoginFormContainer.tsx
"use client";
import { motion } from "framer-motion";
import { LoginForm } from "./LoginForm";

export const LoginFormContainer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md"
    >
      <LoginForm />
    </motion.div>
  );
};

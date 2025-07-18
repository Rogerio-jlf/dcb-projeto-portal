"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import ButtonLogin from "./Button_Login";
import CheckboxLogin from "./Checkbox_Login";
import EmailInputLogin from "./Email_Input_Login";
import HeaderLogin from "./Header_Login";
import PasswordInputLogin from "./Password_Input_Login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { login } = useAuthStore();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const success = login(email, password); // ✅ agora retorna true ou false

      if (success) {
        const toastId = toast.success(
          "✅ Login realizado com sucesso! Redirecionando, aguarde...",
          {
            position: "top-right",
            autoClose: false,
            closeOnClick: false,
            closeButton: false,
            toastId: "login-toast",
            theme: "dark",
            style: {
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
              padding: "16px",
            },
          }
        );

        localStorage.setItem("activeLoginToast", "true");

        router.push("/dashboard");

        setTimeout(() => {
          if (localStorage.getItem("activeLoginToast") === "true") {
            toast.dismiss(toastId);
            localStorage.removeItem("activeLoginToast");
          }
        }, 5000);
      } else {
        toast.error(
          "❌ Erro ao realizar login. Credenciais inválidas, verifique.",
          {
            position: "top-right",
            autoClose: 5000,
            closeOnClick: false,
            closeButton: false,
            theme: "dark",
            style: {
              fontSize: "18px",
              fontWeight: "500",
              borderRadius: "10px",
              width: "400px",
              maxWidth: "90%",
              padding: "16px",
            },
          }
        );
        setIsLoading(false);
      }
    } catch {
      toast.error("⚠️ Ocorreu um erro inesperado. Tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        closeButton: false,
        theme: "dark",
        style: {
          fontSize: "18px",
          fontWeight: "500",
          borderRadius: "10px",
          width: "400px",
          maxWidth: "90%",
          padding: "16px",
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-xl shadow-black backdrop-blur-2xl transition-all duration-300 hover:border-white/20">
      <div className="absolute top-0 right-0 left-0 h-2 bg-teal-400"></div>
      <HeaderLogin />
      <form
        className="p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-6">
          <EmailInputLogin
            value={email}
            onChange={setEmail}
          />
          <PasswordInputLogin
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <CheckboxLogin
            email={email}
            setEmail={setEmail}
          />
          <ButtonLogin isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}

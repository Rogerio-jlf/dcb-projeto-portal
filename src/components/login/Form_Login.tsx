"use client";

import { useAuth } from "@/contexts/auth-context";
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

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userData = await login(email, password);

      if (userData) {
        const toastId = toast.success("Login realizado com sucesso! Redirecionando, aguarde...", {
          position: "top-right",
          autoClose: false,
          closeOnClick: false,
          closeButton: false,
          toastId: "login-toast",
          theme: "dark",
          style: {
            fontSize: "20px",
            fontWeight: "500",
            borderRadius: "10px",
            width: "400px",
            maxWidth: "90%",
            padding: "20px",
          },
        });

        localStorage.setItem("activeLoginToast", "true");

        router.push("/dashboard");

        setTimeout(() => {
          if (localStorage.getItem("activeLoginToast") === "true") {
            toast.dismiss(toastId);
            localStorage.removeItem("activeLoginToast");
          }
        }, 15000);
      } else {
        toast.error("Erro ao realizar login. Verifique suas credenciais.", {
          position: "top-right",
          autoClose: 5000,
          closeOnClick: false,
          closeButton: false,
          theme: "dark",
          style: {
            fontSize: "20px",
            fontWeight: "500",
            borderRadius: "10px",
            width: "400px",
            maxWidth: "90%",
            padding: "20px",
          },
        });
        setIsLoading(false);
      }
    } catch {
      toast.error("Ocorreu um erro inesperado. Tente novamente.", {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: false,
        closeButton: false,
        theme: "dark",
        style: {
          fontSize: "20px",
          fontWeight: "500",
          borderRadius: "10px",
          width: "400px",
          maxWidth: "90%",
          padding: "20px",
        },
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-2xl rounded-lg shadow-xl shadow-black overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-2 bg-teal-400"></div>
      <HeaderLogin />
      <form className="p-8" onSubmit={handleSubmit}>
        <div className="space-y-6">
          <EmailInputLogin value={email} onChange={setEmail} />
          <PasswordInputLogin
            value={password}
            onChange={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
          />
          <CheckboxLogin email={email} setEmail={setEmail} />
          <ButtonLogin isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}

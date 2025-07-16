"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import HeaderLogin from "./Header_Login";
import EmailInputLogin from "./Email_Input_Login";
import PasswordInputLogin from "./Password_Input_Login";
import CheckboxLogin from "./Checkbox_Login";
import ButtonLogin from "./Button_Login";

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
        toast("Login realizado com sucesso", {
          description: "Bem-vindo(a) de volta!",
          duration: 3000,
          icon: "✅",
          style: { backgroundColor: "#38a169", color: "#fff" },
        });
        router.push("/dashboard");
      } else {
        toast("Erro ao realizar login", {
          description: "Verifique suas credenciais e tente novamente.",
          duration: 5000,
          icon: "❌",
          style: { backgroundColor: "#e53e3e", color: "#fff" },
        });
      }
    } catch {
      toast("Erro ao realizar login", {
        description: "Ocorreu um erro inesperado. Tente novamente.",
        duration: 5000,
        icon: "❌",
        style: { backgroundColor: "#e53e3e", color: "#fff" },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300">
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-teal-400"></div>
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
          <CheckboxLogin />
          <ButtonLogin isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}

// import { useAuth } from "@/contexts/auth-context";
import { AlertCircle, Check, Eye, EyeOff, Lock, X } from "lucide-react";
import React, { useState } from "react";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface ShowPasswordsState {
  current: boolean;
  new: boolean;
  confirm: boolean;
}

interface ValidationErrors {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
  submit?: string;
}

interface PasswordChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (passwordData: PasswordData) => Promise<void>;
}

const ModalAlterarSenha: React.FC<PasswordChangeModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPasswords, setShowPasswords] = useState<ShowPasswordsState>({
    current: false,
    new: false,
    confirm: false,
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  // const { user } = useAuth();

  const handleInputChange = (
    field: keyof PasswordData,
    value: string
  ): void => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const togglePasswordVisibility = (field: keyof ShowPasswordsState): void => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleClose = (): void => {
    setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setErrors({});
    setShowPasswords({ current: false, new: false, confirm: false });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-in zoom-in-95 w-full max-w-md rounded-2xl border border-emerald-300/20 bg-gradient-to-br from-slate-900 to-emerald-900 shadow-2xl duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-emerald-300/20 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-500/20 p-2">
              <Lock className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">
                Alterar Senha
              </h2>
              <p className="text-sm text-white/60">Mantenha sua conta segura</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-2 transition-colors duration-200 hover:bg-white/10"
          >
            <X className="h-5 w-5 text-white/60" />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6 p-6">
          {/* New Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPasswords.new ? "text" : "password"}
                value={formData.newPassword}
                onChange={(e) =>
                  handleInputChange("newPassword", e.target.value)
                }
                className="w-full rounded-lg border border-emerald-300/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                placeholder="nova senha"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white/60 transition-colors hover:text-white"
              >
                {showPasswords.new ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.newPassword && (
              <p className="flex items-center gap-1 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {errors.newPassword}
              </p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90">
              Confirmar Nova Senha
            </label>
            <div className="relative">
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                className="w-full rounded-lg border border-emerald-300/20 bg-white/10 px-4 py-3 text-white placeholder-white/40 transition-all duration-300 focus:border-transparent focus:ring-2 focus:ring-emerald-400 focus:outline-none"
                placeholder="confirmar senha"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute top-1/2 right-3 -translate-y-1/2 transform text-white/60 transition-colors hover:text-white"
              >
                {showPasswords.confirm ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="flex items-center gap-1 text-sm text-red-400">
                <AlertCircle className="h-4 w-4" />
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit Error */}
          {errors.submit && (
            <p className="flex items-center gap-1 text-sm text-red-400">
              <AlertCircle className="h-4 w-4" />
              {errors.submit}
            </p>
          )}

          {/* Password Requirements */}
          <div className="rounded-lg border border-emerald-300/20 bg-emerald-500/10 p-3">
            <p className="mb-2 text-sm text-white/80">Requisitos da senha:</p>
            <ul className="space-y-1 text-xs text-white/60">
              <li className="flex items-center gap-2">
                <Check className="h-3 w-3 text-emerald-400" />
                Mínimo de 5 caracteres
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="column flex flex-col gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-white/20 px-4 py-3 text-white/80 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 active:scale-95"
            >
              Cancelar
            </button>
            <button
              type="button"
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-white transition-all duration-300 hover:scale-[1.02] hover:from-emerald-600 hover:to-emerald-700 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  Alterando...
                </>
              ) : (
                <>Alterar</>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAlterarSenha;

// components/ColunasContasPagar.tsx
"use client";

import { ContasAPagarStatus, ContasAPagarType } from "@/types/financeiro";
import { ColumnDef } from "@tanstack/react-table";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export interface ContasPagarProps {
  status: string;
  numero_nf: number;
  data_emissao: string;
  data_vencimento: string;
  valor: number;
  juros: number;
  multa: number;
}

export const StatusBadge = ({ status }: { status: string }) => {
  const configs = {
    "0": {
      icon: Clock,
      style: "bg-yellow-400 text-black",
      bgMobile: "bg-amber-50 border-amber-200",
      textMobile: "text-amber-700",
    },
    "1": {
      icon: AlertTriangle,
      style: "bg-red-400 text-black",
      bgMobile: "bg-red-50 border-red-200",
      textMobile: "text-red-700",
    },
    "3": {
      icon: CheckCircle,
      style: "bg-green-400 text-black",
      bgMobile: "bg-emerald-50 border-emerald-200",
      textMobile: "text-emerald-700",
    },
    "2": {
      icon: CheckCircle,
      style: "bg-green-400 text-black",
      bgMobile: "bg-emerald-50 border-emerald-200",
      textMobile: "text-emerald-700",
    },
  };

  const config =
    configs[status.toUpperCase() as keyof typeof configs] || configs["1"];
  const Icon = config.icon;

  return (
    <>
      <div className="hidden justify-center md:flex">
        <div
          className={`flex items-center gap-2 rounded-full p-2 text-base font-semibold tracking-wider italic ${config.style}`}
        >
          <Icon className="h-5 w-5" />
          {ContasAPagarStatus[status] || "Status Desconhecido"}
        </div>
      </div>

      <div className="flex items-center gap-2 md:hidden">
        <div className={`rounded-full p-2 ${config.bgMobile} border`}>
          <Icon className={`h-5 w-5 ${config.textMobile}`} />
        </div>
        <span className={`text-sm font-semibold ${config.textMobile}`}>
          {ContasAPagarStatus[status] || "Status Desconhecido"}
        </span>
      </div>
    </>
  );
};

export const colunasTabelaContasPagar: ColumnDef<ContasAPagarType>[] = [
  {
    accessorKey: "STATUS",
    header: "Status",
    cell: ({ getValue }) => <StatusBadge status={getValue() as string} />,
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_NUM",
    header: "Nota Fiscal",
    cell: ({ getValue }) => (
      <div className="text-lg font-semibold tracking-wider text-gray-800 italic">
        {String(getValue())}
      </div>
    ),
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_EMISSAO",
    header: "Emissão",
    cell: ({ getValue }) => {
      const date: string = getValue() as string;
      const match = date.match(/(\d{4})(\d{2})(\d{2})/);
      if (!match) {
        return (
          <div className="text-lg font-semibold tracking-wider text-gray-800 italic">
            Data Inválida
          </div>
        );
      }
      const [, year, month, day] = match;
      return (
        <div className="text-lg font-semibold tracking-wider text-gray-800 italic">{`${day}/${month}/${year}`}</div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_VENCREA",
    header: "Vencimento",
    cell: ({ getValue }) => {
      const date: string = getValue() as string;
      const match = date.match(/(\d{4})(\d{2})(\d{2})/);
      if (!match) {
        return (
          <div className="text-lg font-semibold tracking-wider text-gray-800 italic">
            Data Inválida
          </div>
        );
      }
      const [, year, month, day] = match;
      const isOverdue = new Date(`${year}-${month}-${day}`) < new Date();
      return (
        <div
          className={`${
            isOverdue
              ? "text-lg font-semibold tracking-wider text-red-500 italic"
              : ""
          }`}
        >
          {`${day}/${month}/${year}`}
          {isOverdue && (
            <div className="text-sm font-semibold tracking-wider text-red-500 italic">
              Vencido
            </div>
          )}
        </div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_VALOR",
    header: "Valor",
    cell: ({ getValue }) => (
      <div className="text-lg font-semibold tracking-wider text-gray-800 italic">
        {Number(getValue()).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    ),
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_JUROS",
    header: "Juros",
    cell: ({ getValue }) => {
      const valor = Number(getValue());
      return (
        <div
          className={`text-lg font-semibold tracking-wider italic ${
            valor > 0 ? "text-red-500" : "text-gray-800"
          }`}
        >
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
  // ------------------------------------------------
  {
    accessorKey: "E1_MULTA",
    header: "Multa",
    cell: ({ getValue }) => {
      const valor = Number(getValue());
      return (
        <div
          className={`font-bold italic ${valor > 0 ? "text-red-500" : "text-gray-800"}`}
        >
          {valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </div>
      );
    },
  },
];

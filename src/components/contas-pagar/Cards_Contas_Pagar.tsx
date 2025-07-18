import { AlertTriangle, CheckCircle, Clock, FileText } from "lucide-react";
import React from "react";

interface ResumoNotasFiscaisProps {
  total: number;
  pagas: number;
  pendentes: number;
  vencidas: number;
}

interface CardsProps {
  titulo: string;
  valor: number;
  cor: string;
  Icon: React.ElementType;
}

function CardResumo({ titulo, valor, cor, Icon }: CardsProps) {
  const bgIcon =
    Icon === CheckCircle
      ? "bg-green-200 text-green-700"
      : Icon === Clock
        ? "bg-yellow-200 text-yellow-700"
        : Icon === AlertTriangle
          ? "bg-red-200 text-red-700"
          : "bg-blue-200 text-blue-700";

  return (
    <div
      className={`rounded-lg p-4 shadow-md shadow-black sm:p-4 ${cor} text-xs sm:text-sm`}
    >
      <div className="flex items-center justify-between">
        <div className="mb-1 flex flex-col gap-1">
          <span className="text-base font-semibold tracking-wider text-gray-800 uppercase italic">
            {titulo}
          </span>
          <span className="text-lg font-extrabold tracking-wider text-gray-800 italic sm:text-xl">
            {valor}
          </span>
        </div>

        <div
          className={`rounded-lg p-2 sm:p-3 ${bgIcon} shadow-md shadow-black`}
        >
          <Icon className="h-5 w-5 sm:h-5 sm:w-5" />
        </div>
      </div>
    </div>
  );
}

export function CardsContasPagar({
  total,
  pagas,
  pendentes,
  vencidas,
}: ResumoNotasFiscaisProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-2 sm:gap-4 md:grid-cols-4">
      <CardResumo
        titulo="Total"
        valor={total}
        cor="bg-blue-300"
        Icon={FileText}
      />
      <CardResumo
        titulo="Contas pagas"
        valor={pagas}
        cor="bg-green-300"
        Icon={CheckCircle}
      />
      <CardResumo
        titulo="Contas pendentes"
        valor={pendentes}
        cor="bg-yellow-300"
        Icon={Clock}
      />
      <CardResumo
        titulo="Contas vencidas"
        valor={vencidas}
        cor="bg-red-300"
        Icon={AlertTriangle}
      />
    </div>
  );
}

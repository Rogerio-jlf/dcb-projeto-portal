"use client";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";
import { useState } from "react";

const arrayAnos = [
  { label: "2021", value: "2021" },
  { label: "2022", value: "2022" },
  { label: "2023", value: "2023" },
  { label: "2024", value: "2024" },
];

const arrayMeses = [
  { label: "Janeiro", value: "01" },
  { label: "Fevereiro", value: "02" },
  { label: "Março", value: "03" },
  { label: "Abril", value: "04" },
  { label: "Maio", value: "05" },
  { label: "Junho", value: "06" },
  { label: "Julho", value: "07" },
  { label: "Agosto", value: "08" },
  { label: "Setembro", value: "09" },
  { label: "Outubro", value: "10" },
  { label: "Novembro", value: "11" },
  { label: "Dezembro", value: "12" },
];

export function FiltrosDashboard() {
  const [ano, setAno] = useState<string>("");
  const [mes, setMes] = useState<string>("");

  return (
    <div className="w-full">
      {/* Header Principal */}

      {/* Filtros Component */}
      <div className="bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 p-4 sm:p-5 lg:p-6 relative overflow-hidden">
        {/* Background pattern */}
        {/* Filtros */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {/* ANO */}
          <div className="col-span-1 flex flex-col gap-2">
            <Label
              htmlFor="ano"
              className="text-sm font-semibold text-white flex items-center gap-2 tracking-wide"
            >
              <div className="p-1.5 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg">
                <CalendarDays className="w-4 h-4 text-white" />
              </div>
              Ano
            </Label>

            <Select value={ano} onValueChange={setAno}>
              <SelectTrigger
                id="ano"
                className="w-full bg-slate-800/70 border-slate-600/50 text-white placeholder:text-slate-400 font-medium shadow-lg backdrop-blur-sm hover:bg-slate-700/70 hover:border-slate-500/70 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
              >
                <SelectValue placeholder="Selecionar ano" />
              </SelectTrigger>

              <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl backdrop-blur-sm">
                {arrayAnos.map((m) => (
                  <SelectItem
                    key={m.value}
                    value={m.value}
                    className="text-white hover:bg-cyan-600/80 hover:text-white focus:bg-cyan-600/80 focus:text-white cursor-pointer transition-all duration-200"
                  >
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* MÊS */}
          <div className="col-span-1 flex flex-col gap-2">
            <Label
              htmlFor="mes"
              className="text-sm font-semibold text-white flex items-center gap-2 tracking-wide"
            >
              <div className="p-1.5 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <CalendarDays className="w-4 h-4 text-white" />
              </div>
              Mês
            </Label>

            <Select value={mes} onValueChange={setMes}>
              <SelectTrigger
                id="mes"
                className="w-full bg-slate-800/70 border-slate-600/50 text-white placeholder:text-slate-400 font-medium shadow-lg backdrop-blur-sm hover:bg-slate-700/70 hover:border-slate-500/70 transition-all duration-200 cursor-pointer focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50"
              >
                <SelectValue placeholder="Selecionar mês" />
              </SelectTrigger>

              <SelectContent className="bg-slate-800 border-slate-600 shadow-2xl backdrop-blur-sm">
                {arrayMeses.map((m) => (
                  <SelectItem
                    key={m.value}
                    value={m.value}
                    className="text-white hover:bg-purple-600/80 hover:text-white focus:bg-purple-600/80 focus:text-white cursor-pointer transition-all duration-200"
                  >
                    {m.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

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
    // Container principal
    <div className="w-full">
      {/* ========== Filtros ========== */}
      <div className="relative z-10 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* ========== ANO ========== */}
        <div className="col-span-1 flex flex-col gap-2">
          <Label
            htmlFor="ano"
            className="flex items-center gap-3 text-lg font-semibold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white"
          >
            <CalendarDays className="h-6 w-6 text-slate-700 dark:text-white" />
            Ano
          </Label>
          {/* ---------- */}

          <Select
            value={ano}
            onValueChange={setAno}
          >
            <SelectTrigger
              id="ano"
              className="w-full cursor-pointer border-slate-300 bg-white text-base font-semibold tracking-wider text-slate-800 transition-colors duration-300 hover:bg-slate-100 focus:ring focus:ring-blue-500 dark:border-slate-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-white"
            >
              <SelectValue placeholder="Selecionar ano" />
            </SelectTrigger>
            {/* ---------- */}
            <SelectContent className="border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-900">
              {arrayAnos.map((a) => (
                <SelectItem
                  key={a.value}
                  value={a.value}
                  className="cursor-pointer text-base font-semibold tracking-wider text-slate-800 transition-colors duration-300 hover:bg-blue-100 hover:text-slate-900 dark:text-white dark:hover:bg-cyan-500 dark:hover:text-black"
                >
                  {a.label}
                </SelectItem>
              ))}
            </SelectContent>
            {/* ---------- */}
          </Select>
        </div>
        {/* ---------- */}

        {/* ========== MÊS ========== */}
        <div className="col-span-1 flex flex-col gap-2">
          <Label
            htmlFor="mes"
            className="flex items-center gap-3 text-lg font-semibold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white"
          >
            <CalendarDays className="h-6 w-6 text-slate-700 dark:text-white" />
            Mês
          </Label>
          {/* ---------- */}

          <Select
            value={mes}
            onValueChange={setMes}
          >
            <SelectTrigger
              id="mes"
              className="w-full cursor-pointer border-slate-300 bg-white text-base font-semibold tracking-wider text-slate-800 transition-colors duration-300 hover:bg-slate-100 focus:ring focus:ring-blue-500 dark:border-slate-500 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700 dark:focus:ring-white"
            >
              <SelectValue placeholder="Selecionar mês" />
            </SelectTrigger>
            {/* ---------- */}
            <SelectContent className="border-slate-300 bg-white dark:border-slate-500 dark:bg-slate-900">
              {arrayMeses.map((m) => (
                <SelectItem
                  key={m.value}
                  value={m.value}
                  className="cursor-pointer text-base font-semibold tracking-wider text-slate-800 transition-colors duration-300 hover:bg-blue-100 hover:text-slate-900 dark:text-white dark:hover:bg-cyan-500 dark:hover:text-black"
                >
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
            {/* ---------- */}
          </Select>
        </div>
        {/* ---------- */}
      </div>
      {/* ---------- */}
    </div>
  );
}

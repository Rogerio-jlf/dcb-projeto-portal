"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, FileCode, Filter } from "lucide-react";

export function FiltrosContasPagar() {
  const {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    notaFiscal,
    setNotaFiscal,
    status,
    setStatus,
  } = useFiltrosFinanceiro();

  return (
    // CONTAINER PRINCIPAL
    <div className="space-y-4">
      {/* TÍTULO MOBILE */}
      <div className="rounded-md bg-emerald-700 p-4 shadow-md shadow-black md:hidden">
        <h2 className="text-left text-2xl font-bold text-white italic">
          Contas a Pagar
        </h2>
      </div>

      {/* TÍTULO DESKTOP */}
      <div className="hidden items-center justify-between md:flex">
        <h2 className="text-4xl font-bold text-gray-800 italic">
          Contas a Pagar
        </h2>
      </div>

      {/* FILTRO */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {/* DATA INICIAL */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-1 flex items-center gap-1 text-base font-semibold tracking-wider text-gray-800 italic">
            <CalendarDays className="h-5 w-5" />
            Data Inicial
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full cursor-pointer justify-start text-left text-lg font-semibold tracking-wider text-gray-800 italic shadow-md shadow-black hover:shadow-lg hover:shadow-black"
              >
                {dataInicio
                  ? format(dataInicio, "dd/MM/yyyy", { locale: ptBR })
                  : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="bg-white p-0 shadow-md shadow-black"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dataInicio}
                onSelect={(data) => setDataInicio(data || new Date())}
                locale={ptBR}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* DATA FINAL */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-1 flex items-center gap-1 text-base font-semibold tracking-wider text-gray-800 italic">
            <CalendarDays className="h-5 w-5" />
            Data Final
          </label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full cursor-pointer justify-start text-left text-lg font-semibold tracking-wider text-gray-800 italic shadow-md shadow-black hover:shadow-lg hover:shadow-black"
              >
                {dataFim
                  ? format(dataFim, "dd/MM/yyyy", { locale: ptBR })
                  : "Selecionar data"}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="bg-white p-0 shadow-md shadow-black"
              align="start"
            >
              <Calendar
                mode="single"
                selected={dataFim}
                onSelect={(data) => {
                  setDataFim(data || new Date());
                }}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* NOTA FISCAL */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-1 flex items-center gap-1 text-base font-semibold tracking-wider text-gray-800 italic">
            <FileCode className="h-5 w-5" />
            Nota Fiscal
          </label>
          <Input
            className="bg-white text-lg tracking-wider shadow-md shadow-black"
            value={notaFiscal}
            onChange={(event) => setNotaFiscal(event.target.value)}
          />
        </div>

        {/* STATUS */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-1 flex items-center gap-1 text-base font-semibold tracking-wider text-gray-800 italic">
            <Filter className="h-5 w-5" />
            Status
          </label>
          <Select
            value={status}
            onValueChange={setStatus}
          >
            <SelectTrigger className="w-full cursor-pointer text-lg font-semibold tracking-wider text-gray-800 italic shadow-md shadow-black hover:shadow-lg hover:shadow-black">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent className="bg-white shadow-md shadow-black">
              <SelectItem value="0">Todos</SelectItem>
              <SelectItem value="1">Pagas</SelectItem>
              <SelectItem value="2">Em Aberto</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

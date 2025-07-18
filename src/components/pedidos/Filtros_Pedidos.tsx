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
import { useFiltrosPedido } from "@/contexts/filtros/pedidos";
import { PedidoStatusLabel } from "@/types/pedido";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, FileCode, Filter } from "lucide-react";

export function FiltrosPedidos() {
  const {
    dataInicio,
    setDataInicio,
    dataFim,
    setDataFim,
    numeroPedido,
    setNumeroPedido,
    status,
    setStatus,
  } = useFiltrosPedido();

  return (
    <div className="space-y-5">
      {/* TÍTULO MOBILE */}
      <div className="rounded-md bg-emerald-700 p-4 tracking-widest shadow-md shadow-black md:hidden">
        <h2 className="text-left text-2xl font-bold text-white italic">
          Pedidos
        </h2>
      </div>

      {/* TÍTULO DESKTOP */}
      <div className="c hidden items-center justify-between md:flex">
        <h2 className="text-4xl font-bold text-gray-800 italic">Pedidos</h2>
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
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* DATA INICIAL */}
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

        {/* PRODUTO */}
        <div className="col-span-1 flex flex-col">
          <label className="mb-1 flex items-center gap-1 text-base font-semibold tracking-wider text-gray-800 italic">
            <FileCode className="h-5 w-5" />
            N° Pedido
          </label>
          <Input
            className="bg-white text-lg tracking-wider shadow-md shadow-black"
            value={numeroPedido}
            onChange={(event) => setNumeroPedido(event.target.value)}
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
              {Object.entries(PedidoStatusLabel).map(([key, label]) => (
                <SelectItem
                  key={key}
                  value={key}
                >
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}

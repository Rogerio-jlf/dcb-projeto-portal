"use client";

import { ContasAPagarType } from "@/types/financeiro";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { AlertOctagon, AlertTriangle, DollarSign } from "lucide-react";
import { colunasTabelaContasPagar } from "./Colunas_Tabela_Contas_Pagar";
import { TabelaMobile } from "./Tabela_Mobile";

interface TabelaContasPagarProps {
  dados: ContasAPagarType[];
}

export function TabelaContasPagar({ dados }: TabelaContasPagarProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaContasPagar,
    getCoreRowModel: getCoreRowModel(),
  });

  const naoTemDados = dados?.length === 0;

  const totalValor = dados?.reduce((acc, item) => acc + item.E1_VALOR, 0);
  const totalJuros = dados?.reduce((acc, item) => acc + item.E1_JUROS, 0);
  const totalMulta = dados?.reduce((acc, item) => acc + item.E1_MULTA, 0);

  return (
    <>
      {/* ========================== TABELA DESKTOP ========================== */}
      <div className="hidden md:block">
        <div className="flex h-[56vh] flex-col overflow-hidden rounded-lg bg-white shadow-md shadow-black">
          {/* Cabeçalho */}
          <div className="bg-black/80 p-4">
            <h3 className="text-2xl font-semibold tracking-wide text-white italic">
              Contas a Pagar
            </h3>
          </div>

          {/* Corpo com rolagem interna */}
          <div className="custom-scrollbar flex-1 overflow-y-auto">
            {naoTemDados ? (
              <div className="flex h-full items-center justify-center p-10">
                <p className="text-lg text-gray-600 italic">
                  Nenhum pedido encontrado no período selecionado.
                </p>
              </div>
            ) : (
              <table className="w-full border-separate border-spacing-0">
                <thead className="sticky top-0 z-10">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="bg-teal-500 p-4 text-center text-xl font-extrabold tracking-wider text-black italic"
                        >
                          <div className="flex items-center space-x-2">
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>

                <tbody>
                  {table.getRowModel().rows.map((row, rowIndex) => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className={`p-4 text-gray-800 ${
                            rowIndex % 2 === 0 ? "bg-white" : "bg-gray-100"
                          }`}
                        >
                          <div className="flex items-center">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* ========================== TABELA MOBILE ========================== */}
      <div className="block space-y-5 px-2 md:hidden">
        {naoTemDados ? (
          <div className="p-4 text-center">
            <p className="text-base text-gray-500 italic">
              Nenhum pedido encontrado no período selecionado.
            </p>
          </div>
        ) : (
          table.getRowModel().rows.map((row) => (
            <TabelaMobile
              key={row.id}
              row={row}
            />
          ))
        )}
      </div>

      {/* ========================== CARDS DE TOTAIS ========================== */}
      <div className="grid grid-cols-1 gap-4 pb-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {/* Card Valor Total */}
        <div className="group relative overflow-hidden rounded-lg bg-white text-xs shadow-md shadow-black sm:text-sm">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-green-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold tracking-wider text-gray-800 italic">
                VALOR TOTAL
              </p>
              <div className="flex items-center justify-between">
                <p className="text-base font-bold tracking-wider text-gray-800 italic sm:text-lg">
                  R${" "}
                  {totalValor.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="rounded-lg bg-green-500 p-4 text-black shadow-md shadow-black">
                  <DollarSign
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Juros */}
        <div className="group relative overflow-hidden rounded-lg bg-white text-xs shadow-md shadow-black sm:text-sm">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-yellow-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold tracking-wider text-gray-800 italic">
                JUROS ACUMULADOS
              </p>
              <div className="flex items-center justify-between">
                <p className="text-base font-bold tracking-wider text-red-500 italic sm:text-lg">
                  R${" "}
                  {totalJuros.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="rounded-lg bg-yellow-500 p-4 text-black shadow-md shadow-black">
                  <AlertTriangle
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Card Multa */}
        <div className="group relative overflow-hidden rounded-lg bg-white text-xs shadow-md shadow-black sm:text-sm">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-red-500"></div>
          <div className="p-3 sm:p-4">
            <div className="flex flex-col gap-2">
              <p className="text-base font-semibold tracking-wider text-gray-800 italic">
                MULTAS APLICADAS
              </p>
              <div className="flex items-center justify-between">
                <p className="text-base font-bold tracking-wider text-red-500 italic sm:text-lg">
                  R${" "}
                  {totalMulta.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <div className="rounded-lg bg-red-500 p-4 text-black shadow-md shadow-black">
                  <AlertOctagon
                    className="h-4 w-4"
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

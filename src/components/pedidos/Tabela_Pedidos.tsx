"use client";

import { PedidoType } from "@/types/pedido";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { colunasTabelaPedidos } from "./Colunas_Tabela_Pedidos";
import { TabelaMobile } from "./Tabela_Mobile";

interface TabelaPedidosProps {
  dados: PedidoType[];
}

export function TabelaPedidos({ dados }: TabelaPedidosProps) {
  const table = useReactTable({
    data: dados,
    columns: colunasTabelaPedidos,
    getCoreRowModel: getCoreRowModel(),
  });

  const naoTemDados = dados.length === 0;

  return (
    <>
      {/* ========================== TABELA DESKTOP ========================== */}
      <div className="hidden md:block">
        <div className="flex h-[80vh] flex-col overflow-hidden overflow-y-auto rounded-lg bg-white shadow-md shadow-black">
          {/* HEADER */}
          <div className="bg-black/80 p-4">
            <h3 className="text-2xl font-semibold tracking-wide text-white italic">
              Pedidos
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
                        // CABEÇALHO TABELA
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
      <div className="block space-y-5 px-2 pb-24 md:hidden">
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
    </>
  );
}

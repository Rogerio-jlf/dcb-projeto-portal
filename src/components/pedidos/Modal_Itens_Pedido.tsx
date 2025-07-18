"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PedidoType } from "@/types/pedido";
import { useQuery } from "@tanstack/react-query";
import { Eye, Loader2 } from "lucide-react";
import { useState } from "react";

interface ItemFormatado {
  item: string;
  produto: string;
  descricao: string;
  quantidade: number;
  precoUnitario: number;
  valorTotal: number;
  valorDesconto: number;
}

interface PedidoComItens extends PedidoType {
  itens: ItemFormatado[];
}

interface ModalDetalhesPedidoProps {
  pedido: PedidoType;
}

export const ModalItensPedido = ({ pedido }: ModalDetalhesPedidoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // 🔥 Buscar os itens do pedido
  const fetchItensPedido = async (): Promise<ItemFormatado[]> => {
    const dataEmissao = pedido.C5_EMISSAO;
    let dataInicio = dataEmissao;
    let dataFim = dataEmissao;

    if (dataEmissao && dataEmissao.includes("/")) {
      const [, mes, ano] = dataEmissao.split("/");
      dataInicio = `01/${mes}/${ano}`;
      dataFim = `31/${mes}/${ano}`;
    }

    const response = await fetch("/api/pedidos-itens", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        CLIENTE: pedido.C5_CLIENTE,
        DATAFIM: dataFim,
        DATAINI: dataInicio,
        FILIAL: pedido.C5_FILIAL || "0101",
        LOJA: pedido.C5_LOJACLI || "01",
        NUMERO_PEDIDO: pedido.C5_NUM,
      }),
    });

    if (!response.ok) {
      throw new Error(`Erro ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.sucesso || data.sucesso !== "T") {
      throw new Error("Erro ao buscar pedidos com itens");
    }

    const pedidoEncontrado: PedidoComItens = data.dados[0];

    if (!pedidoEncontrado) {
      throw new Error(
        `Pedido ${pedido.C5_NUM} não encontrado na resposta da API`
      );
    }

    return pedidoEncontrado.itens || [];
  };

  // ✅ React Query
  const {
    data: itens = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<ItemFormatado[], Error>({
    queryKey: ["pedido-itens", pedido.C5_NUM],
    queryFn: fetchItensPedido,
    enabled: isOpen,
    staleTime: 1000 * 60 * 5, // cache de 5 min
  });

  const formatarData = (data: string) => {
    if (!data || data.includes(" / / ")) return "Data não informada";
    if (data.includes("/") && data.length === 10) return data;
    const [day, month, year] = data.split("/");
    return `${day}/${month}/${year}`;
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-blue-500 transition-colors hover:bg-blue-100 hover:text-blue-700"
          aria-label={`Detalhes do pedido ${pedido.C5_NUM}`}
        >
          <Eye style={{ width: 28, height: 28 }} />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-y-auto rounded-lg bg-white p-6 md:min-w-[1500px] md:p-10">
        <DialogHeader>
          <DialogTitle className="mb-6 text-center text-2xl font-bold text-gray-800 md:text-3xl">
            Detalhes do Pedido #{pedido.C5_NUM}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* VALORES DA API */}
          <div className="grid grid-cols-1 place-items-center gap-2 rounded-lg bg-gray-100 p-4 text-center md:grid-cols-3 md:gap-4 md:p-6">
            <div>
              <p className="mb-1 text-sm font-semibold tracking-wider text-gray-800 italic md:text-base">
                Data do pedido:
              </p>
              <p className="text-base font-semibold tracking-wider text-gray-800 italic md:text-lg">
                {formatarData(pedido.C5_EMISSAO)}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold tracking-wider text-gray-800 italic md:text-base">
                Status do pedido:
              </p>
              <p className="text-base font-semibold tracking-wider text-gray-800 italic md:text-lg">
                {pedido.STATUS}
              </p>
            </div>
            <div>
              <p className="mb-1 text-sm font-semibold tracking-wider text-gray-800 italic md:text-base">
                Quantidade de itens:
              </p>
              <p className="text-base font-semibold tracking-wider text-gray-800 italic md:text-lg">
                {itens.length > 0 ? itens.length : "Nenhum item encontrado"}
              </p>
            </div>
          </div>

          {/* LOADING / ERROR / TABELA */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <span className="ml-2 text-gray-600">Carregando itens...</span>
            </div>
          ) : isError ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <p className="mb-2 font-semibold text-red-500">
                  {error?.message}
                </p>
                <Button
                  onClick={() => refetch()}
                  variant="outline"
                  size="sm"
                >
                  Tentar novamente
                </Button>
              </div>
            </div>
          ) : itens.length === 0 ? (
            <div className="py-8 text-center font-medium text-gray-500">
              Nenhum item encontrado para este pedido
            </div>
          ) : (
            <>
              {/* ✅ Mobile: Cards */}
              <div className="space-y-4 md:hidden">
                {itens.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-lg border bg-white p-4 shadow-sm"
                  >
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Produto:
                      </span>{" "}
                      {item.produto} - {item.descricao}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Quantidade:
                      </span>{" "}
                      {item.quantidade}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Valor Unitário:
                      </span>{" "}
                      {item.precoUnitario.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Desconto:
                      </span>{" "}
                      {item.valorDesconto > 0
                        ? item.valorDesconto.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "—"}
                    </p>
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold text-gray-700">
                        Total:
                      </span>{" "}
                      {item.valorTotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                ))}
              </div>

              {/* ✅ Desktop: Tabela */}
              <div className="hidden w-full overflow-x-auto rounded-lg border md:block">
                <Table className="min-w-[600px] table-auto">
                  <TableHeader>
                    <TableRow className="bg-gray-200">
                      {[
                        "Item",
                        "Código Produto",
                        "Descrição",
                        "Quantidade",
                        "Valor Unitário",
                        "Desconto",
                        "Total",
                      ].map((header) => (
                        <TableHead
                          key={header}
                          className="text-center text-base font-semibold text-gray-600 italic"
                        >
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-200">
                    {itens.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell className="text-center text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.item}
                        </TableCell>
                        <TableCell className="text-center text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.produto}
                        </TableCell>
                        <TableCell className="text-left text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.descricao}
                        </TableCell>
                        <TableCell className="text-center text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.quantidade}
                        </TableCell>
                        <TableCell className="text-center text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.precoUnitario.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                        <TableCell className="text-center text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.valorDesconto > 0
                            ? item.valorDesconto.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })
                            : "—"}
                        </TableCell>
                        <TableCell className="text-center text-lg font-semibold tracking-wider text-gray-800 italic">
                          {item.valorTotal.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

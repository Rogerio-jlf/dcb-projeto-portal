"use client";

import { useAuth } from "@/contexts/auth-context";
import { useFiltrosPedido } from "@/contexts/filtros/pedidos";
import { PedidoType } from "@/types/pedido";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import api from "../axios";
import { SidebarNavegacao } from "../sidebar/Sidebar";
import { FiltrosPedidos } from "./Filtros_Pedidos";
import { FooterMobile } from "./Footer_Mobile ";
import { TabelaPedidos } from "./Tabela_Pedidos";

export function LayoutPedidos() {
  const [pedido, setPedidos] = useState<PedidoType[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { dataInicio, dataFim, numeroPedido, status } = useFiltrosPedido();
  const { user } = useAuth();

  useEffect(() => {
    async function handleAccountsPayableData() {
      try {
        setIsLoading(true);
        const retorno = await api.post("/api/order", {
          CLIENTE: user?.cod,
          LOJA: user?.loja,
          DATAINI: dataInicio,
          DATAFIM: dataFim,
          FILIAL: "0101",
        });

        if (retorno.status !== 200) {
          console.error("Erro ao buscar dados de contas a pagar");
          return;
        }

        setPedidos(retorno.data.dados);
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      } finally {
        setIsLoading(false);
      }
    }

    handleAccountsPayableData();
  }, [user?.cod, user?.loja, dataInicio, dataFim]);

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="relative flex h-screen flex-1 flex-col bg-white">
        <div className="flex-shrink-0">
          <div className="px-4 py-4 md:px-6 lg:px-8">
            <div className="space-y-4">
              <FiltrosPedidos />

              {isLoading ? (
                // ✅ LOADING GRANDE E CENTRALIZADO
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70">
                  <Loader2 className="h-16 w-16 animate-spin text-emerald-600" />
                  <p className="mt-4 animate-pulse text-lg font-semibold text-emerald-700">
                    Carregando pedidos, aguarde...
                  </p>
                </div>
              ) : (
                <TabelaPedidos dados={pedido} />
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer para dispositivos móveis */}
      <FooterMobile />
    </div>
  );
}

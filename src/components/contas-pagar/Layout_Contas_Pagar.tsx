"use client";

import { useAuth } from "@/contexts/auth-context";
import { useFiltrosFinanceiro } from "@/contexts/filtros/financeiro";
import { ContasAPagarType } from "@/types/financeiro";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import api from "../axios";
import { SidebarNavegacao } from "../sidebar/Sidebar";
import { CardsContasPagar } from "./Cards_Contas_Pagar";
import { FiltrosContasPagar } from "./Filtros_Contas_Pagar";
import { FooterMobile } from "./Footer_Mobile";
import { TabelaContasPagar } from "./Tabela_Contas_Pagar";

export function LayoutContasPagar() {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { dataInicio, dataFim, notaFiscal, status } = useFiltrosFinanceiro();

  const {
    data: contasAPagar,
    // isError,
    isLoading,
    // isFetching,
  } = useQuery({
    queryKey: ["contasAPagar"],
    queryFn: async () => {
      const { data } = await api.post("/api/accounts-payable", {
        CLIENTE: user?.cod,
        LOJA: user?.loja,
        DATAINI: dataInicio.toISOString().split("T")[0].replace(/-/g, ""),
        DATAFIM: dataFim.toISOString().split("T")[0].replace(/-/g, ""),
        NOTAFISCAL: notaFiscal,
      });
      return data.dados ?? ([] as ContasAPagarType[]);
    },
    refetchOnWindowFocus: false,
  });

  const total = contasAPagar?.length || 0;
  const pagas =
    contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "3").length || 0;
  const pendentes =
    contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "1").length || 0;
  const vencidas =
    contasAPagar?.filter((n: ContasAPagarType) => n.STATUS === "2").length || 0;

  // function filtrarPorStatus(contas: ContasAPagarType[]): ContasAPagarType[] {
  //   return status == "0"
  //     ? contas
  //     : contas.filter((cpg) => cpg.STATUS === status);
  // }

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["contasAPagar"] });
  }, [dataInicio, dataFim, notaFiscal, status, queryClient]);

  if (isLoading) {
    return (
      <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70">
        <Loader2 className="h-16 w-16 animate-spin text-emerald-600" />
        <p className="mt-4 animate-pulse text-lg font-semibold text-emerald-700">
          Carregando contas a pagar, aguarde...
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex h-screen flex-1 flex-col">
        <div className="relative"></div>
        <div className="flex-shrink-0 bg-white">
          <div className="px-4 py-4 md:px-6 lg:px-8">
            <div className="space-y-4">
              <FiltrosContasPagar />
              <CardsContasPagar
                total={total}
                pagas={pagas}
                pendentes={pendentes}
                vencidas={vencidas}
              />
              <TabelaContasPagar dados={contasAPagar} />
            </div>
          </div>
        </div>
      </main>
      <FooterMobile />
    </div>
  );
}

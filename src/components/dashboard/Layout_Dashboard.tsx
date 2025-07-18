"use client";

import { SidebarNavegacao } from "../sidebar/Sidebar";
import { CardsDashboard } from "./Cards_Dashboard";
import { ChartComprasAno } from "./Chart_Compras_Ano";
import { ChartComprasProduto } from "./Chart_Compras_Produto";
import { ChartContasPagar } from "./Chart_Contas_Pagar";
import {
  cardDashboardMock,
  comprasMensais,
  comprasPorProdutoMock,
  contasPagarMesMock,
} from "./Data_Mocks";
import { FiltrosDashboard } from "./Filtros_Dashboard";
import { HeaderDashboard } from "./Header_Dashboard";

export function LayoutDashboard() {
  return (
    <div className="flex h-screen w-full bg-slate-800 overflow-hidden">
      {/* Sidebar fixa */}
      <SidebarNavegacao />

      {/* Área principal com layout vertical */}
      <main className="flex-1 flex flex-col p-4 md:p-8 space-y-6 bg-slate-900 overflow-auto">
        {/* Header + Filtros no topo */}
        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <div className="lg:w-1/4 w-full">
            <HeaderDashboard />
          </div>

          {/* Filtros ocupando todo o restante */}
          <div className="lg:w-3/4 w-full">
            <FiltrosDashboard />
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="flex flex-col gap-6 w-full">
          {/* Linha 1: Cards (1/4) + ChartComprasProduto (3/4) */}
          <div className="flex flex-col lg:flex-row gap-6 w-full">
            {/* CardsDashboard à esquerda */}
            <div className="lg:w-1/4 w-full">
              <CardsDashboard cardData={cardDashboardMock} />
            </div>

            {/* ChartComprasProduto à direita */}
            <div className="lg:w-3/4 w-full">
              <ChartComprasProduto data={comprasPorProdutoMock} />
            </div>
          </div>

          {/* Linha 2: 3 charts distribuídos igualmente */}
          <div className="grid grid-cols-2 gap-6 w-full pb-12">
            <ChartContasPagar data={contasPagarMesMock} />
            <ChartComprasAno data={comprasMensais} />
          </div>
        </div>
      </main>
    </div>
  );
}

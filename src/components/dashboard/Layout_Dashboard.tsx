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
import { ThemeProvider } from "./ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export function LayoutDashboard() {
  return (
    <ThemeProvider>
      <div className="flex h-screen w-full overflow-hidden bg-slate-100 transition-colors duration-300 dark:bg-slate-800">
        {/* Sidebar fixa */}
        <SidebarNavegacao />

        {/* Área principal com layout vertical */}
        <main className="flex flex-1 flex-col space-y-6 overflow-auto bg-white p-4 transition-colors duration-300 md:p-8 dark:bg-slate-950">
          {/* Header + Filtros no topo */}
          <div className="flex w-full flex-col gap-6 lg:flex-row">
            <div className="w-full lg:w-1/4">
              <HeaderDashboard />
            </div>

            {/* Filtros ocupando todo o restante */}
            <div className="w-full lg:w-3/4">
              <FiltrosDashboard />
            </div>
          </div>

          {/* Conteúdo principal */}
          <div className="flex w-full flex-col gap-6">
            {/* Linha 1: Cards (1/4) + ChartComprasProduto (3/4) */}
            <div className="flex w-full flex-col gap-6 lg:flex-row">
              {/* CardsDashboard à esquerda */}
              <div className="w-full lg:w-1/4">
                <CardsDashboard cardData={cardDashboardMock} />
              </div>

              {/* ChartComprasProduto à direita */}
              <div className="w-full lg:w-3/4">
                <ChartComprasProduto data={comprasPorProdutoMock} />
              </div>
            </div>

            {/* Linha 2: 3 charts distribuídos igualmente */}
            <div className="grid w-full grid-cols-2 gap-6 pb-10">
              <ChartContasPagar chartdata={contasPagarMesMock} />
              <ChartComprasAno data={comprasMensais} />
            </div>
          </div>
        </main>

        {/* Botão de alternância de tema */}
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

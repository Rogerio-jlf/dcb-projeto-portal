"use client";

import { useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface ComprasMensais {
  mes: string;
  total: number;
}

// Hook simulado para tamanho de tela
const useScreenSize = () => {
  const [screenSize] = useState({
    isMobile: window.innerWidth < 768,
    isTablet: window.innerWidth >= 768 && window.innerWidth < 1024,
    isDesktop: window.innerWidth >= 1024,
    tickSize: window.innerWidth < 768 ? 10 : 12,
    fontSize: window.innerWidth < 768 ? 12 : 14,
    yAxisWidth: window.innerWidth < 768 ? 60 : 80,
    strokeWidth: window.innerWidth < 768 ? 2 : 3,
    dotRadius: window.innerWidth < 768 ? 4 : 5,
    dotActiveRadius: window.innerWidth < 768 ? 6 : 8,
  });
  return screenSize;
};

// Dados de exemplo
const sampleData = [
  { mes: "Jan", total: 2500 },
  { mes: "Fev", total: 3200 },
  { mes: "Mar", total: 2800 },
  { mes: "Abr", total: 3500 },
  { mes: "Mai", total: 4100 },
  { mes: "Jun", total: 3800 },
  { mes: "Jul", total: 4200 },
  { mes: "Ago", total: 3900 },
  { mes: "Set", total: 4500 },
  { mes: "Out", total: 4800 },
  { mes: "Nov", total: 5200 },
  { mes: "Dez", total: 5800 },
];

export function ChartComprasAno({ data = sampleData }: { data?: ComprasMensais[] }) {
  const screen = useScreenSize();
  const [hoveredMonth, setHoveredMonth] = useState<string | null>(null);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const formatCompactCurrency = (value: number) => {
    if (value >= 1000000) {
      return `R$ ${(value / 1000000).toFixed(1)}M`;
    } else if (value >= 1000) {
      return `R$ ${(value / 1000).toFixed(0)}K`;
    }
    return formatCurrency(value);
  };

  // Calcular estatísticas
  const totalAnual = data.reduce((sum, item) => sum + item.total, 0);
  const mediaMonthly = totalAnual / data.length;
  const maiorCompra = Math.max(...data.map((item) => item.total));
  const crescimento =
    data.length > 1 ? ((data[data.length - 1].total - data[0].total) / data[0].total) * 100 : 0;

  return (
    <div className="bg-slate-900 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-2xl border border-slate-700 h-[400px] sm:h-[450px] lg:h-[540px] flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 opacity-50"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-600/20 to-pink-600/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 mb-3 sm:mb-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-wide">
                Evolução de Compras / Ano
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 ml-4">Total de compras por mês</p>
          </div>

          {/* Indicadores compactos */}
          <div className="flex gap-2">
            <div className="bg-slate-800/70 border border-slate-600/50 px-3 py-1.5 rounded-lg backdrop-blur-sm">
              <div className="text-xs text-slate-300 font-medium">{data.length} meses</div>
            </div>
            <div
              className={`${crescimento >= 0 ? "bg-emerald-800/70 border-emerald-600/50" : "bg-red-800/70 border-red-600/50"} px-3 py-1.5 rounded-lg backdrop-blur-sm border`}
            >
              <div
                className={`text-xs font-medium ${crescimento >= 0 ? "text-emerald-300" : "text-red-300"}`}
              >
                {crescimento >= 0 ? "+" : ""}
                {crescimento.toFixed(1)}%
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas em linha */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-3 py-2 rounded-xl shadow-lg border border-cyan-500/30">
            <div className="text-xs opacity-90 mb-1">Total</div>
            <div className="text-sm font-bold">{formatCompactCurrency(totalAnual)}</div>
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-2 rounded-xl shadow-lg border border-purple-500/30">
            <div className="text-xs opacity-90 mb-1">Média</div>
            <div className="text-sm font-bold">{formatCompactCurrency(mediaMonthly)}</div>
          </div>
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-3 py-2 rounded-xl shadow-lg border border-emerald-500/30">
            <div className="text-xs opacity-90 mb-1">Maior</div>
            <div className="text-sm font-bold">{formatCompactCurrency(maiorCompra)}</div>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <div className="relative z-10 flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: screen.isMobile ? 15 : 25,
              left: screen.isMobile ? 10 : 15,
              bottom: 10,
            }}
            onMouseMove={(e) => {
              if (e && e.activeLabel) {
                setHoveredMonth(e.activeLabel);
              }
            }}
            onMouseLeave={() => setHoveredMonth(null)}
          >
            <defs>
              <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="50%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.05} />
              </linearGradient>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#475569"
              strokeOpacity={0.3}
            />

            <XAxis
              dataKey="mes"
              tick={{
                fontSize: screen.tickSize,
                fill: "#94a3b8",
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
              padding={{ left: 10, right: 10 }}
            />

            <YAxis
              tick={{
                fontSize: screen.tickSize,
                fill: "#94a3b8",
                fontWeight: 500,
              }}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCompactCurrency}
              width={screen.yAxisWidth}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                background: "rgba(30, 41, 59, 0.95)",
                backdropFilter: "blur(20px)",
                color: "white",
                fontSize: `${screen.fontSize}px`,
                padding: "16px",
              }}
              formatter={(value, name) => [
                <div key="tooltip-content" className="space-y-2">
                  <div className="font-bold text-white text-base">
                    {formatCurrency(Number(value))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                    <span className="text-slate-300 text-sm">
                      {((Number(value) / totalAnual) * 100).toFixed(1)}% do total anual
                    </span>
                  </div>
                </div>,
                "",
              ]}
              labelStyle={{
                fontWeight: "700",
                color: "#ffffff",
                fontSize: `${screen.fontSize + 2}px`,
                marginBottom: "8px",
              }}
              cursor={{ stroke: "#06b6d4", strokeWidth: 2, strokeDasharray: "3 3" }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="url(#lineGradient)"
              strokeWidth={screen.strokeWidth}
              strokeOpacity={0.9}
              filter="url(#glow)"
              dot={(props) => {
                const isHovered = hoveredMonth === props.payload?.mes;
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={isHovered ? screen.dotActiveRadius : screen.dotRadius}
                    fill={isHovered ? "#06b6d4" : "#3b82f6"}
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      filter: `drop-shadow(0 0 ${isHovered ? "8px" : "4px"} rgba(6, 182, 212, 0.5))`,
                    }}
                  />
                );
              }}
              activeDot={{
                r: screen.dotActiveRadius + 2,
                stroke: "#ffffff",
                strokeWidth: 3,
                fill: "#06b6d4",
                style: {
                  filter: "drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))",
                },
              }}
              name="Total Compras"
              animationDuration={1800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Footer compacto com insights */}
      <div className="relative z-10 mt-3 pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full animate-pulse"></div>
              <span>Tendência de crescimento</span>
            </div>
          </div>
          <div className="text-right">
            <span className="font-medium text-slate-300">
              {hoveredMonth || "Passe o mouse no gráfico"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

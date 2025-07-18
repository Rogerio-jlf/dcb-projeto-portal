"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useState } from "react";

interface ComprasPorProduto {
  produto: string;
  valor: number;
}

export function ChartComprasProduto({ data }: { data?: ComprasPorProduto[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  // Array de cores para as barras do gráfico (cores mais vibrantes para tema escuro)
  const arrayColorsBars = [
    "#06b6d4", // Cyan
    "#3b82f6", // Blue
    "#8b5cf6", // Purple
    "#ec4899", // Pink
    "#f59e0b", // Amber
    "#10b981", // Emerald
    "#f97316", // Orange
    "#ef4444", // Red
  ];

  const totalValue = (data ?? []).reduce((sum, item) => sum + item.valor, 0);
  const mediaValue = totalValue / (data?.length || 1);
  const maiorValue = Math.max(...(data ?? []).map((item) => item.valor));

  return (
    // CONTAINER PRINCIPAL
    <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-lg transition-colors duration-300 sm:p-5 lg:p-6 dark:border-slate-700 dark:bg-slate-900 dark:shadow-2xl">
      {/* ========== HEADER ========== */}
      <div className="relative z-10 mb-8">
        <div className="mb-3">
          {/* Título e subtítulo */}
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-500"></div>
              <h3 className="text-xl font-semibold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white">
                Compras por Produto
              </h3>
            </div>
            <p className="ml-6 text-base tracking-wider text-slate-600 italic transition-colors duration-300 dark:text-slate-300">
              Distribuição de gastos por produto
            </p>
          </div>
        </div>
        {/* ---------- */}

        {/* Estatísticas em linha */}
        <div className="grid grid-cols-3 gap-10">
          <div className="rounded-lg border border-slate-300 bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-white transition-colors duration-300 dark:border-slate-500">
            <div className="text-lg font-semibold tracking-wider text-black italic">
              Total
            </div>
            <div className="text-lg font-bold tracking-wider text-black">
              {formatCompactCurrency(totalValue)}
            </div>
          </div>

          <div className="rounded-lg border border-slate-300 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-white transition-colors duration-300 dark:border-slate-500">
            <div className="text-lg font-semibold tracking-wider text-black italic">
              Média
            </div>
            <div className="text-lg font-bold tracking-wider text-black">
              {formatCompactCurrency(mediaValue)}
            </div>
          </div>

          <div className="rounded-lg border border-slate-300 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-white transition-colors duration-300 dark:border-slate-500">
            <div className="text-lg font-semibold tracking-wider text-black italic">
              Maior
            </div>
            <div className="text-lg font-bold tracking-wider text-black">
              {formatCompactCurrency(maiorValue)}
            </div>
          </div>
        </div>
      </div>
      {/* ---------- */}

      {/* GRÁFICO */}
      <div className="relative z-10 flex-grow">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={data}
            margin={{ top: 0, right: 15, bottom: 0, left: 10 }}
            barSize={30}
          >
            {/* === DEFINIÇÃO DOS GRADIENTES USADOS NAS BARRAS === */}
            <defs>
              {arrayColorsBars.map((color, index) => (
                <linearGradient
                  key={index}
                  id={`gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={color}
                    stopOpacity={0.9}
                  />
                  <stop
                    offset="100%"
                    stopColor={color}
                    stopOpacity={0.6}
                  />
                </linearGradient>
              ))}
              <filter
                id="glow"
                x="-50%"
                y="-50%"
                width="200%"
                height="200%"
              >
                <feGaussianBlur
                  stdDeviation="3"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* === LINHAS DE GRADE DO GRÁFICO === */}
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="currentColor"
              strokeOpacity={0.3}
              className="text-slate-400 dark:text-slate-500"
            />

            {/* === EIXO X (PRODUTOS) === */}
            <XAxis
              dataKey="produto"
              axisLine={false}
              tickLine={false}
              angle={-30}
              textAnchor="end"
              height={80}
              interval={0}
              tick={{
                fontSize: 14,
                fill: "currentColor",
                fontWeight: 500,
                letterSpacing: 1.5,
                className: "text-slate-600 dark:text-slate-300",
              }}
            />

            {/* === EIXO Y (VALORES EM R$) === */}
            <YAxis
              axisLine={false}
              tickLine={false}
              width={70}
              tickFormatter={formatCompactCurrency}
              tick={{
                fontSize: 14,
                fill: "currentColor",
                fontWeight: 500,
                letterSpacing: 1.5,
                className: "text-slate-600 dark:text-slate-300",
              }}
            />

            {/* === TOOLTIP (BALÃO QUE APARECE AO PASSAR O MOUSE) === */}
            <Tooltip
              cursor={{ fill: "rgba(6, 182, 212, 0.1)" }}
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                color: "#374151",
                fontSize: "14px",
                padding: "16px",
                letterSpacing: 1.5,
              }}
              wrapperStyle={{
                filter: "drop-shadow(0 10px 25px rgba(0,0,0,0.1))",
              }}
              formatter={(value) => [
                <div
                  key="tooltip-content"
                  className="space-y-2"
                >
                  <div className="text-base font-bold text-slate-700 dark:text-slate-200">
                    {formatCurrency(Number(value))}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {((Number(value) / totalValue) * 100).toFixed(1)}% do
                      total
                    </span>
                  </div>
                </div>,
                "",
              ]}
              labelStyle={{
                fontWeight: "700",
                color: "#374151",
                fontSize: "16px",
                marginBottom: "8px",
                letterSpacing: 1.5,
              }}
            />

            {/* === BARRAS DO GRÁFICO === */}
            <Bar
              dataKey="valor"
              radius={[8, 8, 0, 0]}
              animationDuration={1800}
              animationEasing="ease-out"
            >
              {/* === CELULAS INDIVIDUAIS (CADA BARRA) === */}
              {(data ?? []).map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#gradient-${index % arrayColorsBars.length})`}
                  stroke={arrayColorsBars[index % arrayColorsBars.length]}
                  strokeWidth={2}
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    filter:
                      hoveredIndex === index
                        ? `brightness(1.2) drop-shadow(0 0 12px ${arrayColorsBars[index % arrayColorsBars.length]}80)`
                        : "brightness(1)",
                  }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* LEGENDA */}
      <div className="relative z-10 mt-4">
        <div className="rounded-lg border border-slate-300 bg-slate-100 px-4 py-2 transition-colors duration-300 dark:border-slate-500 dark:bg-slate-800">
          <div className="flex flex-wrap justify-center gap-3">
            {(data ?? []).map((item, index) => {
              const percentage = ((item.valor / totalValue) * 100).toFixed(1);
              return (
                <div
                  key={`legend-${index}`}
                  className={`flex cursor-pointer items-center rounded-lg p-2 transition-all duration-300 ${
                    hoveredIndex === index
                      ? "scale-105 transform border border-slate-400 bg-slate-200 dark:border-slate-500 dark:bg-slate-700"
                      : "hover:bg-slate-200 dark:hover:bg-slate-700"
                  }`}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div
                    className="mr-2 h-3 w-3 flex-shrink-0 rounded-full border border-slate-400 dark:border-slate-500"
                    style={{
                      backgroundColor:
                        arrayColorsBars[index % arrayColorsBars.length],
                      boxShadow:
                        hoveredIndex === index
                          ? `0 0 8px ${arrayColorsBars[index % arrayColorsBars.length]}80`
                          : "none",
                    }}
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold tracking-wider text-slate-700 transition-colors duration-300 dark:text-white">
                      {item.produto}
                    </div>
                    <div className="text-sm font-semibold tracking-wider text-slate-600 transition-colors duration-300 dark:text-slate-300">
                      {formatCompactCurrency(item.valor)} - ({percentage}%)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

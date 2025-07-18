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

interface ComprasMesMockProps {
  mes: string;
  total: number;
}

export function ChartComprasAno({ data }: { data: ComprasMesMockProps[] }) {
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

  // Estatísticas
  const totalAnual = data.reduce((sum, item) => sum + item.total, 0);
  const mediaMonthly = totalAnual / data.length;
  const maiorCompra = Math.max(...data.map((item) => item.total));

  return (
    // CONTAINER PRINCIPAL
    <div className="relative flex h-[600px] flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      {/* ========== HEADER ========== */}
      <div className="relative z-10 mb-8">
        <div className="mb-5">
          {/* TÍTULO */}
          <div className="mb-2 flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-pink-500"></div>
            <h3 className="text-xl font-bold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white">
              Compras Mês
            </h3>
          </div>
          {/* SUBTÍTULO */}
          <p className="ml-6 text-base font-semibold tracking-wider text-slate-600 italic transition-colors duration-300 dark:text-slate-300">
            Distribuição por mês
          </p>
        </div>

        {/* CARDS ESTATÍSTICAS */}
        <div className="grid grid-cols-3 gap-6">
          <div className="rounded-lg border border-slate-300 bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-2 text-black transition-colors duration-300 dark:border-slate-500">
            <div className="text-sm font-semibold tracking-wider italic">
              Total
            </div>
            <div className="text-base font-semibold tracking-wider">
              {formatCompactCurrency(totalAnual)}
            </div>
          </div>

          <div className="rounded-lg border border-slate-300 bg-gradient-to-r from-purple-600 to-pink-600 px-4 py-2 text-black transition-colors duration-300 dark:border-slate-500">
            <div className="text-sm font-semibold tracking-wider italic">
              Média
            </div>
            <div className="text-base font-semibold tracking-wider">
              {formatCompactCurrency(mediaMonthly)}
            </div>
          </div>

          <div className="rounded-lg border border-slate-300 bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-2 text-black transition-colors duration-300 dark:border-slate-500">
            <div className="text-sm font-semibold tracking-wider italic">
              Maior
            </div>
            <div className="text-base font-semibold tracking-wider">
              {formatCompactCurrency(maiorCompra)}
            </div>
          </div>
        </div>
      </div>

      {/* ========== GRÁFICO ========== */}
      <div className="relative z-10 flex-grow">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={data}
            margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
            onMouseMove={(e) => {
              if (e && e.activeLabel) setHoveredMonth(e.activeLabel);
            }}
            onMouseLeave={() => setHoveredMonth(null)}
          >
            <defs>
              <linearGradient
                id="lineGradient"
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop
                  offset="0%"
                  stopColor="#06b6d4"
                />
                <stop
                  offset="50%"
                  stopColor="#3b82f6"
                />
                <stop
                  offset="100%"
                  stopColor="#8b5cf6"
                />
              </linearGradient>
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

            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              className="text-slate-400 dark:text-slate-600"
              strokeOpacity={0.4}
            />

            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              padding={{ left: 40, right: 40 }}
              tick={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: 1.5,
                fill: "currentColor",
                className: "text-slate-700 dark:text-slate-300",
              }}
            />

            <YAxis
              width={70}
              axisLine={false}
              tickLine={false}
              tickFormatter={formatCompactCurrency}
              tick={{
                fontSize: 14,
                fontWeight: 500,
                letterSpacing: 1.5,
                fill: "currentColor",
                className: "text-slate-700 dark:text-slate-300",
              }}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(148, 163, 184, 0.3)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                color: "#374151",
                fontSize: "14px",
                padding: "16px",
                letterSpacing: "1.5px",
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
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {((Number(value) / totalAnual) * 100).toFixed(1)}% do
                      total anual
                    </span>
                  </div>
                </div>,
                "",
              ]}
              labelStyle={{
                fontWeight: "700",
                color: "currentColor",
                fontSize: "14px",
                marginBottom: "8px",
              }}
              cursor={{
                stroke: "#06b6d4",
                strokeWidth: 2,
                strokeDasharray: "3 3",
              }}
            />

            <Line
              type="monotone"
              dataKey="total"
              stroke="url(#lineGradient)"
              strokeWidth={2.5}
              strokeOpacity={0.9}
              filter="url(#glow)"
              dot={(props) => {
                const isHovered = hoveredMonth === props.payload?.mes;
                return (
                  <circle
                    key={props.payload?.mes || props.index}
                    cx={props.cx}
                    cy={props.cy}
                    r={isHovered ? 6 : 4}
                    fill={isHovered ? "#06b6d4" : "#3b82f6"}
                    stroke="#ffffff"
                    strokeWidth={2}
                    style={{
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      filter: `drop-shadow(0 0 ${
                        isHovered ? "8px" : "4px"
                      } rgba(6, 182, 212, 0.5))`,
                    }}
                  />
                );
              }}
              activeDot={{
                r: 6,
                stroke: "#ffffff",
                strokeWidth: 3,
                fill: "#06b6d4",
                style: {
                  filter: "drop-shadow(0 0 12px rgba(6, 182, 212, 0.8))",
                },
              }}
              animationDuration={1800}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

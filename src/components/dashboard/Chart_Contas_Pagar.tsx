"use client";

import {
  Cell,
  Label,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface ContasPagarMockProps {
  name: string;
  value: number;
  count: number;
}

const arrayColorsCircleChart = [
  "#6366f1",
  "#ec4899",
  "#14b8a6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#06b6d4",
];

export function ChartContasPagar({
  chartdata,
}: {
  chartdata: ContasPagarMockProps[];
}) {
  const total = chartdata.reduce((sum, item) => sum + item.value, 0);

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

  return (
    // CONTAINER PRINCIPAL
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200 bg-white p-6 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900">
      {/* ========== HEADER ========== */}
      <div className="relative z-10 mb-4">
        <div className="mb-3">
          {/* TÍTULO */}
          <div className="mb-2 flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-indigo-500"></div>
            <h3 className="text-xl font-bold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white">
              Contas a Pagar
            </h3>
          </div>
          {/* SUBTÍTULO */}
          <p className="ml-6 text-base font-semibold tracking-wider text-slate-600 italic transition-colors duration-300 dark:text-slate-300">
            Distribuição por categoria
          </p>
        </div>
      </div>
      {/* ---------- */}

      {/* GRÁFICO */}
      <div className="relative z-10 flex-grow">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <defs>
              <filter
                id="glow"
                x="-50%"
                y="-50%"
                width="100%"
                height="100%"
              >
                <feGaussianBlur
                  stdDeviation="4"
                  result="coloredBlur"
                />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <Pie
              data={chartdata}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              labelLine={false}
              filter="url(#glow)"
            >
              {chartdata.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={
                    arrayColorsCircleChart[
                      index % arrayColorsCircleChart.length
                    ]
                  }
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={1}
                />
              ))}
              <Label
                value={formatCompactCurrency(total)}
                position="center"
                className="fill-slate-700 font-black transition-colors duration-300 dark:fill-white"
                style={{ fontSize: "18px", fontWeight: "900" }}
              />
            </Pie>

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
              formatter={(value, name, props) => [
                <div
                  key="tooltip"
                  className="space-y-2"
                >
                  <div className="text-base font-bold text-slate-700 dark:text-slate-200">
                    {formatCurrency(Number(value))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 animate-pulse rounded-full bg-cyan-400"></div>
                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {Math.round((Number(value) / total) * 100)}% do total
                    </span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500">
                    {props.payload.count} conta
                    {props.payload.count !== 1 ? "s" : ""}
                  </div>
                </div>,
                name,
              ]}
              itemStyle={{ fontWeight: "700", color: "inherit" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* LEGENDA */}
      <div className="relative z-10 mt-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {chartdata.map((item, index) => {
            const percentage = Math.round((item.value / total) * 100);
            return (
              <div
                key={`badge-${index}`}
                className="group"
              >
                <div className="flex items-center gap-5 rounded-lg border border-slate-300 bg-slate-100 p-2 transition-colors duration-300 hover:bg-slate-200 dark:border-slate-500 dark:bg-slate-800 dark:hover:bg-slate-700">
                  <div className="relative ml-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{
                        backgroundColor:
                          arrayColorsCircleChart[
                            index % arrayColorsCircleChart.length
                          ],
                        boxShadow: `0 0 12px ${
                          arrayColorsCircleChart[
                            index % arrayColorsCircleChart.length
                          ]
                        }40`,
                      }}
                    />
                    <div
                      className="absolute inset-0 h-3 w-3 animate-ping rounded-full"
                      style={{
                        backgroundColor:
                          arrayColorsCircleChart[
                            index % arrayColorsCircleChart.length
                          ],
                      }}
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-semibold tracking-wider text-slate-700 italic transition-colors duration-300 dark:text-white">
                      {item.name}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold tracking-wider text-slate-600 transition-colors duration-300 dark:text-slate-300">
                        {formatCompactCurrency(item.value)}
                      </span>

                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 overflow-hidden rounded-full bg-slate-300 transition-colors duration-300 dark:bg-slate-600">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor:
                                arrayColorsCircleChart[
                                  index % arrayColorsCircleChart.length
                                ],
                            }}
                          />
                        </div>
                        <span className="min-w-[32px] text-sm tracking-wider text-slate-600 transition-colors duration-300 dark:text-slate-300">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

"use client";

import { Cell, Label, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface Conta {
  name: string;
  value: number;
  count: number;
}

const COLORS = ["#6366f1", "#ec4899", "#14b8a6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];

export function ChartContasPagar({ data }: { data: Conta[] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

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
    <div className="bg-slate-900 p-4 sm:p-5 lg:p-6 rounded-2xl shadow-2xl border border-slate-700 h-[400px] sm:h-[450px] lg:h-[540px] flex flex-col relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-900 opacity-50"></div>
      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-teal-600/20 to-blue-600/20 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-5">
        <div className="mb-3 sm:mb-0">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <h3 className="text-sm sm:text-base lg:text-lg font-bold text-white uppercase tracking-widest">
              Contas a Pagar
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 font-medium ml-4">
            Análise de distribuição por status
          </p>
        </div>

        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-lg border border-indigo-500/30">
          <div className="text-[10px] sm:text-xs text-indigo-200 uppercase tracking-wide">
            Total
          </div>
          <div className="text-sm sm:text-base font-black">{formatCompactCurrency(total)}</div>
        </div>
      </div>

      {/* Gráfico principal */}
      <div className="relative z-10 flex-grow">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
              animationEasing="ease-out"
              labelLine={false}
              filter="url(#glow)"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth={1}
                />
              ))}
              <Label
                value={formatCompactCurrency(total)}
                position="center"
                className="font-black fill-white"
                style={{
                  fontSize: "14px",
                  fontWeight: "900",
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.3))",
                }}
              />
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
                background: "rgba(30, 41, 59, 0.95)",
                backdropFilter: "blur(20px)",
                color: "white",
                fontSize: "14px",
                padding: "16px",
              }}
              formatter={(value, name, props) => [
                <div key="tooltip" className="space-y-2">
                  <div className="font-bold text-white text-base">
                    {formatCurrency(Number(value))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <span className="text-slate-300 text-sm">
                      {Math.round((Number(value) / total) * 100)}% do total
                    </span>
                  </div>
                  <div className="text-slate-400 text-xs border-t border-slate-600 pt-2">
                    {props.payload.count} conta{props.payload.count !== 1 ? "s" : ""}
                  </div>
                </div>,
                name,
              ]}
              itemStyle={{ fontWeight: "700", color: "white" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legenda moderna */}
      <div className="relative z-10 mt-4 border-t border-slate-700 pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {data.map((item, index) => {
            const percentage = Math.round((item.value / total) * 100);
            return (
              <div key={`badge-${index}`} className="group">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300 backdrop-blur-sm">
                  <div className="relative">
                    <div
                      className="w-3 h-3 rounded-full shadow-lg"
                      style={{
                        backgroundColor: COLORS[index % COLORS.length],
                        boxShadow: `0 0 12px ${COLORS[index % COLORS.length]}40`,
                      }}
                    />
                    <div
                      className="absolute inset-0 w-3 h-3 rounded-full animate-ping"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="text-xs sm:text-sm font-bold text-white truncate mb-1">
                      {item.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-300 font-medium">
                        {formatCompactCurrency(item.value)}
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1 bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percentage}%`,
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-400 font-mono min-w-[32px]">
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

import { CheckCircle, Clock, ShoppingCart } from "lucide-react";

interface StatCardsGridProps {
  cardData: {
    totalCompras: number;
    comprasPagas: number;
    comprasAberto: number;
  };
}

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

export function CardsDashboard({ cardData }: StatCardsGridProps) {
  return (
    // Container principal
    <div className="grid grid-cols-1 gap-3">
      {/* ========== CARD 1 ========== */}
      <div className="rounded-lg border border-slate-400 bg-white/10 p-6 dark:border-slate-500 dark:bg-slate-900">
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            {/* Ícone */}
            <div className="rounded-lg bg-cyan-500 p-3">
              <ShoppingCart className="h-7 w-7 text-black" />
            </div>

            {/* Título e valor */}
            <div className="text-right">
              <div className="mb-2 flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-500"></div>
                <p className="text-base font-semibold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white">
                  Total Compras
                </p>
              </div>

              <p className="text-3xl font-extrabold tracking-wider text-cyan-600 transition-colors duration-300 dark:text-cyan-400">
                {formatCompactCurrency(cardData.totalCompras)}
              </p>
            </div>
          </div>
          {/* ---------- */}

          <div className="space-y-2">
            {/* Progresso */}
            <div className="flex justify-between text-sm font-semibold tracking-wider text-slate-600 transition-colors duration-300 dark:text-slate-300">
              <span className="italic">Progresso</span>
              <span>100%</span>
            </div>

            {/* Barra de progresso */}
            <div className="relative">
              <div className="h-2 w-full rounded-full bg-slate-200 transition-colors duration-300 dark:bg-slate-700">
                <div className="relative h-2 overflow-hidden rounded-full bg-cyan-500"></div>
              </div>
            </div>

            {/* Valor atual */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 tracking-wider">
                <div className="h-3 w-3 animate-pulse rounded-full bg-cyan-500"></div>
                <span className="text-sm font-semibold text-slate-600 italic transition-colors duration-300 dark:text-slate-300">
                  Valor atual
                </span>
              </div>
            </div>
          </div>
          {/* ---------- */}
        </div>
      </div>
      {/* ---------- */}

      {/* ========== CARD 2 ========== */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-500 dark:bg-slate-900 dark:shadow-2xl">
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            {/* Ícone */}
            <div className="rounded-lg bg-emerald-500 p-3">
              <CheckCircle className="h-7 w-7 text-black" />
            </div>

            {/* Título e valor */}
            <div className="text-right">
              <div className="mb-2 flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
                <p className="text-base font-semibold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white">
                  Total Compras Pagas
                </p>
              </div>

              <p className="text-3xl font-extrabold tracking-wider text-emerald-600 transition-colors duration-300 dark:text-emerald-400">
                {formatCompactCurrency(cardData.comprasPagas)}
              </p>
            </div>
          </div>
          {/* ---------- */}

          <div className="space-y-2">
            {/* Progresso */}
            <div className="flex justify-between text-sm font-semibold tracking-wider text-slate-600 transition-colors duration-300 dark:text-slate-300">
              <span className="italic">Progresso</span>
              <span>
                {Math.round(
                  (cardData.comprasPagas / cardData.totalCompras) * 100
                )}
                %
              </span>
            </div>

            {/* Barra de progresso */}
            <div className="relative">
              <div className="h-2 w-full rounded-full bg-slate-200 transition-colors duration-300 dark:bg-slate-700">
                <div
                  className="relative h-2 overflow-hidden rounded-full bg-emerald-500"
                  style={{
                    width: `${Math.min((cardData.comprasPagas / cardData.totalCompras) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Valor atual */}
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600 transition-colors duration-300 dark:text-slate-300">
              <div className="flex items-center gap-2 tracking-wider">
                <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500"></div>
                <span className="italic">Valor atual</span>
              </div>
              <div>de {formatCompactCurrency(cardData.totalCompras)}</div>
            </div>
          </div>
          {/* ---------- */}
        </div>
      </div>
      {/* ---------- */}

      {/* ========== CARD 3 ========== */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-lg transition-colors duration-300 dark:border-slate-500 dark:bg-slate-900 dark:shadow-2xl">
        <div className="relative z-10">
          <div className="mb-4 flex items-center justify-between">
            {/* Ícone */}
            <div className="rounded-lg bg-red-500 p-3">
              <Clock className="h-7 w-7 text-black" />
            </div>

            {/* Título e valor */}
            <div className="text-right">
              <div className="mb-2 flex items-center gap-3">
                <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                <p className="text-base font-semibold tracking-wider text-slate-700 uppercase italic transition-colors duration-300 dark:text-white">
                  Total Compras Aberto
                </p>
              </div>

              <p className="text-3xl font-extrabold tracking-wider text-red-600 transition-colors duration-300 dark:text-red-400">
                {formatCompactCurrency(cardData.comprasAberto)}
              </p>
            </div>
          </div>
          {/* ---------- */}

          <div className="space-y-2">
            {/* Progresso */}
            <div className="flex justify-between text-sm font-semibold tracking-wider text-slate-600 transition-colors duration-300 dark:text-slate-300">
              <span className="italic">Progresso</span>
              <span className="text-slate-600 dark:text-slate-300">
                {Math.round(
                  (cardData.comprasAberto / cardData.totalCompras) * 100
                )}
                %
              </span>
            </div>

            {/* Barra de progresso */}
            <div className="relative">
              <div className="h-2 w-full rounded-full bg-slate-200 transition-colors duration-300 dark:bg-slate-700">
                <div
                  className="relative h-2 overflow-hidden rounded-full bg-red-500"
                  style={{
                    width: `${Math.min((cardData.comprasAberto / cardData.totalCompras) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Valor atual */}
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600 transition-colors duration-300 dark:text-slate-300">
              <div className="flex items-center gap-2 tracking-wider">
                <div className="h-3 w-3 animate-pulse rounded-full bg-red-500"></div>
                <span className="italic">Valor atual</span>
              </div>
              <div>de {formatCompactCurrency(cardData.totalCompras)}</div>
            </div>
          </div>
          {/* ---------- */}
        </div>
      </div>
      {/* ---------- */}
    </div>
  );
}

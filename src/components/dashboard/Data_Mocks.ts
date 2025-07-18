// src/data/mockData.ts

export const comprasPorProdutoMock = [
  { produto: "Luvas Nitrílicas", valor: 12000 },
  { produto: "Seringas 10ml", valor: 8500 },
  { produto: "Máscaras N95", valor: 15000 },
  { produto: "Cateteres", valor: 7000 },
  { produto: "Gazes Estéreis", valor: 4000 },
  { produto: "Termômetros", valor: 6000 },
];

export const comprasMensais = [
  { mes: "Jan", total: 18400 },
  { mes: "Fev", total: 22000 },
  { mes: "Mar", total: 19800 },
  { mes: "Abr", total: 25600 },
  { mes: "Mai", total: 23400 },
  { mes: "Jun", total: 28000 },
  { mes: "Jul", total: 26500 },
  { mes: "Ago", total: 24000 },
  { mes: "Set", total: 29500 },
  { mes: "Out", total: 31000 },
  { mes: "Nov", total: 27500 },
  { mes: "Dez", total: 33000 },
];

export const pedidosMensais = [
  { mes: "Jan", totalPedidos: 20, valorTotal: 12000 },
  { mes: "Fev", totalPedidos: 25, valorTotal: 15000 },
  { mes: "Mar", totalPedidos: 30, valorTotal: 18000 },
  { mes: "Abr", totalPedidos: 22, valorTotal: 16000 },
  { mes: "Mai", totalPedidos: 28, valorTotal: 20000 },
  { mes: "Jun", totalPedidos: 35, valorTotal: 22000 },
  { mes: "Jul", totalPedidos: 40, valorTotal: 25000 },
  { mes: "Ago", totalPedidos: 38, valorTotal: 24000 },
  { mes: "Set", totalPedidos: 45, valorTotal: 27000 },
  { mes: "Out", totalPedidos: 50, valorTotal: 30000 },
  { mes: "Nov", totalPedidos: 55, valorTotal: 32000 },
  { mes: "Dez", totalPedidos: 60, valorTotal: 35000 },
];

export const cardDashboardMock = {
  totalCompras: 150000,
  comprasPagas: 120000,
  comprasAberto: 30000,
};

export const contasPagarMesMock = [
  { name: "Pagas", value: 12400, count: 12 },
  { name: "Em Aberto", value: 8200, count: 8 },
  { name: "Atrasadas", value: 4500, count: 4 },
  { name: "Canceladas", value: 1200, count: 2 },
];

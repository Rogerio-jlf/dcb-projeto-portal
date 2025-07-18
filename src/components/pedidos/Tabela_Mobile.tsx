import { PedidoType } from "@/types/pedido";
import { Row, flexRender } from "@tanstack/react-table";

interface Props {
  row: Row<PedidoType>;
}

export function TabelaMobile({ row }: Props) {
  const allCells = row.getAllCells();

  const contentCells = allCells.filter((cell) => cell.column.id !== "acoes");
  const actionCell = allCells.find((cell) => cell.column.id === "acoes");

  return (
    <div className="space-y-2 rounded-lg border border-gray-200 bg-white p-2 shadow-sm shadow-black">
      {contentCells.map((cell) => (
        <div key={cell.id}>
          {/* TÍTULO */}
          <p className="text-xs font-semibold tracking-wide text-gray-800 uppercase italic">
            {cell.column.columnDef.header as string}
          </p>
          {/* VALOR */}
          <p className="text-sm font-bold tracking-wide text-gray-800 italic">
            {cell.renderValue() as string}
          </p>
          <hr className="my-2 border-dashed border-gray-300" />
        </div>
      ))}

      {actionCell && (
        <div className="flex justify-end pt-2">
          {flexRender(
            actionCell.column.columnDef.cell,
            actionCell.getContext()
          )}
        </div>
      )}
    </div>
  );
}

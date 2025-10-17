export default function Table({
  columns,
  rows,
  rowKey,
  emptyText = 'Sin datos',
}) {
  if (!rows?.length)
    return <p className="text-sm text-slate-500">{emptyText}</p>;
  return (
    <table className="w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-50 text-left text-sm">
          {columns.map((c) => (
            <th
              key={c.key}
              className="border-b border-gray-200 px-3 py-2 font-medium"
            >
              {c.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={rowKey ? rowKey(row, i) : i} className="text-sm">
            {columns.map((c) => (
              <td key={c.key} className="border-b border-gray-100 px-3 py-2">
                {c.render ? c.render(row) : row[c.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

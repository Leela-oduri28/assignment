export default function ProductTable({ products, onEdit }) {
  return (
    <table className="w-full border text-sm table-fixed">
      <thead>
        <tr className="bg-blue-100">
          <th className="p-2 w-[30%] text-left">Name</th>
          <th className="p-2 w-[15%] text-left">Price</th>
          <th className="p-2 w-[20%] text-left">Category</th>
          <th className="p-2 w-[15%] text-left">Stock</th>
          <th className="p-2 w-[20%] text-left">Edit</th>
        </tr>
      </thead>

      <tbody>
        {products.map((p) => (
          <tr key={p.id} className="border-b hover:bg-gray-50">
            <td className="p-2 w-[30%] truncate">{p.name}</td>
            <td className="p-2 w-[15%] truncate">₹{p.price}</td>
            <td className="p-2 w-[20%] truncate">{p.category}</td>
            <td className="p-2 w-[15%] truncate">{p.stock}</td>
            <td className="p-2 w-[20%]">
              <button
                onClick={() => onEdit(p)}
                className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
              >
                Edit
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

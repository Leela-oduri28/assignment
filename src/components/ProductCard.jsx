
export default function ProductCard({ product, onEdit }) {
  return (
    <div className='border p-4 rounded shadow hover:shadow-md transition'>
      <h3 className='font-semibold text-lg'>{product.name}</h3>
      <p className='text-gray-600 mt-1'>₹{product.price}</p>
      <p className='text-gray-500 text-sm'>{product.category}</p>
      <button onClick={() => onEdit(product)} className='mt-3 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700'>
        Edit
      </button>
    </div>
  );
}

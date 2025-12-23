
export default function Searchbar({ value, onChange }) {
  return (
    <input
      type='text'
      placeholder='Search products...'
      value={value}
      onChange={(e)=>onChange(e.target.value)}
      className='border px-3 py-2 rounded w-full outline-none focus:ring-2 focus:ring-blue-400'
    />
  );
}

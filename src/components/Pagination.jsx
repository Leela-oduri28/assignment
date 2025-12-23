
export default function Pagination({ currentPage, totalPages, onChange }) {
  return (
    <div className='flex items-center justify-center gap-4 mt-4'>
      <button disabled={currentPage===1} onClick={()=>onChange(currentPage-1)} className='px-3 py-1 border rounded disabled:opacity-50'>
        Prev
      </button>
      <span className='text-sm'> Page {currentPage} of {totalPages}</span>
      <button disabled={currentPage===totalPages} onClick={()=>onChange(currentPage+1)} className='px-3 py-1 border rounded disabled:opacity-50'>
        Next
      </button>
    </div>
  );
}

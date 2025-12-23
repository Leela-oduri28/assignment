import { useEffect, useState } from "react";
import SearchBar from "../components/Searchbar";
import { useDebounce } from "../hooks/useDebounce";
import ProductTable from "../components/ProductTable";
import ProductCard from "../components/ProductCard";
import ProductForm from "../components/ProductForm";
import Pagination from "../components/Pagination";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);
  const [editingProduct, setEditingProduct] = useState(null);

  const itemsPerPage = 8;
  const [page, setPage] = useState(1);

  // Load products.json using fetch
  useEffect(() => {
    fetch("data/products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error loading JSON:", err));
  }, []);

  // Search filtering
  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
  );

  //Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginated = filtered.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Add / Edit Product
  const handleSubmit = (form) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editingProduct.id ? form : p))
      );
      setEditingProduct(null);
    } else {
      setProducts((prev) => [...prev, { ...form, id: prev.length + 1 }]);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-center mb-4">
        Product Management Dashboard
      </h1>

      <div className="flex flex-col md:flex-row md:justify-between gap-4 items-start md:items-center w-full">
        <SearchBar value={search} onChange={setSearch} />

        <button
          onClick={() => setView("table")}
          className={`px-3 py-2 rounded ${
            view === "table" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Table
        </button>

        <button
          onClick={() => setView("card")}
          className={`px-3 py-2 rounded ${
            view === "card" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
        >
          Cards
        </button>
      </div>


        {view === "table" ? (
        <div className="w-full overflow-y-scroll border rounded">
            <ProductTable products={paginated} onEdit={setEditingProduct} />
        </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {paginated.map((p) => (
              <ProductCard key={p.id} product={p} onEdit={setEditingProduct} />
            ))}
          </div>
        )}
    

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onChange={setPage}
      />

        <ProductForm onSubmit={handleSubmit} editingProduct={editingProduct} />

    </div>
  );
}

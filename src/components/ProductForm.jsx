import { useState, useEffect } from "react";

export default function ProductForm({ onSubmit, editingProduct }) {
  const [form, setForm] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  // Load data when editing
  useEffect(() => {
    if (editingProduct) {
      setForm(editingProduct);
      setErrors({});
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });

    // Clear error on typing
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Validate inputs before submitting
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.price) newErrors.price = "Price is required.";
    if (form.price <= 0) newErrors.price = "Price must be greater than 0.";
    if (!form.category.trim()) newErrors.category = "Category is required.";

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit(form);

    // Reset form after adding new product
    if (!editingProduct) {
      setForm({
        name: "",
        price: "",
        category: "",
        stock: "",
        description: "",
      });
    }
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-100 p-4 rounded mt-8 space-y-3"
    >
      <h2 className="font-semibold text-lg">
        {editingProduct ? "Edit Product" : "Add Product"}
      </h2>

      {/* Name */}
      <div>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className={`border p-2 w-full rounded ${
            errors.name ? "border-red-500" : ""
          }`}
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Price */}
      <div>
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className={`border p-2 w-full rounded ${
            errors.price ? "border-red-500" : ""
          }`}
        />
        {errors.price && (
          <p className="text-red-500 text-sm mt-1">{errors.price}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
          className={`border p-2 w-full rounded ${
            errors.category ? "border-red-500" : ""
          }`}
        />
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      {/* Stock */}
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        placeholder="Stock"
        className="border p-2 w-full rounded"
      />

      {/* Description */}
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        className="border p-2 w-full rounded"
      />

      <button className="px-4 py-2 bg-green-600 text-white rounded">
        {editingProduct ? "Update" : "Add Product"}
      </button>
    </form>
  );
}

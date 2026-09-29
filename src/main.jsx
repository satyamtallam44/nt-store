import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import "./styles.css";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("All Products");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        setError("Unable to load products.");
      } else {
        setProducts(data || []);
      }

      setLoading(false);
    }

    fetchProducts();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(products.map((product) => product.category)),
    ];

    return ["All Products", ...uniqueCategories];
  }, [products]);

  const visible = useMemo(() => {
    return products.filter((product) => {
      const categoryMatch =
        category === "All Products" || product.category === category;

      const queryMatch = product.title
        .toLowerCase()
        .includes(query.toLowerCase());

      return categoryMatch && queryMatch;
    });
  }, [products, category, query]);

  return (
    <div className="page">
      <header className="header">
        <div className="brand">NT Store</div>

        <div className="search-wrap">
          <Search size={31} strokeWidth={2.5} />

          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            aria-label="Search products"
          />

          <button className="search-button">Search</button>
        </div>
      </header>

      <main>
        <nav className="category-bar" aria-label="Product categories">
          {categories.map((item) => (
            <button
              key={item}
              className={`category-pill ${
                category === item ? "active" : ""
              }`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <section className="catalog">
          <div className="catalog-heading">
            <h1>{category}</h1>
            <span>{visible.length} products</span>
          </div>

          {loading && <div className="empty">Loading products...</div>}

          {error && <div className="empty">{error}</div>}

          {!loading && !error && (
            <div className="grid">
              {visible.map((product) => (
                <article
                  className="card"
                  key={product.id}
                  onClick={() =>
                    window.open(
                      product.link,
                      "_blank",
                      "noopener,noreferrer"
                    )
                  }
                  role="link"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();

                      window.open(
                        product.link,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                >
                  <div className="image-box">
                    <img
                      src={product.image_url}
                      alt={product.title}
                    />
                  </div>

                  <h2>{product.title}</h2>
                </article>
              ))}
            </div>
          )}

          {!loading && !error && visible.length === 0 && (
            <div className="empty">No products found.</div>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { Search } from "lucide-react";
import "./styles.css";

import Tanjore from "./assets/Tnajore.jpg";
import mboard from "./assets/muck-board.jpg";

const products = [
  {
    name: "Tanjore Painting Material Full Kit",
    category: "Painting",
    image: Tanjore,
    link: "https://link.amazon/B03PSugjw"
  },
  {
    name: "ReadyMade Muck Board",
    category: "Painting",
    image: mboard,
    link: "https://link.amazon/B0cnrgsi7"
  }
];

const categories = [
  "All Products",
  // "AUTOMOBILE",
  // "Electronics",
  // "GYM",
  // "Home & Kitchen",
  // "SMART GADGETS",
  // "Sports",
  // "TREK"
];

function App() {
  const [category, setCategory] = useState("All Products");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return products.filter((p) => {
      const categoryMatch =
        category === "All Products" || p.category === category;
      const queryMatch = p.name.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    });
  }, [category, query]);

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
              className={`category-pill ${category === item ? "active" : ""}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </nav>

        <section className="catalog">
          <div className="catalog-heading">
            <h1>{category}</h1>
            {/* <span>{visible.length === products.length ? "27" : visible.length} products</span> */}
          </div>

          <div className="grid">
            {visible.map((product, index) => (
              <article
                className="card"
                key={`${product.name}-${index}`}
                onClick={() => window.open(product.link, "_blank", "noopener,noreferrer")}
                role="link"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    window.open(product.link, "_blank", "noopener,noreferrer");
                  }
                }}
              >
                <div className="image-box">
                  <img src={product.image} alt={product.name} />
                </div>
                <h2>{product.name}</h2>
              </article>
            ))}
          </div>

          {visible.length === 0 && (
            <div className="empty">No products found.</div>
          )}
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);

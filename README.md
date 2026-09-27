# Guna Tech clone

React/Vite implementation based on the supplied Guna Tech screenshot.

## Product links

Each product now has a `link` property in `src/main.jsx`.

Example:

```js
{
  name: "BEELINE MOTO 2",
  category: "AUTOMOBILE",
  image: beeline,
  link: "https://www.amazon.in/your-product-link"
}
```

Clicking a product card opens its link in a new browser tab.

Replace the example Amazon URLs with your actual product URLs or Amazon affiliate links.

## Run

```bash
npm install
npm run dev
```

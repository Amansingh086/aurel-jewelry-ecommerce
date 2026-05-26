import { useMemo, useState } from "react";
import {
  ArrowRight,
  Gem,
  Menu,
  Rotate3D,
  ShoppingBag,
  Sparkles,
  Star,
  X
} from "lucide-react";

const categories = [
  {
    name: "Rings",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Necklaces",
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
  },
  {
    name: "Bracelets",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80"
  }
];

const products = [
  {
    id: 1,
    name: "Solenne Diamond Ring",
    type: "Ring",
    price: 1290,
    badge: "Bestseller",
    shape: "ring",
    image:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 2,
    name: "Celeste Pearl Necklace",
    type: "Necklace",
    price: 980,
    badge: "New",
    shape: "necklace",
    image:
      "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 3,
    name: "Asteria Drop Earrings",
    type: "Earrings",
    price: 740,
    badge: "Limited",
    shape: "earrings",
    image:
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 4,
    name: "Noir Tennis Bracelet",
    type: "Bracelet",
    price: 1680,
    badge: "Exclusive",
    shape: "bracelet",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 5,
    name: "Marquise Signet Ring",
    type: "Ring",
    price: 1120,
    badge: "New",
    shape: "ring",
    image:
      "https://images.unsplash.com/photo-1603561596112-db1d5f2e6401?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 6,
    name: "Lumiere Chain Necklace",
    type: "Necklace",
    price: 1390,
    badge: "Bestseller",
    shape: "necklace",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 7,
    name: "Vesper Gold Hoops",
    type: "Earrings",
    price: 620,
    badge: "Exclusive",
    shape: "earrings",
    image:
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=900&q=80"
  },
  {
    id: 8,
    name: "Etoile Pavé Bracelet",
    type: "Bracelet",
    price: 1840,
    badge: "Limited",
    shape: "bracelet",
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=900&q=80"
  }
];

const karats = ["14K", "18K", "22K"];
const diamondSizes = ["0.25 ct", "0.50 ct", "0.75 ct", "1.00 ct"];
const metalColors = [
  { name: "Yellow Gold", value: "#d7a84f" },
  { name: "Rose Gold", value: "#c98f7a" },
  { name: "Silver", value: "#c9d1d7" }
];

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const cartTotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  function addToCart(product, options) {
    setCart((current) => {
      const key = `${product.id}-${options.karat}-${options.diamondSize}-${options.metalColor}`;
      const existing = current.find((item) => item.key === key);

      if (existing) {
        return current.map((item) =>
          item.key === key ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...current,
        {
          key,
          ...product,
          ...options,
          quantity: 1
        }
      ];
    });
    setSelectedProduct(null);
  }

  return (
    <main className="min-h-screen bg-[#fbf7ef] text-[#171411]">
      <Header
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        mobileNavOpen={mobileNavOpen}
        onMenuClick={() => setMobileNavOpen((open) => !open)}
      />
      <Hero />
      <Ticker />
      <CategoryGrid />
      <ProductGrid onOpenProduct={setSelectedProduct} />
      <CartPreview cart={cart} cartTotal={cartTotal} />
      <Footer />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
        />
      )}
    </main>
  );
}

function Header({ cartCount, mobileNavOpen, onMenuClick }) {
  const links = ["Home", "Collections", "Jewels", "Contact"];

  return (
    <header className="fixed left-0 right-0 top-0 z-40 border-b border-white/12 bg-[#171411]/78 text-white backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
        <a href="#" className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e7c884] text-[#e7c884]">
            <Gem size={19} />
          </span>
          <span className="font-serif text-2xl tracking-[0.16em]">AUREL</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm font-semibold text-[#2ecc71] md:flex">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="hover:text-[#8ff0b5]">
              {link}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#cart"
            className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 hover:border-[#e7c884]"
            aria-label="Cart"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#e7c884] px-1 text-xs font-bold text-[#171411]">
                {cartCount}
              </span>
            )}
          </a>
          <button
            type="button"
            onClick={onMenuClick}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden"
            aria-label="Menu"
          >
            <Menu size={19} />
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <nav className="grid gap-2 border-t border-white/10 px-5 py-4 text-sm font-semibold text-[#2ecc71] md:hidden">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="py-2">
              {link}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative min-h-[92vh] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1800&q=85"
        alt="Fine jewelry collection"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#171411]/92 via-[#171411]/64 to-[#171411]/12" />
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl items-end px-5 pb-14 pt-32 sm:px-8 lg:px-10">
        <div className="max-w-3xl text-white">
          <p className="mb-5 inline-flex items-center gap-2 border border-white/16 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-lg">
            <Sparkles size={16} className="text-[#e7c884]" />
            Handcrafted fine jewelry in 14K, 18K, and 22K gold
          </p>
          <h1 className="font-serif text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">
            Jewelry shaped for light, legacy, and everyday ceremony.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
            Discover AUREL, a refined collection of rings, necklaces, earrings,
            and bracelets with an interactive 360 degree product experience.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#jewels"
              className="inline-flex items-center justify-center gap-2 bg-[#e7c884] px-6 py-4 font-semibold text-[#171411] transition hover:bg-white"
            >
              Shop Collection <ArrowRight size={18} />
            </a>
            <a
              href="#collections"
              className="inline-flex items-center justify-center border border-white/22 px-6 py-4 font-semibold text-white transition hover:border-[#e7c884] hover:text-[#e7c884]"
            >
              Explore Categories
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Ticker() {
  const text = "Free Shipping · 18K Gold · Certified Diamonds · Lifetime Care · Hand Finished ·";

  return (
    <div className="overflow-hidden border-y border-[#e9dfcf] bg-[#171411] py-3 text-[#e7c884]">
      <div className="ticker flex whitespace-nowrap text-sm font-semibold uppercase tracking-[0.28em]">
        <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
        <span>{text}&nbsp;</span>
      </div>
    </div>
  );
}

function CategoryGrid() {
  return (
    <section id="collections" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
      <SectionHeading
        eyebrow="Collections"
        title="Four essential forms, crafted with quiet luxury."
        text="Each category is presented with editorial imagery, subtle movement, and a clear path into the collection."
      />
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((category) => (
          <a
            href="#jewels"
            key={category.name}
            className="group relative aspect-[4/5] overflow-hidden bg-[#171411]"
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#171411]/78 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between p-5 text-white">
              <h3 className="font-serif text-3xl">{category.name}</h3>
              <span className="grid h-10 w-10 place-items-center border border-white/28 bg-white/10 backdrop-blur">
                <ArrowRight size={18} />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function ProductGrid({ onOpenProduct }) {
  return (
    <section id="jewels" className="bg-[#f1eadf] px-5 py-20 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Fine Jewelry"
          title="Signature pieces with interactive 3D viewing."
          text="Every product card includes image, badge, type, price, hover actions, and a configurable product modal."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenProduct={onOpenProduct}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, onOpenProduct }) {
  return (
    <article className="group overflow-hidden border border-[#ded2c0] bg-[#fbf7ef]">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#171411]">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-[#fbf7ef] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-[#171411]">
          {product.badge}
        </span>
        <div className="absolute inset-0 flex items-end justify-center gap-3 bg-[#171411]/0 p-4 opacity-0 transition group-hover:bg-[#171411]/54 group-hover:opacity-100">
          <button
            type="button"
            onClick={() => onOpenProduct(product)}
            className="inline-flex items-center gap-2 bg-[#e7c884] px-4 py-3 text-sm font-semibold text-[#171411]"
          >
            <Rotate3D size={16} /> View in 3D
          </button>
          <button
            type="button"
            onClick={() => onOpenProduct(product)}
            className="inline-flex items-center gap-2 bg-white px-4 py-3 text-sm font-semibold text-[#171411]"
          >
            <ShoppingBag size={16} /> Quick Add
          </button>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm uppercase tracking-[0.2em] text-[#88785f]">
          {product.type}
        </p>
        <h3 className="mt-2 font-serif text-2xl">{product.name}</h3>
        <p className="mt-3 text-lg font-semibold">${product.price.toLocaleString()}</p>
      </div>
    </article>
  );
}

function ProductModal({ product, onClose, onAddToCart }) {
  const [karat, setKarat] = useState("18K");
  const [diamondSize, setDiamondSize] = useState("0.50 ct");
  const [metalColor, setMetalColor] = useState("Yellow Gold");

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#171411]/72 px-4 py-6 backdrop-blur-sm"
      onMouseDown={onClose}
    >
      <section
        className="max-h-[92vh] w-full max-w-5xl overflow-y-auto bg-[#fbf7ef] shadow-2xl"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-[#ded2c0] px-5 py-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#88785f]">
              360 degree interactive view
            </p>
            <h2 className="font-serif text-3xl">{product.name}</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center border border-[#ded2c0]"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid min-h-[430px] place-items-center bg-[#171411] p-8 text-white">
            <div className="text-center">
              <p className="mb-6 inline-flex items-center gap-2 border border-white/16 px-4 py-2 text-sm text-[#e7c884]">
                <Rotate3D size={17} /> 360° Interactive View
              </p>
              <JewelryViewer shape={product.shape} metalColor={metalColor} />
            </div>
          </div>

          <div className="p-6 sm:p-8">
            <p className="text-sm uppercase tracking-[0.22em] text-[#88785f]">
              {product.type} · {product.badge}
            </p>
            <h3 className="mt-3 font-serif text-4xl">{product.name}</h3>
            <p className="mt-3 text-2xl font-semibold">
              ${product.price.toLocaleString()}
            </p>

            <OptionGroup label="Karat">
              {karats.map((item) => (
                <OptionButton
                  key={item}
                  active={karat === item}
                  onClick={() => setKarat(item)}
                >
                  {item}
                </OptionButton>
              ))}
            </OptionGroup>

            <OptionGroup label="Diamond Size">
              {diamondSizes.map((item) => (
                <OptionButton
                  key={item}
                  active={diamondSize === item}
                  onClick={() => setDiamondSize(item)}
                >
                  {item}
                </OptionButton>
              ))}
            </OptionGroup>

            <OptionGroup label="Metal Color">
              <div className="flex flex-wrap gap-3">
                {metalColors.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setMetalColor(item.name)}
                    className={`flex items-center gap-2 border px-3 py-3 text-sm font-semibold transition ${
                      metalColor === item.name
                        ? "border-[#171411] bg-white"
                        : "border-[#ded2c0] bg-transparent"
                    }`}
                  >
                    <span
                      className="h-5 w-5 rounded-full border border-black/10"
                      style={{ backgroundColor: item.value }}
                    />
                    {item.name}
                  </button>
                ))}
              </div>
            </OptionGroup>

            <button
              type="button"
              onClick={() =>
                onAddToCart(product, { karat, diamondSize, metalColor })
              }
              className="mt-8 flex w-full items-center justify-center gap-2 bg-[#171411] px-5 py-4 font-semibold text-white transition hover:bg-[#e7c884] hover:text-[#171411]"
            >
              Add to Cart <ShoppingBag size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function JewelryViewer({ shape, metalColor }) {
  const metal = metalColors.find((item) => item.name === metalColor)?.value ?? "#d7a84f";

  return (
    <div className={`jewel-viewer ${shape}`} style={{ "--metal": metal }}>
      <div className="jewel-core" />
      <div className="jewel-sparkle one" />
      <div className="jewel-sparkle two" />
      <div className="jewel-sparkle three" />
    </div>
  );
}

function OptionGroup({ label, children }) {
  return (
    <div className="mt-7">
      <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-[#88785f]">
        {label}
      </p>
      <div className="flex flex-wrap gap-3">{children}</div>
    </div>
  );
}

function OptionButton({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border px-4 py-3 text-sm font-semibold transition ${
        active
          ? "border-[#171411] bg-[#171411] text-white"
          : "border-[#ded2c0] bg-transparent text-[#171411] hover:bg-white"
      }`}
    >
      {children}
    </button>
  );
}

function CartPreview({ cart, cartTotal }) {
  return (
    <section id="cart" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionHeading
            eyebrow="Cart"
            title="Selected configurations stay visible."
            text="Each cart item records product, karat, diamond size, metal color, quantity, and price."
          />
        </div>
        <div className="border border-[#ded2c0] bg-white">
          {cart.length === 0 ? (
            <div className="grid min-h-56 place-items-center p-8 text-center">
              <div>
                <ShoppingBag className="mx-auto text-[#88785f]" size={34} />
                <p className="mt-4 text-lg font-semibold">Your cart is empty.</p>
                <p className="mt-2 text-[#6f6558]">
                  Open a product, choose options, and add it to cart.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {cart.map((item) => (
                <div
                  key={item.key}
                  className="grid gap-4 border-b border-[#ded2c0] p-5 sm:grid-cols-[88px_1fr_auto]"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-24 w-24 object-cover"
                  />
                  <div>
                    <h3 className="font-serif text-2xl">{item.name}</h3>
                    <p className="mt-1 text-sm text-[#6f6558]">
                      {item.karat} · {item.diamondSize} · {item.metalColor}
                    </p>
                    <p className="mt-2 text-sm font-semibold">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
              <div className="flex items-center justify-between p-5 text-xl font-semibold">
                <span>Total</span>
                <span>${cartTotal.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="bg-[#171411] px-5 py-12 text-white sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[#e7c884] text-[#e7c884]">
              <Gem size={19} />
            </span>
            <span className="font-serif text-2xl tracking-[0.16em]">AUREL</span>
          </div>
          <p className="mt-5 max-w-md leading-7 text-white/68">
            AUREL creates fine jewelry with certified diamonds, luminous metals,
            and interactive shopping experiences for modern collectors.
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-[#e7c884]">Navigation</h3>
          <div className="mt-4 grid gap-3 text-white/68">
            <a href="#home">Home</a>
            <a href="#collections">Collections</a>
            <a href="#jewels">Products</a>
            <a href="#cart">Cart</a>
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-[#e7c884]">Contact</h3>
          <div className="mt-4 grid gap-3 text-white/68">
            <p>care@aureljewels.com</p>
            <p>+1 212 555 0148</p>
            <p>New York · Paris · Online</p>
          </div>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-sm text-white/48">
        © 2026 AUREL Fine Jewelry. All rights reserved.
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="max-w-3xl">
      <p className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-[#9b7440]">
        <Star size={15} /> {eyebrow}
      </p>
      <h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
        {title}
      </h2>
      <p className="mt-4 max-w-2xl leading-7 text-[#6f6558]">{text}</p>
    </div>
  );
}

export default App;

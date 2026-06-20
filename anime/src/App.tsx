import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  BadgeCheck,
  Bell,
  BookOpen,
  Box,
  Check,
  CreditCard,
  Flame,
  Gift,
  Grid3X3,
  Heart,
  Home,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  TicketPercent,
  Truck,
  UserRound,
  X,
} from 'lucide-react';

type Category =
  | 'All'
  | 'Figures'
  | 'Manga'
  | 'Streetwear'
  | 'Desk Gear'
  | 'Plush'
  | 'Posters';
type Page = 'home' | 'shop' | 'deals' | 'cart' | 'account';

type Product = {
  id: number;
  name: string;
  category: Exclude<Category, 'All'>;
  price: number;
  listPrice: number;
  tag: string;
  image: string;
  rating: number;
  reviews: number;
  palette: string;
  drop: string;
  deal?: string;
};

const categories: Category[] = [
  'All',
  'Figures',
  'Manga',
  'Streetwear',
  'Desk Gear',
  'Plush',
  'Posters',
];

const imageUrls = {
  akihabara:
    'https://images.unsplash.com/photo-1613487957484-32c977a8bd62?auto=format&fit=crop&w=1500&q=82',
  mangaWall:
    'https://images.unsplash.com/photo-1747762323695-eae327c2896f?auto=format&fit=crop&w=1200&q=82',
  mangaStack:
    'https://images.unsplash.com/photo-1723608026017-4ec4a7fb0c36?auto=format&fit=crop&w=900&q=82',
  hoodie:
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=85',
  arcade:
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=82',
  keyboard:
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=900&q=82',
  books:
    'https://images.unsplash.com/photo-1610882648335-ced8fc8fa6b6?auto=format&fit=crop&w=900&q=82',
};

const products: Product[] = [
  {
    id: 1,
    name: 'Ronin Archive Figure',
    category: 'Figures',
    price: 142,
    listPrice: 168,
    tag: 'Numbered run',
    image: imageUrls.akihabara,
    rating: 4.9,
    reviews: 1248,
    palette: '#ff6b57',
    drop: 'Ships sealed',
    deal: '15% off',
  },
  {
    id: 2,
    name: 'Shonen Library Box Set',
    category: 'Manga',
    price: 88,
    listPrice: 112,
    tag: '12 volume set',
    image: imageUrls.mangaWall,
    rating: 4.8,
    reviews: 3401,
    palette: '#27c7a8',
    drop: 'Reader pick',
    deal: 'Bundle deal',
  },
  {
    id: 3,
    name: 'Signal Stitch Hoodie',
    category: 'Streetwear',
    price: 76,
    listPrice: 92,
    tag: 'Embroidered',
    image: imageUrls.hoodie,
    rating: 4.7,
    reviews: 814,
    palette: '#ffc43d',
    drop: 'Restocked',
  },
  {
    id: 4,
    name: 'Moon Desk Atlas Mat',
    category: 'Desk Gear',
    price: 38,
    listPrice: 49,
    tag: 'XL stitched',
    image: imageUrls.keyboard,
    rating: 4.9,
    reviews: 628,
    palette: '#5f6df2',
    drop: 'Setup favorite',
    deal: '22% off',
  },
  {
    id: 5,
    name: 'Sakura Acrylic Stand',
    category: 'Figures',
    price: 64,
    listPrice: 74,
    tag: 'Preorder',
    image: imageUrls.books,
    rating: 4.8,
    reviews: 2193,
    palette: '#ff8fb3',
    drop: 'New arrival',
  },
  {
    id: 6,
    name: 'Arcade Pin Capsule',
    category: 'Desk Gear',
    price: 24,
    listPrice: 30,
    tag: 'Set of 6',
    image: imageUrls.arcade,
    rating: 4.6,
    reviews: 502,
    palette: '#00a6d6',
    drop: 'Pocket drop',
  },
  {
    id: 7,
    name: 'Manga Weekend Starter Kit',
    category: 'Manga',
    price: 56,
    listPrice: 72,
    tag: 'Reader kit',
    image: imageUrls.mangaStack,
    rating: 4.7,
    reviews: 1388,
    palette: '#27c7a8',
    drop: 'Staff pick',
    deal: 'Save $16',
  },
  {
    id: 8,
    name: 'Oni Varsity Jacket',
    category: 'Streetwear',
    price: 118,
    listPrice: 148,
    tag: 'Heavyweight',
    image: imageUrls.akihabara,
    rating: 4.6,
    reviews: 396,
    palette: '#ff6b57',
    drop: 'Limited sizes',
  },
  {
    id: 9,
    name: 'Kitsune Cloud Plush',
    category: 'Plush',
    price: 34,
    listPrice: 42,
    tag: 'Soft edition',
    image: imageUrls.books,
    rating: 4.9,
    reviews: 977,
    palette: '#ff8fb3',
    drop: 'Giftable',
  },
  {
    id: 10,
    name: 'Mecha Print Triptych',
    category: 'Posters',
    price: 28,
    listPrice: 36,
    tag: '3 prints',
    image: imageUrls.mangaWall,
    rating: 4.5,
    reviews: 221,
    palette: '#5f6df2',
    drop: 'Archival paper',
  },
  {
    id: 11,
    name: 'Command Keycap Tray',
    category: 'Desk Gear',
    price: 52,
    listPrice: 65,
    tag: 'PBT caps',
    image: imageUrls.keyboard,
    rating: 4.8,
    reviews: 759,
    palette: '#ffc43d',
    drop: 'Low stock',
    deal: 'Deal of day',
  },
  {
    id: 12,
    name: 'Celestial Idol Poster',
    category: 'Posters',
    price: 19,
    listPrice: 25,
    tag: 'Matte finish',
    image: imageUrls.arcade,
    rating: 4.4,
    reviews: 184,
    palette: '#00a6d6',
    drop: 'Desk display',
  },
];

const cartStarter = [
  { id: 2, qty: 1 },
  { id: 4, qty: 2 },
  { id: 9, qty: 1 },
];

const departments: Array<[Category, string, string]> = [
  ['Figures', 'Gallery figures', 'Numbered pieces, stands, display editions'],
  ['Manga', 'Reading room', 'Box sets, starter kits, weekend stacks'],
  ['Streetwear', 'Wearable drops', 'Hoodies, jackets, embroidered staples'],
  ['Desk Gear', 'Setup studio', 'Mats, caps, pins, prints, desk rituals'],
];

const motionTickets = [
  ['New manga stack', '#27c7a8'],
  ['Figure pass', '#ff6b57'],
  ['Desk edit', '#ffc43d'],
  ['Gift run', '#ff8fb3'],
  ['Club early', '#5f6df2'],
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const rise = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export const App = () => {
  const [activePage, setActivePage] = useState<Page>('home');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(cartStarter);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.32], [0, 76]);
  const heroRotate = useTransform(scrollYProgress, [0, 0.32], [-2, 2]);

  const cartProducts = useMemo(
    () =>
      cartItems
        .map((item) => ({
          ...item,
          product: products.find((product) => product.id === item.id),
        }))
        .filter((item): item is { id: number; qty: number; product: Product } =>
          Boolean(item.product),
        ),
    [cartItems],
  );

  const cartCount = cartItems.reduce((total, item) => total + item.qty, 0);
  const cartSubtotal = cartProducts.reduce(
    (total, item) => total + item.product.price * item.qty,
    0,
  );

  const visibleProducts = useMemo(() => {
    const normalized = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch =
        !normalized ||
        product.name.toLowerCase().includes(normalized) ||
        product.category.toLowerCase().includes(normalized) ||
        product.tag.toLowerCase().includes(normalized);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  const addToCart = (id: number) => {
    setCartItems((items) => {
      const existing = items.find((item) => item.id === id);
      if (existing) {
        return items.map((item) =>
          item.id === id ? { ...item, qty: item.qty + 1 } : item,
        );
      }

      return [...items, { id, qty: 1 }];
    });
  };

  const updateCartQty = (id: number, nextQty: number) => {
    setCartItems((items) =>
      nextQty <= 0
        ? items.filter((item) => item.id !== id)
        : items.map((item) =>
            item.id === id ? { ...item, qty: nextQty } : item,
          ),
    );
  };

  const navigate = (page: Page) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#f6efe2] text-[#171513]">
      <KineticBackdrop />

      <motion.div
        className="fixed left-0 top-0 z-50 h-1 bg-[linear-gradient(90deg,#ff6b57,#ffc43d,#27c7a8,#5f6df2)]"
        style={{ scaleX: scrollYProgress, transformOrigin: '0%' }}
      />

      <header className="fixed inset-x-0 top-0 z-40 border-b-2 border-[#171513] bg-[#f6efe2]/88 backdrop-blur-xl">
        <div className="mx-auto flex min-h-20 max-w-7xl items-center gap-3 px-4 py-3 lg:px-8">
          <button
            className="flex shrink-0 items-center gap-3 text-left"
            onClick={() => navigate('home')}
            type="button"
          >
            <span className="grid h-11 w-11 place-items-center border-2 border-[#171513] bg-[#ff6b57] shadow-[4px_4px_0_#171513]">
              <Sparkles size={22} />
            </span>
            <span className="hidden sm:block">
              <span className="block text-lg font-black tracking-[0.12em]">
                SORA
              </span>
              <span className="block text-[11px] font-black uppercase tracking-[0.28em] text-[#5f6df2]">
                supply club
              </span>
            </span>
          </button>

          <label className="flex min-h-12 flex-1 items-center overflow-hidden border-2 border-[#171513] bg-white shadow-[4px_4px_0_#171513]">
            <span className="hidden border-r-2 border-[#171513] bg-[#ffc43d] px-4 text-sm font-black md:block">
              Catalog
            </span>
            <input
              className="min-w-0 flex-1 bg-transparent px-4 text-sm font-bold outline-none placeholder:text-[#171513]/45"
              onChange={(event) => setSearchTerm(event.target.value)}
              onFocus={() => setActivePage('shop')}
              placeholder="Search manga, figures, plush, apparel"
              type="search"
              value={searchTerm}
            />
            <button
              aria-label="Search products"
              className="grid h-12 w-14 place-items-center border-l-2 border-[#171513] bg-[#27c7a8] transition hover:bg-[#ffc43d]"
              onClick={() => navigate('shop')}
              type="button"
            >
              <Search size={20} />
            </button>
          </label>

          <div className="hidden items-center gap-2 lg:flex">
            <NavButton
              active={activePage === 'shop'}
              icon={<Grid3X3 size={17} />}
              label="Shop"
              onClick={() => navigate('shop')}
            />
            <NavButton
              active={activePage === 'deals'}
              icon={<TicketPercent size={17} />}
              label="Drops"
              onClick={() => navigate('deals')}
            />
            <NavButton
              active={activePage === 'account'}
              icon={<UserRound size={17} />}
              label="Club"
              onClick={() => navigate('account')}
            />
          </div>

          <button
            aria-label="Shopping cart"
            className={`relative grid h-12 w-12 shrink-0 place-items-center border-2 border-[#171513] shadow-[3px_3px_0_#171513] transition ${
              activePage === 'cart' ? 'bg-[#ffc43d]' : 'bg-white hover:bg-[#ff8fb3]'
            }`}
            onClick={() => navigate('cart')}
            type="button"
          >
            <ShoppingBag size={20} />
            <motion.span
              animate={{ scale: [1, 1.28, 1], rotate: [0, -8, 0] }}
              className="absolute -right-2 -top-2 grid h-6 min-w-6 place-items-center border-2 border-[#171513] bg-[#5f6df2] px-1 text-[11px] font-black text-white"
              key={cartCount}
              transition={{ duration: 0.38 }}
            >
              {cartCount}
            </motion.span>
          </button>

          <button
            aria-label="Open menu"
            className="grid h-12 w-12 shrink-0 place-items-center border-2 border-[#171513] bg-white shadow-[3px_3px_0_#171513] lg:hidden"
            onClick={() => setMobileMenuOpen((value) => !value)}
            type="button"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <div className="hidden border-t-2 border-[#171513] bg-[#171513] lg:block">
          <div className="mx-auto flex h-11 max-w-7xl items-center gap-2 overflow-x-auto px-8 text-sm font-black text-[#f6efe2]">
            {[
              ['home', 'Home', Home],
              ['shop', 'Catalog', BookOpen],
              ['deals', 'Drop room', Flame],
              ['account', 'Sora club', Gift],
              ['cart', 'Bag', ShoppingBag],
            ].map(([page, label, Icon]) => (
              <button
                className={`inline-flex h-8 shrink-0 items-center gap-2 px-3 transition ${
                  activePage === page
                    ? 'bg-[#ffc43d] text-[#171513]'
                    : 'hover:bg-[#f6efe2]/12'
                }`}
                key={page as string}
                onClick={() => navigate(page as Page)}
                type="button"
              >
                <Icon size={15} />
                {label as string}
              </button>
            ))}
            <span className="ml-auto shrink-0 text-xs uppercase tracking-[0.2em] text-[#27c7a8]">
              Authenticated goods · Art-book packaging
            </span>
          </div>
        </div>

        {mobileMenuOpen && (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="border-t-2 border-[#171513] bg-[#f6efe2] px-5 py-5 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
          >
            <div className="grid gap-3 text-sm font-black">
              {(['home', 'shop', 'deals', 'account', 'cart'] as Page[]).map(
                (page) => (
                  <button
                    className="border-2 border-[#171513] bg-white px-4 py-3 text-left capitalize shadow-[3px_3px_0_#171513]"
                    key={page}
                    onClick={() => navigate(page)}
                    type="button"
                  >
                    {page === 'account' ? 'Sora club' : page}
                  </button>
                ),
              )}
            </div>
          </motion.div>
        )}
      </header>

      <main className="relative z-10 pt-20 lg:pt-31">
        <AnimatePresence mode="wait">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            initial={{ opacity: 0, y: 18 }}
            key={activePage}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            {activePage === 'home' && (
              <HomePage
                addToCart={addToCart}
                heroRotate={heroRotate}
                heroY={heroY}
                navigate={navigate}
                setActiveCategory={setActiveCategory}
              />
            )}
            {activePage === 'shop' && (
              <ShopPage
                activeCategory={activeCategory}
                addToCart={addToCart}
                products={visibleProducts}
                searchTerm={searchTerm}
                setActiveCategory={setActiveCategory}
              />
            )}
            {activePage === 'deals' && (
              <DealsPage addToCart={addToCart} navigate={navigate} />
            )}
            {activePage === 'cart' && (
              <CartPage
                cartProducts={cartProducts}
                cartSubtotal={cartSubtotal}
                navigate={navigate}
                updateCartQty={updateCartQty}
              />
            )}
            {activePage === 'account' && <AccountPage navigate={navigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t-2 border-[#171513] bg-[#171513] px-5 py-10 text-[#f6efe2] lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-2xl font-black tracking-[0.12em]">SORA SUPPLY</p>
            <p className="mt-1 font-bold text-[#f6efe2]/56">
              Anime commerce with art-book energy.
            </p>
          </div>
          <button
            className="inline-flex w-fit items-center gap-3 border-2 border-[#f6efe2] bg-[#ffc43d] px-6 py-4 text-sm font-black uppercase tracking-[0.16em] text-[#171513] shadow-[4px_4px_0_#f6efe2]"
            onClick={() => navigate('home')}
            type="button"
          >
            Back home
            <ArrowRight size={18} />
          </button>
        </div>
      </footer>
    </div>
  );
};

const KineticBackdrop = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
    {[
      ['#ff6b57', '8%', '18%', 72, 0],
      ['#27c7a8', '86%', '20%', 96, 1.4],
      ['#ffc43d', '78%', '72%', 58, 0.7],
      ['#5f6df2', '11%', '78%', 82, 2.1],
    ].map(([color, left, top, size, delay]) => (
      <motion.div
        animate={{
          rotate: [0, 18, -12, 0],
          scale: [1, 1.12, 0.94, 1],
          y: [0, -22, 16, 0],
        }}
        className="absolute border-2 border-[#171513] opacity-20 blur-[0.2px]"
        key={`${color}-${left}`}
        style={{
          backgroundColor: color as string,
          height: size as number,
          left: left as string,
          top: top as string,
          width: size as number,
        }}
        transition={{
          delay: delay as number,
          duration: 10 + (delay as number),
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      />
    ))}
  </div>
);

const NavButton = ({
  active,
  icon,
  label,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) => (
  <button
    className={`inline-flex min-h-12 items-center gap-2 border-2 border-[#171513] px-4 text-sm font-black shadow-[3px_3px_0_#171513] transition ${
      active ? 'bg-[#ffc43d]' : 'bg-white hover:bg-[#27c7a8]'
    }`}
    onClick={onClick}
    type="button"
  >
    {icon}
    {label}
  </button>
);

const HomePage = ({
  addToCart,
  heroRotate,
  heroY,
  navigate,
  setActiveCategory,
}: {
  addToCart: (id: number) => void;
  heroRotate: ReturnType<typeof useTransform>;
  heroY: ReturnType<typeof useTransform>;
  navigate: (page: Page) => void;
  setActiveCategory: (category: Category) => void;
}) => (
  <>
    <section className="relative overflow-hidden border-b-2 border-[#171513] bg-[#f6efe2]">
      <div className="absolute inset-0 bg-[linear-gradient(#17151312_1px,transparent_1px),linear-gradient(90deg,#17151312_1px,transparent_1px)] bg-[size:34px_34px]" />
      <motion.div
        aria-hidden="true"
        animate={{ x: ['-10%', '4%', '-10%'] }}
        className="absolute left-0 top-20 hidden w-[115%] -rotate-3 border-y-2 border-[#171513] bg-[#ffc43d] py-2 text-center text-xs font-black uppercase tracking-[0.32em] md:block"
        transition={{ duration: 11, ease: 'easeInOut', repeat: Infinity }}
      >
        curated drops · art-book packaging · moving shelf energy
      </motion.div>
      <motion.div
        aria-hidden="true"
        animate={{ x: ['7%', '-8%', '7%'] }}
        className="absolute bottom-24 left-0 hidden w-[112%] rotate-2 border-y-2 border-[#171513] bg-[#27c7a8] py-2 text-center text-xs font-black uppercase tracking-[0.32em] lg:block"
        transition={{ duration: 13, ease: 'easeInOut', repeat: Infinity }}
      >
        manga · figures · streetwear · desk gear · plush · prints
      </motion.div>
      <div className="relative mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
        <motion.div
          animate="visible"
          className="flex flex-col justify-center"
          initial="hidden"
          variants={container}
        >
          <motion.div
            className="mb-6 inline-flex w-fit items-center gap-2 border-2 border-[#171513] bg-[#27c7a8] px-4 py-2 text-xs font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_#171513]"
            variants={rise}
          >
            <Sparkles size={15} />
            illustrated marketplace
          </motion.div>
          <motion.h1
            className="max-w-4xl text-[clamp(3.4rem,9vw,8.5rem)] font-black leading-[0.84] tracking-normal"
            variants={rise}
          >
            SORA
            <span className="block text-[#ff6b57]">SUPPLY</span>
          </motion.h1>
          <motion.p
            className="mt-7 max-w-2xl text-lg font-bold leading-8 text-[#171513]/68 md:text-xl"
            variants={rise}
          >
            A collectible anime shop designed like a moving art book: manga
            stacks, figure drops, soft goods, desk rituals, and member perks.
          </motion.p>
          <motion.div className="mt-9 flex flex-wrap gap-4" variants={rise}>
            <motion.button
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-14 items-center gap-3 border-2 border-[#171513] bg-[#171513] px-6 py-3 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_#ff6b57]"
              onClick={() => navigate('shop')}
              type="button"
            >
              Enter catalog
              <ArrowRight size={18} />
            </motion.button>
            <motion.button
              whileHover={{ x: -2, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex min-h-14 items-center gap-3 border-2 border-[#171513] bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.16em] shadow-[5px_5px_0_#27c7a8]"
              onClick={() => navigate('deals')}
              type="button"
            >
              Drop room
            </motion.button>
          </motion.div>
        </motion.div>

        <div className="relative min-h-[560px]">
          <motion.div
            className="absolute left-0 top-6 z-10 w-[58%] border-2 border-[#171513] bg-white p-3 shadow-[8px_8px_0_#171513]"
            style={{ rotate: heroRotate, y: heroY }}
          >
            <img
              alt="Anime shopping district"
              className="aspect-[4/5] w-full object-cover"
              src={imageUrls.akihabara}
            />
            <p className="mt-3 text-sm font-black uppercase tracking-[0.18em]">
              Tokyo shelf hunt
            </p>
          </motion.div>
          <motion.div
            animate={{ y: [0, -16, 0], rotate: [2, -1, 2] }}
            className="absolute right-0 top-24 w-[58%] border-2 border-[#171513] bg-[#ffc43d] p-3 shadow-[8px_8px_0_#171513]"
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >
            <img
              alt="Manga shelves"
              className="aspect-[4/5] w-full object-cover"
              src={imageUrls.mangaWall}
            />
            <div className="mt-3 flex items-center justify-between gap-3">
              <p className="text-sm font-black uppercase tracking-[0.16em]">
                Box set week
              </p>
              <span className="border-2 border-[#171513] bg-white px-2 py-1 text-xs font-black">
                -30%
              </span>
            </div>
          </motion.div>
          <motion.div
            animate={{ x: [0, 12, 0] }}
            className="absolute bottom-8 left-[18%] z-20 border-2 border-[#171513] bg-[#5f6df2] px-5 py-4 text-white shadow-[6px_6px_0_#171513]"
            transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
          >
            <p className="text-3xl font-black">4.9</p>
            <p className="text-xs font-black uppercase tracking-[0.16em]">
              collector rating
            </p>
          </motion.div>
          <FloatingHeroBadges />
        </div>
      </div>
    </section>

    <Ticker />
    <ProductRail />
    <StudioComposer addToCart={addToCart} navigate={navigate} />
    <DepartmentGrid navigate={navigate} setActiveCategory={setActiveCategory} />
    <FeaturedEditorial addToCart={addToCart} />
    <TrustBand />
  </>
);

const FloatingHeroBadges = () => (
  <>
    {motionTickets.map(([label, color], index) => (
      <motion.div
        animate={{
          rotate: [index % 2 === 0 ? -6 : 5, index % 2 === 0 ? 4 : -5, index % 2 === 0 ? -6 : 5],
          y: [0, index % 2 === 0 ? -14 : 14, 0],
        }}
        className="absolute z-30 hidden border-2 border-[#171513] px-3 py-2 text-xs font-black uppercase tracking-[0.14em] shadow-[4px_4px_0_#171513] md:block"
        key={label}
        style={{
          backgroundColor: color,
          color: color === '#5f6df2' ? '#ffffff' : '#171513',
          left: `${[3, 58, 38, 74, 13][index]}%`,
          top: `${[49, 4, 73, 58, 21][index]}%`,
        }}
        transition={{
          duration: 4.8 + index,
          ease: 'easeInOut',
          repeat: Infinity,
        }}
      >
        {label}
      </motion.div>
    ))}
  </>
);

const Ticker = () => (
  <section className="border-b-2 border-[#171513] bg-[#171513] text-[#f6efe2]">
    <div className="flex overflow-hidden py-4">
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        className="flex min-w-max gap-10 pr-10 text-sm font-black uppercase tracking-[0.24em]"
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[
          'Art-book packaging',
          'Member drop passes',
          'Manga weekend kits',
          'Figure preorder desk',
          'Setup studio goods',
          'Giftable plush edits',
          'Art-book packaging',
          'Member drop passes',
          'Manga weekend kits',
          'Figure preorder desk',
        ].map((label, index) => (
          <span className="flex items-center gap-10" key={`${label}-${index}`}>
            {label}
            <Star size={16} fill="currentColor" />
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);

const ProductRail = () => (
  <section className="overflow-hidden border-b-2 border-[#171513] bg-[#ff8fb3] py-5">
    <motion.div
      animate={{ x: ['0%', '-50%'] }}
      className="flex min-w-max gap-5 pr-5"
      transition={{ duration: 26, ease: 'linear', repeat: Infinity }}
    >
      {[...products.slice(0, 6), ...products.slice(0, 6)].map(
        (product, index) => (
          <div
            className="flex w-72 shrink-0 items-center gap-3 border-2 border-[#171513] bg-[#f6efe2] p-2 shadow-[4px_4px_0_#171513]"
            key={`${product.id}-${index}`}
          >
            <img
              alt={product.name}
              className="h-20 w-20 border-2 border-[#171513] object-cover"
              src={product.image}
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{product.name}</p>
              <p className="mt-1 text-xs font-black uppercase tracking-[0.14em] text-[#5f6df2]">
                {product.category}
              </p>
              <p className="mt-1 text-lg font-black">
                {formatPrice(product.price)}
              </p>
            </div>
          </div>
        ),
      )}
    </motion.div>
  </section>
);

const StudioComposer = ({
  addToCart,
  navigate,
}: {
  addToCart: (id: number) => void;
  navigate: (page: Page) => void;
}) => {
  const stack = [products[1], products[3], products[8]];

  return (
    <section className="relative overflow-hidden border-b-2 border-[#171513] bg-white px-5 py-16 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,#ffc43d55,transparent_22%),radial-gradient(circle_at_82%_28%,#27c7a855,transparent_20%),radial-gradient(circle_at_62%_86%,#ff8fb355,transparent_22%)]" />
      <div className="relative mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          viewport={{ once: true, amount: 0.3 }}
          whileInView={{ opacity: 1, x: 0 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5f6df2]">
            live shelf composer
          </p>
          <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-6xl">
            Build a room that looks like it has a soundtrack.
          </h2>
          <p className="mt-5 max-w-2xl text-lg font-bold leading-8 text-[#171513]/62">
            Mix manga anchors, tactile desk gear, soft goods, and one hero
            collectible. The interface now behaves like a playful shop tool,
            not a static catalog.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {[
              ['Shelf balance', '82%', '#27c7a8'],
              ['Color pop', '94%', '#ffc43d'],
              ['Gift score', '76%', '#ff8fb3'],
            ].map(([label, value, color], index) => (
              <motion.div
                className="border-2 border-[#171513] bg-[#f6efe2] p-4 shadow-[4px_4px_0_#171513]"
                key={label}
                whileHover={{ y: -5 }}
              >
                <p className="text-sm font-black">{label}</p>
                <div className="mt-4 h-3 border-2 border-[#171513] bg-white">
                  <motion.div
                    className="h-full"
                    initial={{ width: 0 }}
                    style={{ backgroundColor: color }}
                    transition={{ delay: index * 0.14, duration: 0.9 }}
                    viewport={{ once: true }}
                    whileInView={{ width: value }}
                  />
                </div>
                <p className="mt-2 text-2xl font-black">{value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="relative min-h-[560px]">
          <motion.div
            animate={{ rotate: [-2, 2, -2], y: [0, -12, 0] }}
            className="absolute left-0 top-4 w-[78%] border-2 border-[#171513] bg-[#ffc43d] p-4 shadow-[8px_8px_0_#171513]"
            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity }}
          >
            <div className="grid gap-3">
              {stack.map((product, index) => (
                <motion.button
                  className="grid grid-cols-[76px_1fr_auto] items-center gap-3 border-2 border-[#171513] bg-white p-2 text-left"
                  key={product.id}
                  onClick={() => addToCart(product.id)}
                  style={{ originX: 0.5 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 8 }}
                  type="button"
                >
                  <img
                    alt={product.name}
                    className="h-18 w-18 border-2 border-[#171513] object-cover"
                    src={product.image}
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-black">
                      {product.name}
                    </span>
                    <span className="mt-1 block text-xs font-black uppercase tracking-[0.14em] text-[#5f6df2]">
                      tap to add
                    </span>
                  </span>
                  <span className="text-lg font-black">
                    {formatPrice(product.price)}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            animate={{ x: [0, -12, 0], rotate: [4, -2, 4] }}
            className="absolute bottom-8 right-0 w-[58%] border-2 border-[#171513] bg-[#5f6df2] p-5 text-white shadow-[8px_8px_0_#171513]"
            transition={{ duration: 6.5, ease: 'easeInOut', repeat: Infinity }}
          >
            <Sparkles size={28} />
            <h3 className="mt-12 text-3xl font-black">Auto-curated bundle</h3>
            <p className="mt-3 font-bold text-white/70">
              Matching colors, shelf height, giftability, and price spread.
            </p>
            <button
              className="mt-5 inline-flex min-h-12 items-center gap-2 border-2 border-white bg-[#f6efe2] px-4 text-sm font-black uppercase tracking-[0.14em] text-[#171513] shadow-[4px_4px_0_#171513]"
              onClick={() => navigate('cart')}
              type="button"
            >
              See bag
              <ArrowRight size={17} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DepartmentGrid = ({
  navigate,
  setActiveCategory,
}: {
  navigate: (page: Page) => void;
  setActiveCategory: (category: Category) => void;
}) => (
  <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5f6df2]">
          departments
        </p>
        <h2 className="mt-3 max-w-3xl text-4xl font-black md:text-6xl">
          Shop by mood, not aisle.
        </h2>
      </div>
      <button
        className="inline-flex w-fit items-center gap-2 border-2 border-[#171513] bg-white px-5 py-3 text-sm font-black shadow-[4px_4px_0_#171513]"
        onClick={() => navigate('shop')}
        type="button"
      >
        Full catalog
        <ArrowRight size={17} />
      </button>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {departments.map(([category, title, copy], index) => {
        const colors = ['#ff6b57', '#27c7a8', '#ffc43d', '#5f6df2'];
        const Icon = [Box, BookOpen, Sparkles, Grid3X3][index];

        return (
          <motion.button
            animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
            className="min-h-64 border-2 border-[#171513] bg-white p-5 text-left shadow-[6px_6px_0_#171513]"
            key={category}
            onClick={() => {
              setActiveCategory(category);
              navigate('shop');
            }}
            style={{ backgroundColor: colors[index] }}
            transition={{
              duration: 6 + index,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            whileHover={{ y: -8, rotate: index % 2 === 0 ? -1 : 1 }}
            type="button"
          >
            <div className="grid h-12 w-12 place-items-center border-2 border-[#171513] bg-[#f6efe2]">
              <Icon size={23} />
            </div>
            <h3 className="mt-14 text-2xl font-black">{title}</h3>
            <p className="mt-3 font-bold leading-7 text-[#171513]/68">{copy}</p>
          </motion.button>
        );
      })}
    </div>
  </section>
);

const FeaturedEditorial = ({ addToCart }: { addToCart: (id: number) => void }) => (
  <section className="mx-auto max-w-7xl px-5 pb-20 lg:px-8">
    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
      <div className="border-2 border-[#171513] bg-[#171513] p-6 text-[#f6efe2] shadow-[8px_8px_0_#ff6b57]">
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#ffc43d]">
          editor board
        </p>
        <h2 className="mt-8 text-4xl font-black md:text-6xl">
          Weekend shelf rebuild.
        </h2>
        <p className="mt-5 text-lg font-bold leading-8 text-[#f6efe2]/64">
          A curated stack for people who want the room to feel designed, not
          merely filled.
        </p>
        <div className="mt-8 grid gap-3">
          {['Manga anchor set', 'Desk color hit', 'Wearable texture'].map(
            (item) => (
              <p className="flex items-center gap-3 font-black" key={item}>
                <Check className="text-[#27c7a8]" size={18} />
                {item}
              </p>
            ),
          )}
        </div>
      </div>

      <motion.div
        animate="visible"
        className="grid gap-4 sm:grid-cols-2"
        initial="hidden"
        variants={container}
      >
        {products.slice(0, 4).map((product) => (
          <ProductCard
            addToCart={addToCart}
            compact
            key={product.id}
            product={product}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

const ShopPage = ({
  activeCategory,
  addToCart,
  products: shopProducts,
  searchTerm,
  setActiveCategory,
}: {
  activeCategory: Category;
  addToCart: (id: number) => void;
  products: Product[];
  searchTerm: string;
  setActiveCategory: (category: Category) => void;
}) => (
  <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5f6df2]">
          catalog
        </p>
        <h1 className="mt-3 text-4xl font-black md:text-6xl">
          The drop index
        </h1>
        <p className="mt-3 font-bold text-[#171513]/58">
          {searchTerm
            ? `Filtered by "${searchTerm}"`
            : 'A bright, tactile marketplace for repeat anime shoppers.'}
        </p>
      </div>
      <div className="border-2 border-[#171513] bg-[#27c7a8] p-4 shadow-[4px_4px_0_#171513]">
        <p className="text-3xl font-black">{shopProducts.length}</p>
        <p className="text-xs font-black uppercase tracking-[0.18em]">
          visible goods
        </p>
      </div>
    </div>

    <div className="grid gap-5 lg:grid-cols-[250px_1fr]">
      <aside className="h-fit border-2 border-[#171513] bg-white p-4 shadow-[6px_6px_0_#171513] lg:sticky lg:top-36">
        <p className="mb-4 text-sm font-black uppercase tracking-[0.18em]">
          Filter room
        </p>
        <div className="grid gap-2">
          {categories.map((category) => (
            <motion.button
              className={`flex min-h-11 items-center justify-between border-2 border-[#171513] px-3 text-left text-sm font-black transition ${
                activeCategory === category
                  ? 'bg-[#ffc43d]'
                  : 'bg-[#f6efe2] hover:bg-[#27c7a8]'
              }`}
              key={category}
              onClick={() => setActiveCategory(category)}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              type="button"
            >
              {category}
              <span className="text-xs opacity-60">
                {category === 'All'
                  ? products.length
                  : products.filter((product) => product.category === category)
                      .length}
              </span>
            </motion.button>
          ))}
        </div>
      </aside>

      <motion.div
        animate="visible"
        className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
        initial="hidden"
        key={`${activeCategory}-${searchTerm}`}
        variants={container}
      >
        {shopProducts.map((product) => (
          <ProductCard
            addToCart={addToCart}
            key={product.id}
            product={product}
          />
        ))}
      </motion.div>
    </div>
  </section>
);

const ProductCard = ({
  addToCart,
  compact = false,
  product,
}: {
  addToCart: (id: number) => void;
  compact?: boolean;
  product: Product;
}) => (
  <motion.article
    className="group relative border-2 border-[#171513] bg-white shadow-[6px_6px_0_#171513]"
    variants={rise}
    whileHover={{
      rotate: compact ? 0.6 : -0.6,
      y: -8,
      transition: { duration: 0.22 },
    }}
  >
    <motion.div
      aria-hidden="true"
      animate={{ x: ['-130%', '130%'] }}
      className="pointer-events-none absolute left-0 top-0 z-20 h-full w-1/2 skew-x-[-18deg] bg-white/24 opacity-0 group-hover:opacity-100"
      transition={{ duration: 0.85, ease: 'easeInOut' }}
    />
    <div className="relative overflow-hidden border-b-2 border-[#171513]">
      <img
        alt={product.name}
        className={`w-full object-cover transition duration-700 group-hover:scale-105 ${
          compact ? 'aspect-[4/3]' : 'aspect-[4/4.15]'
        }`}
        src={product.image}
      />
      <span
        className="absolute left-3 top-3 border-2 border-[#171513] px-3 py-2 text-xs font-black uppercase tracking-[0.14em]"
        style={{ backgroundColor: product.palette }}
      >
        {product.tag}
      </span>
      <button
        aria-label={`Save ${product.name}`}
        className="absolute right-3 top-3 grid h-10 w-10 place-items-center border-2 border-[#171513] bg-white transition hover:bg-[#ff8fb3] group-hover:animate-[wiggle_0.55s_ease-in-out]"
        type="button"
      >
        <Heart size={17} />
      </button>
    </div>
    <div className="p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f6df2]">
            {product.category}
          </p>
          <h3 className="mt-2 min-h-14 text-xl font-black leading-tight">
            {product.name}
          </h3>
        </div>
        <p className="text-xl font-black">{formatPrice(product.price)}</p>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1 text-sm font-black">
          <Star className="text-[#ffc43d]" size={15} fill="currentColor" />
          {product.rating}
        </span>
        <span className="text-sm font-bold text-[#171513]/45">
          {product.reviews.toLocaleString()} reviews
        </span>
      </div>
      <p className="mt-2 text-sm font-black text-[#171513]/54">
        {product.drop}
      </p>
      <div className="mt-5 flex items-center justify-between gap-3">
        <div>
          {product.deal && (
            <span className="mb-2 inline-flex border-2 border-[#171513] bg-[#ff6b57] px-2 py-1 text-xs font-black uppercase tracking-[0.12em]">
              {product.deal}
            </span>
          )}
          <p className="text-sm font-bold text-[#171513]/40 line-through">
            {formatPrice(product.listPrice)}
          </p>
        </div>
        <button
          className="inline-flex min-h-11 items-center gap-2 border-2 border-[#171513] bg-[#171513] px-4 text-sm font-black text-white shadow-[3px_3px_0_#ffc43d] transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:bg-[#5f6df2] hover:shadow-[5px_5px_0_#ffc43d]"
          onClick={() => addToCart(product.id)}
          type="button"
        >
          <Plus size={17} />
          Add
        </button>
      </div>
    </div>
  </motion.article>
);

const DealsPage = ({
  addToCart,
  navigate,
}: {
  addToCart: (id: number) => void;
  navigate: (page: Page) => void;
}) => {
  const dealProducts = products.filter((product) => product.deal);

  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          animate={{ backgroundColor: ['#ff6b57', '#ffc43d', '#ff6b57'] }}
          className="border-2 border-[#171513] bg-[#ff6b57] p-7 shadow-[8px_8px_0_#171513]"
          transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
        >
          <TicketPercent size={34} />
          <h1 className="mt-16 text-5xl font-black md:text-7xl">
            Drop room
          </h1>
          <p className="mt-4 max-w-xl text-lg font-bold leading-8 text-[#171513]/68">
            A rotating board of bundles, preorder saves, reading kits, and
            setup edits.
          </p>
          <button
            className="mt-8 inline-flex min-h-13 items-center gap-3 border-2 border-[#171513] bg-white px-6 text-sm font-black uppercase tracking-[0.16em] shadow-[5px_5px_0_#171513]"
            onClick={() => navigate('shop')}
            type="button"
          >
            Browse all goods
            <ArrowRight size={18} />
          </button>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ['Manga weather', 'Build a weekend reading stack', imageUrls.mangaWall],
            ['Desk season', 'Colorful setup goods', imageUrls.keyboard],
          ].map(([title, copy, image]) => (
            <button
              className="group overflow-hidden border-2 border-[#171513] bg-white text-left shadow-[6px_6px_0_#171513]"
              key={title}
              onClick={() => navigate('shop')}
              type="button"
            >
              <img
                alt={title}
                className="aspect-[4/3] w-full border-b-2 border-[#171513] object-cover transition duration-700 group-hover:scale-105"
                src={image}
              />
              <div className="p-5">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-[#5f6df2]">
                  featured edit
                </p>
                <h2 className="mt-2 text-2xl font-black">{title}</h2>
                <p className="mt-2 font-bold text-[#171513]/54">{copy}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {dealProducts.map((product) => (
          <ProductCard
            addToCart={addToCart}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
};

const CartPage = ({
  cartProducts,
  cartSubtotal,
  navigate,
  updateCartQty,
}: {
  cartProducts: { id: number; qty: number; product: Product }[];
  cartSubtotal: number;
  navigate: (page: Page) => void;
  updateCartQty: (id: number, nextQty: number) => void;
}) => (
  <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    <div className="mb-8">
      <p className="text-xs font-black uppercase tracking-[0.28em] text-[#5f6df2]">
        checkout
      </p>
      <h1 className="mt-3 text-4xl font-black md:text-6xl">Your art bag</h1>
    </div>

    <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-4">
        {cartProducts.map(({ product, qty }) => (
          <article
            className="grid gap-4 border-2 border-[#171513] bg-white p-4 shadow-[6px_6px_0_#171513] md:grid-cols-[170px_1fr]"
            key={product.id}
          >
            <img
              alt={product.name}
              className="aspect-[4/3] w-full border-2 border-[#171513] object-cover"
              src={product.image}
            />
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.18em] text-[#5f6df2]">
                  {product.category}
                </p>
                <h2 className="mt-2 text-2xl font-black">{product.name}</h2>
                <p className="mt-2 text-sm font-bold text-[#171513]/52">
                  In stock · art-book package prep
                </p>
                <p className="mt-3 text-2xl font-black">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex w-fit items-center gap-3 border-2 border-[#171513] bg-[#f6efe2] p-2">
                <button
                  aria-label={`Decrease ${product.name}`}
                  className="grid h-10 w-10 place-items-center border-2 border-[#171513] bg-white"
                  onClick={() => updateCartQty(product.id, qty - 1)}
                  type="button"
                >
                  <Minus size={17} />
                </button>
                <span className="min-w-8 text-center text-sm font-black">
                  {qty}
                </span>
                <button
                  aria-label={`Increase ${product.name}`}
                  className="grid h-10 w-10 place-items-center border-2 border-[#171513] bg-[#ffc43d]"
                  onClick={() => updateCartQty(product.id, qty + 1)}
                  type="button"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>

      <aside className="h-fit border-2 border-[#171513] bg-[#27c7a8] p-5 shadow-[6px_6px_0_#171513] lg:sticky lg:top-36">
        <p className="text-sm font-black uppercase tracking-[0.18em]">
          order sheet
        </p>
        <div className="mt-5 space-y-3 text-sm font-black text-[#171513]/68">
          <div className="flex justify-between">
            <span>Goods</span>
            <span>{formatPrice(cartSubtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between">
            <span>Club credit</span>
            <span>-{formatPrice(12)}</span>
          </div>
        </div>
        <div className="my-5 h-0.5 bg-[#171513]" />
        <div className="flex items-center justify-between text-xl font-black">
          <span>Total</span>
          <span>{formatPrice(Math.max(0, cartSubtotal - 12))}</span>
        </div>
        <button
          className="mt-5 flex min-h-13 w-full items-center justify-center gap-2 border-2 border-[#171513] bg-[#171513] px-5 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[4px_4px_0_#ffc43d]"
          type="button"
        >
          <CreditCard size={18} />
          Checkout
        </button>
        <button
          className="mt-3 flex min-h-12 w-full items-center justify-center border-2 border-[#171513] bg-white px-5 text-sm font-black"
          onClick={() => navigate('shop')}
          type="button"
        >
          Continue shopping
        </button>
      </aside>
    </div>
  </section>
);

const AccountPage = ({ navigate }: { navigate: (page: Page) => void }) => (
  <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
    <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="border-2 border-[#171513] bg-[#ffc43d] p-7 shadow-[8px_8px_0_#171513]">
        <Gift size={34} />
        <h1 className="mt-16 text-5xl font-black md:text-7xl">Sora club</h1>
        <p className="mt-4 max-w-xl text-lg font-bold leading-8 text-[#171513]/62">
          Drop passes, saved shelves, preorder alerts, faster packing, and
          member-only edit boards.
        </p>
        <button
          className="mt-8 inline-flex min-h-13 items-center gap-3 border-2 border-[#171513] bg-[#171513] px-6 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_#f6efe2]"
          onClick={() => navigate('shop')}
          type="button"
        >
          Browse club picks
          <ArrowRight size={18} />
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ['Drop alerts', 'Rare inventory before the public shelf.', Bell],
          ['Preorder desk', 'Track long-wait goods without guesswork.', ShieldCheck],
          ['Fast packing', 'Priority handling for eligible goods.', Truck],
          ['Saved shelves', 'Keep collections, wishlists, and gifts together.', PackageCheck],
        ].map(([title, copy, Icon], index) => (
          <motion.div
            className="border-2 border-[#171513] bg-white p-6 shadow-[5px_5px_0_#171513]"
            key={title as string}
            style={{
              backgroundColor: ['#ffffff', '#27c7a8', '#ff8fb3', '#ffffff'][
                index
              ],
            }}
            whileHover={{ y: -6 }}
          >
            <div className="grid h-12 w-12 place-items-center border-2 border-[#171513] bg-[#f6efe2]">
              <Icon size={23} />
            </div>
            <h2 className="mt-10 text-2xl font-black">{title as string}</h2>
            <p className="mt-3 font-bold leading-7 text-[#171513]/58">
              {copy as string}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const TrustBand = () => (
  <section className="border-y-2 border-[#171513] bg-white">
    <div className="mx-auto grid max-w-7xl gap-4 px-5 py-10 md:grid-cols-3 lg:px-8">
      {[
        ['Authenticated goods', BadgeCheck],
        ['Art-book packaging', PackageCheck],
        ['Protected checkout', ShieldCheck],
      ].map(([title, Icon], index) => (
        <div
          className="flex items-center gap-4 border-2 border-[#171513] p-4 shadow-[4px_4px_0_#171513]"
          key={title as string}
          style={{
            backgroundColor: ['#ff6b57', '#ffc43d', '#27c7a8'][index],
          }}
        >
          <div className="grid h-12 w-12 place-items-center border-2 border-[#171513] bg-[#f6efe2]">
            <Icon size={23} />
          </div>
          <div>
            <p className="font-black">{title as string}</p>
            <p className="text-sm font-bold text-[#171513]/52">
              Built for repeat anime shoppers.
            </p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

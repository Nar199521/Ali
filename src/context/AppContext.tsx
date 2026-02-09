'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { Country, Product, User, CartItem } from '@/lib/types';
import { countries } from '@/lib/countries';
import { useToast } from '@/hooks/use-toast';

// This interface will be used for banner data throughout the app
interface Banner {
  id?: number;
  title: string;
  image_url?: string;
  imageUrl?: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  background_color?: string;
  is_active?: boolean;
}

// --- App Context Props Interface ---
interface AppContextProps {
  country: Country;
  setCountry: Dispatch<SetStateAction<Country>>;
  products: Product[];
  categories: any[];
  addProduct: (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'sold' | 'store'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  removeProduct: (productId: string) => Promise<void>;
  toggleProductPublication: (productId: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  isProductsLoading: boolean;
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  user: User | null;
  signIn: (email: string, password?: string) => Promise<User | null>;
  signOut: () => void;
  signUp: (name: string, email: string, password?: string) => Promise<User | null>;
  isAuthenticated: boolean;
  isUserLoading: boolean;
  isAdmin: boolean;
  isSeller: boolean;
  banner: Banner | null;
  setBanner: (title: string, imageUrl: string) => Promise<void>;
  homeBanners: Banner[];
  vivaBanners: Banner[];
  isPreviewOpen: boolean;
  openPreview: (product: Product) => void;
  closePreview: () => void;
  previewProduct: Product | null;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

// --- Main App Provider Component ---
export function AppProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  // --- STATE MANAGEMENT ---
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [isProductsLoading, setIsProductsLoading] = useState(true);
  const [banner, setBannerState] = useState<Banner | null>(null);
  const [homeBanners, setHomeBanners] = useState<Banner[]>([]);
  const [vivaBanners, setVivaBanners] = useState<Banner[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  
  // UI and Cart states
  const [country, setCountry] = useState<Country>(countries[0]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [previewProduct, setPreviewProduct] = useState<Product | null>(null);

  // --- API-LIKE FUNCTIONS (DATABASE-READY) ---
  // When you connect a database, replace the logic in these functions with actual API calls.

  const fetchProducts = useCallback(async () => {
    setIsProductsLoading(true);
    try {
      const response = await fetch('/api/products');
      if (!response.ok) {
        console.warn('Products API returned:', response.status);
        setProducts([]);
        return;
      }
      const result = await response.json();
      setProducts(result.data || result || []);
    } catch (error) {
      console.warn('Fetch products error (data may not be available yet):', error);
      setProducts([]);
    } finally {
      setIsProductsLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        console.warn('Categories API returned:', response.status);
        setCategories([]);
        return;
      }
      const result = await response.json();
      setCategories(result.data || result || []);
    } catch (error) {
      console.warn('Fetch categories error (data may not be available yet):', error);
      setCategories([]);
    }
  }, []);

  const fetchBanner = useCallback(async () => {
    try {
      const storedBanner = localStorage.getItem('banner');
      const data = storedBanner ? JSON.parse(storedBanner) : { title: 'Welcome to AliaxPress', imageUrl: '/placeholder.svg' };
      setBannerState(data);
    } catch (error) {
      console.warn('Fetch banner error, using default:', error);
      const defaultBanner = { title: 'Welcome to AliaxPress', imageUrl: '/placeholder.svg' };
      setBannerState(defaultBanner);
    }
  }, []);

  const fetchHomeBanners = useCallback(async () => {
    try {
      const response = await fetch('/api/home-banners');
      if (!response.ok) {
        console.warn('Home banners API returned:', response.status);
        setHomeBanners([]);
        return;
      }
      const result = await response.json();
      setHomeBanners(result.data || []);
    } catch (error) {
      console.warn('Fetch home banners error (data may not be available yet):', error);
      setHomeBanners([]);
    }
  }, []);

  const fetchVivaBanners = useCallback(async () => {
    try {
      const response = await fetch('/api/viva-banners');
      if (!response.ok) {
        console.warn('Viva banners API returned:', response.status);
        setVivaBanners([]);
        return;
      }
      const result = await response.json();
      setVivaBanners(result.data || []);
    } catch (error) {
      console.warn('Fetch viva banners error (data may not be available yet):', error);
      setVivaBanners([]);
    }
  }, []);

  const checkUserSession = useCallback(async () => {
    setIsUserLoading(true);
    try {
      const response = await fetch('/api/auth/me');
      if (!response.ok) throw new Error('Session check failed');
      const result = await response.json();
      if (result.user) {
        setUser(result.user);
      }
    } catch (error) {
      console.error('User session check error:', error);
      setUser(null);
    } finally {
      setIsUserLoading(false);
    }
  }, []);

  // --- Initial Data Loading Effect ---
  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBanner();
    fetchHomeBanners();
    fetchVivaBanners();
    checkUserSession();
  }, [fetchProducts, fetchCategories, fetchBanner, fetchHomeBanners, fetchVivaBanners, checkUserSession]);

  // --- DATA MUTATION FUNCTIONS ---

  const addProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'rating' | 'sold' | 'store'>) => {
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add product');
      }

      // Refresh products list
      await fetchProducts();
      toast({ title: 'Product Added Successfully' });
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Error adding product';
      toast({ variant: 'destructive', title: 'Error', description: msg });
    }
  };

  const updateProduct = async (id: string, productUpdate: Partial<Product>) => {
    try {
      // TODO: Replace with: const updatedProduct = await fetch(`/api/products/${id}`, { method: 'PATCH', body: JSON.stringify(productUpdate) }).then(res => res.json());
      console.log(`Updating product ${id}:`, productUpdate); // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev =>
        prev.map(p => (p.id === id ? { ...p, ...productUpdate, updatedAt: new Date().toISOString() } : p))
      );
      toast({ title: 'Product Updated Successfully' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error updating product' });
    }
  };
  
  const removeProduct = async (productId: string) => {
    try {
      // TODO: Replace with: await fetch(`/api/products/${productId}`, { method: 'DELETE' });
      console.log(`Removing product ${productId}`); // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setProducts(prev => prev.filter(p => p.id !== productId));
      toast({ title: 'Product Removed' });
    } catch (error) {
      toast({ variant: 'destructive', title: 'Error removing product' });
    }
  };

  const toggleProductPublication = async (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      await updateProduct(productId, { published: !product.published });
    }
  };

  const setBanner = async (title: string, imageUrl: string) => {
    try {
        // TODO: Replace with: await fetch('/api/banner', { method: 'POST', body: JSON.stringify({ title, imageUrl }) });
        console.log('Updating banner:', { title, imageUrl }); // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        const newBanner = { title, imageUrl };
        setBannerState(newBanner);
        localStorage.setItem('banner', JSON.stringify(newBanner)); // Still use localStorage for persistence demo
        toast({ title: 'Banner Updated' });
    } catch (error) {
        toast({ variant: 'destructive', title: 'Error updating banner' });
    }
  };

  const signIn = async (email: string, password?: string) => {
    setIsUserLoading(true);
    try {
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Sign in failed');
      }

      const result = await response.json();
      setUser(result.user);
      toast({ title: 'Sign in successful' });
      return result.user;
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Sign in failed';
      toast({ variant: 'destructive', title: 'Sign in failed', description: msg });
      return null;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signUp = async (name: string, email: string, password?: string) => {
    setIsUserLoading(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: name, email, password }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Sign up failed');
      }

      toast({ title: 'Sign up successful. Please sign in.' });
      return { id: name, name, email, role: 'user' };
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Sign up failed';
      toast({ variant: 'destructive', title: 'Sign up failed', description: msg });
      return null;
    } finally {
      setIsUserLoading(false);
    }
  };

  const signOut = () => {
    fetch('/api/auth/signout', { method: 'POST' }).catch(err => console.error('Signout error:', err));
    localStorage.removeItem('user');
    setUser(null);
    toast({ title: 'Logout Successful' });
  };

  // --- DERIVED STATE & MEMOIZED VALUES ---
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';
  const isSeller = user?.role === 'seller';

  // --- CART & UI FUNCTIONS (MOSTLY LOCAL STATE) ---
  const getProductById = (id: string) => products.find(p => p.id === id);
  const addToCart = (product: Product, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      } 
      return [...prev, { product, quantity }];
    });
  };
  const removeFromCart = (productId: string) => setCart(prev => prev.filter(item => item.product.id !== productId));
  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
        removeFromCart(productId);
    } else {
        setCart(prev => prev.map(item => item.product.id === productId ? { ...item, quantity } : item));
    }
  };
  const clearCart = () => setCart([]);
  const openPreview = (product: Product) => { setPreviewProduct(product); setIsPreviewOpen(true); };
  const closePreview = () => { setPreviewProduct(null); setIsPreviewOpen(false); };

  // --- PROVIDER VALUE ---
  const value = {
    country, setCountry, products, categories, addProduct, updateProduct, removeProduct, toggleProductPublication,
    getProductById, isProductsLoading, cart, addToCart, removeFromCart, updateCartQuantity, clearCart, user,
    signIn, signOut, signUp, isAuthenticated, isUserLoading, isAdmin, isSeller, banner, setBanner,
    homeBanners, vivaBanners,
    isPreviewOpen, openPreview, closePreview, previewProduct
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// --- Custom Hook to use the App Context ---
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}

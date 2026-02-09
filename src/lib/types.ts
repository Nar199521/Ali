export type Country = {
  name: string;
  code: string;
  currency: string;
  flag: string;
  conversionRate: number;
  locale: string;
};

export type Product = {
    id: any;
    name: string;
    description: string;
    price: number;
    originalPrice: number;
    imageUrls: string[];
    rating: number;
    sold: number;
    stock: number;
    store: {
        id: number;
        name: string;
    };
    categoryId: any;
    published: boolean;
};

export type Category = {
    id: number;
    name: string;
    imageUrl: string;
};

export type User = {
    id: number;
    name: string;
    email: string;
    password?: string;
    role: 'admin' | 'seller' | 'user';
    isBusinessVerified: boolean;
    storeName?: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
};

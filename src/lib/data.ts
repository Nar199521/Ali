
import { Icons } from "@/components/icons";

export const products = [
    {
        id: '1',
        name: 'Classic Leather Jacket',
        price: 150,
        originalPrice: 200,
        description: 'A timeless leather jacket for a stylish look.',
        imageUrls: ['https://via.placeholder.com/300x300/F4A261/000000?text=Jacket'],
        published: true,
        createdAt: '2023-10-26T10:00:00Z',
        updatedAt: '2023-10-26T10:00:00Z',
        categoryId: 2,
        rating: 4.5,
        sold: 120,
        stock: 50,
        store: { id: 'store-1', name: 'Fashion Hub' },
        reviews: [
            {
                id: 'review-1',
                rating: 5,
                comment: 'Absolutely love this jacket! The quality is amazing and it looks great.',
                reviewerName: 'Alice',
                reviewerImage: 'https://randomuser.me/api/portraits/women/1.jpg',
                date: '2023-11-01T14:30:00Z'
            },
            {
                id: 'review-2',
                rating: 4,
                comment: 'Great jacket, very comfortable. Just a bit on the pricey side.',
                reviewerName: 'Bob',
                reviewerImage: 'https://randomuser.me/api/portraits/men/2.jpg',
                date: '2023-11-03T18:00:00Z'
            }
        ]
    },
    {
        id: '2',
        name: 'Slim-Fit Denim Jeans',
        price: 80,
        originalPrice: 100,
        description: 'Comfortable and stylish slim-fit jeans.',
        imageUrls: ['https://via.placeholder.com/300x300/2A9D8F/FFFFFF?text=Jeans'],
        published: true,
        createdAt: '2023-10-26T11:00:00Z',
        updatedAt: '2023-10-26T11:00:00Z',
        categoryId: 2,
        rating: 4.2,
        sold: 250,
        stock: 100,
        store: { id: 'store-2', name: 'Denim World' },
        reviews: []
    },
    {
        id: '3',
        name: 'Cotton Crew-Neck T-Shirt',
        price: 25,
        originalPrice: 30,
        description: 'A soft and breathable cotton t-shirt.',
        imageUrls: ['https://via.placeholder.com/300x300/E9C46A/000000?text=T-Shirt'],
        published: true,
        createdAt: '2023-10-26T12:00:00Z',
        updatedAt: '2023-10-26T12:00:00Z',
        categoryId: 2,
        rating: 4.8,
        sold: 500,
        stock: 200,
        store: { id: 'store-3', name: 'Casual Wear' },
        reviews: []
    },
    {
        id: '4',
        name: 'Laptop Pro 15-inch',
        price: 1200,
        originalPrice: 1300,
        description: 'Powerful laptop for professionals and creatives.',
        imageUrls: ['https://via.placeholder.com/300x300/264653/FFFFFF?text=Laptop'],
        published: true,
        createdAt: '2023-10-26T13:00:00Z',
        updatedAt: '2023-10-26T13:00:00Z',
        categoryId: 3,
        rating: 4.9,
        sold: 80,
        stock: 30,
        store: { id: 'store-4', name: 'Tech Giant' },
        reviews: []
    },
    {
        id: '5',
        name: 'Wireless Headphones',
        price: 100,
        originalPrice: 120,
        description: 'High-fidelity wireless headphones.',
        imageUrls: ['https://via.placeholder.com/300x300/E76F51/FFFFFF?text=Headphones'],
        published: true,
        createdAt: '2023-10-26T14:00:00Z',
        updatedAt: '2023-10-26T14:00:00Z',
        categoryId: 7,
        rating: 4.6,
        sold: 300,
        stock: 80,
        store: { id: 'store-5', name: 'Audio Bliss' },
        reviews: []
    },
];
export const categories = [
  {
    "id": 2,
    "name": "Men's Fashion",
    "image_url": "https://via.placeholder.com/300x300/F4A261/000000?text=Men\'s+Fashion",
    "icon": {}
  },
  {
    "id": 3,
    "name": "Laptops & Computers",
    "image_url": "https://via.placeholder.com/300x300/264653/FFFFFF?text=Laptops",
    "icon": {}
  },
  {
    "id": 4,
    "name": "Smartphones & Accessories",
    "image_url": "https://via.placeholder.com/300x300/2A9D8F/FFFFFF?text=Smartphones",
    "icon": {}
  },
  {
    "id": 5,
    "name": "Jewelry & Watches",
    "image_url": "https://via.placeholder.com/300x300/E9C46A/000000?text=Jewelry",
    "icon": {}
  },
  {
    "id": 6,
    "name": "Bags & Shoes",
    "image_url": "https://via.placeholder.com/300x300/E76F51/FFFFFF?text=Bags+and+Shoes",
    "icon": {}
  },
  {
    "id": 7,
    "name": "Headphones & Audio",
    "image_url": "https://via.placeholder.com/300x300/E76F51/FFFFFF?text=Headphones",
    "icon": {}
  },
  {
    "id": 1768754440676,
    "name": "Technical",
    "image_url": "https://images.philips.com/is/image/philipsconsumer/d134f85f27144e8a8e0db0c600e8bf8e?wid=700&hei=700&$pnglarge$",
    "icon": {}
  },
  {
    "id": 1768755562337,
    "name": "Technical Guruji",
    "image_url": "https://via.placeholder.com/300x300/000000/FFFFFF?text=Guru",
    "icon": {}
  }
];

export const users = [
    {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'customer',
        createdAt: '2023-01-15T09:00:00Z',
        updatedAt: '2023-01-15T09:00:00Z',
    },
    {
        id: 2,
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'adminpassword',
        role: 'admin',
        createdAt: '2023-01-15T09:00:00Z',
        updatedAt: '2023-01-15T09:00:00Z',
    },
    {
        id: 3,
        name: 'Seller User',
        email: 'seller@example.com',
        password: 'sellerpassword',
        role: 'seller',
        createdAt: '2023-01-15T09:00:00Z',
        updatedAt: '2023-01-15T09:00:00Z',
    },
];

export type Product = typeof products[0];

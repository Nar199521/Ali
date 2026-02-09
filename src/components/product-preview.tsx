
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ShieldCheck, Package, Undo2, Heart, ChevronLeft, ChevronRight, X } from 'lucide-react';
import Link from 'next/link';

import { useAppContext } from '@/context/AppContext';
import { formatPrice } from '@/lib/utils';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function ProductPreview() {
  const { country, addToCart, closePreview, isPreviewOpen, previewProduct } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (isPreviewOpen) {
      document.body.style.overflow = 'hidden';
      setQuantity(1);
      setCurrentImageIndex(0);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isPreviewOpen]);

  if (!isPreviewOpen || !previewProduct) return null;

  const images = previewProduct.images || [];

  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };

  const nextImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex(prev => (prev + 1) % images.length);
  };

  const prevImage = () => {
    if (images.length === 0) return;
    setCurrentImageIndex(prev => (prev - 1 + images.length) % images.length);
  };

  const selectedImage = images.length > 0 ? images[currentImageIndex].url : '/images/placeholder.svg';

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity ${isPreviewOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="relative w-screen max-w-2xl">
          <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
            <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
              <div className="flex items-start justify-between">
                <h2 className="text-lg font-medium text-gray-900">Product Preview</h2>
                <div className="ml-3 flex h-7 items-center">
                  <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={closePreview}>
                    <span className="sr-only">Close panel</span>
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <div className="flow-root">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="relative">
                      <Image
                        src={selectedImage}
                        alt={previewProduct.name}
                        width={500}
                        height={500}
                        className="rounded-lg object-cover w-full h-full"
                      />
                      {images.length > 1 && (
                        <div className="absolute inset-0 flex items-center justify-between">
                          <button onClick={prevImage} className="bg-white/50 hover:bg-white/80 rounded-full p-2 ml-2">
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button onClick={nextImage} className="bg-white/50 hover:bg-white/80 rounded-full p-2 mr-2">
                            <ChevronRight className="h-6 w-6" />
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{previewProduct.name}</h3>
                      <p className="text-3xl font-bold text-gray-900 mt-2">{formatPrice(previewProduct.price, country)}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="ml-1 text-gray-600">{previewProduct.rating ? previewProduct.rating.toFixed(1) : 'N/A'}</span>
                        <span className="mx-2">|</span>
                        <Badge variant="secondary">{previewProduct.sold} sold</Badge>
                      </div>

                      <div className="mt-4 space-y-2">
                        <div className="flex items-center">
                          <ShieldCheck className="w-5 h-5 text-green-500" />
                          <span className="ml-2 text-sm text-gray-600">Official Store</span>
                        </div>
                        <div className="flex items-center">
                          <Package className="w-5 h-5 text-blue-500" />
                          <span className="ml-2 text-sm text-gray-600">Free Shipping</span>
                        </div>
                        <div className="flex items-center">
                          <Undo2 className="w-5 h-5 text-orange-500" />
                          <span className="ml-2 text-sm text-gray-600">15-day return policy</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h4 className="font-semibold">Description</h4>
                        <p className="text-gray-600 mt-2 text-sm">{previewProduct.description}</p>
                      </div>

                      <div className="mt-6 flex items-center space-x-4">
                        <div className="flex items-center border rounded-md">
                          <button onClick={() => handleQuantityChange(-1)} className="px-3 py-1">-</button>
                          <span className="px-4 py-1">{quantity}</span>
                          <button onClick={() => handleQuantityChange(1)} className="px-3 py-1">+</button>
                        </div>
                        <Button onClick={() => addToCart(previewProduct, quantity)} size="lg">Add to Cart</Button>
                        <Button variant="outline" size="icon">
                          <Heart className="w-5 h-5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>{formatPrice(previewProduct.price * quantity, country)}</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
              <div className="mt-6">
                <Link
                  href="/cart"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{' '}
                  <button
                    type="button"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                    onClick={closePreview}
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

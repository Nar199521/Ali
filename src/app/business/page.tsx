
import { NextPage } from 'next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import { Switch } from '@/components/ui/switch';
import { ChevronRight, GanttChartSquare, PiggyBank, Briefcase, Bot, Radar, Star, Verified, ShoppingCart } from 'lucide-react';
import Link from 'next/link';

const BusinessPage: NextPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="relative bg-blue-500 text-white text-center py-20 bg-cover bg-center" style={{backgroundImage: 'url(https://img.alicdn.com/tfs/TB1..a.scuYBuNkSmRyXXcA3pXa-2500-1000.png)'}}>
        <div className="absolute inset-0 bg-blue-600 opacity-70"></div>
        <div className="relative z-10">
            <h1 className="text-5xl font-bold mb-4">Source Smart, Scale Fast</h1>
            <div className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto p-6">
              <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-black flex-shrink-0">
                      <Bot className="w-6 h-6 text-blue-500" />
                      <span className="font-semibold text-lg">AI Search</span>
                      <Switch id="ai-search" defaultChecked className="data-[state=checked]:bg-red-500" />
                  </div>

                  <div className="relative flex-grow">
                      <Input
                      type="search"
                      placeholder="Describe what you need"
                      className="w-full rounded-full border-gray-300 h-12 pl-4 pr-40 text-base"
                      />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="text-gray-400">
                              <Icons.image className="w-6 h-6" />
                          </Button>
                          <Button className="rounded-full bg-blue-500 hover:bg-blue-600 text-base py-2 px-4">
                              <Icons.search className="w-5 h-5 mr-2" />
                              Search
                          </Button>
                      </div>
                  </div>
              </div>
              <div className="flex justify-center gap-4 mt-4 text-sm">
                  <Button variant="secondary" size="sm" className="rounded-full bg-gray-200/70 text-gray-800 font-normal">Comfortable sandals for summer travel</Button>
                  <Button variant="secondary" size="sm" className="rounded-full bg-gray-200/70 text-gray-800 font-normal">Dress for women with free shipping</Button>
                  <Button variant="secondary" size="sm" className="rounded-full bg-gray-200/70 text-gray-800 font-normal">Tools for home repair and maintenance</Button>
              </div>
          </div>
            <div className="flex justify-center gap-4 mt-6">
              <Button className="bg-blue-700/80 hover:bg-blue-700 text-white rounded-lg px-6 py-3">
                  <Bot className="w-5 h-5 mr-2" />
                  AI Personalized sourcing
              </Button>
              <Button className="bg-blue-700/80 hover:bg-blue-700 text-white rounded-lg px-6 py-3">
                  <Radar className="w-5 h-5 mr-2" />
                  Shop Radar
              </Button>
            </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex gap-6 items-start">
            <div className="bg-blue-50 rounded-lg p-6 flex-1">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold text-lg">Business benefits</h2>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Verified className="w-5 h-5" />
                        <span>Save $200+/month with AliExpress Business perks</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full"><GanttChartSquare className="w-5 h-5 text-blue-500" /></div>
                        <div>
                            <p className="font-semibold">Monthly vouchers</p>
                            <p className="text-gray-500">Coupons for verified shoppers</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full"><PiggyBank className="w-5 h-5 text-blue-500" /></div>
                        <div>
                            <p className="font-semibold">Bulk deals</p>
                            <p className="text-gray-500">Buying in bulk saves money</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full"><ShoppingCart className="w-5 h-5 text-blue-500" /></div>
                        <div>
                            <p className="font-semibold">Easy inquiries</p>
                            <p className="text-gray-500">Request an RFQ from sellers directly in the chat interface</p>
                        </div>
                    </div>
                     <div className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <div className="bg-blue-100 p-2 rounded-full"><Star className="w-5 h-5 text-blue-500" /></div>
                        <div>
                            <p className="font-semibold">Top-ranking items</p>
                            <p className="text-gray-500">Explore recent bestsellers on AliExpress</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-1/3 space-y-3">
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="font-semibold">Wholesalers</p>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="font-semibold">Dropshippers</p>
                </div>
                 <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <p className="font-semibold">Influencers</p>
                </div>
                <Link href="/business-verification">
                  <Button className="w-full bg-blue-500 hover:bg-blue-600">Verify identity to access benefits</Button>
                </Link>
            </div>
        </div>

        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2"><Briefcase className="w-6 h-6"/> Order it again</h2>
                <Link href="#" className="text-blue-500 font-semibold flex items-center">See more <ChevronRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.slice(0, 6).map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>

        <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
                 <h2 className="text-2xl font-bold flex items-center gap-2"><PiggyBank className="w-6 h-6"/> Bulk saver hub</h2>
                <Link href="#" className="text-blue-500 font-semibold flex items-center">See more <ChevronRight className="w-4 h-4" /></Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.slice(0, 6).map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>

         <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Picked for you</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {products.map(product => <ProductCard key={product.id} product={product} />)}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;

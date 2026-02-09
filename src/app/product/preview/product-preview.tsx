
import { Heart, Minus, Plus, ShieldCheck, Star, Truck, Undo2 } from "lucide-react";
import Image from "next/image";
import { NextPage } from "next";

const PRODUCT = {
  name: "Transparent Computer Glasses Frame Women Men Anti Blue Light square Eyewear Blocking Glasses Optical Spectacle Eyeglass",
  rating: 4.6,
  reviews: 20,
  sold: 34,
  price: 58.7,
  originalPrice: 99.7,
  discount: 41.0,
  dealEndDate: "Jan 8, 13:29 (GMT+5.5)",
  promotion: "Rs.186.36 off on Rs.1,397.68",
  mainImage: "/images/-original-imah8ugkbhwwvw8g.jpeg",
  thumbnails: [
    "/images/-original-imahavdveeghweea_1.jpeg",
    "/images/-original-imahbr2cz5apcwze_1.jpeg",
    "/images/-original-imahcfwmrnwy9zgn_1.jpeg",
    "/images/-original-imahd82ez72afreh_1.jpeg",
    "/images/-original-imahbr2cz5apcwze_2.jpeg",
    "/images/-original-imahavdveeghweea_2.jpeg"
  ],
  frameColors: [
    { name: "black", image: "/images/-original-imahavdveeghweea.jpeg.png" },
    { name: "transparent", image: "/images/-original-imah8ugkbhwwvw8g.jpeg.png" },
    { name: "white", image: "/images/-original-imahbr2cz5apcwze.jpeg.png" },
    { name: "blue", image: "/images/-original-imahcfwmrnwy9zgn.jpeg.png" }
  ],
  seller: "RMM Official Store (Trader)",
};

const ProductPreviewPage: NextPage = () => {
  return (
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="flex">
          <div className="w-1/2 p-4 flex">
            <div className="flex flex-col space-y-2 mr-2">
              {PRODUCT.thumbnails.map((thumb, index) => (
                <Image
                  key={index}
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  width={60}
                  height={60}
                  className="object-cover rounded-md cursor-pointer border-2 border-transparent hover:border-red-500"
                />
              ))}
            </div>
            <div className="flex-1">
              <Image
                src={PRODUCT.mainImage}
                alt={PRODUCT.name}
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-lg"
              />
            </div>
          </div>
          <div className="w-1/2 p-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              {PRODUCT.name}
            </h1>
            <div className="flex items-center mt-2 text-sm">
              <div className="flex items-center text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="ml-1 text-gray-700 dark:text-gray-300">{PRODUCT.rating}</span>
              </div>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-400">{PRODUCT.reviews} Reviews</span>
              <span className="mx-2 text-gray-400">|</span>
              <span className="text-gray-600 dark:text-gray-400">{PRODUCT.sold} sold</span>
            </div>
            <div className="mt-4 bg-red-500 text-white p-3 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">NEW YEAR DEALS</span>
                <span className="text-sm">Ends: {PRODUCT.dealEndDate}</span>
              </div>
              <div className="mt-2">
                <span className="text-3xl font-bold">Rs.{PRODUCT.price.toFixed(2)}</span>
                <span className="ml-2 text-sm line-through">Rs.{PRODUCT.originalPrice.toFixed(2)}</span>
                <span className="ml-2 bg-white text-red-500 px-2 py-1 rounded-md text-xs font-bold">Save Rs.{PRODUCT.discount.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              Tax excluded, add at checkout if applicable ; Extra 5% off with coins
            </div>
            <div className="mt-2 text-sm text-red-600 font-semibold">{PRODUCT.promotion}</div>

            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">Frame Color: black</h3>
              <div className="flex space-x-2 mt-2">
                {PRODUCT.frameColors.map((color) => (
                  <Image
                    key={color.name}
                    src={color.image}
                    alt={color.name}
                    width={50}
                    height={50}
                    className={`object-cover rounded-md cursor-pointer border-2 ${color.name === 'black' ? 'border-red-500' : 'border-transparent'} hover:border-red-500`}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
                <div className="text-sm">
                    <p>Sold by <span className="font-bold">{PRODUCT.seller}</span></p>
                </div>
                <div className="mt-4 text-sm space-y-3">
                    <p className="mb-2">Service commitment</p>
                    <div className="flex items-start"><Truck className="w-5 h-5 mr-2 text-gray-500"/> <p>This product can\'t be shipped to your address. <br/> Select another product or address.</p></div>
                    <div className="flex items-center"><Undo2 className="w-5 h-5 mr-2 text-gray-500"/> <p className="font-bold">Return&refund policy</p></div>
                    <div className="flex items-start"><ShieldCheck className="w-5 h-5 mr-2 text-gray-500"/> <div><p className="font-bold">Security & Privacy</p><p className="text-xs text-gray-500">Safe payments: We do not share your person... <br/> Secure personal details: We protect your priv...</p></div></div>
                </div>
            </div>

            <div className="mt-6 flex items-center">
                <h3 className="text-sm font-semibold mr-4">Quantity</h3>
                <div className="flex items-center border rounded-md">
                    <button className="px-3 py-1"><Minus className="w-4 h-4"/></button>
                    <span className="px-4 py-1 border-l border-r">1</span>
                    <button className="px-3 py-1"><Plus className="w-4 h-4"/></button>
                </div>
                <span className="text-xs ml-2 text-gray-500">Max. 500 pcs/shopper</span>
            </div>
            
            <div className="mt-6 flex space-x-4">
              <button className="flex-1 bg-red-600 text-white py-3 rounded-lg font-bold hover:bg-red-700">Add to cart</button>
            </div>
             <div className="mt-4 flex space-x-2">
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600">View details</button>
                <button className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 py-2 rounded-lg text-sm flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-600"><Heart className="w-5 h-5 mr-2"/> 212</button>
              </div>
          </div>
        </div>
      </div>
);
};

export default ProductPreviewPage;

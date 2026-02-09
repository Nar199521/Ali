'use client';

import Link from 'next/link';
import {
  Search,
  ShoppingCart,
  User,
  Menu,
  Package,
  CircleDollarSign,
  MessageSquare,
  CreditCard,
  Heart,
  Ticket,
  Settings,
  Briefcase,
  LogIn,
  HelpCircle,
  ShieldAlert,
  FileText,
  Gavel,
  LayoutDashboard,
  PlusCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { categories } from '@/lib/data';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { cn, slugify } from '@/lib/utils';
import React, { useState } from 'react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAppContext } from '@/context/AppContext';
import { MainLogo } from './main-logo'; // Corrected import
import { useRouter } from 'next/navigation';
import { CountrySelector } from './country-selector'; // Corrected import
import { Icons } from './icons';

const subCategories: { [key: string]: { title: string; items: string[] }[] } = {
  "Women's Fashion": [
    { title: 'Dresses', items: ['Casual', 'Formal', 'Party'] },
    { title: 'Tops', items: ['Blouses', 'T-shirts', 'Tank Tops'] },
    { title: 'Bottoms', items: ['Pants', 'Skirts', 'Shorts'] },
  ],
  "Mens Fashion": [
    { title: 'Tops', items: ['Shirts', 'T-shirts', 'Polos'] },
    { title: 'Bottoms', items: ['Pants', 'Jeans', 'Shorts'] },
    { title: 'Outerwear', items: ['Jackets', 'Coats', 'Vests'] },
  ],
  'Electronics': [
    {
      title: 'Kitchen Fixtures',
      items: [
        'Water Filtration',
        'Kitchen Cabinet Storage',
        'Kitchen Faucets',
        'Kitchen Hardware',
      ],
    },
    {
      title: 'Electrical Equipment & Supplies',
      items: ['Solar Panels', 'Solar Inverters', 'Smart Switches'],
    },
  ],
  'Home & Garden': [
    { title: 'Home Decor', items: ['Vases', 'Candles', 'Rugs'] },
    { title: 'Gardening', items: ['Seeds', 'Tools', 'Pots'] },
  ],
};

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

export function SiteHeader() {
  const { user, isUserLoading, signOut: handleSignOut, isSeller, isAdmin } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getInitials = (email: string | null | undefined) => {
    if (!email) return 'G';
    return email.charAt(0).toUpperCase();
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center space-x-2">
              <MainLogo />
            </Link>
          </div>

          <div className="hidden md:flex flex-1 justify-center px-8">
            <form onSubmit={handleSearch} className="relative w-full max-w-2xl">
              <Input
                type="search"
                placeholder="Search for anything..."
                className="w-full rounded-full border-2 border-primary/50 focus:border-primary focus:ring-primary pl-4 pr-12 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 rounded-r-full rounded-l-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          </div>

          <div className="flex items-center justify-end space-x-2 md:space-x-4">
             <CountrySelector />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden md:flex flex-col h-auto">
                  <User className="h-5 w-5" />
                  <span className="text-xs">Account</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64" align="end">
                {isUserLoading ? (
                  <DropdownMenuLabel>Loading...</DropdownMenuLabel>
                ) : user ? (
                  <>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex items-center gap-3 p-2">
                         <Avatar>
                          <AvatarFallback>{getInitials(user.email)}</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col'>
                           <p className="text-sm font-medium leading-none">Welcome back</p>
                           <p className="text-xs leading-none text-muted-foreground truncate">{user.email}</p>
                        </div>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                       {isAdmin && (
                          <DropdownMenuItem asChild>
                              <Link href="/admin">
                                  <LayoutDashboard />
                                  <span>Dashboard</span>
                              </Link>
                          </DropdownMenuItem>
                       )}
                       {(isAdmin || isSeller) && (
                        <DropdownMenuItem onClick={() => router.push('/add-product')} className="cursor-pointer">
                           <PlusCircle className="mr-2 h-4 w-4" />
                           <span>Add Product</span>
                        </DropdownMenuItem>
                       )}
                       <DropdownMenuItem asChild>
                        <Link href="#" className='bg-accent/50 text-primary font-semibold'>
                          <Package />
                          <span>My Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/coins">
                          <CircleDollarSign />
                          <span>My Coins</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="#">
                          <MessageSquare />
                          <span>Message Center</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="/payment">
                          <CreditCard />
                          <span>Payment</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="#">
                          <Heart />
                          <span>Wish List</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="#">
                          <Ticket />
                          <span>My Coupons</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                     <DropdownMenuSeparator />
                     <DropdownMenuGroup>
                        <DropdownMenuItem asChild><Link href="#"><Settings /><span>Settings</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="/business-verification"><Briefcase /><span>Aliaxpress Business</span></Link></DropdownMenuItem>
                        {isSeller && (
                          <DropdownMenuItem asChild>
                              <Link href="/seller">
                                  <LogIn />
                                  <span>Seller Log In</span>
                              </Link>
                          </DropdownMenuItem>
                        )}
                     </DropdownMenuGroup>
                     <DropdownMenuSeparator />
                     <DropdownMenuGroup>
                        <DropdownMenuItem asChild><Link href="#"><FileText /><span>Return & refund policy</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="#"><HelpCircle /><span>Help Center</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="#"><ShieldAlert /><span>Disputes & Reports</span></Link></DropdownMenuItem>
                        <DropdownMenuItem asChild><Link href="#"><Gavel /><span>Report IPR infringement</span></Link></DropdownMenuItem>
                     </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                     <DropdownMenuLabel className='p-4 text-center'>
                       <p>Welcome to GlobalCart</p>
                       <div className='flex gap-2 mt-2'>
                          <Button asChild className='flex-1'><Link href="/signin">Register</Link></Button>
                          <Button asChild variant="outline" className='flex-1'><Link href="/signin">Sign In</Link></Button>
                       </div>
                     </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                       <DropdownMenuItem asChild>
                        <Link href="#">
                          <Package />
                          <span>My Orders</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="#">
                          <MessageSquare />
                          <span>Message Center</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="#">
                          <Heart />
                          <span>Wish List</span>
                        </Link>
                      </DropdownMenuItem>
                       <DropdownMenuItem asChild>
                        <Link href="#">
                          <Ticket />
                          <span>My Coupons</span>
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" size="icon" asChild className="hidden md:flex flex-col h-auto">
              <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="text-xs">Cart</span>
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 pb-4 md:hidden">
             <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="search"
                placeholder="Search for anything..."
                className="w-full rounded-full border-2 border-primary/50 focus:border-primary focus:ring-primary pl-4 pr-12 h-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button
                type="submit"
                size="icon"
                className="absolute right-0 top-0 h-10 w-10 rounded-r-full rounded-l-none"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
        </div>
        <div className="md:hidden flex justify-around items-center gap-4 pb-4">
            <Link href="/coins" className="flex flex-col items-center gap-1 text-xs">
                <CircleDollarSign className="w-6 h-6" />
                <span>Coins</span>
            </Link>
            <Link href="/super-deals" className="flex flex-col items-center gap-1 text-xs">
                <Ticket className="w-6 h-6" />
                <span>Super Deals</span>
            </Link>
            <Link href="/prize-land" className="flex flex-col items-center gap-1 text-xs">
                <Heart className="w-6 h-6" />
                <span>Prize Land</span>
            </Link>
        </div>
      </div>
      <nav className="hidden md:block border-t bg-.white">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-6 text-sm h-8">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="p-0 pr-2 bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                    <div className="flex items-center gap-1 hover:text-primary">
                      <Menu className="w-4 h-4" /> All Categories
                    </div>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid grid-cols-[200px_1fr] w-[800px] p-4">
                      <ul className="flex flex-col gap-1 pr-4 border-r">
                        {categories.map((category) => {
                          const Icon = Icons[category.icon as keyof typeof Icons];
                          return (
                            <li key={category.id} className="p-2 hover:bg-accent rounded-md cursor-pointer text-sm">
                             <Link
                                href={`/category/${slugify(category.name)}`}
                                className="flex items-center gap-2"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {Icon && <Icon className="w-4 h-4" />}
                                {category.name}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <div className="pl-4">
                        <h3 className="font-bold mb-2">Recommended</h3>
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div>
                            <div className="w-16 h-16 bg-muted mx-auto rounded-md mb-1"></div>
                            <span className="text-xs">Wind Generators</span>
                          </div>
                          <div>
                            <div className="w-16 h-16 bg-muted mx-auto rounded-md mb-1"></div>
                            <span className="text-xs">Kitchen Cabinet</span>
                          </div>
                          <div>
                            <div className="w-16 h-16 bg-muted mx-auto rounded-md mb-1"></div>
                            <span className="text-xs">Light Bulbs</span>
                          </div>
                          <div>
                            <div className="w-16 h-16 bg-muted mx-auto rounded-md mb-1"></div>
                            <span className="text-xs">Wall Panels</span>
                          </div>
                        </div>
                        <div className="mt-4 grid grid-cols-3 gap-4">
                            {subCategories['Electronics']?.map((sub) => (
                              <div key={sub.title}>
                                <h4 className="font-semibold mb-2 text-sm">{sub.title}</h4>
                                <ul className="space-y-1">
                                  {sub.items.map((item) => (
                                    <li key={item}><Link href="#" className="text-xs text-muted-foreground hover:text-primary">{item}</Link></li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
             <Link
                  href={`/business`}
                  className="hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    Aliaxpress Business
                </Link>

            {categories.slice(0, 5).map((category) => (
               <Link
                  href={`/category/${slugify(category.name)}`}
                  className="hover:text-primary"
                  key={category.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                    {category.name}
                </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}

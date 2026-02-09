import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { MainLogo } from './main-logo';

export function SiteFooter() {
  return (
    <footer className="hidden md:block bg-card border-t mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center mb-4">
              <MainLogo />
            </div>
            <p className="text-muted-foreground text-sm max-w-sm">
              Your global marketplace for discovering and shopping for unique items.
            </p>
            <div className="mt-6">
              <h4 className="font-semibold mb-2">Stay up to date</h4>
              <div className="flex w-full max-w-sm items-center space-x-2">
                <Input type="email" placeholder="Enter your email" />
                <Button type="submit">Subscribe</Button>
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Shopping with us</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Making payments</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Delivery options</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Buyer Protection</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">New user guide</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Customer service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Transaction Services Agreement</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Take our feedback survey</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Collaborate with us</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Partnerships</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Affiliate program</Link></li>
              <li><Link href="/signin" className="text-muted-foreground hover:text-primary">Sell on GlobalCart</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; {new Date().getFullYear()} GlobalCart. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-muted-foreground hover:text-primary"><Facebook className="w-5 h-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Twitter className="w-5 h-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Instagram className="w-5 h-5" /></Link>
            <Link href="#" className="text-muted-foreground hover:text-primary"><Linkedin className="w-5 h-5" /></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

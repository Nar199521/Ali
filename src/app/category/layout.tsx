'use client';

import { categories } from '@/lib/data';
import { slugify } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function CategoryLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const filteredCategories = categories.filter((category, index, self) => 
    category && category.name && index === self.findIndex((c) => c.name === category.name)
  );

  const displayCategories: ({ name: string })[] = [{ name: 'For you' }, ...filteredCategories];

  return (
    <>
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex">
          <aside className="w-1/3 bg-gray-100 h-screen sticky top-0 overflow-y-auto">
            <nav className="py-2">
              <ul>
                {displayCategories.map((category) => {
                  const href = category.name === 'For you' ? '/category' : `/category/${slugify(category.name)}`;
                  const isActive = pathname === href;

                  return (
                    <li key={category.name}>
                      <Link
                        href={href}
                        className={`block p-3 text-sm font-medium ${
                          isActive
                            ? 'bg-white text-red-600 border-l-4 border-red-600'
                            : 'text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {category.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>
          <main className="w-2/3 p-4">{children}</main>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        {children}
      </div>
    </>
  );
}

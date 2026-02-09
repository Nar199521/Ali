import { AccountSidebar } from '@/components/account/account-sidebar';

export default function PaymentLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container mx-auto py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <h2 className="text-lg font-semibold mb-4">Account</h2>
          <AccountSidebar />
        </aside>
        <main className="md:col-span-3">{children}</main>
      </div>
    </div>
  );
}

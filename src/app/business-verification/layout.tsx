import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Business Verification | GlobalCart',
  description: 'Verify your business identity to access exclusive features for dropshippers, wholesalers, and influencers on GlobalCart.',
};

export default function BusinessVerificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

'use client';

import dynamic from 'next/dynamic';
import React from 'react';

const BannerEditor = dynamic(() => import('@/components/admin/BannerEditor').then((m) => m.BannerEditor), { ssr: false });

export default function AdminBannersPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Banner Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded shadow">
          <BannerEditor type="home" />
        </div>

        <div className="bg-white rounded shadow">
          <BannerEditor type="viva" />
        </div>
      </div>
    </div>
  );
}

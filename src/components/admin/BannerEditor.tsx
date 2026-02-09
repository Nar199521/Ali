"use client";

import React, { useEffect, useState } from 'react';

type Banner = {
  id: number;
  title: string;
  image_url: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  background_color?: string;
  is_active?: number;
};

export function BannerEditor({ type = 'home' }: { type?: 'home' | 'viva' }) {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<Partial<Banner>>({});

  useEffect(() => {
    fetch(`/api/admin/banners?type=${type}`)
      .then((r) => r.json())
      .then((data) => setBanners(data))
      .catch(() => setBanners([]));
  }, [type]);

  useEffect(() => {
    if (banners[0]) setForm(banners[0]);
  }, [banners]);

  async function save() {
    setLoading(true);
    try {
      if (form.id) {
        await fetch(`/api/admin/banners/${form.id}?type=${type}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form }),
        });
      } else {
        await fetch(`/api/admin/banners?type=${type}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...form }),
        });
      }
      const res = await fetch(`/api/admin/banners?type=${type}`);
      setBanners(await res.json());
      alert('Saved');
    } catch (err) {
      console.error(err);
      alert('Error saving');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{type === 'viva' ? 'Viva' : 'Home'} Banners</h3>

      <div className="mb-4">
        <label className="block mb-1">Title</label>
        <input className="w-full p-2 border" value={form.title || ''} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Image URL</label>
        <input className="w-full p-2 border" value={form.image_url || ''} onChange={(e) => setForm({ ...form, image_url: e.target.value })} />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Subtitle</label>
        <input className="w-full p-2 border" value={form.subtitle || ''} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-1">Button Text</label>
          <input className="w-full p-2 border" value={form.button_text || ''} onChange={(e) => setForm({ ...form, button_text: e.target.value })} />
        </div>
        <div>
          <label className="block mb-1">Button Link</label>
          <input className="w-full p-2 border" value={form.button_link || ''} onChange={(e) => setForm({ ...form, button_link: e.target.value })} />
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Background Color</label>
        <input className="w-full p-2 border" value={form.background_color || ''} onChange={(e) => setForm({ ...form, background_color: e.target.value })} />
      </div>

      <div className="flex items-center gap-3 mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={!!form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked ? 1 : 0 })} />
          Active
        </label>
      </div>

      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={save} disabled={loading}>Save</button>
      </div>

      {banners.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium mb-2">Existing Banners</h4>
          <ul>
            {banners.map((b) => (
              <li key={b.id} className="mb-2">
                <button
                  className="text-left w-full"
                  onClick={() => setForm(b)}
                >
                  #{b.id} — {b.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BannerEditor;

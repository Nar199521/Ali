'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

interface Banner {
  id: number;
  title: string;
  image_url: string;
  subtitle?: string;
  button_text?: string;
  button_link?: string;
  background_color?: string;
  is_active: boolean;
}

export function BannerManager({ type = 'home' }: { type?: 'home' | 'viva' }) {
  const { toast } = useToast();
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    image_url: '',
    subtitle: '',
    button_text: '',
    button_link: '',
    background_color: '#ff0000',
  });

  const apiEndpoint = type === 'home' ? '/api/home-banners' : '/api/viva-banners';
  const pageTitle = type === 'home' ? 'Home Page Banner' : 'Viva Section Banner';

  // Fetch banners
  useEffect(() => {
    fetchBanners();
  }, [type]);

  const fetchBanners = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(apiEndpoint);
      if (response.ok) {
        const result = await response.json();
        setBanners(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching banners:', error);
      toast({ variant: 'destructive', title: 'Failed to fetch banners' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, image_url: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.image_url) {
      toast({ variant: 'destructive', title: 'Please fill in all required fields' });
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          image_url: formData.image_url,
          subtitle: formData.subtitle || null,
          button_text: formData.button_text || null,
          button_link: formData.button_link || null,
          background_color: formData.background_color || null,
        }),
      });

      if (response.ok) {
        toast({ title: 'Banner created successfully!' });
        setFormData({
          title: '',
          image_url: '',
          subtitle: '',
          button_text: '',
          button_link: '',
          background_color: '#ff0000',
        });
        await fetchBanners();
      } else {
        const error = await response.json();
        toast({ variant: 'destructive', title: error.error || 'Failed to create banner' });
      }
    } catch (error) {
      console.error('Error creating banner:', error);
      toast({ variant: 'destructive', title: 'Error creating banner' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      const response = await fetch(`${apiEndpoint}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        toast({ title: 'Banner deleted successfully!' });
        await fetchBanners();
      } else {
        toast({ variant: 'destructive', title: 'Failed to delete banner' });
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast({ variant: 'destructive', title: 'Error deleting banner' });
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New {pageTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Title *</label>
              <Input
                type="text"
                name="title"
                placeholder="Banner title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL *</label>
              <Input
                type="url"
                name="image_url"
                placeholder="https://..."
                value={formData.image_url}
                onChange={handleImageUrlChange}
                required
              />
              {formData.image_url && (
                <div className="mt-2 relative w-full h-40">
                  <Image
                    src={formData.image_url}
                    alt="Preview"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Subtitle (Optional)</label>
              <Input
                type="text"
                name="subtitle"
                placeholder="Banner subtitle"
                value={formData.subtitle}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Button Text (Optional)</label>
              <Input
                type="text"
                name="button_text"
                placeholder="e.g., Shop Now"
                value={formData.button_text}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Button Link (Optional)</label>
              <Input
                type="url"
                name="button_link"
                placeholder="https://..."
                value={formData.button_link}
                onChange={handleInputChange}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Background Color (Optional)</label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  name="background_color"
                  value={formData.background_color}
                  onChange={handleInputChange}
                  className="w-16 h-10"
                />
                <Input
                  type="text"
                  placeholder="#ff0000"
                  value={formData.background_color}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Creating...' : 'Create Banner'}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Existing {pageTitle}s ({banners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {banners.length === 0 ? (
            <p className="text-gray-500">No banners yet</p>
          ) : (
            <div className="space-y-4">
              {banners.map(banner => (
                <div key={banner.id} className="border rounded-lg p-4 flex gap-4">
                  <div className="flex-shrink-0 relative w-32 h-24">
                    <Image
                      src={banner.image_url}
                      alt={banner.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{banner.title}</h3>
                    {banner.subtitle && (
                      <p className="text-sm text-gray-600">{banner.subtitle}</p>
                    )}
                    {banner.button_text && (
                      <p className="text-sm">Button: {banner.button_text}</p>
                    )}
                    {banner.background_color && (
                      <div className="flex items-center gap-2 mt-2">
                        <div
                          className="w-6 h-6 rounded border"
                          style={{ backgroundColor: banner.background_color }}
                        />
                        <span className="text-sm text-gray-500">{banner.background_color}</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-shrink-0 flex items-center justify-end">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(banner.id)}
                      disabled={isLoading}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { uploadFile } from '@/lib/upload';

export default function SettingsPage() {
    const [bannerTitle, setBannerTitle] = useState('');
    const [bannerImage, setBannerImage] = useState<File | null>(null);
    const [bannerImageUrl, setBannerImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    // Fetch current banner settings on component mount
    useEffect(() => {
        const fetchBannerSettings = async () => {
            try {
                const response = await fetch('/api/settings/banner');
                if (response.ok) {
                    const data = await response.json();
                    setBannerTitle(data.title || '');
                    setBannerImageUrl(data.imageUrl || '');
                }
            } catch (error) {
                console.error('Failed to fetch banner settings:', error);
                toast({ title: 'Error', description: 'Failed to load banner settings.', variant: 'destructive' });
            }
        };

        fetchBannerSettings();
    }, [toast]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setBannerImage(e.target.files[0]);
            setBannerImageUrl(URL.createObjectURL(e.target.files[0])); // Show preview
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let finalImageUrl = bannerImageUrl;

            // If a new image file is selected, upload it
            if (bannerImage) {
                finalImageUrl = await uploadFile(bannerImage);
            }

            // Save the settings via the API
            const response = await fetch('/api/settings/banner', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: bannerTitle, imageUrl: finalImageUrl }),
            });

            if (!response.ok) {
                throw new Error('Failed to save settings');
            }

            const result = await response.json();
            
            // Update the state with the saved URL
            setBannerImageUrl(finalImageUrl);

            toast({
                title: 'Success!',
                description: 'Banner settings have been updated successfully.',
            });

        } catch (error) {
            console.error('Error saving settings:', error);
            toast({
                title: 'Uh oh! Something went wrong.',
                description: 'There was a problem saving your settings. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>Home Page Banner</CardTitle>
                    <CardDescription>Update the main banner on the home page.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="banner-title">Banner Title</Label>
                            <Input 
                                id="banner-title" 
                                placeholder="e.g., New Season Arrivals" 
                                value={bannerTitle}
                                onChange={(e) => setBannerTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="banner-image">Banner Image</Label>
                            <Input id="banner-image" type="file" onChange={handleImageChange} accept="image/*" />
                            <p className="text-sm text-muted-foreground">Upload a new image to replace the current one.</p>
                        </div>

                        {bannerImageUrl && (
                            <div className="space-y-2">
                                <Label>Current Banner Image Preview</Label>
                                <div className="rounded-md border p-2">
                                    <img src={bannerImageUrl} alt="Banner Preview" className="max-h-48 w-auto object-contain rounded-md" />
                                </div>
                            </div>
                        )}

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? 'Saving...' : 'Save Settings'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}

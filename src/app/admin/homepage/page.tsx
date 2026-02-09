import { BannerManager } from '@/components/admin/banner-manager';

export default function ManageHomepage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6">Manage Homepage</h1>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Home Page Banner</h2>
        <BannerManager type="home" />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Viva Section Banner</h2>
        <BannerManager type="viva" />
      </div>
    </div>
  );
}

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function LandPage({ title }: { title: string }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Welcome to the {title} page!</p>
        </CardContent>
      </Card>
    </div>
  );
}

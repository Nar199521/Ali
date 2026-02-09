import { cn } from "@/lib/utils";

export function MainLogo({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <img src="/logo.svg" alt="Aliaxpress logo" className="h-8 w-auto" />
    </div>
  );
}

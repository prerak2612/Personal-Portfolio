import { cn } from "@/lib/utils";

const paths = {
  arrow: "M7 17L17 7M9 7h8v8",
  award: "M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm-3 0-1 6 4-2 4 2-1-6",
  binary: "M7 7h2v10H7M15 7h2v10h-2M4 12h16",
  book: "M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Zm0 0v12",
  brain: "M8 8a4 4 0 0 1 7-2 4 4 0 0 1 1 7 4 4 0 0 1-2 7H9a4 4 0 0 1-1-8 4 4 0 0 1 0-4Zm4-3v15",
  briefcase: "M9 7V5h6v2m-9 0h12v12H6V7Zm0 5h12",
  code: "M9 8 5 12l4 4m6-8 4 4-4 4",
  download: "M12 4v10m0 0 4-4m-4 4-4-4M5 20h14",
  external: "M8 8h8v8M16 8 7 17",
  git: "M6 6l12 12M8 8a2 2 0 1 0-3-3 2 2 0 0 0 3 3Zm11 11a2 2 0 1 0-3-3 2 2 0 0 0 3 3Zm-8-7a2 2 0 1 0 3 3 2 2 0 0 0-3-3Z",
  graduation: "M3 9l9-4 9 4-9 4-9-4Zm4 3v4c2 2 8 2 10 0v-4",
  mail: "M4 6h16v12H4V6Zm0 0 8 7 8-7",
  medal: "M9 3h6l2 5-5 4-5-4 2-5Zm3 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
  network: "M6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm2-12 8 8M8 17h8",
  sparkles: "M12 3l1.5 5L19 10l-5.5 2L12 17l-1.5-5L5 10l5.5-2L12 3Zm6 12 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z",
  trophy: "M8 4h8v5a4 4 0 0 1-8 0V4Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 1v5m-4 0h8",
  user: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 9a7 7 0 0 1 14 0",
} as const;

export type IconName = keyof typeof paths;

export function AppIcon({ name, className }: { name: IconName | string; className?: string }) {
  const path = paths[name as IconName] ?? paths.sparkles;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
    >
      <path d={path} />
    </svg>
  );
}

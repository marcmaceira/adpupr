import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Calendar,
  CalendarDays,
  Check,
  Clock3,
  Coffee,
  Download,
  ExternalLink,
  FileChartColumn,
  FilePenLine,
  FileText,
  HeartHandshake,
  Library,
  type LucideIcon,
  Mail,
  MapPin,
  Presentation,
  Search,
  Send,
  Smartphone,
  Store,
  Users,
  Utensils,
} from "lucide-react";
import type { IconName } from "@/lib/icons";

const ICONS: Record<IconName, LucideIcon> = {
  "arrow-down": ArrowDown,
  "arrow-right": ArrowRight,
  "arrow-up": ArrowUp,
  "arrow-up-right": ArrowUpRight,
  "badge-check": BadgeCheck,
  "book-open": BookOpen,
  calendar: Calendar,
  "calendar-days": CalendarDays,
  check: Check,
  clock: Clock3,
  coffee: Coffee,
  download: Download,
  "external-link": ExternalLink,
  "file-chart-column": FileChartColumn,
  "file-pen-line": FilePenLine,
  "file-text": FileText,
  "heart-handshake": HeartHandshake,
  library: Library,
  mail: Mail,
  "map-pin": MapPin,
  presentation: Presentation,
  search: Search,
  send: Send,
  smartphone: Smartphone,
  store: Store,
  users: Users,
  utensils: Utensils,
};

interface IconProps {
  readonly name: IconName | null | undefined;
  readonly className?: string;
  readonly strokeWidth?: number;
  readonly size?: number;
}

/** Renders a curated lucide icon by name. Always decorative (aria-hidden). */
export function Icon({ name, className, strokeWidth, size }: IconProps) {
  if (!name) return null;
  const Component = ICONS[name];
  return (
    <Component className={className} strokeWidth={strokeWidth} size={size} aria-hidden="true" />
  );
}

/** The text arrow appended to large buttons and text links. Decorative. */
export function ArrowGlyph() {
  return <span aria-hidden="true">→</span>;
}

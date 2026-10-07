import {
  BadgeCheck,
  BookOpen,
  CalendarDays,
  Clock3,
  Coffee,
  FileChartColumn,
  FilePenLine,
  FileText,
  Globe,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Landmark,
  Library,
  Lightbulb,
  Mail,
  MapPin,
  Megaphone,
  Presentation,
  Scale,
  Send,
  Smartphone,
  Star,
  Store,
  Users,
  Utensils,
  type LucideIcon,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "@/lib/icon-options";

const ICONS: Record<IconName, LucideIcon> = {
  calendar: CalendarDays,
  clock: Clock3,
  "map-pin": MapPin,
  users: Users,
  "badge-check": BadgeCheck,
  presentation: Presentation,
  "file-text": FileText,
  "file-chart": FileChartColumn,
  "file-pen": FilePenLine,
  "book-open": BookOpen,
  library: Library,
  utensils: Utensils,
  coffee: Coffee,
  store: Store,
  "heart-handshake": HeartHandshake,
  handshake: Handshake,
  send: Send,
  mail: Mail,
  smartphone: Smartphone,
  megaphone: Megaphone,
  "graduation-cap": GraduationCap,
  landmark: Landmark,
  lightbulb: Lightbulb,
  scale: Scale,
  globe: Globe,
  star: Star,
};

function isIconName(value: string): value is IconName {
  return Object.hasOwn(ICONS, value);
}

interface IconProps extends Omit<LucideProps, "name"> {
  readonly icon: string | null | undefined;
}

/** Renders a CMS-selected icon. Unknown or empty names render nothing. */
export function Icon({ icon, ...props }: IconProps) {
  if (!icon || !isIconName(icon)) return null;

  const Component = ICONS[icon];
  return <Component aria-hidden="true" {...props} />;
}

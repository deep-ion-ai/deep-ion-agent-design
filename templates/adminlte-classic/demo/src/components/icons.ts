// The demo's icon set, per foundations/iconography.md.
//
// One coherent, stroke-based family (Lucide), re-exported from a single
// module so every component draws from the same set and the choice can
// be swapped in one place. The library choice is DEMO-LOCAL: the
// template constrains what a set must satisfy, and does not mandate
// this one.
//
// Sizes come from spacing.component.icon-* via Tailwind (`h-icon-md
// w-icon-md`). Colour is never set on an icon — it inherits
// currentColor from whatever it sits in.

export {
  // navigation & chrome
  LayoutDashboard,
  Component,
  ShoppingCart,
  Users,
  ChartPie,
  Settings,
  CircleHelp,
  Menu,
  Search,
  Bell,
  // controls
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ChevronLeft,
  ChevronsUpDown,
  EllipsisVertical,
  X,
  Check,
  Plus,
  Filter,
  Send,
  Trash2,
  Pencil,
  Copy,
  Archive,
  Download,
  RefreshCw,
  LoaderCircle,
  ArrowRight,
  // status & meaning
  CircleCheck,
  CircleAlert,
  TriangleAlert,
  Info,
  TrendingUp,
  TrendingDown,
  Ticket,
  UserPlus,
  CreditCard,
  KeyRound,
  UserRound,
  Table2,
} from "lucide-react";

/** Lighter than Lucide's default 2, so a glyph reads at the weight of the text beside it. */
export const ICON_STROKE = 1.75;

export const iconSize = {
  sm: "h-icon-sm w-icon-sm",
  md: "h-icon-md w-icon-md",
  lg: "h-icon-lg w-icon-lg",
} as const;

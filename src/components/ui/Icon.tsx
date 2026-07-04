import {
  GraduationCap,
  ShieldCheck,
  Bot,
  Cpu,
  Sprout,
  Leaf,
  Languages,
  Globe,
  Utensils,
  Award,
  Scale,
  Lightbulb,
  Target,
  Users,
  HeartHandshake,
  Heart,
  BadgeCheck,
  Baby,
  FlaskConical,
  MapPin,
  Music,
  BookOpen,
  Phone,
  CalendarCheck,
  ClipboardCheck,
  FileText,
  Sparkles,
  Bus,
  Star,
  Compass,
  Eye,
  Handshake,
  Mountain,
  Clock,
  Navigation,
  Crown,
  Palette,
  Swords,
  Trophy,
  Volleyball,
  Wind,
  Dumbbell,
  Tent,
  PartyPopper,
  Sun,
  type LucideIcon,
} from 'lucide-react'

/** Curated Lucide set (named imports → tree-shaken). Add new icons here as needed. */
const ICONS: Record<string, LucideIcon> = {
  GraduationCap, ShieldCheck, Bot, Cpu, Sprout, Leaf, Languages, Globe, Utensils,
  Award, Scale, Lightbulb, Target, Users, HeartHandshake, Heart, BadgeCheck, Baby,
  FlaskConical, MapPin, Music, BookOpen, Phone, CalendarCheck, ClipboardCheck,
  FileText, Sparkles, Bus, Star, Compass, Eye, Handshake, Mountain, Clock, Navigation,
  Crown, Palette, Swords, Trophy, Volleyball, Wind, Dumbbell, Tent, PartyPopper, Sun,
}

/** Render a Lucide icon by name. Falls back to a neutral mark (never the orb) if unknown. */
export function Icon({
  name,
  className = '',
  size = 24,
  strokeWidth = 1.75,
}: {
  name?: string | null
  className?: string
  size?: number
  strokeWidth?: number
}) {
  const Cmp = (name && ICONS[name]) || Sparkles
  return <Cmp className={className} size={size} strokeWidth={strokeWidth} aria-hidden />
}

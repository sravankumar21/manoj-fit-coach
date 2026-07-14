import {
  Flame, Dumbbell, Apple, Monitor, Users, Star, Heart, Trophy, Target,
  Zap, Clock, Calendar, MapPin, Phone, Mail, Camera, ChevronRight,
  ChevronLeft, Menu, X, LogOut, User, Settings, Eye, Edit, Trash2,
  Plus, Search, Check, TrendingUp, Activity, Shield, Award, Sparkles, ArrowRight,
} from "lucide-react"

export const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Flame, Dumbbell, Apple, Monitor, Users, Star, Heart, Trophy, Target,
  Zap, Clock, Calendar, MapPin, Phone, Mail, Camera, ChevronRight,
  ChevronLeft, Menu, X, LogOut, User, Settings, Eye, Edit, Trash2,
  Plus, Search, Check, TrendingUp, Activity, Shield, Award, Sparkles, ArrowRight,
}

export function getIcon(name: string) {
  return iconMap[name] || Dumbbell
}

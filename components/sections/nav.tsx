"use client";

import {
  CalendarRange,
  Cpu,
  GraduationCap,
  Home,
  Mail,
  User,
} from "lucide-react";
import { NavBar } from "@/components/ui/tubelight-navbar";

const items = [
  { name: "Home", url: "#top", icon: Home },
  { name: "About", url: "#about", icon: User },
  { name: "Engineering", url: "#engineering", icon: Cpu },
  { name: "Teaching", url: "#teaching", icon: GraduationCap },
  { name: "Timeline", url: "#timeline", icon: CalendarRange },
  { name: "Contact", url: "#contact", icon: Mail },
];

export function Nav() {
  return <NavBar items={items} />;
}

"use client";

import React from "react";
import { IconType } from "react-icons";

// Import curated set of popular icons across Fa, Fi, Hi, Lu, Md, Tb, Bs, Si, Ri
import * as FaIcons from "react-icons/fa6";
import * as FiIcons from "react-icons/fi";
import * as HiIcons from "react-icons/hi2";
import * as LuIcons from "react-icons/lu";
import * as MdIcons from "react-icons/md";
import * as TbIcons from "react-icons/tb";
import * as BsIcons from "react-icons/bs";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";

const iconLibraries: Record<string, Record<string, IconType>> = {
  fa: FaIcons as any,
  fi: FiIcons as any,
  hi: HiIcons as any,
  lu: LuIcons as any,
  md: MdIcons as any,
  tb: TbIcons as any,
  bs: BsIcons as any,
  si: SiIcons as any,
  ri: RiIcons as any,
};

interface DynamicIconProps {
  name?: string;
  className?: string;
  size?: number;
}

export default function DynamicIcon({ name, className, size = 20 }: DynamicIconProps) {
  if (!name || typeof name !== "string" || name.trim() === "") {
    // Default fallback icon when no name is provided
    const DefaultIcon = FiIcons.FiZap;
    return <DefaultIcon size={size} className={className} />;
  }

  const cleanName = name.trim();

  // Extract 2-character prefix (e.g. "Fa" from "FaRocket", "Fi" from "FiSearch", "Hi" from "HiLightBulb", "Lu" from "LuBrain")
  const prefix = cleanName.slice(0, 2).toLowerCase();
  const library = iconLibraries[prefix];

  if (library && library[cleanName]) {
    const IconComponent = library[cleanName];
    return <IconComponent size={size} className={className} />;
  }

  // Secondary fallback check across all loaded libraries if prefix didn't match directly
  for (const libKey in iconLibraries) {
    if (iconLibraries[libKey][cleanName]) {
      const IconComponent = iconLibraries[libKey][cleanName];
      return <IconComponent size={size} className={className} />;
    }
  }

  // Graceful default fallback if icon string was not found
  const FallbackIcon = FiIcons.FiZap;
  return <FallbackIcon size={size} className={className} />;
}

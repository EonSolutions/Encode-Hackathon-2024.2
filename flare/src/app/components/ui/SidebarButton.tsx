"use client";

import { usePathname, useRouter } from "next/navigation";

type SidebarButtonProps = {
  icon: React.ReactNode;
  text: string;
  route: string;
};

export default function SidebarButton({
  icon,
  text,
  route,
}: SidebarButtonProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <button
      className={`nav-item ${pathname === route ? "active" : ""}`}
      onClick={() => {
        router.push(route);
      }}
    >
      {icon}
      <p>{text}</p>
    </button>
  );
}

export type { SidebarButtonProps };

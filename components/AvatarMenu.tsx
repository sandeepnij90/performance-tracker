"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "next-auth/react";

interface AvatarMenuProps {
  name: string | null | undefined;
  email: string | null | undefined;
}

function getInitials(name: string | null | undefined, email: string | null | undefined): string {
  if (name) {
    return name
      .split(" ")
      .map((part) => part[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  if (email) {
    return email[0].toUpperCase();
  }
  return "?";
}

export default function AvatarMenu({ name, email }: AvatarMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const initials = getInitials(name, email);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-foreground text-sm font-medium text-background transition-opacity hover:opacity-90"
        aria-label="Account menu"
      >
        {initials}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-foreground/10 bg-background p-1 shadow-lg">
          <div className="px-3 py-2 text-xs text-foreground/50">
            {name && <p className="font-medium text-foreground/80">{name}</p>}
            {email && <p className="truncate">{email}</p>}
          </div>
          <hr className="my-1 border-foreground/10" />
          <button
            onClick={() => signOut({ callbackUrl: "/sign-in" })}
            className="w-full rounded-lg px-3 py-2 text-left text-sm text-foreground/70 transition-colors hover:bg-foreground/5 hover:text-foreground"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

import { useMemo, useState } from "react";
import { createAvatar } from "@dicebear/core";
import { notionistsNeutral } from "@dicebear/collection";

// Visual reference implementation of foundations/imagery.md's avatar
// rules. Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The demo has no real user photographs, so portraits are generated
// deterministically from the person's name with an avatar library
// rather than faked with a glyph. A real project passes `src`.

export type AvatarSize = "sm" | "md" | "lg";

const box: Record<AvatarSize, string> = {
  sm: "h-avatar-sm w-avatar-sm text-[0.625rem]",
  md: "h-avatar-md w-avatar-md text-xs",
  lg: "h-avatar-lg w-avatar-lg text-sm",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export interface AvatarProps {
  name: string;
  /** A real image. Falls back to a generated portrait, then to initials. */
  src?: string;
  /** Skip the generated portrait — used to show the required fallback. */
  generated?: boolean;
  size?: AvatarSize;
  /** Decorative when the name is visible beside it (the usual case). */
  decorative?: boolean;
  className?: string;
}

export function Avatar({
  name,
  src,
  generated = true,
  size = "md",
  decorative = true,
  className = "",
}: AvatarProps) {
  const [failed, setFailed] = useState(false);

  const generatedSrc = useMemo(
    () =>
      generated && !src
        ? createAvatar(notionistsNeutral, {
            seed: name,
            radius: 50,
            backgroundColor: ["dee2e6", "e9ecef", "f1f3f5"],
          }).toDataUri()
        : undefined,
    [name, src, generated],
  );

  const url = src ?? generatedSrc;
  const shape = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill ${box[size]} ${className}`;

  // The initials fallback is required, not a nicety: a user image being
  // missing is a normal state. Never a generic silhouette.
  if (!url || failed) {
    return (
      <span
        aria-hidden={decorative || undefined}
        role={decorative ? undefined : "img"}
        aria-label={decorative ? undefined : name}
        className={`${shape} bg-neutral-light font-medium text-text-secondary`}
      >
        {initials(name)}
      </span>
    );
  }

  return (
    <img
      src={url}
      // Decorative when the name is visible beside it — announcing both
      // reads the person's name twice.
      alt={decorative ? "" : name}
      width={size === "lg" ? 48 : size === "md" ? 32 : 24}
      height={size === "lg" ? 48 : size === "md" ? 32 : 24}
      onError={() => setFailed(true)}
      className={`${shape} bg-neutral-light object-cover`}
    />
  );
}

/**
 * The product's brand mark. Holds a fixed box so its load never shifts
 * the sidebar's header (foundations/imagery.md).
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      className={`h-icon-lg w-icon-lg shrink-0 ${className}`}
    >
      <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
      <rect x="13" y="2" width="9" height="9" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="2" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.6" />
      <rect x="13" y="13" width="9" height="9" rx="2" fill="currentColor" opacity="0.35" />
    </svg>
  );
}

// Visual reference implementation of foundations/imagery.md's avatar
// rules. Demo scaffolding only — see ../../README.md and /AGENTS.md.
//
// The initials fallback is REQUIRED, not a nicety: a missing author
// image is a normal state. Never a generic silhouette.

export type AvatarSize = "sm" | "lg";

const box: Record<AvatarSize, string> = {
  sm: "h-avatar-sm w-avatar-sm text-[0.625rem]",
  lg: "h-avatar-lg w-avatar-lg text-sm",
};

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Avatar({
  name,
  src,
  size = "sm",
}: {
  name: string;
  src?: string;
  size?: AvatarSize;
}) {
  const shape = `inline-flex shrink-0 items-center justify-center overflow-hidden rounded-pill ${box[size]}`;

  // Decorative in both branches: the author's name is always visible
  // beside it in this demo, and announcing both reads the name twice.
  if (!src) {
    return (
      <span
        aria-hidden
        className={`${shape} bg-surface-sunken font-ui font-medium text-text-secondary`}
      >
        {initials(name)}
      </span>
    );
  }
  return <img src={src} alt="" className={`${shape} object-cover`} />;
}

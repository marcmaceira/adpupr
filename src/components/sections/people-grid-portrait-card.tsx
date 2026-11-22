"use client";

import { type ReactNode, useId, useState } from "react";
import { cx } from "@/lib/cx";

interface PortraitCardProps {
  readonly name: string;
  readonly role: string;
  /** Shown on hover or after pressing the name. Omit for a static card. */
  readonly bio?: string | null;
  /** Portrait (or avatar placeholder), rendered on the server. */
  readonly portrait: ReactNode;
}

/** A 3:4 portrait with role and name over a gradient (`.dir-card` in globals.css). */
export function PortraitCard({ name, role, bio, portrait }: PortraitCardProps) {
  const [bioOpen, setBioOpen] = useState(false);
  const bioId = useId();

  return (
    <div className={cx("dir-card", bio && "dir-card-has-bio", bioOpen && "dir-card-open")}>
      <div className="dir-photo">{portrait}</div>
      <div className="dir-overlay">
        <p
          className="font-heading"
          style={{
            fontSize: 11.5,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.12em",
            color: "var(--color-mustard)",
            margin: 0,
          }}
        >
          {role}
        </p>
        <h3
          className="font-heading"
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "-0.01em",
            margin: "4px 0 0",
            color: "#fff",
          }}
        >
          {bio ? (
            <button
              type="button"
              className="dir-toggle"
              aria-expanded={bioOpen}
              aria-controls={bioId}
              onClick={() => setBioOpen((open) => !open)}
            >
              {name}
            </button>
          ) : (
            name
          )}
        </h3>
        {bio ? (
          <p id={bioId} className="dir-bio">
            {bio}
          </p>
        ) : null}
      </div>
    </div>
  );
}

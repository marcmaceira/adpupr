"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { DirectorAvatar } from "./geo-placeholder";

export interface Director {
  readonly name: string;
  readonly role: string;
  readonly bio?: string;
  readonly image?: string;
}

interface DirectorCardProps {
  readonly director: Director;
  readonly seed: number;
}

export function DirectorCard({ director, seed }: DirectorCardProps) {
  const [bioOpen, setBioOpen] = useState(false);
  const bioId = useId();

  return (
    <div
      className={`dir-card ${director.bio ? "dir-card-has-bio" : ""} ${
        bioOpen ? "dir-card-open" : ""
      }`}
    >
      <div className="dir-photo">
        {director.image ? (
          <Image
            src={director.image}
            alt={`Retrato de ${director.name}`}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 768px) 33vw, 50vw"
            className="object-cover object-top"
          />
        ) : (
          <DirectorAvatar seed={seed} />
        )}
      </div>
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
          {director.role}
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
          {director.bio ? (
            <button
              type="button"
              className="dir-toggle"
              aria-expanded={bioOpen}
              aria-controls={bioId}
              onClick={() => setBioOpen((open) => !open)}
            >
              {director.name}
            </button>
          ) : (
            director.name
          )}
        </h3>
        {director.bio && (
          <p id={bioId} className="dir-bio">
            {director.bio}
          </p>
        )}
      </div>
    </div>
  );
}

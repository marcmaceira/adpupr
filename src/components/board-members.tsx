"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { DirectorAvatar } from "./geo-placeholder";

export interface BoardMember {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly bio?: string | null;
  readonly image?: string | null;
}

// Cards span 2 of 8 columns (4 per row) on desktop; center a partial last row.
const LAST_ROW_START: Record<number, string> = {
  1: "lg:col-start-4",
  2: "lg:col-start-3",
  3: "lg:col-start-2",
};

function lastRowOffset(index: number, count: number) {
  const remainder = count % 4;
  return remainder > 0 && index === count - remainder ? LAST_ROW_START[remainder] : "";
}

interface BoardMembersProps {
  readonly members: readonly BoardMember[];
}

export default function BoardMembers({ members }: BoardMembersProps) {
  const instanceId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const openButtonRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (activeIndex === null) return undefined;

    const activeCard = cardRefs.current[activeIndex];
    const openButton = openButtonRefs.current[activeIndex];
    closeButtonRef.current?.focus();

    const closeCard = () => {
      setActiveIndex(null);
      requestAnimationFrame(() => openButton?.focus());
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!(event.target instanceof Node) || !activeCard?.contains(event.target)) closeCard();
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCard();
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex]);

  const closeActiveCard = () => {
    const openButton = activeIndex === null ? null : openButtonRefs.current[activeIndex];
    setActiveIndex(null);
    requestAnimationFrame(() => openButton?.focus());
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-8">
      {members.map((member, index) => {
        const isOpen = activeIndex === index;
        const bioId = `${instanceId}-board-member-bio-${index}`;
        const hasBio = Boolean(member.bio);

        return (
          <article
            key={member.id}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={`group relative grid grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-card)] transition-[box-shadow,transform,min-height] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] has-[[data-open-button]:focus-visible]:outline-2 has-[[data-open-button]:focus-visible]:outline-offset-4 has-[[data-open-button]:focus-visible]:outline-primary sm:block sm:aspect-[4/5] lg:col-span-2 ${lastRowOffset(
              index,
              members.length,
            )} ${isOpen ? "min-h-[340px]" : "min-h-[190px]"} sm:min-h-0`}
          >
            {hasBio ? (
              <button
                ref={(element) => {
                  openButtonRefs.current[index] = element;
                }}
                type="button"
                data-open-button
                onClick={() => setActiveIndex(index)}
                aria-expanded={isOpen}
                aria-controls={bioId}
                aria-label={`Ver biograf\u00EDa de ${member.name}`}
                className="absolute inset-0 z-[3] cursor-pointer rounded-lg focus-visible:outline-none"
              />
            ) : null}

            <div className="min-h-full sm:absolute sm:inset-0">
              <div className="relative h-full min-h-40 overflow-hidden">
                <DirectorAvatar seed={index} />
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={`Retrato de ${member.name}`}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 112px"
                    className="z-[1] object-cover object-top"
                  />
                ) : null}
              </div>
            </div>

            <div className="relative z-[2] flex flex-col p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-gradient-to-t sm:from-primary-900 sm:via-primary-900/90 sm:to-transparent sm:px-6 sm:pb-6 sm:pt-20">
              <p className="line-clamp-2 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-primary-300 sm:text-sky">
                {member.role}
              </p>
              <h3 className="mt-2 line-clamp-2 font-heading text-lg font-black leading-tight text-primary sm:text-text-on-dark">
                {member.name}
              </h3>
              {hasBio ? (
                <div className="mt-auto flex items-center justify-between border-t border-border pt-4 font-heading text-xs font-bold text-primary sm:mt-5 sm:border-text-on-dark/20 sm:text-text-on-dark">
                  Ver biograf&iacute;a
                  <span
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-base leading-none transition-colors group-hover:bg-mustard sm:bg-text-on-dark/10"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </div>
              ) : null}
            </div>

            {isOpen && hasBio ? (
              <section
                id={bioId}
                aria-label={`Biograf\u00EDa de ${member.name}`}
                className="animate-fade-in absolute inset-0 z-10 flex cursor-default flex-col bg-primary-900/95 p-5 text-text-on-dark backdrop-blur-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-4 border-b border-text-on-dark/15 pb-4">
                  <div>
                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-sky">
                      {member.role}
                    </p>
                    <h3 className="mt-2 pr-2 font-heading text-xl font-black leading-tight text-text-on-dark">
                      {member.name}
                    </h3>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeActiveCard}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-text-on-dark/30 text-xl leading-none text-text-on-dark transition-colors hover:border-mustard hover:bg-mustard hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-text-on-dark"
                    aria-label={`Cerrar biograf\u00EDa de ${member.name}`}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-3">
                  <p className="font-body text-[15px] leading-[1.75] text-text-on-dark-muted">
                    {member.bio}
                  </p>
                </div>
              </section>
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

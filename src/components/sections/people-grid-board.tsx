"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";
import { cx } from "@/lib/cx";

export interface BoardCard {
  /** Stable row id. */
  readonly key: string;
  readonly name: string;
  readonly role: string;
  readonly bio: string;
  readonly openAria: string;
  readonly bioAria: string;
  readonly closeAria: string;
  /** Avatar placeholder plus portrait, rendered on the server. */
  readonly portrait: ReactNode;
}

interface BoardGridProps {
  readonly cards: readonly BoardCard[];
  /** Visible footer text of every card (the "see biography" label). */
  readonly openLabel: string;
}

/**
 * The lg grid has 8 columns and every card spans 2, so a full row holds 4 cards. When the
 * last row is incomplete, its first card starts further right so the row is centred:
 * 3 cards → column 2, 2 cards → column 3, 1 card → column 4. With 7 members this gives
 * the original 4 + 3 layout (the 5th card starts at column 2).
 */
const LAST_ROW_START = ["", "lg:col-start-4", "lg:col-start-3", "lg:col-start-2"] as const;

function lastRowStart(index: number, count: number): string {
  const remainder = count % 4;
  return remainder !== 0 && index === count - remainder ? LAST_ROW_START[remainder] : "";
}

export function BoardGrid({ cards, openLabel }: BoardGridProps) {
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
      {cards.map((card, index) => {
        const isOpen = activeIndex === index;
        const bioId = `board-member-bio-${index}`;

        return (
          <article
            key={card.key}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={cx(
              "group relative grid grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-card)] transition-[box-shadow,transform,min-height] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] has-[[data-open-button]:focus-visible]:outline-2 has-[[data-open-button]:focus-visible]:outline-offset-4 has-[[data-open-button]:focus-visible]:outline-primary sm:block sm:aspect-[4/5] lg:col-span-2",
              lastRowStart(index, cards.length),
              isOpen ? "min-h-[340px]" : "min-h-[190px]",
              "sm:min-h-0",
            )}
          >
            <button
              ref={(element) => {
                openButtonRefs.current[index] = element;
              }}
              type="button"
              data-open-button
              onClick={() => setActiveIndex(index)}
              aria-expanded={isOpen}
              aria-controls={bioId}
              aria-label={card.openAria}
              className="absolute inset-0 z-[3] cursor-pointer rounded-lg focus-visible:outline-none"
            />

            <div className="min-h-full sm:absolute sm:inset-0">
              <div className="relative h-full min-h-40 overflow-hidden">{card.portrait}</div>
            </div>

            <div className="relative z-[2] flex flex-col p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-gradient-to-t sm:from-primary-900 sm:via-primary-900/90 sm:to-transparent sm:px-6 sm:pb-6 sm:pt-20">
              <p className="line-clamp-2 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-primary-300 sm:text-sky">
                {card.role}
              </p>
              <h3 className="mt-2 line-clamp-2 font-heading text-lg font-black leading-tight text-primary sm:text-white">
                {card.name}
              </h3>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-4 font-heading text-xs font-bold text-primary sm:mt-5 sm:border-white/20 sm:text-white">
                {openLabel}
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-base leading-none transition-colors group-hover:bg-mustard sm:bg-white/10"
                  aria-hidden="true"
                >
                  +
                </span>
              </div>
            </div>

            {isOpen ? (
              <section
                id={bioId}
                aria-label={card.bioAria}
                className="animate-fade-in absolute inset-0 z-10 flex cursor-default flex-col bg-primary-900/95 p-5 text-white backdrop-blur-sm sm:p-6"
              >
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
                  <div>
                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-sky">
                      {card.role}
                    </p>
                    <h3 className="mt-2 pr-2 font-heading text-xl font-black leading-tight text-white">
                      {card.name}
                    </h3>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeActiveCard}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl leading-none text-white transition-colors hover:border-mustard hover:bg-mustard hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    aria-label={card.closeAria}
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="mt-5 min-h-0 flex-1 overflow-y-auto overscroll-contain pr-3">
                  <p className="font-body text-[15px] leading-[1.75] text-text-on-dark-muted">
                    {card.bio}
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

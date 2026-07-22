"use client"

import { useEffect, useRef, useState } from "react"
import { DirectorAvatar } from "./geo-placeholder"

interface BoardMember {
  readonly name: string
  readonly role: string
  readonly bio: string
}

interface BoardMembersProps {
  readonly members: readonly BoardMember[]
}

export default function BoardMembers({ members }: BoardMembersProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const cardRefs = useRef<Array<HTMLElement | null>>([])
  const closeButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (activeIndex === null) return

    const activeCard = cardRefs.current[activeIndex]
    closeButtonRef.current?.focus()

    const closeCard = () => {
      setActiveIndex(null)
      requestAnimationFrame(() => activeCard?.focus())
    }
    const handlePointerDown = (event: PointerEvent) => {
      if (!activeCard?.contains(event.target as Node)) closeCard()
    }
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCard()
    }

    document.addEventListener("pointerdown", handlePointerDown)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [activeIndex])

  const closeActiveCard = () => {
    const activeCard =
      activeIndex === null ? null : cardRefs.current[activeIndex]
    setActiveIndex(null)
    requestAnimationFrame(() => activeCard?.focus())
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-8">
      {members.map((member, index) => {
        const isOpen = activeIndex === index

        return (
          <article
            key={member.name}
            ref={(element) => {
              cardRefs.current[index] = element
            }}
            role={isOpen ? "region" : "button"}
            tabIndex={isOpen ? -1 : 0}
            aria-label={
              isOpen
                ? `Biograf\u00EDa de ${member.name}`
                : `Ver biograf\u00EDa de ${member.name}`
            }
            aria-expanded={isOpen ? undefined : false}
            onClick={isOpen ? undefined : () => setActiveIndex(index)}
            onKeyDown={
              isOpen
                ? undefined
                : (event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      setActiveIndex(index)
                    }
                  }
            }
            className={`group relative grid cursor-pointer grid-cols-[112px_minmax(0,1fr)] overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-card)] transition-[box-shadow,transform,min-height] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-card-hover)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary sm:block sm:aspect-[4/5] lg:col-span-2 ${
              index === 4 ? "lg:col-start-2" : ""
            } ${isOpen ? "min-h-[340px]" : "min-h-[190px]"} sm:min-h-0`}
          >
            <div className="min-h-full sm:absolute sm:inset-0">
              <div
                className="relative h-full min-h-40 overflow-hidden"
                aria-label={`Espacio reservado para la fotograf\u00EDa de ${member.name}`}
                role="img"
              >
                <DirectorAvatar seed={index} />
                <span className="absolute bottom-3 left-3 rounded-sm bg-primary-900/85 px-2.5 py-1 font-heading text-[9px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                  Fotograf&iacute;a
                </span>
              </div>
            </div>

            <div className="relative z-[1] flex flex-col p-5 sm:absolute sm:inset-x-0 sm:bottom-0 sm:bg-gradient-to-t sm:from-primary-900 sm:via-primary-900/90 sm:to-transparent sm:px-6 sm:pb-6 sm:pt-20">
              <p className="line-clamp-2 font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-primary-300 sm:text-sky">
                {member.role}
              </p>
              <h3 className="mt-2 line-clamp-2 font-heading text-lg font-black leading-tight text-primary sm:text-white">
                {member.name}
              </h3>
              <div className="mt-auto flex items-center justify-between border-t border-border pt-4 font-heading text-xs font-bold text-primary sm:mt-5 sm:border-white/20 sm:text-white">
                Ver biograf&iacute;a
                <span
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-sky-50 text-base leading-none transition-colors group-hover:bg-mustard sm:bg-white/10"
                  aria-hidden="true"
                >
                  +
                </span>
              </div>
            </div>

            {isOpen ? (
              <div className="animate-fade-in absolute inset-0 z-10 flex cursor-default flex-col bg-primary-900/95 p-5 text-white backdrop-blur-sm sm:p-6">
                <div className="flex items-start justify-between gap-4 border-b border-white/15 pb-4">
                  <div>
                    <p className="font-heading text-[10px] font-bold uppercase tracking-[0.12em] text-sky">
                      {member.role}
                    </p>
                    <h3 className="mt-2 pr-2 font-heading text-xl font-black leading-tight text-white">
                      {member.name}
                    </h3>
                  </div>
                  <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={closeActiveCard}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-xl leading-none text-white transition-colors hover:border-mustard hover:bg-mustard hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
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
              </div>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}

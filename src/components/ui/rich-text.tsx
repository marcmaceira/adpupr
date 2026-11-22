import { Fragment, type ReactNode } from "react";
import { SmartLink } from "./button";

/**
 * Renders the site editor's Lexical JSON (paragraphs, bold, italic, links, lists, line
 * breaks). Has no Payload runtime dependency: it walks the serialized tree directly.
 * Unknown nodes render their children, so content never disappears silently.
 */

interface LexicalNode {
  readonly type: string;
  readonly text?: string;
  readonly format?: unknown;
  readonly tag?: string;
  readonly listType?: string;
  readonly children?: readonly LexicalNode[];
  readonly fields?: {
    readonly linkType?: string;
    readonly url?: string | null;
    readonly newTab?: boolean | null;
    readonly doc?: { readonly value?: unknown } | null;
  };
}

export interface RichTextData {
  readonly root: { readonly children: readonly LexicalNode[] };
}

export interface RichTextClasses {
  /** Applied to every paragraph. */
  readonly paragraph?: string;
  /** Applied to bold runs. */
  readonly strong?: string;
  readonly link?: string;
  readonly list?: string;
  readonly listItem?: string;
}

const IS_BOLD = 1;
const IS_ITALIC = 2;

function docPath(doc: unknown): string | null {
  if (doc && typeof doc === "object" && "path" in doc && typeof doc.path === "string") {
    return doc.path;
  }
  return null;
}

function renderNodes(nodes: readonly LexicalNode[], classes: RichTextClasses): ReactNode[] {
  return nodes.map((node, index) => renderNode(node, index, classes));
}

function renderNode(node: LexicalNode, key: number, classes: RichTextClasses): ReactNode {
  const children = node.children ? renderNodes(node.children, classes) : null;

  switch (node.type) {
    case "text": {
      const format = typeof node.format === "number" ? node.format : 0;
      let content: ReactNode = node.text ?? "";
      if (format & IS_ITALIC) content = <em key={`i${key}`}>{content}</em>;
      if (format & IS_BOLD) {
        content = (
          <strong key={`b${key}`} className={classes.strong}>
            {content}
          </strong>
        );
      }
      return <Fragment key={key}>{content}</Fragment>;
    }
    case "linebreak":
      return <br key={key} />;
    case "paragraph":
      return (
        <p key={key} className={classes.paragraph}>
          {children}
        </p>
      );
    case "list": {
      const Tag = node.listType === "number" ? "ol" : "ul";
      return (
        <Tag key={key} className={classes.list}>
          {children}
        </Tag>
      );
    }
    case "listitem":
      return (
        <li key={key} className={classes.listItem}>
          {children}
        </li>
      );
    case "link":
    case "autolink": {
      const href =
        node.fields?.linkType === "internal"
          ? docPath(node.fields.doc?.value)
          : (node.fields?.url ?? null);
      if (!href) return <span key={key}>{children}</span>;
      return (
        <SmartLink
          key={key}
          href={href}
          newTab={Boolean(node.fields?.newTab)}
          className={classes.link ?? "underline underline-offset-4"}
        >
          {children}
        </SmartLink>
      );
    }
    default:
      return <span key={key}>{children}</span>;
  }
}

interface RichTextProps {
  readonly data: RichTextData | null | undefined;
  /** Wrapper element classes. Without one, nodes render without a wrapper. */
  readonly className?: string;
  readonly classes?: RichTextClasses;
}

const NO_CLASSES: RichTextClasses = {};

export function RichText({ data, className, classes = NO_CLASSES }: RichTextProps) {
  const nodes = data?.root?.children ?? [];
  if (nodes.length === 0) return null;
  const rendered = renderNodes(nodes, classes);
  return className ? <div className={className}>{rendered}</div> : <>{rendered}</>;
}

/** True when rich text has at least one non-empty text node. */
export function hasRichText(data: RichTextData | null | undefined): boolean {
  const walk = (nodes: readonly LexicalNode[]): boolean =>
    nodes.some((n) => (n.type === "text" && Boolean(n.text?.trim())) || walk(n.children ?? []));
  return walk(data?.root?.children ?? []);
}

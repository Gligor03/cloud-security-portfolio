import type { ReactNode } from "react";
import type { CategoryMark } from "@/data/skills";

function SvgFrame({
  children,
  title,
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      width={40}
      height={40}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function CategoryHexMark({ mark }: { mark: CategoryMark }) {
  const gradId = `skill-hex-grad-${mark}`;
  /* Inner art lives in 0–32 space, centered on hex centroid (24, 26). */
  const inner =
    mark === "code" ? (
      <path
        d="M9 10 6 16 9 22M23 10 26 16 23 22M17 9 13 23"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ) : mark === "shield" ? (
      <path
        d="M16 7.5 22.5 10.8V19c0 3.6-2.6 6.3-6.5 7.5-3.9-1.2-6.5-3.9-6.5-7.5v-8.2l6.5-3.3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    ) : mark === "cloud" ? (
      <path
        d="M9.5 20.5h13a4.2 4.2 0 0 0 0-8.4 5.3 5.3 0 0 0-10.3 1.5A4.1 4.1 0 0 0 9.5 20.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    ) : (
      <>
        <path
          d="M20.5 9.5a2.8 2.8 0 0 1 0 4l-6 6a2.8 2.8 0 1 1-4-4l6-6a2.8 2.8 0 0 1 4 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinejoin="round"
        />
        <path
          d="M7.5 25.5 11 22"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
        />
      </>
    );

  return (
    <span aria-hidden>
      <svg viewBox="0 0 48 52" width={48} height={52} aria-hidden>
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.95" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <polygon
          points="24,2 44,14 44,38 24,50 4,38 4,14"
          fill={`url(#${gradId})`}
          stroke="currentColor"
          strokeWidth="1.2"
          opacity={0.35}
        />
        <g transform="translate(24 26)" color="#f8fafc">
          <g transform="translate(-16 -16)">{inner}</g>
        </g>
      </svg>
    </span>
  );
}

export function SkillRowIllustration({ iconId }: { iconId: string }) {
  const sw = 1.65;
  const swFine = 1.35;

  switch (iconId) {
    case "python":
      return (
        <SvgFrame title="Python">
          <path
            d="M20 8c-4.5 0-8 2.4-8 5.5V18h8v2h-12v4.5c0 3.1 3.5 5.5 8 5.5h4v-5h-6v-2h14c3.8 0 6-2.2 6-5.5v-4C34 10.4 30.5 8 26 8h-6Z"
            fill="#3776ab"
          />
          <path
            d="M20 32c4.5 0 8-2.4 8-5.5V22h-8v-2h12v-4.5C32 12.4 28.5 10 24 10h-4v5h6v2H12c-3.8 0-6 2.2-6 5.5v4C6 29.6 9.5 32 14 32h6Z"
            fill="#ffd43b"
          />
          <circle cx="17" cy="12.5" r="1.2" fill="#f8fafc" />
          <circle cx="23" cy="27.5" r="1.2" fill="#0f172a" />
        </SvgFrame>
      );
    case "sql":
      return (
        <SvgFrame title="Database">
          <ellipse cx="20" cy="11" rx="12" ry="4" fill="#60a5fa" opacity="0.95" />
          <path d="M8 11v6c0 2.2 5.4 4 12 4s12-1.8 12-4v-6" fill="#3b82f6" />
          <path d="M8 19v6c0 2.2 5.4 4 12 4s12-1.8 12-4v-6" fill="#2563eb" />
          <ellipse cx="20" cy="11" rx="12" ry="4" fill="none" stroke="#bfdbfe" strokeWidth="1.1" />
        </SvgFrame>
      );
    case "bash":
      return (
        <SvgFrame title="Shell">
          <rect x="7" y="10" width="26" height="20" rx="3" fill="#052e16" stroke="#22c55e" strokeWidth="1.2" />
          <path
            d="M12.5 17.5 15.5 20l-3 2.5M18.5 23h8"
            fill="none"
            stroke="#4ade80"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text x="11" y="15" fontSize="4.8" fill="#86efac" fontFamily="ui-monospace, monospace">
            $&gt;_
          </text>
        </SvgFrame>
      );
    case "web":
      return (
        <SvgFrame title="Web stack">
          <rect x="6.5" y="10.5" width="8.5" height="10.5" rx="1.4" fill="#e44d26" />
          <rect x="16" y="10.5" width="8.5" height="10.5" rx="1.4" fill="#264de4" />
          <rect x="25.5" y="10.5" width="8" height="10.5" rx="1.4" fill="#f7df1e" />
          <text x="9.3" y="17.7" fontSize="4.4" fill="#fff" fontWeight="700">5</text>
          <text x="18.8" y="17.7" fontSize="4.4" fill="#fff" fontWeight="700">3</text>
          <text x="27.8" y="17.7" fontSize="4.2" fill="#111827" fontWeight="700">JS</text>
        </SvgFrame>
      );
    case "traffic":
      return (
        <SvgFrame title="Traffic analysis">
          <path
            d="M8 28 L14 18 18 24 24 10 32 28"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinejoin="round"
          />
          <circle cx="24" cy="10" r="2" fill="none" stroke="currentColor" strokeWidth={1.45} />
        </SvgFrame>
      );
    case "attack":
      return (
        <SvgFrame title="Attack simulation">
          <path d="M20 8 31 14v10c0 6-5.5 8-11 9-5.5-1-11-3-11-9V14L20 8Z" fill="#312e81" opacity="0.9" />
          <path d="M13.5 16c0-2.2 2.1-3.8 6.5-3.8s6.5 1.6 6.5 3.8v2h-2v3.8h-9V18h-2v-2Z" fill="none" stroke="#e5e7eb" strokeWidth="1.3" />
          <circle cx="17.6" cy="16.2" r="1.1" fill="#e5e7eb" />
          <circle cx="22.4" cy="16.2" r="1.1" fill="#e5e7eb" />
          <path d="M17.4 21.8h5.2" fill="none" stroke="#e5e7eb" strokeWidth="1.2" strokeLinecap="round" />
        </SvgFrame>
      );
    case "pcap":
      return (
        <SvgFrame title="Packet capture">
          <path d="M8 29c4-8 8-13 13-17-1.4 4.6-2.8 8.7-2 14l4 3H8Z" fill="#0f172a" stroke="#a78bfa" strokeWidth="1.2" />
        </SvgFrame>
      );
    case "idps":
      return (
        <SvgFrame title="IDS / IPS">
          <path d="M20 8 30 13v9c0 5.2-4.2 8.5-10 10-5.8-1.5-10-4.8-10-10v-9L20 8Z" fill="#0b1222" stroke="#60a5fa" strokeWidth="1.3" />
          <rect x="15.5" y="16.5" width="9" height="7.5" rx="1.2" fill="none" stroke="#93c5fd" strokeWidth="1.2" />
          <path d="M18 21h4" fill="none" stroke="#93c5fd" strokeWidth="1.1" strokeLinecap="round" />
        </SvgFrame>
      );
    case "controls":
      return (
        <SvgFrame title="Security controls">
          <circle cx="12" cy="14" r="2.3" fill="#0f172a" stroke="#a78bfa" strokeWidth={1.2} />
          <circle cx="28" cy="14" r="2.3" fill="#0f172a" stroke="#a78bfa" strokeWidth={1.2} />
          <circle cx="20" cy="26" r="2.3" fill="#0f172a" stroke="#a78bfa" strokeWidth={1.2} />
          <path
            d="M14 15.5 L18 23 M26 15.5 L22 23"
            fill="none"
            stroke="#c4b5fd"
            strokeWidth={1.15}
          />
        </SvgFrame>
      );
    case "threatml":
      return (
        <SvgFrame title="ML threat detection">
          <path d="M20 9c-5.5 2-8.5 6.2-8.5 11.2 0 4.7 3.3 8.7 8.5 10.1 5.2-1.4 8.5-5.4 8.5-10.1C28.5 15.2 25.5 11 20 9Z" fill="#111827" stroke="#a78bfa" strokeWidth="1.2" />
          <path
            d="M14 18h3M23 16h3M16 24h8M15 28h10"
            fill="none"
            stroke="#c4b5fd"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </SvgFrame>
      );
    case "aws":
      return (
        <SvgFrame title="Cloud">
          <text x="8.2" y="20" fontSize="10.5" fill="#f8fafc" fontWeight="700">aws</text>
          <path d="M10 25c4 2.8 12 3 20-0.5" fill="none" stroke="#f59e0b" strokeWidth="2.1" strokeLinecap="round" />
        </SvgFrame>
      );
    case "genai":
      return (
        <SvgFrame title="Generative AI">
          <path
            d="M20 9c-4 2-7 6-7 11 0 5 3 9 7 11 4-2 7-6 7-11 0-5-3-9-7-11Z"
            fill="none"
            stroke="#4ade80"
            strokeWidth={1.5}
          />
          <path
            d="M15 17h10M14 22h12M16 27h8"
            fill="none"
            stroke="#86efac"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </SvgFrame>
      );
    case "iac":
      return (
        <SvgFrame title="Infrastructure as code">
          <path d="M20 8 30 14v12L20 32 10 26V14L20 8Z" fill="#7c3aed" opacity="0.95" />
          <path d="M20 8v24M10 14l10 6 10-6" fill="none" stroke="#c4b5fd" strokeWidth="1.1" strokeLinejoin="round" />
        </SvgFrame>
      );
    case "guardrails":
      return (
        <SvgFrame title="Guardrails">
          <path
            d="M20 10 28 14v7c0 4-3 7-8 8-5-1-8-4-8-8v-7l8-4Z"
            fill="none"
            stroke="#4ade80"
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M17 21l3 3 6-6" fill="none" stroke="#86efac" strokeWidth={1.55} strokeLinecap="round" />
        </SvgFrame>
      );
    case "git":
      return (
        <SvgFrame title="Git">
          <circle cx="16" cy="14" r="2.5" fill="none" stroke="currentColor" strokeWidth={1.35} />
          <circle cx="24" cy="22" r="2.5" fill="none" stroke="currentColor" strokeWidth={1.35} />
          <circle cx="16" cy="28" r="2.5" fill="none" stroke="currentColor" strokeWidth={1.35} />
          <path
            d="M16 16.5v9M16 16.5l8 5.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.35}
            strokeLinecap="round"
          />
        </SvgFrame>
      );
    case "flask":
      return (
        <SvgFrame title="Flask">
          <path
            d="M20 8c-6 10-8 16-8 20a8 8 0 0 0 16 0c0-4-2-10-8-20Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={sw}
            strokeLinejoin="round"
          />
          <path d="M20 12v8" fill="none" stroke="currentColor" strokeWidth={swFine} strokeLinecap="round" />
        </SvgFrame>
      );
    case "vscode":
      return (
        <SvgFrame title="Editor">
          <path
            d="M11 12 20 20 11 28 V12 Z M20 12l9 8-9 8V12Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.55}
            strokeLinejoin="round"
          />
        </SvgFrame>
      );
    case "methodology":
      return (
        <SvgFrame title="Development process">
          <rect x="10" y="11" width="20" height="20" rx="2" fill="none" stroke="currentColor" strokeWidth={1.5} />
          <path
            d="M14 17h8M14 22h12M14 27h6"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.3}
            strokeLinecap="round"
          />
          <path d="M26 16l2 2-4 4" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
        </SvgFrame>
      );
    case "documentation":
      return (
        <SvgFrame title="Documentation">
          <path
            d="M12 10h10l6 6v16H12V10Z"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
          <path
            d="M22 10v6h6M15 22h12M15 26h10M15 30h12"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.2}
            strokeLinecap="round"
          />
        </SvgFrame>
      );
    default:
      return (
        <SvgFrame>
          <circle cx="20" cy="20" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
        </SvgFrame>
      );
  }
}

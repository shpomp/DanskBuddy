import LevelBadge from "../Shared/LevelBadge";
import Button from "../Shared/Button";
import Chip from "../Shared/Chip";
import Avatar from "../Shared/Avatar";

const COLOR_GROUPS = [
  {
    group: "Brand",
    rows: [
      {
        label: "Primary",
        colors: [
          { name: "primary", label: "Primary", hex: "#e63946" },
          { name: "primary-light", label: "Primary Light", hex: "#fdeaec" },
          { name: "primary-pale", label: "Primary Pale", hex: "#fad2d5" },
        ],
      },
      {
        label: "Secondary",
        colors: [
          { name: "secondary", label: "Secondary", hex: "#f4a261" },
          { name: "secondary-light", label: "Secondary Light", hex: "#fde7c1" },
          { name: "secondary-dark", label: "Secondary Dark", hex: "#c97f35" },
        ],
      },
    ],
  },
  {
    group: "Neutrals",
    rows: [
      {
        label: null,
        colors: [
          { name: "foreground", label: "Foreground", hex: "#2b2a28" },
          { name: "neutral", label: "Neutral", hex: "#7c756b" },
          { name: "neutral-light", label: "Neutral Light", hex: "#a89f94" },
        ],
      },
    ],
  },
  {
    group: "Surfaces",
    rows: [
      {
        label: null,
        colors: [
          { name: "background", label: "Background", hex: "#f4efe8" },
          { name: "surface", label: "Surface", hex: "#ece6dd" },
          { name: "surface-alt", label: "Surface Alt", hex: "#faf6f0" },
        ],
      },
    ],
  },
  {
    group: "Semantic",
    rows: [
      {
        label: "Success",
        colors: [
          { name: "success", label: "Success", hex: "#34c77b" },
          { name: "success-dark", label: "Success Dark", hex: "#2e9c6a" },
          { name: "success-light", label: "Success Light", hex: "#e8f6ee" },
        ],
      },
      {
        label: "Info",
        colors: [
          { name: "info", label: "Info", hex: "#9b7ede" },
          { name: "info-light", label: "Info Light", hex: "#ede9fa" },
        ],
      },
    ],
  },
];

function Section({ title, children }) {
  return (
    <section className="mb-12">
      <h2 className="text-lg font-bold text-foreground mb-4 pb-2 border-b border-surface">
        {title}
      </h2>
      {children}
    </section>
  );
}

function Swatch({ name, label, hex }) {
  return (
    <div>
      <div
        className="h-14 rounded-card border border-neutral-light"
        style={{ backgroundColor: hex }}
      />
      <p className="mt-2 text-xs font-bold text-foreground">{label}</p>
      <p className="text-xs text-neutral-light font-mono">{hex}</p>
      <p className="text-xs text-neutral-light font-mono">{`bg-${name}`}</p>
    </div>
  );
}

export default function DesignSystem() {
  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="mb-10">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-3xl font-bold text-primary">Design System</h1>
          <a
            href="/danskbuddy.html"
            target="_blank"
            rel="noreferrer"
            className="bg-gradient-brand text-white text-sm font-semibold px-4 py-2 rounded-sm no-underline"
          >
            View full designs ↗
          </a>
        </div>

        <p className="text-neutral-light text-sm mt-3 mb-1">
          <strong className="text-neutral">DanskBuddy.html</strong> — what
          things <em>should</em> look like (design spec).{" "}
          <strong className="text-neutral">This page</strong> — what things{" "}
          <em>actually</em> look like in code. The gap between them shows what's
          still left to build. When you build a new component, add it below.
        </p>
        <p className="text-neutral mt-3">
          Tokens live in{" "}
          <code className="text-xs bg-surface px-1.5 py-0.5 rounded-sm font-mono">
            src/main.css
          </code>
          . Use them as Tailwind classes:{" "}
          <code className="text-xs bg-surface px-1.5 py-0.5 rounded-sm font-mono">
            bg-primary
          </code>
          ,{" "}
          <code className="text-xs bg-surface px-1.5 py-0.5 rounded-sm font-mono">
            text-neutral
          </code>
          ,{" "}
          <code className="text-xs bg-surface px-1.5 py-0.5 rounded-sm font-mono">
            rounded-card
          </code>
          …
        </p>
      </div>

      <Section title="Colors">
        <div className="flex flex-col gap-8">
          {COLOR_GROUPS.map(({ group, rows }) => (
            <div key={group}>
              <p className="text-xs font-semibold text-neutral-light uppercase tracking-wider mb-3">
                {group}
              </p>
              <div className="flex flex-col gap-4">
                {rows.map(({ label, colors }) => (
                  <div key={label ?? group} className="flex gap-3 items-start">
                    <div className="w-20 shrink-0 pt-3">
                      {label && (
                        <p className="text-xs text-neutral-light">{label}</p>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-3 flex-1">
                      {colors.map((c) => (
                        <Swatch key={c.name} {...c} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Gradients">
        <div className="flex gap-4">
          <div className="flex flex-col gap-1">
            <div className="w-48 h-16 rounded-card bg-gradient-brand" />
            <span className="text-xs text-neutral font-medium">Brand</span>
            <span className="text-xs text-neutral-light font-mono">
              bg-gradient-brand
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="w-48 h-16 rounded-card bg-gradient-page border border-surface" />
            <span className="text-xs text-neutral font-medium">Page</span>
            <span className="text-xs text-neutral-light font-mono">
              bg-gradient-page
            </span>
          </div>
        </div>
      </Section>

      <Section title="Typography">
        <div className="flex flex-col gap-3">
          {[
            ["text-3xl font-bold", "Heading / Bold"],
            ["text-xl font-semibold", "Subheading / Semibold"],
            ["text-base font-medium", "Body / Medium"],
            ["text-sm", "Small / Regular"],
            ["text-xs text-neutral-light", "Caption / Neutral Light"],
          ].map(([cls, label]) => (
            <div key={label} className="flex items-baseline gap-4">
              <span className={`${cls} text-foreground`}>{label}</span>
              <span className="text-xs text-neutral-light font-mono">
                {cls}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Border Radius">
        <div className="flex gap-6 items-end">
          {[
            ["rounded-sm", "sm · 8px"],
            ["rounded-card", "card · 16px"],
            ["rounded-pill", "pill · 999px"],
          ].map(([cls, label]) => (
            <div key={cls} className="flex flex-col gap-1 items-center">
              <div
                className={`w-16 h-16 bg-surface border border-neutral-light ${cls}`}
              />
              <span className="text-xs text-neutral">{label}</span>
              <span className="text-xs text-neutral-light font-mono">
                {cls}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Shadows">
        <div className="flex gap-8">
          {[
            ["shadow-card", "card"],
            ["shadow-elevated", "elevated"],
            ["shadow-primary", "primary"],
          ].map(([cls, label]) => (
            <div key={cls} className="flex flex-col gap-2 items-center">
              <div className={`w-20 h-20 bg-surface-alt rounded-card ${cls}`} />
              <span className="text-xs text-neutral">{label}</span>
              <span className="text-xs text-neutral-light font-mono">
                {cls}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Components">
        <div className="flex items-start gap-12">
          <div className="shrink-0">
            <p className="text-xs font-semibold text-neutral-light uppercase tracking-wider mb-3">
              Buttons
            </p>
            <div className="flex gap-2">
              <Button>Connect</Button>
              <Button variant="outline">Message</Button>
            </div>
          </div>

          <div className="shrink-0">
            <p className="text-xs font-semibold text-neutral-light uppercase tracking-wider mb-3">
              CEFR Levels
            </p>
            <div className="flex gap-2">
              <LevelBadge level="A1" />
              <LevelBadge level="A2" />
              <LevelBadge level="B1" />
              <LevelBadge level="B2" />
              <LevelBadge level="C1" />
              <LevelBadge level="C2" />
            </div>
          </div>

          <div className="shrink-0">
            <p className="text-xs font-semibold text-neutral-light uppercase tracking-wider mb-3">
              Chips
            </p>
            <div className="flex gap-2">
              <Chip>Online now</Chip>
              <Chip variant="outline">Hygge</Chip>
            </div>
          </div>

          <div className="shrink-0">
            <p className="text-xs font-semibold text-neutral-light uppercase tracking-wider mb-3">
              Identity
            </p>
            <div className="flex items-center gap-3">
              <Avatar initials="SO" />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1">
                  <span className="font-bold text-[13px] text-foreground">
                    Sofie
                  </span>
                  <span className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m5 12 5 5 9-11" />
                    </svg>
                  </span>
                </div>
                <span className="inline-flex items-center gap-1.5 px-[10px] py-[5px] rounded-pill bg-success-light text-success-dark text-xs font-bold">
                  <span className="w-[7px] h-[7px] rounded-full bg-success inline-block" />
                  Online
                </span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section title="Add your components here">
        <p className="text-neutral-light text-sm">
          When you build a new shared component, add a demo of it in this file
          so everyone can see how to use it.
        </p>
      </Section>
    </div>
  );
}

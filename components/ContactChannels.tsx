"use client";

import { useId, useState, type ReactNode } from "react";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  MailIcon,
  RepoIcon,
  WhatsappIcon,
} from "@/components/Icons";

export type ContactChannel = {
  label: string;
  brand: string;
  value: string | null;
  note: string;
  href: string | null;
};

const ICONS: Record<string, ReactNode> = {
  email: <MailIcon />,
  github: <GithubIcon />,
  linkedin: <LinkedinIcon />,
  whatsapp: <WhatsappIcon />,
  instagram: <InstagramIcon />,
  repo: <RepoIcon />,
};

function openHref(href: string) {
  if (href.startsWith("http")) {
    window.open(href, "_blank", "noopener,noreferrer");
    return;
  }
  window.location.href = href;
}

export function ContactChannels({
  channels,
  pending,
  ask,
  askOpen,
  askCancel,
}: {
  channels: ContactChannel[];
  pending: string;
  ask: string;
  askOpen: string;
  askCancel: string;
}) {
  const titleId = useId();
  const [target, setTarget] = useState<ContactChannel | null>(null);

  return (
    <>
      <div className="contact-grid">
        {channels.map((channel) => {
          const body = (
            <>
              <span className={`brand-btn brand-${channel.brand}`}>{ICONS[channel.brand]}</span>
              <span className="contact-tile-copy">
                <span className="contact-tile-label">{channel.label}</span>
                <span className={`contact-tile-value${channel.value ? "" : " is-pending"}`}>
                  {channel.value ?? pending}
                </span>
                <span className="contact-tile-note">{channel.note}</span>
              </span>
            </>
          );

          if (!channel.href) {
            return (
              <div key={channel.label} className="contact-tile is-pending">
                {body}
              </div>
            );
          }

          return (
            <button
              key={channel.label}
              type="button"
              className={`card contact-tile brand-${channel.brand}`}
              onClick={() => setTarget(channel)}
            >
              {body}
            </button>
          );
        })}
      </div>

      {target?.href ? (
        <div className="cv-soon-layer" role="presentation" onClick={() => setTarget(null)}>
          <div
            className="cv-soon-card"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <p id={titleId} className="cv-soon-title">
              {ask}
            </p>
            <p className="cv-soon-copy">
              {target.label}
              {target.value ? ` · ${target.value}` : ""}
            </p>
            <div className="work-ask-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setTarget(null)}>
                {askCancel}
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (target.href) {
                    openHref(target.href);
                  }
                  setTarget(null);
                }}
              >
                {askOpen}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

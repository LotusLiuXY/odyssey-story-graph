"use client";

import { share } from "@eazo/sdk";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Share2 } from "lucide-react";

/**
 * Shares the Odyssey story graph to the Eazo community. Verified, public-safe
 * epic-literature content — a strong "useful collection / recommendation"
 * share moment.
 */
export function ShareGraphButton() {
  const { t } = useTranslation();
  const [failed, setFailed] = useState(false);

  const handleShare = async () => {
    setFailed(false);
    const text = [
      "Community share",
      "Scenario: story_graph",
      "App: The Odyssey · Story Graph",
      "Headline: Reading the whole Odyssey as one map",
      "Result: The ten-year homecoming of Odysseus laid out in five plot beats",
      "Detail: Each beat unfolds its characters, places and themes",
      "Community angle: A quick, visual way to grasp Homer's epic — great for readers and students.",
    ].join("\n");
    try {
      await share.compose({
        text,
        sourceAppId: process.env.NEXT_PUBLIC_EAZO_APP_ID || undefined,
        targetPath: "/",
      });
    } catch {
      setFailed(true);
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      data-el="share-graph"
      aria-label={t("ui.share")}
      title={failed ? t("errors.generic.tryAgain") : t("ui.share")}
      className="grid h-9 w-9 place-items-center rounded-full border transition-colors"
      style={{
        borderColor: "var(--ink)",
        color: "var(--ink)",
        background: "var(--parchment-warm)",
      }}
    >
      <Share2 className="h-4 w-4" />
    </button>
  );
}

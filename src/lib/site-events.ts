"use client";

export type SiteEventName =
  | "quick_form_submit_success"
  | "quick_form_submit_error"
  | "sticky_cta_click"
  | "hero_primary_cta_click"
  | "estimator_submit_success"
  | "estimator_submit_error"
  | "estimator_direct_fallback_click"
  | "estimator_module_details_open";

const YM_COUNTER_ID = 109732162;

type WindowWithMetrika = Window & {
  ym?: (
    counterId: number,
    action: "reachGoal",
    eventName: string,
    payload?: Record<string, unknown>,
  ) => void;
};

export function trackSiteEvent(
  eventName: SiteEventName,
  payload: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") {
    return;
  }

  const eventPayload = {
    path: `${window.location.pathname}${window.location.search}${window.location.hash}`,
    ...payload,
  };

  try {
    (window as WindowWithMetrika).ym?.(
      YM_COUNTER_ID,
      "reachGoal",
      eventName,
      eventPayload,
    );
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[site-event:ym]", error);
    }
  }

  if (process.env.NODE_ENV !== "production") {
    console.info("[site-event]", eventName, eventPayload);
  }
}

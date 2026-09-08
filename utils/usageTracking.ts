import { supabase } from '../supabaseClient';

const EXCLUDE_KEY = 'walkgoal_exclude_usage_tracking';

// Lets the developer opt this device out of the anonymous usage stats
// (e.g. their own phone, used many times a day while testing).
export const isTrackingExcluded = (): boolean =>
  localStorage.getItem(EXCLUDE_KEY) === 'true';

export const setTrackingExcluded = (excluded: boolean) => {
  localStorage.setItem(EXCLUDE_KEY, excluded ? 'true' : 'false');
};

// Fire-and-forget, fully anonymous usage ping. No user id, device id or
// other identifying info is sent — only an event type and a timestamp.
export const trackEvent = (eventType: 'app_open' | 'walk_logged') => {
  if (isTrackingExcluded()) return;

  supabase
    .from('usage_events')
    .insert({ event_type: eventType })
    .then(({ error }) => {
      if (error) console.warn('usage tracking failed:', error.message);
    });
};

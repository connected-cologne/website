'use client';

import { useState, type ReactNode } from 'react';

const INITIAL_COUNT = 5;

type PastEventsListProps = {
  // Number of past event rows passed as children.
  total: number;
  children: ReactNode;
};

// Shows the first five past events; the rest stay in the markup (hidden via
// CSS) so the scroll-reveal observer still picks them up once expanded.
export default function PastEventsList({ total, children }: PastEventsListProps) {
  const [expanded, setExpanded] = useState(false);
  const hiddenCount = total - INITIAL_COUNT;

  return (
    <>
      <div className="past-events-list" data-expanded={expanded || undefined}>
        {children}
      </div>

      {hiddenCount > 0 && !expanded && (
        <div className="past-events-more">
          <button type="button" className="btn" onClick={() => setExpanded(true)}>
            Show more ({hiddenCount}) ↓
          </button>
        </div>
      )}
    </>
  );
}

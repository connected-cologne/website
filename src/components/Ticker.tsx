const ITEMS = [
  { text: 'TECHNO',                  hi: false },
  { text: '✦',                       hi: true  },
  { text: 'RAVES',                   hi: false },
  { text: '✦',                       hi: true  },
  { text: 'LIVE SETS',               hi: false },
  { text: '✦',                       hi: true  },
  { text: 'CONNECTED COLOGNE',       hi: false },
  { text: '✦',                       hi: true  },
  { text: 'PARTIES',                 hi: false },
  { text: '✦',                       hi: true  },
  { text: 'RADIO',                   hi: false },
  { text: '✦',                       hi: true  },
  { text: 'EVERYTHING IS CONNECTED', hi: false },
  { text: '✦',                       hi: true  },
];

export default function Ticker() {
  return (
    <div className="ticker-wrap" aria-hidden="true">
      {/* Items doubled so translateX(-50%) creates a seamless loop */}
      <div className="ticker-track">
        {[...ITEMS, ...ITEMS].map((item, i) => (
          <span key={i} className={`ticker-item${item.hi ? ' hi' : ''}`}>
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}

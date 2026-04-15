'use client';

export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = {
    sm: { icon: 24, text: 'text-base' },
    md: { icon: 32, text: 'text-xl' },
    lg: { icon: 48, text: 'text-3xl' },
  };

  const s = sizes[size];

  return (
    <div className="flex items-center gap-2.5">
      <div className="relative">
        <svg width={s.icon} height={s.icon} viewBox="0 0 48 48" fill="none">
          {/* Shield shape */}
          <path
            d="M24 4L6 12V24C6 35.1 14.04 45.36 24 48C33.96 45.36 42 35.1 42 24V12L24 4Z"
            fill="url(#shieldGrad)"
            stroke="url(#strokeGrad)"
            strokeWidth="1.5"
          />
          {/* T letter */}
          <path
            d="M14 16H34V20H26.5V36H21.5V20H14V16Z"
            fill="#0a0a0c"
          />
          {/* Lightning bolt accent */}
          <path
            d="M30 14L26 24H32L28 34"
            stroke="#0a0a0c"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="shieldGrad" x1="6" y1="4" x2="42" y2="48">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#16a34a" />
            </linearGradient>
            <linearGradient id="strokeGrad" x1="6" y1="4" x2="42" y2="48">
              <stop offset="0%" stopColor="#4ade7f" />
              <stop offset="100%" stopColor="#15803d" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[var(--accent)]"
          style={{ boxShadow: '0 0 6px rgba(34, 197, 94, 0.6)' }}
        />
      </div>
      <div className="flex flex-col leading-none">
        <span
          className={`${s.text} font-bold tracking-tight`}
          style={{ fontFamily: 'var(--font-display)' }}
        >
          <span className="text-gradient">Trenches</span>
          <span className="text-[var(--text-primary)] ml-1.5">HQ</span>
        </span>
      </div>
    </div>
  );
}

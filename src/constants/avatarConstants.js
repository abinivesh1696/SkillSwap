/**
 * Default Avatar Constants
 * Centralized default avatar for all users
 */

export const DEFAULT_AVATAR = "data:image/svg+xml;utf8," + encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <defs>
      <linearGradient id="avatarGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#667eea" />
        <stop offset="100%" stop-color="#764ba2" />
      </linearGradient>
    </defs>
    <rect width="100" height="100" rx="50" fill="url(#avatarGrad)" />
    <g fill="#ffffff" opacity="0.95">
      <circle cx="50" cy="40" r="16" />
      <path d="M25 78 C25 64, 33 56, 50 56 C67 56, 75 64, 75 78 C75 80, 73 80, 70 80 L30 80 C27 80, 25 80, 25 78 Z" />
    </g>
  </svg>
`.trim());

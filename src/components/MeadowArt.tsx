import React from 'react';

// 草原と切妻屋根の家の線画風イラスト（装飾用）。外部画像・Amazonの画像は使わない
export const MeadowArt: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 520 240"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
    preserveAspectRatio="xMaxYMax meet"
  >
    {/* やわらかい丘 */}
    <path d="M0 170c60-34 120-40 190-22 70 18 120 6 180-14 60-20 110-14 150 4v102H0z" fill="#e6eed2" />
    <path d="M0 204c70-22 140-26 220-8 80 18 170 12 300-12v56H0z" fill="#cfdcaa" />
    {/* 小道 */}
    <path d="M214 240c6-22 22-34 44-40" stroke="#c9b88a" strokeWidth="10" strokeLinecap="round" />
    {/* 木 */}
    <g stroke="#3b2a1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M96 196v-34" />
      <circle cx="96" cy="142" r="26" fill="#8aa856" fillOpacity=".55" />
      <path d="M440 190v-30" />
      <circle cx="440" cy="142" r="22" fill="#8aa856" fillOpacity=".55" />
      <path d="M476 196v-22" />
      <circle cx="476" cy="160" r="15" fill="#8aa856" fillOpacity=".45" />
    </g>
    {/* 切妻屋根の家 */}
    <g stroke="#3b2a1e" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M200 198v-62h156v62z" fill="#fffdf7" />
      <path d="M186 140 278 78l92 62z" fill="#1f4a2c" />
      <path d="M278 78v-14" />
      <circle cx="278" cy="112" r="9" fill="#fbf6e9" />
      <rect x="226" y="154" width="26" height="22" rx="2" fill="#fbf6e9" />
      <rect x="304" y="154" width="26" height="22" rx="2" fill="#fbf6e9" />
      <path d="M239 154v22M226 165h26M317 154v22M304 165h26" strokeWidth="1.6" />
      <path d="M270 198v-26a8 8 0 0 1 16 0v26" fill="#9c3d1a" />
    </g>
    {/* 花 */}
    <g fill="#9c3d1a">
      <circle cx="150" cy="210" r="3" />
      <circle cx="166" cy="216" r="2.6" />
      <circle cx="388" cy="208" r="3" />
      <circle cx="404" cy="216" r="2.6" />
      <circle cx="42" cy="206" r="2.6" />
    </g>
    <g stroke="#1f4a2c" strokeWidth="1.6" strokeLinecap="round">
      <path d="M150 213v8M166 218v7M388 211v9M404 218v7M42 209v8" />
    </g>
  </svg>
);

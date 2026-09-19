/** Filled brand stars — half star supported for the 4.5 rating. */
export function Stars({ value = 4.5, size = 15 }: { value?: number; size?: number }) {
  return (
    <span style={{ display: "inline-flex", gap: 3 }} aria-label={`${value} out of 5`}>
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, value - i));
        const id = `pgstar-${size}-${i}-${Math.round(fill * 100)}`;
        return (
          <svg key={i} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
            <defs>
              <linearGradient id={id}>
                <stop offset={`${fill * 100}%`} stopColor="#ffb400" />
                <stop offset={`${fill * 100}%`} stopColor="#e2ded4" />
              </linearGradient>
            </defs>
            <path
              d="M12 1.8l3.09 6.55 7.01.95-5.13 4.84 1.3 7.06L12 17.8l-6.27 3.4 1.3-7.06L1.9 9.3l7.01-.95z"
              fill={`url(#${id})`}
            />
          </svg>
        );
      })}
    </span>
  );
}

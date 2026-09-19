import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick?: () => void;
  autoWidth?: boolean;
  large?: boolean;
  variant?: "primary" | "outline" | "ghost" | "dark";
  disabled?: boolean;
  style?: CSSProperties;
};

/** Port of the Perlego design-system Button used by the prototype. */
export function PgButton({
  children,
  onClick,
  autoWidth,
  large,
  variant = "primary",
  disabled,
  style,
}: Props) {
  const classes = ["pg-btn"];
  if (autoWidth) classes.push("pg-btn--auto");
  if (large) classes.push("pg-btn--lg");
  if (variant === "outline") classes.push("pg-btn--outline");
  if (variant === "ghost") classes.push("pg-btn--ghost");
  if (variant === "dark") classes.push("pg-btn--dark");

  return (
    <button type="button" className={classes.join(" ")} onClick={onClick} disabled={disabled} style={style}>
      {children}
    </button>
  );
}

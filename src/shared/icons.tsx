import type { SVGProps } from "react";

/** Small stroke icon set (Remix/Feather style) used by both themes. */
const paths = {
    user: "M20 21a8 8 0 0 0-16 0M12 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10z",
    lock: "M5 11h14v10H5zM8 11V7a4 4 0 0 1 8 0v4",
    devices: "M3 4h18v12H3zM8 20h8M12 16v4",
    logout: "M15 4h4v16h-4M10 17l5-5-5-5M15 12H3",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
    chevronDown: "M6 9l6 6 6-6",
    arrowLeft: "M19 12H5M11 18l-6-6 6-6",
    success: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM8 12l3 3 5-6",
    error: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v6M12 16.5v.5",
    warning: "M12 3l10 18H2zM12 10v5M12 18v.5",
    info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 11v6M12 7.5v.5",
    restart: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5"
} as const;

export type IconName = keyof typeof paths;

export function Icon(props: { name: IconName; size?: number } & SVGProps<SVGSVGElement>) {
    const { name, size = 20, ...rest } = props;
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            focusable="false"
            {...rest}
        >
            <path d={paths[name]} />
        </svg>
    );
}

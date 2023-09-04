interface Props {
  color?: string;
  width?: string;
  height?: string;
  topLeft?: boolean;
}
export function ReferralSystemIcon({
  color = '#F1511B',
  width = '15',
  height = '14',
  topLeft = false,
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      transform={topLeft ? 'scale(-1, 1)' : undefined}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.98296 0.577466C5.53708 -0.192488 4.46292 -0.192489 4.01704 0.577466L2.93452 2.44676L0.889262 2.93902C0.0468305 3.14177 -0.285102 4.2034 0.281758 4.88202L1.65798 6.52956L1.47646 8.70309C1.4017 9.59835 2.2707 10.2545 3.06693 9.90393L5 9.05287L6.93307 9.90393C7.7293 10.2545 8.5983 9.59835 8.52354 8.70309L8.34202 6.52956L9.71824 4.88202C10.2851 4.2034 9.95317 3.14177 9.11074 2.93902L7.06548 2.44676L5.98296 0.577466Z"
        fill={color}
      />
    </svg>
  );
}

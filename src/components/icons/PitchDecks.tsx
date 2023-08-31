interface Props {
  color?: string;
  width?: string;
  height?: string;
  topLeft?: boolean;
}
export function PitchDecksIcon({
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
        d="M2 0C0.895431 0 0 0.89543 0 2V2.5C0 3.60457 0.89543 4.5 2 4.5H2.5C3.60457 4.5 4.5 3.60457 4.5 2.5V2C4.5 0.895431 3.60457 0 2.5 0H2ZM7.5 0C6.39543 0 5.5 0.89543 5.5 2V2.5C5.5 3.60457 6.39543 4.5 7.5 4.5H8C9.10457 4.5 10 3.60457 10 2.5V2C10 0.895431 9.10457 0 8 0H7.5ZM2 5.5C0.895431 5.5 0 6.39543 0 7.5V8C0 9.10457 0.89543 10 2 10H2.5C3.60457 10 4.5 9.10457 4.5 8V7.5C4.5 6.39543 3.60457 5.5 2.5 5.5H2ZM7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5V8C5.5 9.10457 6.39543 10 7.5 10H8C9.10457 10 10 9.10457 10 8V7.5C10 6.39543 9.10457 5.5 8 5.5H7.5Z"
        fill={color}
      />
    </svg>
  );
}

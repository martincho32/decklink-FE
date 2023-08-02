export interface Props {
  color?: string;
  width?: string;
  height?: string;
  topLeft?: boolean;
}
export function Logo({
  color = '#F1511B',
  width = '15',
  height = '14',
  topLeft = false,
}: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 15 14"
      fill="none"
      transform={topLeft ? 'scale(-1, 1)' : undefined}
    >
      <path
        d="M3.15586 13.1691C1.32879 14.8723 0.0415245 12.7952 0 12.7952L10.4642 2.65867L2.40842 2.61713V0.0830078H14.8658L14.8242 13.9168H12.3743L12.4989 2.90793C12.4989 3.36491 12.3743 4.48657 11.7514 5.10972L3.15586 13.1691Z"
        fill={color}
      />
    </svg>
  );
}

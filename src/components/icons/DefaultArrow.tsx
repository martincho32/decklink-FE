interface Props {
  color?: string;
  width?: string;
  height?: string;
  switchHorizontal?: boolean;
}
export function DefaultArrowIcon({
  color = '#F1511B',
  width = '20',
  height = '20',
  switchHorizontal = false,
}: Props) {
  const scaleX = switchHorizontal ? -1 : 1;

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `scaleX(${scaleX})` }} // Apply the transform here
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 0C8.88071 0 10 1.11929 10 2.5V7.5C10 8.88071 8.88071 10 7.5 10H2.5C1.11929 10 0 8.88071 0 7.5V2.5C0 1.11929 1.11929 0 2.5 0H7.5ZM5.35355 2.64645C5.15829 2.45118 4.84171 2.45118 4.64645 2.64645L2.64645 4.64645C2.55268 4.74021 2.5 4.86739 2.5 5C2.5 5.13261 2.55268 5.25979 2.64645 5.35355L4.64645 7.35355C4.84171 7.54882 5.15829 7.54882 5.35355 7.35355C5.54882 7.15829 5.54882 6.84171 5.35355 6.64645L4.20711 5.5H7C7.27614 5.5 7.5 5.27614 7.5 5C7.5 4.72386 7.27614 4.5 7 4.5H4.20711L5.35355 3.35355C5.54882 3.15829 5.54882 2.84171 5.35355 2.64645Z"
        fill={color}
      />
    </svg>
  );
}

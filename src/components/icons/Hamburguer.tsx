interface Props {
  color?: string;
  width?: string;
}

export function Hamburguer({ color = '#F1511B', width = '10' }: Props) {
  return (
    <svg
      className={`w-${width}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 44 44"
      fill="none"
    >
      <rect x="3" y="10" width="38" height="4" rx="2" fill={color} />
      <rect x="7" y="20" width="30" height="4" rx="2" fill={color} />
      <rect x="12" y="30" width="20" height="4" rx="2" fill={color} />
    </svg>
  );
}

export interface IconProps {
  color?: string;
  width?: string;
  height?: string;
}

export function CloseIcon({
  color = '#F1511B',
  width = '45',
  height = '45',
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={width}
      height={height}
      viewBox="0 0 48 48"
    >
      <path
        fill={color}
        d="M36.021,8.444l3.536,3.536L11.98,39.557l-3.536-3.536L36.021,8.444z"
      />
      <path
        fill={color}
        d="M39.555,36.023l-3.536,3.535L8.445,11.976l3.536-3.535L39.555,36.023z"
      />
    </svg>
  );
}

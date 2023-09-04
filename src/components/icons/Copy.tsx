interface Props {
  color?: string;
  width?: string;
  height?: string;
}
export function CopyIcon({
  color = '#FFF',
  width = '15',
  height = '14',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 13 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Group 35188">
        <path
          id="Union"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M7.10116 4.19995C5.77568 4.19995 4.70117 5.27446 4.70117 6.59994V9.59992C4.70117 10.9254 5.77568 11.9999 7.10116 11.9999H10.1011C11.4266 11.9999 12.5011 10.9254 12.5011 9.59992V6.59994C12.5011 5.27446 11.4266 4.19995 10.1011 4.19995H7.10116Z"
          fill={color}
        />
        <path
          id="Union_2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.89998 0.000183105C1.57451 0.000183105 0.5 1.07469 0.5 2.40017V5.40015C0.5 6.82146 1.55677 7.80013 2.89998 7.80013C3.23135 7.80013 3.49998 7.53151 3.49998 7.20014V6.60014C3.49998 4.61193 5.11175 3.00016 7.09996 3.00016H7.69995C8.03132 3.00016 8.29995 2.73154 8.29995 2.40017C8.29995 1.05695 7.32128 0.000183105 5.89997 0.000183105H2.89998Z"
          fill={color}
        />
      </g>
    </svg>
  );
}

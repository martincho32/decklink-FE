export interface Props {
  color?: string;
  width?: string;
  height?: string;
}
export function LogOutIcon({
  color = '#F1511B',
  width = '15',
  height = '14',
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.01628 0.0366212L3.00253 0.0366211C2.54747 0.0366188 2.18684 0.0366169 1.89617 0.060366C1.59892 0.0846519 1.34741 0.135322 1.11775 0.252337C0.745349 0.442087 0.442575 0.744861 0.252826 1.11726C0.13581 1.34692 0.0851402 1.59843 0.0608543 1.89568C0.0371052 2.18635 0.037107 2.54698 0.0371094 3.00204L0.0371095 3.01579L0.0371095 6.98411L0.0371094 6.99786C0.037107 7.45292 0.0371052 7.81355 0.0608543 8.10422C0.0851402 8.40147 0.13581 8.65298 0.252826 8.88263C0.442575 9.25504 0.745349 9.55781 1.11775 9.74756C1.34741 9.86458 1.59892 9.91525 1.89617 9.93953C2.18684 9.96328 2.54746 9.96328 3.00252 9.96328H3.01628H3.26394H3.2777C3.73275 9.96328 4.09337 9.96328 4.38405 9.93953C4.68129 9.91525 4.9328 9.86458 5.16246 9.74756C5.53486 9.55781 5.83764 9.25504 6.02739 8.88263C6.1444 8.65298 6.19507 8.40147 6.21936 8.10422C6.24311 7.81355 6.24311 7.45293 6.2431 6.99787V6.98411V3.01579V3.00203C6.24311 2.54697 6.24311 2.18635 6.21936 1.89568C6.19507 1.59843 6.1444 1.34692 6.02739 1.11726C5.83764 0.744861 5.53486 0.442087 5.16246 0.252337C4.9328 0.135322 4.68129 0.0846519 4.38405 0.060366C4.09337 0.0366169 3.73275 0.0366188 3.27769 0.0366211L3.26394 0.0366212L3.01628 0.0366212ZM7.56997 2.91861C7.69201 2.79658 7.88987 2.79658 8.01191 2.91861L9.87224 4.77895C9.99428 4.90098 9.99428 5.09885 9.87224 5.22089L8.01191 7.08122C7.88987 7.20326 7.69201 7.20326 7.56997 7.08122C7.44793 6.95918 7.44793 6.76132 7.56997 6.63928L8.89683 5.31242L3.14006 5.31242C2.96747 5.31242 2.82756 5.17251 2.82756 4.99992C2.82756 4.82733 2.96747 4.68742 3.14006 4.68742L8.89683 4.68742L7.56997 3.36056C7.44793 3.23852 7.44793 3.04065 7.56997 2.91861Z"
        fill={color}
      />
    </svg>
  );
}

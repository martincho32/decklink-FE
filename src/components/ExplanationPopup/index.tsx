import { useState } from 'react';
import { ExplanationIcon } from '../icons/Explanation';

type Props = {
  message: string;
  showIcon: boolean;
  children?: JSX.Element | JSX.Element[];
  className?: string;
};

export default function ExplanationPopup({
  message,
  showIcon,
  children,
  className,
}: Props) {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const onMouseEnterExplanationIcon = () => {
    setPopupVisible(true);
  };

  const onMouseLeaveExplanationIcon = () => {
    setPopupVisible(false);
  };

  return (
    <>
      <div
        onMouseEnter={onMouseEnterExplanationIcon}
        onMouseLeave={onMouseLeaveExplanationIcon}
      >
        {showIcon && <ExplanationIcon />}
        {children}
      </div>
      {isPopupVisible && (
        <div
          className={`${className} text-[12px] absolute w-fit bottom-[115%] left-0 bg-[#f1f1f1] color-[#333] px-1 py-2 rounded-md shadow-[0_2px_5px_0px_rgba(0,0,0,0.2)] z-[10000]`}
        >
          {message}
        </div>
      )}
    </>
  );
}

import { useEffect, useState } from 'react';

interface PopupProps {
  trigger: boolean;
  className?: string;
}

const Popup = ({ trigger, className }: PopupProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (trigger) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [trigger]);

  if (!isVisible) return null;

  return (
    <div className={`${className} fixed top-36 right-4 w-40 text-center justify-center bg-[#FF5833] text-white px-4 py-2 rounded-md shadow-lg`}>
      Created a Task
    </div>
  );
}

export default Popup;

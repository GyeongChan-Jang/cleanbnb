import { useState } from 'react';

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => {
    setIsVisible(true);
  };

  const hide = () => {
    setIsVisible(false);
  };

  return { show, hide, isVisible };
};

export default useModal;

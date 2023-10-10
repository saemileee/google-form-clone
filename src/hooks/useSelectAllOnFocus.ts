import React, {useEffect} from 'react';

const useSelectAllOnFocus = (inputRef: React.RefObject<HTMLInputElement>) => {
  useEffect(() => {
    const handleFocus = () => {
      inputRef.current?.select();
    };

    inputRef.current?.addEventListener('focus', handleFocus);

    return () => {
      inputRef.current?.removeEventListener('focus', handleFocus);
    };
  }, [inputRef]);
};

export default useSelectAllOnFocus;

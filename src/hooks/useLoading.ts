// useLoading.ts
import { useState, useEffect } from 'react';

const useLoading = (loadingFunction: () => Promise<any>) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await loadingFunction();
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Error loading data:', error);
        setIsLoading(false); // Make sure to set isLoading to false on error as well
      }
    };

    fetchData();
  }, [loadingFunction]);

  return isLoading;
};

export default useLoading;

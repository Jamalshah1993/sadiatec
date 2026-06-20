'use client';
import { useState, useEffect } from 'react';
import { Loader } from '@saidatech/cms-core/components/ui';

export const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This timer ensures the loader is visible for a minimum duration
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={loading} />
      <div 
        className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}
      >
        {children}
      </div>
    </>
  );
};
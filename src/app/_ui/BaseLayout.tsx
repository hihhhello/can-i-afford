import { ReactNode } from 'react';

type BaseLayoutProps = {
  children: ReactNode;
};

export const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="h-full">
      <div className="flex h-full py-10">
        <main className="flex flex-1">
          <div className="flex flex-1 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

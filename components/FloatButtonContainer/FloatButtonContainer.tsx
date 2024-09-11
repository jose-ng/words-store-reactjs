import { ReactNode } from 'react';

export const FloatButtonContainer = ({ children }: { children: ReactNode }) => {
    return <div className='fixed right-14 bottom-5 flex flex-col gap-2'>{children}</div>;
};

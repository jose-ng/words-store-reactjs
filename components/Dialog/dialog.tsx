import { forwardRef, ReactNode, useImperativeHandle, useRef, MouseEvent } from 'react';

type DialogProps = {
    children: ReactNode;
    title: string;
    onClose?: () => void;
};

export type DialogRefType = {
    open: () => void;
};

export const Dialog = forwardRef(({ children, title, onClose }: DialogProps, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useImperativeHandle(ref, (): DialogRefType => {
        return {
            open() {
                dialogRef.current?.showModal();
            },
        };
    });

    const closeDialog = () => {
        dialogRef.current?.close();
    };

    return (
        <dialog
            ref={dialogRef}
            className='p-0 rounded-lg min-w-[50%] min-h-52 backdrop:bg-black/70 backdrop:backdrop-blur'
            onClose={onClose}
            onClick={(e: MouseEvent<HTMLDialogElement>) => {
                if (!(e.target instanceof HTMLElement)) return;
                if (e.target.nodeName === 'DIALOG') {
                    closeDialog();
                }
            }}>
            <div className='flex w-full justify-between p-6'>
                <h1 className='font-bold'>{title}</h1>
                <button
                    type='button'
                    aria-label='close'
                    className='px-1 rounded-full focus:outline outline-blue-700 outline-2 hover:bg-black/15'
                    onClick={closeDialog}>
                    X
                </button>
            </div>
            <div className='px-6 pb-6'>{children}</div>
        </dialog>
    );
});

Dialog.displayName = 'Dialog';

import { useWorkOut } from '@/hooks/useWorkOut';
import { Dialog, DialogRefType } from '@/components/Dialog/dialog';
import { WorkOut } from '@/components/WorkOut/WorkOut';
import { useRef } from 'react';

export const WorkoutDialog = () => {
    const {setListWords, listWords, loading } = useWorkOut();
    const dialogRef = useRef<DialogRefType>(null);

    const OpenDialog = () => dialogRef.current?.open();

    return (
        <>
            <button
                type='button'
                className='fixed right-14 p-3 bottom-5 w-15 h-15 bg-yellow-500 hover:bg-yellow-600 rounded-full'
                onClick={OpenDialog}>
                Workout
            </button>
            <Dialog title='Workout' ref={dialogRef}>
                <WorkOut listWords={listWords} setListWords={setListWords} loading={loading} />
            </Dialog>
        </>
    );
};

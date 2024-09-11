import { Dialog, DialogRefType } from '@/components/Dialog/dialog';
import { ContainerCreate } from '@/components/ContainerCreate/ContainerCreate';
import { ErrorMessage } from '@/components/ErrorMessage/ErrorMessage';
import { CreateNote } from '@/components/CreateNote/CreateNote';
import { useRef } from 'react';
import { useCreate } from '@/hooks/useCreate';
import { useSelector } from 'react-redux';
import { selectUserLoggedIn } from '@/utils/redux/slices/user.slice';

export const AddNoteDialog = () => {
    const isUserLoggedIn = useSelector(selectUserLoggedIn);
    const dialogRef = useRef<DialogRefType>(null);
    const { handlerSubmit, handlerChangeValue, form, resetValues, sending, errorCreate } = useCreate();

    const OpenDialog = () => {
        dialogRef.current?.open();
    };

    const closeDialog = () => dialogRef.current?.close();

    if (!isUserLoggedIn) {
        return null;
    }

    return (
        <>
            <button
                type='button'
                className='p-3 w-15 h-15 bg-yellow-500 hover:bg-yellow-600 rounded-full'
                onClick={OpenDialog}>
                Add Note
            </button>
            <Dialog title='Add Note' ref={dialogRef}>
                <ContainerCreate error={errorCreate} onError={() => <ErrorMessage msg={errorCreate} />}>
                    <CreateNote
                        onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => {
                            e.preventDefault();
                            handlerSubmit('note');
                            resetValues();
                            closeDialog();
                        }}
                        onChangeValue={handlerChangeValue}
                        form={form}
                        sending={sending}
                    />
                </ContainerCreate>
            </Dialog>
        </>
    );
};

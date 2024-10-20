'use client';
import { DialogFooter } from '@/components/dialog';
import { addPiece } from '@/server-action-test/server-actions';
import { Button } from '@nextui-org/button';
import { Modal, ModalBody, ModalContent, ModalHeader } from '@nextui-org/modal';
import { useFormik } from 'formik';
import { InferType, object, string } from 'yup';

interface AddModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  category: PieceCategory;
}

const categoryTextMap: Record<PieceCategory, string> = {
  warm_up: 'Warm Up',
  exercise: 'Exercise/Etude',
  current: 'Current',
  refresh: 'Refresh',
  past: 'Past',
};

const schema = object({
  title: string().required('Title is required').default(''),
  composer: string(),
  generalNotes: string(),
});

export type Values = InferType<typeof schema>;

export const AddModal = ({ isOpen, onOpenChange, onClose, category }: AddModalProps) => {
  const { handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik<Values>({
      validationSchema: schema,
      initialValues: schema.getDefault(),
      onSubmit: async (formValues) => {
        await addPiece(formValues, category);
        onClose()
      },
    });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
      <ModalContent>
        <ModalHeader>New {categoryTextMap[category]} Piece</ModalHeader>
        <ModalBody className="mb-8">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">Piece Title:</label>
                <input
                  className="rounded border-1 border-solid border-black shadow-lg shadow-gray p-2"
                  type="text"
                  id="title"
                  placeholder="Piece Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">
                  Composer (optional):
                </label>
                <input
                  className="rounded border-1 border-solid border-black shadow-lg shadow-gray p-2"
                  type="text"
                  id="composer"
                  placeholder="Composer"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-bold text-sm">Notes (optional):</label>
                <textarea
                  className="rounded border-1 border-solid border-black shadow-lg shadow-gray p-2 h-60"
                  id="generalNotes"
                  placeholder="Enter notes here"
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
            </div>
            {/* <div className="mt-5 flex justify-end"> */}
            <DialogFooter>
              <Button
                type="submit"
                size="lg"
                color="primary"
                isDisabled={
                  Object.keys(touched).length === 0 ||
                  Object.keys(errors).length !== 0
                }
              >
                Submit
              </Button>
            </DialogFooter>
            {/* </div> */}
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

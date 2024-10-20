import { Button } from '@/components/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/dialog';
import { addPiece } from '@/server-action-test/server-actions';
import { useFormik } from 'formik';
import { InferType, object, string } from 'yup';

interface NewAddModalProps {
  isOpen: boolean;
  category: PieceCategory;
  updateIsOpen: (isOpen: boolean) => void
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

export const NewAddModal = ({ category, isOpen, updateIsOpen }: NewAddModalProps) => {
  const { handleChange, handleSubmit, errors, touched, handleBlur } =
    useFormik<Values>({
      validationSchema: schema,
      initialValues: schema.getDefault(),
      onSubmit: async (formValues) => {
        await addPiece(formValues, category);
        updateIsOpen(false)
      },
    });

  return (
    <Dialog open={isOpen} onOpenChange={updateIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New {categoryTextMap[category]} Piece</DialogTitle>
        </DialogHeader>
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
          <div className="mt-5 flex justify-end">
            <Button variant="default" type="submit"
              disabled={
                Object.keys(touched).length === 0 ||
                Object.keys(errors).length !== 0
              }
            >Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

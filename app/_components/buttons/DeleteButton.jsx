'use client';

import { deleteVilla } from '@/app/_lib/data-service';
import { useRouter } from 'next/navigation';
import { MdDelete } from 'react-icons/md';

function DeleteButton({ deleteID }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteVilla(id);
    router.push(`/villas`);
  };
  return (
    <button onClick={() => handleDelete(deleteID)}>
      <MdDelete />
    </button>
  );
}

export default DeleteButton;

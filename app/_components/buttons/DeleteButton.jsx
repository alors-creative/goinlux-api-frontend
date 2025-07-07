'use client';

import { deleteVilla } from '@/app/_lib/data-service';
import { useRouter } from 'next/navigation';
import { MdDeleteForever } from 'react-icons/md';

function DeleteButton({ deleteID }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteVilla(id);
    router.push(`/villas`);
  };
  return (
    <button onClick={() => handleDelete(deleteID)}>
      <MdDeleteForever />
    </button>
  );
}

export default DeleteButton;

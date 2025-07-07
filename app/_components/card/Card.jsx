'use client';

import LinkButton from '@/app/_components/buttons/LinkButton';
import { MdDeleteForever } from 'react-icons/md';
import styles from '@/app/_components/card/card.module.scss';
import { deleteVilla } from '@/app/_lib/data-service';
import { useRouter } from 'next/navigation';

function Card({ villa }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteVilla(id);
    router.refresh();
  };

  return (
    <div>
      <p>{villa.name}</p>
      <p>{villa.location.location}</p>
      <LinkButton link={`/villas/${villa.id}`} color="purple">
        View
      </LinkButton>
      <LinkButton link={`/villas/edit/${villa.id}`} color="purple">
        Edit
      </LinkButton>
      <button onClick={() => handleDelete(villa.id)}>
        <MdDeleteForever />
      </button>
    </div>
  );
}

export default Card;

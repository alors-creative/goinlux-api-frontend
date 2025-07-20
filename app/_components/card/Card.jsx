'use client';

import LinkButton from '@/app/_components/buttons/LinkButton';
import { MdDelete } from 'react-icons/md';
import styles from '@/app/_components/card/card.module.scss';
import { deleteVilla } from '@/app/_lib/data-service';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function Card({ villa }) {
  const router = useRouter();

  const handleDelete = async (id) => {
    await deleteVilla(id);
    router.refresh();
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardImage}>
        <Image
          src={villa.main_image}
          alt="Villa Image"
          fill
          priority
          sizes="auto"
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />
      </div>
      <div className={styles.cardInfo}>
        <div className="headers">
          <h3>{villa.name}</h3>
          <h4>{villa.location.location}</h4>
        </div>
        <div className={styles.buttons}>
          <LinkButton link={`/villas/${villa.id}`} color="pink">
            View
          </LinkButton>
          <LinkButton link={`/villas/edit/${villa.id}`} color="purple">
            Edit
          </LinkButton>
          <button
            onClick={() => handleDelete(villa.id)}
            className={styles.deleteBtn}
          >
            <MdDelete />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;

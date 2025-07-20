import DeleteButton from '@/app/_components/buttons/DeleteButton';
import LinkButton from '@/app/_components/buttons/LinkButton';
import { getVilla } from '@/app/_lib/data-service';
import { FaBath, FaBed, FaEdit, FaPersonBooth } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';
import styles from './page.module.scss';
import Image from 'next/image';

async function page({ params }) {
  const { villaId } = await params;
  const villa = await getVilla(villaId);

  return (
    <section className={styles.villa}>
      <h1>{villa.name}</h1>
      <h2>{villa.location.location}</h2>
      <div className={styles.buttons}>
        <LinkButton link={`/villas/edit/${villa.id}`} color="purple">
          Edit Villa
        </LinkButton>
        <DeleteButton deleteID={villa.id} />
      </div>
      <div className={styles.info}>
        <div className={styles.in}>
          <FaBed />
          {villa.beds}
        </div>
        <span> | </span>
        <div className={styles.in}>
          <FaBath />
          {villa.beds}
        </div>
        <span> | </span>
        <div className={styles.in}>
          <IoPerson />
          {villa.beds}
        </div>
      </div>
      <div className={styles.mainImage}>
        <Image
          src={villa?.main_image}
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
      <div className={styles.allInfo}>
        <h2>Description</h2>
        <p>{villa.description}</p>
        <h2>Amenities</h2>
        <ul>
          {villa?.amenities.map((a) => (
            <li key={a.id}>{a.amenity.name}</li>
          ))}
        </ul>

        <h2>Room Breakdown</h2>
        {villa?.rooms && (
          <ul>
            {villa?.rooms?.map((room) => (
              <div key={`roomBreakdown--${room.id}`}>
                <li>{room.room_name}</li>
                <ul className={styles.secondLevel}>
                  {room?.roomItems?.map((item) => (
                    <li key={`roomItem--${item.id}`}>{item.room_item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </ul>
        )}

        <h2>Photos</h2>
        <div className={styles.images}>
          {villa?.photos &&
            villa?.photos.map((p) => (
              <div className={styles.image} key={p.id}>
                <Image
                  src={p.photo}
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
            ))}
        </div>
      </div>
    </section>
  );
}

export default page;

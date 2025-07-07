import DeleteButton from '@/app/_components/buttons/DeleteButton';
import LinkButton from '@/app/_components/buttons/LinkButton';
import { getVilla } from '@/app/_lib/data-service';
import { FaBath, FaBed, FaEdit, FaPersonBooth } from 'react-icons/fa';
import { IoPerson } from 'react-icons/io5';

async function page({ params }) {
  const { villaId } = await params;
  const villa = await getVilla(villaId);

  return (
    <section>
      <h1>{villa.name}</h1>
      <h2>{villa.location.location}</h2>
      <div className="buttons">
        <LinkButton link={`/villas/edit/${villa.id}`} color="purple">
          <FaEdit />
        </LinkButton>
        <DeleteButton deleteID={villa.id} />
      </div>
      <div className="mainImage">
        <p>{villa.main_image}</p>
      </div>
      <div className="info">
        <div className="in">
          <FaBed />
          {villa.beds}
        </div>
        <span> | </span>
        <div className="in">
          <FaBath />
          {villa.beds}
        </div>
        <span> | </span>
        <div className="in">
          <IoPerson />
          {villa.beds}
        </div>
      </div>
      <div className="all-info">
        <p>{villa.description}</p>
        <h2>Amenities</h2>
        {villa?.amenities.map((a) => (
          <p key={a.id}>{a.amenity.name}</p>
        ))}

        <h2>Room Breakdown</h2>
        {villa?.rooms?.map((room) => (
          <div key={`roomBreakdown--${room.id}`}>
            <p>{room.room_name}</p>
            {room?.roomItems?.map((item) => (
              <p key={`roomItem--${item.id}`}>{item.room_item}</p>
            ))}
          </div>
        ))}

        <h2>Photos</h2>
        {villa?.photos &&
          villa?.photos.map((p) => <p key={`photo--${p.id}`}>{p.photo}</p>)}

        {/* <p>{villa.description}</p> */}
      </div>
    </section>
  );
}

export default page;

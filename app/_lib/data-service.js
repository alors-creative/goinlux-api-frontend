export async function getAmenities() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GOINLUX_API}/amenities/self-added`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw Error('Failed to fetch from GoinLux API');
  }
}

export async function deleteAmenity(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GOINLUX_API}/amenities/${Number(id)}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    throw Error('Failed to fetch from GoinLux API');
  }
}

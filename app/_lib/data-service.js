// Amenities
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

// Locations
export async function getLocations() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GOINLUX_API}/locations`,
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

export async function deleteLocation(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GOINLUX_API}/locations/${Number(id)}`,
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

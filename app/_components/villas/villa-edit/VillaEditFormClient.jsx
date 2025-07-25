'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import '@/app/_styles/forms.scss';
import styles from '@/app/_components/villas/villaForms.module.scss';
import { MdDelete } from 'react-icons/md';

export default function VillaEditFormClient({
  villa,
  amenities = [],
  locations = [],
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    beds: 0,
    baths: 0,
    max_capacity: 0,
    main_image: '',
    description: '',
    starting_price: 0,
    external_villa_id: '',
    api_id: 1,
    location_id: '',
    amenities: [],
    photos: [],
    rooms: [
      {
        room_name: '',
        roomItems: [''],
      },
    ],
  });

  const [selectedMainImageIndex, setSelectedMainImageIndex] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (villa) {
      const photos = villa.photos?.map((p) => p.photo) || [];
      setFormData({
        ...villa,
        photos,
        rooms: villa.rooms?.map((room) => ({
          room_name: room.room_name,
          roomItems: room.roomItems?.map((i) => i.room_item) || [''],
        })) || [{ room_name: '', roomItems: [''] }],
        amenities:
          villa.amenities
            ?.map((a) => a?.amenity?.id)
            .filter((id) => typeof id === 'number') || [],
      });

      const mainIndex = photos.findIndex((p) => p === villa.main_image);
      setSelectedMainImageIndex(mainIndex >= 0 ? mainIndex : 0);
    }
  }, [villa]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAmenityToggle = (id) => {
    setFormData((prev) => {
      const isChecked = prev.amenities.includes(id);
      return {
        ...prev,
        amenities: isChecked
          ? prev.amenities.filter((a) => a !== id)
          : [...prev.amenities, id],
      };
    });
  };

  const handleMultipleUploads = async (files) => {
    const preset = 'goinlux_preset'; // 🔁 Replace with your Cloudinary preset
    const cloudName = 'dzuj8vnrr'; // 🔁 Replace with your Cloudinary cloud name

    setIsUploading(true);

    for (const file of files) {
      const form = new FormData();
      form.append('file', file);
      form.append('upload_preset', preset);

      try {
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: 'POST',
            body: form,
          },
        );

        const data = await res.json();
        if (data.secure_url) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, data.secure_url],
          }));
        } else {
          console.error('Upload failed:', data);
        }
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    setIsUploading(false);
  };

  const handleDeletePhoto = (index) => {
    const updatedPhotos = [...formData.photos];
    updatedPhotos.splice(index, 1);

    setFormData((prev) => ({
      ...prev,
      photos: updatedPhotos,
    }));

    if (selectedMainImageIndex === index) {
      setSelectedMainImageIndex(null);
    } else if (selectedMainImageIndex > index) {
      setSelectedMainImageIndex((prev) => prev - 1);
    }
  };

  const handleRoomChange = (index, field, value) => {
    const updated = [...formData.rooms];
    updated[index][field] = value;
    handleChange('rooms', updated);
  };

  const handleRoomItemChange = (roomIndex, itemIndex, value) => {
    const updated = [...formData.rooms];
    updated[roomIndex].roomItems[itemIndex] = value;
    handleChange('rooms', updated);
  };

  const addRoom = () => {
    handleChange('rooms', [
      ...formData.rooms,
      { room_name: '', roomItems: [''] },
    ]);
  };

  const addRoomItem = (roomIndex) => {
    const updated = [...formData.rooms];
    updated[roomIndex].roomItems.push('');
    handleChange('rooms', updated);
  };

  const removeRoomItem = (roomIndex, itemIndex) => {
    const updated = [...formData.rooms];
    updated[roomIndex].roomItems.splice(itemIndex, 1);
    handleChange('rooms', updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let mainImageUrl = formData.photos[0] || '';
    let reorderedPhotos = [...formData.photos];

    if (
      selectedMainImageIndex !== null &&
      formData.photos[selectedMainImageIndex]
    ) {
      mainImageUrl = formData.photos[selectedMainImageIndex];
      reorderedPhotos = [
        formData.photos[selectedMainImageIndex],
        ...formData.photos.filter((_, i) => i !== selectedMainImageIndex),
      ];
    }

    const formattedData = {
      ...formData,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      max_capacity: Number(formData.max_capacity),
      starting_price: Number(formData.starting_price),
      api_id: Number(formData.api_id),
      location_id: formData.location_id ? Number(formData.location_id) : null,
      main_image: mainImageUrl,
      amenities: formData.amenities,
      photos: reorderedPhotos.map((p) => ({ photo: p })),
      rooms: formData.rooms.map((room) => ({
        room_name: room.room_name,
        roomItems: room.roomItems
          .filter(Boolean)
          .map((ri) => ({ room_item: ri })),
      })),
    };

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_GOINLUX_API}/villas/${villa.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        },
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      res.ok && router.push(`/villas/${villa.id}`);
    } catch (err) {
      console.error(err);
      alert('There was an error updating the villa.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={[styles.form, 'form', 'edit'].join(' ')}
    >
      <div className="formGroup">
        <label htmlFor={formData.name}>Villa Name</label>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
        />
      </div>

      <div className="formGroup">
        <label htmlFor={formData.location_id}>Location</label>
        <select
          value={formData.location_id}
          onChange={(e) => handleChange('location_id', e.target.value)}
        >
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc.id} value={loc.id}>
              {loc.location}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.limits}>
        <div className="formGroup">
          <label htmlFor={formData.beds}>Beds</label>
          <input
            type="number"
            placeholder="Beds"
            value={formData.beds}
            onChange={(e) => handleChange('beds', e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor={formData.baths}>Baths</label>
          <input
            type="number"
            placeholder="Baths"
            value={formData.baths}
            onChange={(e) => handleChange('baths', e.target.value)}
          />
        </div>

        <div className="formGroup">
          <label htmlFor={formData.max_capacity}>Max Capacity</label>
          <input
            type="number"
            placeholder="Max Capacity"
            value={formData.max_capacity}
            onChange={(e) => handleChange('max_capacity', e.target.value)}
          />
        </div>
      </div>
      <div className="formGroup">
        <label htmlFor={formData.description}>Description</label>
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          rows="15"
        />
      </div>

      <h4>Add Amenities</h4>
      <div className={styles.amenities}>
        {amenities.map((a) => (
          <div className="formGroup">
            <label key={a.id}>
              <input
                type="checkbox"
                checked={formData.amenities.includes(a.id)}
                onChange={() => handleAmenityToggle(a.id)}
              />
              {a.name}
            </label>
          </div>
        ))}
      </div>

      <div className={styles.photos}>
        <h4>Edit or Upload Photos</h4>
        <div className="formGroup">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length > 0) handleMultipleUploads(files);
            }}
          />
        </div>

        {isUploading && (
          <p className={styles.uploading}>Uploading more images…</p>
        )}

        <div className={styles.loadedPhotos}>
          {formData.photos.map((photo, i) => (
            <div key={i} style={{ marginBottom: '1rem' }}>
              <img src={photo} alt={`Uploaded ${i}`} width={100} />
              <div className={['formGroup', styles.formGroup].join(' ')}>
                <label>Set as main image</label>
                <input
                  type="radio"
                  name="mainImage"
                  checked={selectedMainImageIndex === i}
                  onChange={() => setSelectedMainImageIndex(i)}
                />
              </div>

              <button
                type="button"
                onClick={() => handleDeletePhoto(i)}
                className={styles.deleteBtn}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      <h4>Rooms</h4>
      <div className={styles.rooms}>
        {formData.rooms.map((room, roomIndex) => (
          <>
            <div key={roomIndex} className={styles.room}>
              <h5>Room {roomIndex + 1}</h5>
              <div className="formGroup">
                <input
                  type="text"
                  placeholder="Room Name"
                  value={room.room_name}
                  onChange={(e) =>
                    handleRoomChange(roomIndex, 'room_name', e.target.value)
                  }
                />
              </div>
              <button
                type="button"
                onClick={addRoom}
                className={[styles.addBtn, styles.posA].join(' ')}
              >
                Add Room
              </button>
            </div>
            <div className={styles.roomItems}>
              <h5>Room {roomIndex + 1} Items</h5>
              {room.roomItems.map((item, itemIndex) => (
                <div key={itemIndex} className="formGroup">
                  <label htmlFor={item}>Room Item {itemIndex + 1}</label>
                  <div className={styles.container}>
                    <input
                      type="text"
                      placeholder="Room Item"
                      value={item}
                      onChange={(e) =>
                        handleRoomItemChange(
                          roomIndex,
                          itemIndex,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => removeRoomItem(roomIndex, itemIndex)}
                      className={styles.deleteBtn}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addRoomItem(roomIndex)}
                className={styles.addBtn}
              >
                Add Room Item
              </button>
            </div>
          </>
        ))}
      </div>

      <button type="submit" className={styles.submitBtn}>
        Update Villa
      </button>
    </form>
  );
}

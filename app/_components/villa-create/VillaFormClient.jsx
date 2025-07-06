'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function VillaFormClient({ amenities = [], locations = [] }) {
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
    photos: [''],
    rooms: [
      {
        room_name: '',
        roomItems: [''],
      },
    ],
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
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

  const handlePhotoChange = (index, value) => {
    const updated = [...formData.photos];
    updated[index] = value;
    handleChange('photos', updated);
  };

  const addPhoto = () => {
    handleChange('photos', [...formData.photos, '']);
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

  const handleCloudinaryUpload = async (file, index) => {
    const preset = 'goinlux_preset'; // Replace with your actual preset
    const cloudName = 'your-cloud-name'; // Replace with your actual Cloudinary name

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
        const updated = [...formData.photos];
        updated[index] = data.secure_url;
        handleChange('photos', updated);
      } else {
        console.error('Upload failed:', data);
      }
    } catch (err) {
      console.error('Upload error:', err);
    }
  };

  const resetForm = () => {
    setFormData({
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
      photos: [''],
      rooms: [
        {
          room_name: '',
          roomItems: [''],
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      max_capacity: Number(formData.max_capacity),
      starting_price: Number(formData.starting_price),
      api_id: Number(formData.api_id),
      location_id: formData.location_id ? Number(formData.location_id) : null,
      amenities: formData.amenities, // ✅ ADD THIS LINE
      photos: formData.photos.filter(Boolean).map((p) => ({ photo: p })),
      rooms: formData.rooms.map((room) => ({
        room_name: room.room_name,
        roomItems: room.roomItems
          .filter(Boolean)
          .map((ri) => ({ room_item: ri })),
      })),
    };

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_GOINLUX_API}/villas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`API error: ${res.status} - ${errorText}`);
      }

      const newVilla = await res.json();
      router.push(`/villas/${newVilla.id}`);
      resetForm();
    } catch (err) {
      console.error(err);
      alert('There was an error creating the villa.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
      />

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

      <input
        type="number"
        placeholder="Beds"
        value={formData.beds}
        onChange={(e) => handleChange('beds', e.target.value)}
      />

      <input
        type="number"
        placeholder="Baths"
        value={formData.baths}
        onChange={(e) => handleChange('baths', e.target.value)}
      />

      <input
        type="number"
        placeholder="Max Capacity"
        value={formData.max_capacity}
        onChange={(e) => handleChange('max_capacity', e.target.value)}
      />

      <input
        type="text"
        placeholder="Main Image"
        value={formData.main_image}
        onChange={(e) => handleChange('main_image', e.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={formData.description}
        onChange={(e) => handleChange('description', e.target.value)}
      />

      <input
        type="number"
        placeholder="Starting Price"
        value={formData.starting_price}
        onChange={(e) => handleChange('starting_price', e.target.value)}
      />

      <input
        type="text"
        placeholder="External Villa ID"
        value={formData.external_villa_id}
        onChange={(e) => handleChange('external_villa_id', e.target.value)}
      />

      <h4>Amenities</h4>
      {amenities.map((a) => (
        <label key={a.id}>
          <input
            type="checkbox"
            checked={formData.amenities.includes(a.id)}
            onChange={() => handleAmenityToggle(a.id)}
          />
          {a.name}
        </label>
      ))}

      <h4>Photos</h4>
      {/* {formData.photos.map((photo, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Photo ${i + 1}`}
          value={photo}
          onChange={(e) => handlePhotoChange(i, e.target.value)}
        />
      ))}
      <button type="button" onClick={addPhoto}>
        Add Photo
      </button> */}
      <div>
        <label>Upload Photos</label>
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

      {formData.photos.map((photo, i) => (
        <div key={i}>
          <img src={photo} alt={`Uploaded ${i}`} width={100} />
          <label>
            <input
              type="radio"
              name="mainImage"
              checked={selectedMainImageIndex === i}
              onChange={() => setSelectedMainImageIndex(i)}
            />
            Set as main image
          </label>
        </div>
      ))}

      <h4>Rooms</h4>
      {formData.rooms.map((room, roomIndex) => (
        <div key={roomIndex}>
          <input
            type="text"
            placeholder="Room Name"
            value={room.room_name}
            onChange={(e) =>
              handleRoomChange(roomIndex, 'room_name', e.target.value)
            }
          />

          {room.roomItems.map((item, itemIndex) => (
            <div key={itemIndex}>
              <input
                type="text"
                placeholder="Room Item"
                value={item}
                onChange={(e) =>
                  handleRoomItemChange(roomIndex, itemIndex, e.target.value)
                }
              />
              <button
                type="button"
                onClick={() => removeRoomItem(roomIndex, itemIndex)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={() => addRoomItem(roomIndex)}>
            Add Room Item
          </button>
        </div>
      ))}
      <button type="button" onClick={addRoom}>
        Add Room
      </button>

      <button type="submit">Submit</button>
    </form>
  );
}

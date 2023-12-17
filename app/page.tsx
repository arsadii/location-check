"use client";

import { useState } from "react";

export default function Home() {
  const [location, setLocation] = useState<any>();

  const handleCheck = () => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
      });
    }, showError);
  };

  function showError(error: any) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("Mohon izinkan akses lokasi anda!");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Informasi lokasi tidak tersedia");
        break;
      case error.TIMEOUT:
        alert("Pengambilan lokasi melebihi batas waktu.");
        break;
      case error.UNKNOWN_ERROR:
        alert("Gagal mengambil informasi lokasi!");
        break;
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(`${location?.lat}, ${location?.lng}`);
    alert("Berhasil disalin!");
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full font-mono text-sm space-y-2">
        <h5 className="font-semibold text-lg">Cek latitude & longitude</h5>
        <p>Latitude : {location?.lat}</p>
        <p>Longitude : {location?.lng}</p>
        <div className="flex gap-2">
          <button
            className="p-2 border border-gray-200"
            onClick={() => handleCheck()}
          >
            Cek
          </button>
          <button
            onClick={() => handleCopy()}
            className="p-2 border border-gray-200"
          >
            Salin
          </button>
        </div>
      </div>
    </main>
  );
}

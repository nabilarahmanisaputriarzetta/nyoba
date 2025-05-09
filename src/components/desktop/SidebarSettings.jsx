import React, { useState, useEffect } from "react";

export default function SidebarSettings({
  onClose,
  onSave,
  initialUsername, // Tambahkan prop untuk username awal
  initialProfilePicture, // Tambahkan prop untuk gambar profil awal
}) {
  const [educationLevel, setEducationLevel] = useState("SMP");
  const [classLevel, setClassLevel] = useState("11");
  const [username, setUsername] = useState(initialUsername);
  const [profilePicture, setProfilePicture] = useState(initialProfilePicture);
  const [isEditing, setIsEditing] = useState(false);

  // Perbarui state lokal ketika props berubah
  useEffect(() => {
    setUsername(initialUsername);
    setProfilePicture(initialProfilePicture);
  }, [initialUsername, initialProfilePicture]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfilePicture(reader.result); // Set gambar yang diunggah sebagai URL base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave(username, profilePicture); // Panggil fungsi onSave untuk menyimpan data
    setIsEditing(false); // Keluar dari mode edit
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-end bg-black bg-opacity-50">
      <div className="w-[300px] h-full bg-blue-900 shadow-lg">
        {/* Close Button */}
        <button
          className="p-2 font-bold text-white"
          onClick={onClose} // Close sidebar
        >
          ✕
        </button>

        <div className="p-4">
          <div className="w-[280px] bg-blue-900 text-white p-6 rounded-lg shadow-xl flex flex-col items-center space-y-4">
            {/* Profile Picture */}
            {isEditing ? (
              <div className="flex flex-col items-center space-y-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePictureChange}
                  className="text-white"
                />
                {profilePicture && (
                  <img
                    src={profilePicture}
                    alt="Preview"
                    className="w-20 h-20 border-2 border-white rounded-full"
                  />
                )}
              </div>
            ) : (
              <img
                src={profilePicture}
                alt="Profile"
                className="w-20 h-20 border-2 border-white rounded-full"
              />
            )}

            {/* Username */}
            <div className="flex items-center justify-between w-full">
              {isEditing ? (
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Edit Username"
                  className="w-full p-2 text-black rounded"
                />
              ) : (
                <span className="text-lg font-semibold">{username}</span>
              )}
              <button
                className={`text-xs bg-white text-blue-900 px-2 py-1 rounded border border-blue-900`}
                onClick={() => setIsEditing(true)} // Hanya untuk masuk ke mode edit
              >
                Edit
              </button>
            </div>

            {/* Email */}
            <p className="text-sm text-center underline break-all">
              CacingPintar97@gmail.com
            </p>

            {/* Dropdown - Jenjang */}
            <div className="w-full">
              <label className="block mb-1 text-sm">Jenjang Pendidikan</label>
              <select
                className="w-full p-2 text-black rounded"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
              >
                <option>SD</option>
                <option>SMP</option>
                <option>SMA</option>
              </select>
            </div>

            {/* Dropdown - Kelas */}
            <div className="w-full">
              <label className="block mb-1 text-sm">Kelas</label>
              <select
                className="w-full p-2 text-black rounded"
                value={classLevel}
                onChange={(e) => setClassLevel(e.target.value)}
              >
                {[7, 8, 9, 10, 11, 12].map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave} // Fungsi untuk menyimpan data
              className="w-full py-2 font-semibold text-blue-900 bg-white rounded hover:bg-gray-100"
            >
              SAVE
            </button>

            {/* Reset Password & Log Out */}
            <div className="flex items-center justify-between w-full pt-4">
              <a href="#" className="text-sm underline">
                Reset Password
              </a>
              <button className="px-4 py-1 text-blue-900 bg-white rounded hover:bg-gray-100">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useNotes } from "../../contexts/NoteContext";

export default function CatatanMobile() {
  const location = useLocation();
  const { className, subject, topic } = location.state || {};

  const { notes } = useNotes();

  const [sidebarOpen, setSidebarOpen] = useState(false); // State to control sidebar
  const [lessons, setLessons] = useState(["Negotiation", "Quantum Physics", "Vector"]); // List of lessons
  const [selectedLesson, setSelectedLesson] = useState(subject || ""); // Selected subject

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddLesson = () => {
    const newLesson = prompt("Enter new lesson name:");
    if (newLesson) {
      setLessons([...lessons, newLesson]);
    }
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setSidebarOpen(false); // Close sidebar after selecting lesson
  };

  // Filter notes by topic, class, and subject
  const filteredNotes = notes.filter(note => {
    const matchTopic = topic ? note.title === topic : true;
    const matchClass = className ? note.content.includes(className) : true;
    const matchSubject = subject ? note.content.includes(subject) : true;
    return matchTopic && matchClass && matchSubject;
  });

  return (
    <div className="relative min-h-screen p-4 bg-gradient-to-b from-blue-500 to-blue-800">
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="absolute top-0 left-0 w-[250px] h-full bg-white shadow-lg z-20 p-4 overflow-y-auto">
          <h2 className="mb-4 text-lg font-bold">Lesson List</h2>
          <ul className="space-y-4">
            {lessons.map((lesson, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-3 bg-gray-100 rounded shadow cursor-pointer hover:bg-gray-200"
              >
                <div
                  className="flex-1"
                  onClick={() => handleSelectLesson(lesson)}
                >
                  <p className="font-semibold text-gray-800">{lesson}</p>
                </div>
                <button className="text-gray-500 hover:text-gray-700">
                  ⋮
                </button>
              </li>
            ))}
          </ul>
          <button
            onClick={handleAddLesson}
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Add Lesson
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between p-2 mb-4 bg-white rounded shadow">
        <button
          className="text-lg font-bold text-gray-800"
          onClick={toggleSidebar}
        >
          ☰
        </button>
        <h1 className="text-lg font-bold text-gray-800">Notes</h1>
        <button className="text-lg font-bold text-gray-800">Enhance</button>
      </div>

      {/* Page 1 */}
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="mb-2 text-sm font-bold">Page 1</h2>
        <p className="mb-1 text-gray-800">Class: {className || "No data"}</p>
        <p className="mb-4 text-gray-800">
          Subject: {selectedLesson || "No data"}
        </p>
        <div className="space-y-4">
          {filteredNotes.length > 0 ? (
            filteredNotes.map((note) => (
              <div key={note.id} className="p-2 border border-gray-300 rounded">
                <h3 className="font-semibold">{note.title}</h3>
                <p>{note.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No notes found for the selected filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

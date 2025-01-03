"use client";

import React, { useState } from "react";
import MeetingForm from "../components/MeetingForm";
import MeetingList from "../components/MeetingList";
import { Meeting } from "../types/Meeting";

export default function MeetingsPage() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [editingMeeting, setEditingMeeting] = useState<Meeting | null>(null);

  // Function to add a new meeting
  const addMeeting = (newMeeting: Omit<Meeting, "id">) => {
    setMeetings((prev) => [
      ...prev,
      { ...newMeeting, id: prev.length + 1 },
    ]);
  };

  // Function to update an existing meeting
  const updateMeeting = (updatedMeeting: Meeting) => {
    setMeetings((prev) =>
      prev.map((meeting) =>
        meeting.id === updatedMeeting.id ? updatedMeeting : meeting
      )
    );
    setEditingMeeting(null); // Clear editing state after saving
  };

  // Function to delete a meeting by ID
  const deleteMeeting = (id: number) => {
    setMeetings((prev) => prev.filter((meeting) => meeting.id !== id));
  };

  return (
    <div className="mt-[100px] space-y-8">
      <section>
        <MeetingForm
          onAddMeeting={addMeeting}
          onEditMeeting={updateMeeting}
          editingMeeting={editingMeeting}
          setEditingMeeting={setEditingMeeting}
        />
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-4">Your Scheduled Meetings</h2>
        <MeetingList
          meetings={meetings}
          onDeleteMeeting={deleteMeeting}
          onEditMeeting={setEditingMeeting}
        />
      </section>
    </div>
  );
}

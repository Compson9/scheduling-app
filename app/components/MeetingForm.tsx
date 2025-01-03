"use client";

import { useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Meeting } from "../types/Meeting" // Use the standardized type

interface MeetingFormProps {
  onAddMeeting: (meeting: Omit<Meeting, "id">) => void;
}

export default function MeetingForm({ onAddMeeting }: MeetingFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    date: null as Date | null,
    time: "",
    duration: "",
    participants: "",
  });
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.date) {
      alert("Please select a date");
      return;
    }

    // Transform local state into the Meeting type
    const newMeeting: Omit<Meeting, "id"> = {
      title: formData.title,
      date: formData.date.toISOString().split("T")[0], // Convert to string
      time: formData.time,
      duration: formData.duration,
      participants: formData.participants.split(",").map((p) => p.trim()), // Split into array
    };

    onAddMeeting(newMeeting); // Pass to parent component

    // Show success message
    setSuccessMessage("Meeting has been successfully scheduled!");

    // Clear form fields
    setFormData({
      title: "",
      date: null,
      time: "",
      duration: "",
      participants: "",
    });

    // Clear success message after 3 seconds
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-[-100px] space-y-4 bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Schedule a Meeting</h3>

      {/* Success Message */}
      {successMessage && (
        <div className="p-4 mb-4 text-green-800 bg-green-100 rounded-lg">
          {successMessage}
        </div>
      )}

      {/* Title Input */}
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Meeting Title"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />

      {/* Date Picker */}
      <div>
        <label className="block mb-2 font-medium text-gray-700">Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !formData.date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {formData.date
                ? format(formData.date, "PPP")
                : "Pick a date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={formData.date || undefined}
              onSelect={(date) => setFormData((prev) => ({ ...prev, date: date || null }))}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {/* Time Input */}
      <input
        type="time"
        name="time"
        value={formData.time}
        onChange={handleInputChange}
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />

      {/* Duration Input */}
      <input
        type="number"
        name="duration"
        value={formData.duration}
        onChange={handleInputChange}
        placeholder="Duration (in minutes)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        required
      />

      {/* Participants Input */}
      <textarea
        name="participants"
        value={formData.participants}
        onChange={handleInputChange}
        placeholder="Participants (comma-separated emails)"
        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
        rows={3}
        required
      ></textarea>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700"
      >
        Schedule Meeting
      </button>
    </form>
  );
}

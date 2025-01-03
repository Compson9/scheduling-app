import { Trash, Edit } from "lucide-react";

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: string;
  participants: string[];
}

interface MeetingListProps {
  meetings: Meeting[];
  onDeleteMeeting: (id: number) => void;
  onEditMeeting: (meeting: Meeting) => void;
}

// Mock data for unavailable slots
const unavailableDates = ["2025-01-05", "2025-01-08"];
const unavailableTimes: { [key: string]: string[] } = {
  "2025-01-06": ["10:00", "15:00"],
};

// Utility functions for availability checks
const isDateUnavailable = (date: string): boolean => {
  return unavailableDates.includes(date);
};

const isTimeUnavailable = (date: string, time: string): boolean => {
  return unavailableTimes[date]?.includes(time) || false;
};

export default function MeetingList({
  meetings,
  onDeleteMeeting,
  onEditMeeting,
}: MeetingListProps) {
  if (meetings.length === 0) {
    return (
      <div className="text-center text-gray-600">
        <p>No meetings scheduled yet. Start by scheduling one above!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {meetings.map((meeting) => {
        const isUnavailable =
          isDateUnavailable(meeting.date) ||
          isTimeUnavailable(meeting.date, meeting.time);

        return (
          <div
            key={meeting.id}
            className="bg-white p-6 shadow-md rounded-lg border border-gray-200 hover:shadow-lg transition-shadow"
          >
            {/* Header with Title, Actions, and Availability Badge */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">
                {meeting.title}
              </h3>
              <div className="flex space-x-2 items-center">
                {isUnavailable && (
                  <span className="px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
                    Unavailable
                  </span>
                )}
                {/* Edit Button */}
                <button
                  onClick={() => onEditMeeting(meeting)}
                  className="text-blue-600 hover:text-blue-800"
                  aria-label="Edit meeting"
                >
                  <Edit className="h-5 w-5" />
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => onDeleteMeeting(meeting.id)}
                  className="text-red-600 hover:text-red-800"
                  aria-label="Delete meeting"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Meeting Details */}
            <div className="text-sm text-gray-600">
              <p>
                <strong>Date:</strong> {meeting.date}
              </p>
              <p>
                <strong>Time:</strong> {meeting.time}
              </p>
              <p>
                <strong>Duration:</strong> {meeting.duration} minutes
              </p>
              <p>
                <strong>Participants:</strong>{" "}
                {meeting.participants.join(", ")}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

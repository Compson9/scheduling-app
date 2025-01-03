import { meetings } from "@/lib/data";
import { NextResponse } from "next/server";

// GET: Fetch all meetings
export const GET = async () => {
  return NextResponse.json(meetings, { status: 200 });
};

// POST: Create a new meeting
export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, date, time, duration, participants } = body;

  if (!title || !date || !time || !duration || !participants) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const newMeeting = {
    id: meetings.length + 1, // Incremental ID
    title,
    date,
    time,
    duration,
    participants,
  };

  meetings.push(newMeeting); // Add to in-memory storage

  return NextResponse.json(newMeeting, { status: 201 });
};

// PUT: Update an existing meeting
export const PUT = async (request: Request) => {
  const body = await request.json();
  const { id, title, date, time, duration, participants } = body;

  if (!id || !title || !date || !time || !duration || !participants) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
  }

  const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);

  if (meetingIndex === -1) {
    return NextResponse.json({ message: "Meeting not found" }, { status: 404 });
  }

  // Update the meeting
  meetings[meetingIndex] = {
    id,
    title,
    date,
    time,
    duration,
    participants,
  };

  return NextResponse.json(meetings[meetingIndex], { status: 200 });
};

// DELETE: Delete a meeting
export const DELETE = async (request: Request) => {
  const url = new URL(request.url);
  const id = parseInt(url.searchParams.get("id") || "");

  if (!id) {
    return NextResponse.json({ message: "Missing meeting ID" }, { status: 400 });
  }

  const meetingIndex = meetings.findIndex((meeting) => meeting.id === id);

  if (meetingIndex === -1) {
    return NextResponse.json({ message: "Meeting not found" }, { status: 404 });
  }

  meetings.splice(meetingIndex, 1); // Remove from array

  return NextResponse.json({ message: "Meeting deleted successfully" }, { status: 200 });
};

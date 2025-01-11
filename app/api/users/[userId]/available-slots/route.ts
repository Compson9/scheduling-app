import { NextResponse } from "next/server";
import { userAvailability } from "@/lib/availability"; 

// GET: Fetch unavailable slots for a user
export const GET = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;

  const user = userAvailability.find((u) => u.userId === userId);
  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  return NextResponse.json(user.unavailableSlots, { status: 200 });
};

// POST: Add unavailable slots for a user
export const POST = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;
  const body = await request.json();
  const { date, timeSlots } = body;

  if (!date || !timeSlots || !Array.isArray(timeSlots)) {
    return NextResponse.json(
      { message: "Missing or invalid date/timeSlots" },
      { status: 400 }
    );
  }

  const user = userAvailability.find((u) => u.userId === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  if (!user.unavailableSlots[date]) {
    user.unavailableSlots[date] = [];
  }

  user.unavailableSlots[date].push(...timeSlots);

  return NextResponse.json(
    { message: "Unavailable slots added successfully" },
    { status: 201 }
  );
};

// DELETE: Remove an unavailable slot for a user
export const DELETE = async (
  request: Request,
  { params }: { params: { userId: string } }
) => {
  const { userId } = params;
  const url = new URL(request.url);
  const date = url.searchParams.get("date");
  const timeSlot = url.searchParams.get("timeSlot");

  if (!date || !timeSlot) {
    return NextResponse.json(
      { message: "Missing date or timeSlot" },
      { status: 400 }
    );
  }

  const user = userAvailability.find((u) => u.userId === userId);

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  const slots = user.unavailableSlots[date];
  if (!slots) {
    return NextResponse.json(
      { message: "No unavailable slots found for the given date" },
      { status: 404 }
    );
  }

  user.unavailableSlots[date] = slots.filter((slot) => slot !== timeSlot);

  return NextResponse.json(
    { message: "Unavailable slot removed successfully" },
    { status: 200 }
  );
};

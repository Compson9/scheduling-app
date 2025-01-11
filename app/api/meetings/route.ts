interface UserAvailability {
  userId: string;
  unavailableSlots: Record<string, string[]>; // { "2025-01-06": ["10:00", "15:00"] }
}

// Mock availability data
export const userAvailability: UserAvailability[] = [
  {
    userId: "1",
    unavailableSlots: {
      "2025-01-06": ["10:00", "15:00"],
      "2025-01-07": ["09:00", "14:00"],
    },
  },
  {
    userId: "2",
    unavailableSlots: {
      "2025-01-06": ["11:00", "16:00"],
    },
  },
];

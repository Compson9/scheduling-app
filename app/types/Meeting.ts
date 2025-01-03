export interface Meeting {
    id: number;
    title: string;
    date: string; // Always a formatted string
    time: string;
    duration: string;
    participants: string[]; // Always an array of emails
  }
  
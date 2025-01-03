interface Meeting {
    id: number;
    title: string;
    date: string;
    time: string;
    duration: string;
    participants: string[];
  }
  
  // Mock database for meetings
  export const meetings: Meeting[] = [];
  
export interface Event {
  id: number;
  cognitoUserId: string;
  title: string;
  location: string;
  image: string;
  description: string;
  date: string;
  sport: string;
  maxAttendees: number;
  createdAt: string;
  lastUpdated: string;
  cancelled: boolean;
}

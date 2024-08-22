import axios from "axios";
import { fetchAuthSession } from "aws-amplify/auth";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const checkAttendance = async (eventId: string, cognitoUserId: string) => {
  const session = await fetchAuthSession();
  const idToken = session?.tokens?.idToken;
  const response = await axios.get<boolean>(
    `${API_BASE_URL}/event_attendees/check/${eventId}/user/${cognitoUserId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

const attendEvent = async (eventId: string) => {
  const session = await fetchAuthSession();
  const token = session?.tokens?.idToken;
  await axios.post(
    `${API_BASE_URL}/event_attendees/${eventId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const withdrawEvent = async (eventId: string) => {
  const session = await fetchAuthSession();
  const token = session?.tokens?.idToken;
  await axios.delete(`${API_BASE_URL}/event_attendees/events/${eventId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const deleteEvent = async (id: number) => {
  const session = await fetchAuthSession();
  const token = session?.tokens?.idToken;
  await axios.delete(`${API_BASE_URL}/events/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const fetchHostedBy = async (cognitoUserId: string) => {
  const session = await fetchAuthSession();
  const idToken = session?.tokens?.idToken;
  const response = await axios.get<boolean>(
    `${API_BASE_URL}/users/username/${cognitoUserId}`,
    {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    }
  );
  return response.data;
};

const fetchSpotsLeft = async (eventId: string, maxAttendees: number) => {
  try {
    const session = await fetchAuthSession();
    const token = session?.tokens?.idToken;

    const response = await axios.get<string[]>(
      `${API_BASE_URL}/event_attendees/events/${eventId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const attendeesCount = response.data.length;
    return maxAttendees - attendeesCount;
  } catch (error) {
    console.error("Error fetching attendees:", error);
  }
};

export {
  checkAttendance,
  attendEvent,
  withdrawEvent,
  deleteEvent,
  fetchHostedBy,
  fetchSpotsLeft,
};

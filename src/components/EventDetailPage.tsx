import React from 'react';

interface EventData {
  id: number;
  title: string;
  location: string;
  description: string;
  user_id: number;
  date: string; 
  image: string;
  max_attendees: number;
  created_at: string;
  last_updated: string; 
  cancelled: boolean;
  attendees: number;

}

interface HostData {
  user_id: number;
  username: string;
  email: string;
  password: string;
  last_updated: string; 
}

const eventData: EventData = {
  id: 1, 
  title: "Underwater Hockey",
  location: "Tyson's Community Pool",
  description: "I watched underwater hockey and thought...I can hold my breath pretty well. Reserved a time at the community pool and watched some YouTube videos. Let's learn together.",
  user_id: 1,
  date: "2024-08-15T18:30:00",
  image: "/underwater_hockey.jpg",
  max_attendees: 20,
  created_at: "2024-08-01T10:00:00Z",
  last_updated: "2024-08-05T15:00:00Z",
  cancelled: false,
  attendees: 14,
};

const hostData: HostData = {
  "user_id": 1,
  "username": "jsmith",
  "email": "jsmith@gmail.com",
  "password": "securepassword123",
  "last_updated": "2024-08-12T10:00:00Z"
}

const EventDetailPage: React.FC = () => {
  const spotsLeft = eventData.max_attendees - eventData.attendees;

    return (
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-5xl"> 
          <h1 className="text-3xl font-bold text-center mb-4">{eventData.title}</h1>
          <a
            href="#"
            className="flex flex-col md:flex-row items-center bg-white border border-gray-200 rounded-lg shadow-lg hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <img
            className="object-cover w-full md:w-1/2 h-96 md:h-auto rounded-t-lg md:rounded-l-lg"
            src={eventData.image}
            alt="Underwater Hockey"
            />
            <div className="flex flex-col justify-between p-6 leading-normal w-full md:w-1/2 text-center">
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              {eventData.location}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{spotsLeft} spots left</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Timing: </b>August 12th @ 6:30pm</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Hosted By: </b>John Smith</p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <b>Description: </b>{eventData.description}
              </p>
              <div className="flex justify-center">
                <a 
                  href="#" 
                  className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Sign up
                  <svg 
                    className="rtl:rotate-180 w-4 h-4 ms-2" 
                    aria-hidden="true" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 14 10"
                  >
                    <path 
                      stroke="currentColor" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth="2" 
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </a>
        </div>
      </div>
    );
  };
  
  export default EventDetailPage;
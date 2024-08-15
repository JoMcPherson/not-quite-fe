import { useParams } from "react-router-dom";

interface MyEventsProps {
    user: any;
    events: Event[];
}

// const MyEventsPage: React.FC<MyEventsProps> = ({ user, events }) => {
//     const { eventId } = useParams<{ eventId: string }>();
//     const selectedEvent = events.find((event) => event.id === parseInt(eventId!));
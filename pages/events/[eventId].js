import { useRouter } from 'next/router';
import { getEventById } from '../../dummy-data';
function EventDetailPage() {
  const router = useRouter();

  const eventId = router.query.eventId;
  const event = getEventById(getEventById);
  if (!event) {
    return <p>No Event Found</p>;
  }

  return (
    <div>
      <h1>Event Detail Page</h1>
    </div>
  );
}

export default EventDetailPage;

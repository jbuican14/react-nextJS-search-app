export async function getAllEvents() {
  try {
    const response = await fetch(
      'https://nextjs-demo-ef578-default-rtdb.firebaseio.com/events.json'
    );
    const data = await response.json();
    let events = [];
    // return obj then loop
    for (const key in data) {
      events.push({
        id: key,
        ...data[key],
      });
    }
    return events;
  } catch (e) {}
}

export async function getFeaturedEvents() {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
}

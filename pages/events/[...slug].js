import { Fragment } from 'react';
s;
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventsSearch from '../../components/events/events-search';
import ResultsTitle from '../../components/events/results-title';

function FilteredEventPage() {
  const router = useRouter();

  const filterData = router.query.slug;
  console.log(filterData);

  if (!filterData) return <p className="center">Loading...</p>;
  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return <p>Invalid filter, please adjust your value</p>;
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return <p>No Events found. </p>;
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export default FilteredEventPage;

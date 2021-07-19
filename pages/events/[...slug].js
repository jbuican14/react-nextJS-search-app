import { Fragment } from 'react';

import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../dummy-data';
import EventsSearch from '../../components/events/events-search';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventPage() {
  const router = useRouter();

  const filterData = router.query.slug;

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
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>
            <p>Invalid filter, please adjust your value</p>;
          </ErrorAlert>
          <Button link="/events">Show All Events </Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth });
  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <div className="center">
          <ErrorAlert>
            <p>No Events found. </p>
          </ErrorAlert>

          <Button link="/events">Show All Events </Button>
        </div>
      </Fragment>
    );
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

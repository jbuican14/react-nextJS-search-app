import { useRouter } from 'next/router';

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

  return (
    <div>
      <h1>Filtered Events page</h1>
    </div>
  );
}

export default FilteredEventPage;

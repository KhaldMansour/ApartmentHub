import Link from 'next/link';


export default function Home() {
  return (
    <div>
      <h1>Welcome to ApartmentHub App</h1>
      <Link href="/apartments">
        Go to Apartment Listings
      </Link>
    </div>
  );
}

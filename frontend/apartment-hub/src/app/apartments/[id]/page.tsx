'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Apartment {
  id: string;
  name: string;
  project: string;
  number: number;
  price: number;
}

export default function ApartmentDetailsPage() {
  const params = useParams(); 
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartmentDetails = async () => {
      if (params.id) {
        try {
          const response = await fetch(`http://localhost:4000/api/v1/apartments/${params.id}`);
          const data = await response.json();
          if (response.ok && data) {
            const apartment = data.data;
            setApartment(apartment);
          } else {
            setApartment(null);
          }
        } catch (error) {
          console.error('Error fetching apartment details:', error);
          setApartment(null);
        }
      }
      setLoading(false);
    };

    fetchApartmentDetails();
  }, [params.id]); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!apartment) {
    return <div>Apartment not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Link href="/apartments">
          <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
            Back to Apartments
          </button>
        </Link>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <h1 className="text-3xl font-semibold text-gray-800 mb-4">{apartment.name}</h1>
        <p className="text-gray-700 mb-2">Project: {apartment.project}</p>
        <p className="text-gray-700 mb-2">Unit Number: {apartment.number}</p>
        <p className="text-lg font-bold text-green-600 mb-4">Price: ${apartment.price}</p>
      </div>
    </div>
  );
}

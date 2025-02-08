'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Apartment {
  id: string;
  name: string;
  project: string;
  number: number;
  price: number;
}

export default function ApartmentPage() {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [searchName, setSearchName] = useState<string>('');
  const [searchPrice, setSearchPrice] = useState<number | string>('');
  const [searchProject, setSearchProject] = useState<string>('');

  useEffect(() => {
    const fetchApartments = async () => {
      console.log(`Fetching apartments for page ${currentPage} and ${itemsPerPage} items per page`);

      let query = `?page=${currentPage}&take=${itemsPerPage}`;

      if (searchName) {
        query += `&name=${searchName}`;
      }

      if (searchPrice) {
        query += `&price=${searchPrice}`;
      }

      if (searchProject) {
        query += `&project=${searchProject}`;
      }

      try {
        const response = await fetch(`http://localhost:4000/api/v1/apartments${query}`);

        if (!response.ok) {
          throw new Error('Failed to fetch apartments');
        }

        const data = await response.json();
        const apartments = data.data.apartments;
        const total = Math.ceil(data.data.total / itemsPerPage);

        setApartments(apartments);
        setTotalPages(total);
      } catch (err) {
        setError('Failed to fetch apartments');
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, [currentPage, itemsPerPage, searchName, searchPrice, searchProject]);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'name' | 'price' | 'project'
  ) => {
    const value = e.target.value;
    if (field === 'name') setSearchName(value);
    else if (field === 'price') setSearchPrice(value);
    else if (field === 'project') setSearchProject(value);
    setCurrentPage(1);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">ApartmentHub</h1>

      <div className="mb-8 flex justify-center space-x-4">
        <input
          type="text"
          value={searchName}
          onChange={(e) => handleSearchChange(e, 'name')}
          placeholder="Search by name"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={searchPrice}
          onChange={(e) => handleSearchChange(e, 'price')}
          placeholder="Search by price"
          className="p-2 border rounded-lg"
        />
        <input
          type="text"
          value={searchProject}
          onChange={(e) => handleSearchChange(e, 'project')}
          placeholder="Search by project"
          className="p-2 border rounded-lg"
        />
      </div>

      {/* Items per Page Dropdown */}
      <div className="mb-8 flex justify-center space-x-4">
        <span className="text-gray-700">Items per page:</span>
        <select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          className="p-2 border rounded-lg"
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="15">15</option>
          <option value="20">20</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <div
            key={apartment.id}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{apartment.name}</h2>
            <p className="text-gray-700 mb-2">Project: {apartment.project}</p>
            <p className="text-gray-700 mb-2">Unit Number: {apartment.number}</p>
            <p className="text-lg font-bold text-green-600 mb-4">Price: ${apartment.price.toLocaleString()}</p>
            <Link href={`/apartments/${apartment.id}`} passHref>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                View Details
              </button>
            </Link>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg mr-2 disabled:bg-gray-400"
        >
          Previous
        </button>

        <span className="px-4 py-2 text-lg text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg ml-2 disabled:bg-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
}

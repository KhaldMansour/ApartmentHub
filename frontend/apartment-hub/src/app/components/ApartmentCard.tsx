// src/components/ApartmentCard.tsx
import React from 'react';
import Link from 'next/link';

interface ApartmentCardProps {
  apartment: {
    id: number;
    name: string;
    project: string;
    number: number;
    price: number;
  };
}

const ApartmentCard: React.FC<ApartmentCardProps> = ({ apartment }) => {
  return (
    <div className="apartment-card">
      <h2>{apartment.name}</h2>
      <p>Project: {apartment.project}</p>
      <p>Unit Number: {apartment.number}</p>
      <p>Price: ${apartment.price}</p>
      <Link href={`/apartments/${apartment.id}`}>
        <a>View Details</a>
      </Link>
    </div>
  );
};

export default ApartmentCard;

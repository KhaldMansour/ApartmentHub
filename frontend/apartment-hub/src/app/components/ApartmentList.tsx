// src/components/ApartmentList.tsx
import React from 'react';
import ApartmentCard from './ApartmentCard';

interface Apartment {
  id: number;
  name: string;
  project: string;
  number: number;
  price: number;
}

interface ApartmentListProps {
  apartments: Apartment[];
}

const ApartmentList: React.FC<ApartmentListProps> = ({ apartments }) => {
  return (
    <div className="apartment-list">
      {apartments.map((apartment) => (
        <ApartmentCard key={apartment.id} apartment={apartment} />
      ))}
    </div>
  );
};

export default ApartmentList;

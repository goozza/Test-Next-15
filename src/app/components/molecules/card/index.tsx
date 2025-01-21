// components/molecules/Card.tsx
"use client";
import React from "react";
import Button from "../../atoms/button";

type CardProps = {
  title: string;
  description: string;
  id: number;
};

const Card: React.FC<CardProps> = ({ title, id }) => {
  const handleAction = () => {
    alert(id);
  };
  return (
    <div className="border p-4 rounded shadow">
      <h3>{id}</h3>
      <p>{title}</p>
      <Button
        onClick={handleAction}
        label="Action"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Action
      </Button>
    </div>
  );
};

export default Card;

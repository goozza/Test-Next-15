// components/molecules/Card.tsx
"use client";

import React from "react";
import Button from "../atoms/Button";

type CardProps = {
  title: string;
  description: string;
  onAction?: () => void;
};

const Card: React.FC<CardProps> = ({ title, description, onAction }) => {
  return (
    <div className="border p-4 rounded shadow">
      <h3>{title}</h3>
      <p>{description}</p>
      <Button
        onClick={onAction}
        label="Action"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Action
      </Button>
    </div>
  );
};

export default Card;

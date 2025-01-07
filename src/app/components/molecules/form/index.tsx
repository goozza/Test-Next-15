"use client";

import { loginIamAction } from "@/app/utils/login/action";
import React, { useState } from "react";

const Form: React.FC = () => {
  const [status, setStatus] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await loginIamAction(formData);
    setStatus(result);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        action={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-lg font-bold mb-4">Login</h2>

        {status && (
          <p
            className={`mb-4 ${
              status.success ? "text-green-500" : "text-red-500"
            }`}
          >
            {status.message}
          </p>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email:
          </label>
          <input
            id="username"
            name="username"
            className="border w-full p-2 rounded"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="border w-full p-2 rounded"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Form;

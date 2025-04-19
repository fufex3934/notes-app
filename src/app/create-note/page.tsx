"use client";

import Link from "next/link";
import { createNote } from "../lib/actions";
import { useState } from "react";

type Errors = {
  title: string;
  description: string;
  general?: string;
};

const initialState: Errors = {
  title: "",
  description: "",
};

const CreateNote = () => {
  const [state, setState] = useState<Errors>(initialState);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await createNote(new FormData(e.target as HTMLFormElement));

    if (result.errors) {
      setState((prevState) => ({
        ...prevState,
        ...result.errors,
      }));
    } else {
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">New Note</h1>

      <input
        className="w-full border p-2 rounded"
        type="text"
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      {state.title && <p className="text-red-500">{state.title}</p>}

      <textarea
        className="w-full border p-2 rounded"
        rows={5}
        name="description"
        placeholder="Note Content"
        value={formData.description}
        onChange={handleInputChange}
      />
      {state.description && <p className="text-red-500">{state.description}</p>}

      {state.general && <p className="text-red-500">{state.general}</p>}

      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
        <Link href="/" className="bg-red-500 text-white px-4 py-2 ml-2 rounded">
          Cancel
        </Link>
      </div>
    </form>
  );
};

export default CreateNote;

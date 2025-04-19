import Link from "next/link";
import { createNote } from "../lib/actions";
const CreateNote = () => {
  return (
    <>
      <form action={createNote} className="max-w-xl mx-auto p-4 space-y-4">
        <h1 className="text-2xl font-bold">New Note</h1>

        <input 
        className="w-full border p-2 rounded"
        type="text" name="title" placeholder="Title" />

        <textarea
         className="w-full border p-2 rounded"
         rows={5} name="description" placeholder="Note Content" />
        <div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          <Link href={"/"} className="bg-red-500 text-white px-4 py-3 ml-1 rounded">Cancel</Link>
        </div>
      </form>
    </>
  );
};

export default CreateNote;

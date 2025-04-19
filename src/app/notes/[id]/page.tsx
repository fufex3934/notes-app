import { connectToDB } from "@/dbConfig/db"
import Note from "@/models/Note"
import { updateNote } from "@/app/lib/actions"
import mongoose from "mongoose"

export  type NoteType = {
  _id: string | mongoose.Types.ObjectId
  title: string
  description: string
}

export default async function EditNotePage({
  params,
}: {
  params:Promise< { id: string }>
}) {
    const { id } = await params

  await connectToDB()
  const note = (await Note.findById(id).lean()) as NoteType | null

  if (!note) {
    return (
      <div className="text-center text-red-500 mt-10">
        Note not found
      </div>
    )
  }

  return (
    <form action={updateNote} className="max-w-md mx-auto space-y-4 p-4">
      <input type="hidden" name="id" value={note._id.toString()} />
      <h1 className="text-xl font-bold">Edit Note</h1>

      <input
        name="title"
        defaultValue={note.title}
        className="w-full p-2 border rounded"
        placeholder="Title"
      />
      <textarea
        name="description"
        defaultValue={note.description}
        className="w-full p-2 border rounded"
        placeholder="Content"
        rows={5}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        type="submit"
      >
        Update
      </button>
    </form>
  )
}

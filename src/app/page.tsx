import { connectToDB } from '@/dbConfig/db'
import Note from '@/models/Note'
import Link from 'next/link'
import { deleteNote } from './lib/actions'

export default async function NotesPage() {
  await connectToDB()
  const notes = await Note.find().lean()

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Notes</h1>
      <Link href="/create-note" className="bg-blue-500 text-white px-4 py-2 rounded">+ New Note</Link>

      <div className="mt-6 space-y-4">
        {notes.map((note: any) => {
          const id = note._id.toString()
          return (
            <div key={id} className="border p-4 rounded shadow-sm">
              <h2 className="font-semibold">{note.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{note.description}</p>

              <div className="flex gap-3">
                <Link href={`/notes/${id}`} className="text-blue-600">Edit</Link>
                <form action={deleteNote} >
                  <input type="hidden" name="id" value={id} />
                  <button className="text-red-500" type="submit">Delete</button>
                </form>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

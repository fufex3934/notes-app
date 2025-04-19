'use server'

import { connectToDB } from "@/dbConfig/db";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createNote(formData:FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if(!title || !description){
        throw new Error("Missing fields")
    }
    
    await connectToDB();
    await Note.create({title,description});

    revalidatePath('/');
    redirect('/')
}
export async function deleteNote(formData: FormData) {
    const id = formData.get('id') as string
    if (!id) return
    await connectToDB()
    await Note.findByIdAndDelete(id)
    revalidatePath('/')
  }
  
  export async function updateNote(formData: FormData) {
    const id = formData.get('id') as string
    const title = formData.get('title') as string
    const content = formData.get('description') as string
    if (!id || !title || !content) return
    await connectToDB()
    await Note.findByIdAndUpdate(id, { title, content })
    revalidatePath('/')
    redirect('/')
}
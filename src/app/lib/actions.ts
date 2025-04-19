'use server'

import { connectToDB } from "@/dbConfig/db";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";
export async function createNote(formData:FormData) {
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    if(!title || !description){
        throw new Error("Missing fields")
    }
    
    await connectToDB();
    await Note.create({title,description});

    revalidatePath('/');
}
"use server";

import { connectToDB } from "@/dbConfig/db";
import Note from "@/models/Note";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
export async function createNote(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const errors = {
    title: "",
    description: "",
  };

  if (!title) {
    errors.title = "Title is required.";
  }

  if (!description) {
    errors.description = "Description is required.";
  }

  if (errors.title || errors.description) {
    return { errors };
  }

  try {
    await connectToDB();
    await Note.create({ title, description });

    revalidatePath("/");
    redirect("/");

    return {};
  } catch (error) {
    return { errors: { general: "Something went wrong. Please try again." } };
  }
}

export async function deleteNote(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) return;
  await connectToDB();
  await Note.findByIdAndDelete(id);
  revalidatePath("/");
}

export async function updateNote(formData: FormData) {
  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("description") as string;
  if (!id || !title || !content) return;
  await connectToDB();
  await Note.findByIdAndUpdate(id, { title, content });
  revalidatePath("/");
  redirect("/");
}

'use server';
import { redirect } from "next/navigation";
import { saveBook } from './book';
import { revalidatePath } from "next/cache";

function isInvalidText(text: string | null | undefined) {
   return !text || text.trim()  === ''
}

export async function Search(prevState: {message: string}, formData: FormData) {

   const bookSearchInput = {
      name: formData.get('bookName') as string,
   }

   if (isInvalidText(bookSearchInput.name) ) {
      
      return {
         message: 'Invalid input.'
      }
   }
   await saveBook(bookSearchInput); // Save search or book data
   revalidatePath('/catalogue', 'layout');
   redirect('/catalogue'); // Go to results page
}
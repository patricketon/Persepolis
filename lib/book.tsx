import slugify from 'slugify';
import xss from 'xss';

export function searchBook(bookSearchInput: {name: string, slug?: string}) {
    bookSearchInput.slug = slugify(bookSearchInput.name, {lower: true});
    bookSearchInput.name = xss(bookSearchInput.name);
}

export function saveBook(bookData) {
    console.log('SavingBook: ', bookData)
}
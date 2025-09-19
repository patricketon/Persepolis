'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';


export default function Search({placeholder, className}: {placeholder: string; className?: string}) {
    const searchParams = useSearchParams();
    const { replace } = useRouter();
    const pathname = usePathname();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        const q = term.trim();

        if (q) {
        params.set('query', q);
        } else {
        params.delete('query');
        }
        replace(`/searchPage?${params.toString()}`);
    }

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <label htmlFor="search" className="sr-only">
                Search authors, genres, books
            </label>
            <form onSubmit={(e)=> {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                handleSearch(formData.get('search') as string);
            }}>
                <input
                    name="search"
                    className={className}
                    placeholder={placeholder}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                
                <button
                    type="submit"
                    className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                </button>
            </form>
        </div>
    )
}

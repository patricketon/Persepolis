// 'use client'

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { useSearchParams, usePathname, useRouter } from 'next/navigation';


// export default function Search({placeholder, className}: {placeholder: string; className?: string}) {
//     //Gives current URL's query
//     const searchParams = useSearchParams();

//     //Function that  can changes the URL without reloading page/adding entry to browser history
//     const { replace } = useRouter();

//     //Returns string of current route/URL path
//     const pathname = usePathname();

// //     function handleSearch(term: string) {
// //         const params = new URLSearchParams(searchParams);
// //         const q = term.trim();

// //         if (q) {
// //         params.set('query', q);
// //         } else {
// //         params.delete('query');
// //         } 
// //         replace(`/searchPage?${params.toString()}`);
// //     }

// //     return (
// //         <div className="relative flex flex-1 flex-shrink-0">
// //             <label htmlFor="search" className="sr-only">
// //                 Search authors, genres, books
// //             </label>
// //             <form onSubmit={(e) => {
// //                 e.preventDefault();
// //                 const formData = new FormData(e.target as HTMLFormElement);
// //                 handleSearch(formData.get('search') as string);
// //             }}>
// //                 <input
// //                     name="search"
// //                     className={className}
// //                     placeholder={placeholder}
// //                     defaultValue={searchParams.get('query')?.toString()}
// //                 />
                
// //                 <button
// //                     type="submit"
// //                     className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2">
// //                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
// //                 </button>
// //             </form>
// //         </div>
// //     )
// // }



// // 'use client'

// // import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// // import { useSearchParams, usePathname, useRouter } from 'next/navigation';

// // export default function Search({placeholder, className}: {placeholder: string; className?: string}) {
// //     const searchParams = useSearchParams();
// //     const { replace } = useRouter();
// //     const pathname = usePathname();

// //     function handleSearch(term: string) {
// //         console.log('handleSearch called, routing to /searchPage');
// //         const params = new URLSearchParams(searchParams);
// //         const q = term.trim();

// //         if (q) {
// //             params.set('query', q);
// //         } else {
// //             params.delete('query');
// //         } 
// //         replace(`/searchPage?${params.toString()}`);
// //     }

// //     return (
// //         <div className="relative flex flex-1 flex-shrink-0">
// //             <label htmlFor="search" className="sr-only">
// //                 Search authors, genres, books
// //             </label>
// //             <form onSubmit={(e) => {
// //                 e.preventDefault();
// //                 const formData = new FormData(e.target as HTMLFormElement);
// //                 handleSearch(formData.get('search') as string);
// //             }}>
// //                 <input
// //                     name="search"
// //                     className={className}
// //                     placeholder={placeholder}
// //                     defaultValue={searchParams.get('query')?.toString()}
// //                 />
                
// //                 <button
// //                     type="submit"
// //                     className="absolute right-8 top-1/2 transform -translate-y-1/2 p-2">
// //                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
// //                 </button>
// //             </form>
// //         </div>
// //     )
// // }


// 'use client'

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
// import { useSearchParams, useRouter } from 'next/navigation';

// export default function Search({placeholder, className}: {placeholder: string; className?: string}) {
//     const searchParams = useSearchParams();
//     const { replace } = useRouter();

//     function handleSearch(term: string) {
//         const params = new URLSearchParams(searchParams);
//         const q = term.trim();

//         if (q) {
//             params.set('query', q);
//         } else {
//             params.delete('query');
//         } 
//         replace(`/searchPage?${params.toString()}`);
//     }

//     return (
//         <form 
//             onSubmit={(e) => {
//                 e.preventDefault();
//                 const formData = new FormData(e.target as HTMLFormElement);
//                 handleSearch(formData.get('search') as string);
//             }}
//             className="relative"
//         >
//             <input
//                 name="search"
//                 className={className}
//                 placeholder={placeholder}
//                 defaultValue={searchParams.get('query')?.toString()}
//             />
//             <button
//                 type="submit"
//                 className="absolute right-6 top-1/2 -translate-y-1/2"
//             >
//                 <MagnifyingGlassIcon className="h-7 w-7 text-white/50 hover:text-black/80 transition" />
//             </button>
//         </form>
//     )
// }

'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, useRouter } from 'next/navigation'

export default function Search({
  placeholder,
  className,
  iconColor = 'white',
}: {
  placeholder: string
  className?: string
  iconColor?: 'white' | 'black'
}) {
  const searchParams = useSearchParams()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams)
    const q = term.trim()

    if (q) params.set('query', q)
    else params.delete('query')

    replace(`/searchPage?${params.toString()}`)
  }

  const iconClass =
    iconColor === 'black'
      ? 'text-black/60 hover:text-black'
      : 'text-white/50 hover:text-black/80'

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement)
        handleSearch(formData.get('search') as string)
      }}
      className="relative"
    >
      <input
        name="search"
        className={className}
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <button
        type="submit"
        className="absolute right-6 top-1/2 -translate-y-1/2"
      >
        <MagnifyingGlassIcon className={`h-7 w-7 transition ${iconClass}`} />
      </button>
    </form>
  )
}

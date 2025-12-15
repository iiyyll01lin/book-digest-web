import Link from 'next/link';
import Image from 'next/image';
import { getTranslations, getLocale } from 'next-intl/server';
import { getBooksSync, getLocalizedBook } from '@/lib/books';

export default async function BooksPage() {
  const t = await getTranslations('books');
  const locale = await getLocale();

  const data = getBooksSync().map(b => getLocalizedBook(b, locale));
  return (
    <section className="bg-brand-navy text-white">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold tracking-wide">{t('title')}</h1>
        <p className="text-white/80 mt-2">Past reads from our book club.</p>

        <ul className="mt-8 grid gap-x-6 gap-y-10 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
          {data.map((b) => (
            <li key={b.id} className="group">
              <Link href={`/books/${b.slug}`} className="block">
                <div className="relative aspect-[7/10] bg-white rounded-lg shadow-xl overflow-hidden">
                  <Image
                    src={b.coverUrl || '/images/placeholder-cover.svg'}
                    alt={b.displayTitle}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                    className="object-cover"
                  />
                  {/* Hover overlay with book summary */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 md:p-4">
                    <h3 className="text-white text-sm md:text-base font-semibold leading-tight line-clamp-2">
                      {b.displayTitle}
                    </h3>
                    <p className="text-white/70 text-xs md:text-sm mt-1">
                      {b.author}
                    </p>
                    {b.displaySummary && (
                      <p className="text-white/80 text-xs mt-2 line-clamp-3 leading-relaxed">
                        {b.displaySummary}
                      </p>
                    )}
                  </div>
                </div>
                <div className="mt-3 text-sm group-hover:opacity-50 transition-opacity">
                  <div className="font-semibold line-clamp-2 tracking-wide">{b.displayTitle}</div>
                  <div className="text-white/70 mt-1">{b.author}</div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

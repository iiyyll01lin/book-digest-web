import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Suspense, cache } from 'react';
import dynamic from 'next/dynamic';
import { getTranslations } from 'next-intl/server';
import { getBooksSync, getLocalizedBook, getBookBySlugSync } from '@/lib/books';
import { BLUR_BOOK_COVER_LARGE } from '@/lib/constants';
import { locales, setRequestLocale } from '@/lib/i18n';

// Cache book data query (using index lookup, O(1) complexity)
const getBookBySlug = cache((slug: string) => {
  return getBookBySlugSync(slug);
});

const getAllBooks = cache(() => getBooksSync());

// Dynamically load sidebar (non-critical above-the-fold content)
const BookArticleSidebar = dynamic(() => import('@/components/BookArticleSidebar'), {
  loading: () => (
    <div className="space-y-6">
      <div className="animate-pulse bg-gray-200 rounded-2xl h-40" />
      <div className="animate-pulse bg-gray-200 rounded-2xl h-48" />
      <div className="animate-pulse bg-gray-200 rounded-2xl h-32" />
    </div>
  ),
});

// Generate static paths for all books and locales (SSG optimization)
export async function generateStaticParams() {
  const books = getAllBooks();
  return books.flatMap((book) => 
    locales.map((locale) => ({
      locale,
      slug: book.slug,
    }))
  );
}

// Generate Metadata (SEO optimization)
export async function generateMetadata({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const rawBook = getBookBySlug(slug);
  
  if (!rawBook) {
    return { title: 'Book Not Found' };
  }
  
  const book = getLocalizedBook(rawBook, locale);
  
  return {
    title: `${book.displayTitle} | Book Digest`,
    description: book.displaySummary?.slice(0, 160) || `Read our notes on ${book.displayTitle} by ${book.author}`,
    openGraph: {
      title: book.displayTitle,
      description: book.displaySummary?.slice(0, 160),
      images: book.coverUrl ? [{ url: book.coverUrl }] : [],
    },
  };
}

export default async function BookArticlePage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  // Get params first
  const { slug, locale } = await params;
  
  // Enable static rendering BEFORE any getTranslations call
  setRequestLocale(locale);

  // Now safe to use getTranslations
  const t = await getTranslations('books');

  const allBooks = getAllBooks();
  const rawBook = getBookBySlug(slug);
  if (!rawBook) return notFound();
  
  const book = getLocalizedBook(rawBook, locale);

  // Get other articles for sidebar (exclude current)
  const otherArticles = allBooks
    .filter((b) => b.slug !== slug)
    .slice(0, 5)
    .map((b) => ({ 
      slug: b.slug, 
      title: locale === 'en' && b.titleEn ? b.titleEn : b.title 
    }));

  return (
    <article className="bg-gradient-to-b from-white to-gray-50/50 min-h-screen">
      {/* Hero Section */}
      <header className="relative bg-gradient-to-b from-brand-navy to-brand-blue">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-12 pb-24 md:pt-16 md:pb-32">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Book Cover - Optimized image loading */}
            <div className="flex-shrink-0">
              <div className="relative w-48 md:w-56 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/20">
                <Image
                  src={book.coverUrl || '/images/placeholder-cover.svg'}
                  alt={book.title}
                  fill
                  sizes="(max-width: 768px) 192px, 224px"
                  className="object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL={BLUR_BOOK_COVER_LARGE}
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="text-center md:text-left text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {book.displayTitle}
              </h1>
              <p className="mt-3 text-lg md:text-xl text-white/80">
                by {book.author}
              </p>
              {book.tags && book.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
                  {book.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block px-3 py-1 text-sm bg-white/10 rounded-full text-white/90"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
              {book.readDate && (
                <p className="mt-4 text-sm text-white/60">
                  {t('bookClubDate')}{new Date(book.readDate).toLocaleDateString(locale === 'en' ? 'en-US' : 'zh-TW', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Decorative wave - soft pink gradient for visual separation */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <svg viewBox="0 0 1440 60" className="w-full h-10 md:h-14" preserveAspectRatio="none">
              <defs>
                <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FFA6C3" stopOpacity="0.15" />
                  <stop offset="50%" stopColor="#FFFFFF" stopOpacity="1" />
                  <stop offset="100%" stopColor="#113A7A" stopOpacity="0.1" />
                </linearGradient>
              </defs>
              <path fill="url(#waveGradient)" d="M0,30 C360,60 720,0 1080,30 C1260,45 1380,40 1440,30 L1440,60 L0,60 Z" />
            </svg>
          </div>
        </div>
      </header>

      {/* Main Content - with frosted glass card effect */}
      <div className="mx-auto max-w-6xl py-12 px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-100/50 p-6 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Content */}
            <main className="lg:col-span-2 space-y-8">
              {/* Summary Section - Pink theme */}
              <section className="bg-brand-pink/25 rounded-xl p-6 border-l-4 border-brand-pink">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 {t('summary')}</h2>
                <p className="text-gray-700 leading-relaxed text-lg">
                  {book.displaySummary || (locale === 'en' ? 'This book offers profound insights and inspiration...' : '這本書帶給我們許多深刻的思考與啟發...')}
                </p>
              </section>

              {/* Reading Notes Placeholder - Yellow theme */}
              <section className="bg-brand-yellow/15 rounded-xl p-6 border-l-4 border-brand-yellow">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">✍️ {t('readingNotes')}</h2>
                <p className="text-gray-600 italic">
                  {t('notesComingSoon')}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {t('notesNotice')}
                </p>
                <Link
                  href="/events"
                  className="inline-flex items-center mt-4 px-4 py-2 bg-brand-pink text-brand-navy font-semibold rounded-full hover:brightness-110 transition-all"
                  prefetch={false}
                >
                  {t('register')}
                </Link>
              </section>

              {/* Discussion Points - Blue theme */}
              <section className="bg-brand-blue/10 rounded-xl p-6 border-l-4 border-brand-blue">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">💬 {t('discussionPoints')}</h2>
                <ul className="space-y-3">
                  {([1, 2, 3] as const).map((num) => (
                    <li key={num} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue/20 text-brand-navy flex items-center justify-center text-sm font-bold">
                        {num}
                      </span>
                      <span className="text-gray-700">{t(`question${num}`)}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* External Links - Navy theme */}
              {book.links && (
                <section className="bg-brand-navy/5 rounded-xl p-6 border-l-4 border-brand-navy">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">🔗 {t('relatedLinks')}</h2>
                  <div className="flex flex-wrap gap-3">
                    {book.links.publisher && (
                      <a
                        href={book.links.publisher}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-brand-navy/10 rounded-full text-gray-700 transition-colors border border-brand-navy/20"
                      >
                        📚 {t('buyBook')}
                      </a>
                    )}
                    {book.links.notes && (
                      <a
                        href={book.links.notes}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-brand-navy/10 rounded-full text-gray-700 transition-colors border border-brand-navy/20"
                      >
                        📝 {t('fullNotes')}
                      </a>
                    )}
                  </div>
                </section>
              )}

              {/* Back to Books */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <Link
                  href="/books"
                  className="inline-flex items-center gap-2 text-brand-navy hover:text-brand-pink transition-colors"
                  prefetch={false}
                >
                  ← {t('backToBooks')}
                </Link>
              </div>
            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24">
                <Suspense fallback={
                  <div className="space-y-6">
                    <div className="animate-pulse bg-gray-200 rounded-2xl h-40" />
                    <div className="animate-pulse bg-gray-200 rounded-2xl h-48" />
                  </div>
                }>
                  <BookArticleSidebar articles={otherArticles} />
                </Suspense>
              </div>
            </aside>
        </div>
        </div>
      </div>
    </article>
  );
}

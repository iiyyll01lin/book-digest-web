// filepath: /mnt/d/workspace/book-digest-web/components/BookWall.tsx
"use client";
import Link from 'next/link';

// A curated wall of book covers from public/images/books
// These filenames come from docs/ui/Books and were copied to public/images/books
const covers = [
  '1_為什麼要睡覺.jpg',
  '2_性謊言柏金包.webp',
  '3_隱私危機.png',
  '4_阿德勒心理學講義.jpg',
  '5_致富心態.jpg',
  '6_科學詭案調查局.png',
  '7_民主的思辨.png',
  '8_安靜就是力量.jpg',
  '9_喝個爛醉 因為我們是人類.png',
  '10_CIA洗腦計畫.jpg',
  '11_莫斯科紳士.png',
  '12_反脆弱.png',
  '13_愛為何使生物滅絕.jpg',
  '14_借殼上市.jpg',
  '15_阿共打來怎麼辦.png',
  '16_25座二戰紀念碑教我們的事.jpg',
  '17_沒有女人的男人們.jpg',
  '18_印度人為什麼天天吃咖哩.jpg',
  '19_為什麼要拋棄我.png',
  '20_真相製造.jpg',
  '21_少但是更好.png',
  '22_the invisible life of addie larue.jpg',
  '23_柏拉圖與鴨嘴獸一塊上酒吧.jpg',
  '24_有毒的男子氣概.png',
  '25_彼岸花盛開之島.png',
  '26_情色美術史.png',
  '27_感情這件事.jpg',
  '28_如果我們無法以光速前進.jpg',
  '29_呼吸.png',
  '30_一月的一萬道門.jpg',
  '31_公民不盲從.webp',
  '32_送禮的藝術.jpg',
  '33_荷蘭不唬爛.jpg',
  '34_我們都無法成為大人.jpg',
  '35_島國毒癮紀事.jpg',
  '36_環保一年不會死.png',
  '37_365個初心體驗的一年.jpg',
  '38_三體.png',
  '38_三體2.png',
  '38_三體3.jpg',
  '39_思考不過是一場即興演出.jpg',
  '40_迷宮中的盲眼蚯蚓.jpg',
  '41_二戰啟示錄.png',
];

export default function BookWall() {
  // Show a subset on small screens and more on large
  const visible = covers.slice(0, 20);
  const more = covers.slice(20, 40);
  return (
    <section aria-labelledby="books-wall-heading" className="bg-brand-navy">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 id="books-wall-heading" className="text-2xl md:text-3xl font-bold tracking-wide text-white">Recent Reads</h2>
          <Link href="/books" className="text-sm font-semibold text-brand-pink hover:underline">View all</Link>
        </div>

        <ul className="mt-6 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
          {visible.map((name) => (
            <li key={name} className="group">
              <div className="aspect-[7/10] overflow-hidden rounded-xl md:rounded-2xl bg-white shadow ring-1 ring-black/5">
                <img
                  src={`/images/books/${encodeURIComponent(name)}`}
                  alt="Book cover"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-4 hidden md:grid grid-cols-6 lg:grid-cols-8 gap-4">
          {more.map((name) => (
            <li key={name} className="group">
              <div className="aspect-[7/10] overflow-hidden rounded-2xl bg-white shadow ring-1 ring-black/5">
                <img
                  src={`/images/books/${encodeURIComponent(name)}`}
                  alt="Book cover"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 text-center md:hidden">
          <Link href="/books" className="inline-flex items-center rounded-full bg-brand-pink px-5 py-2.5 font-semibold text-brand-navy">Browse Books</Link>
        </div>
      </div>
    </section>
  );
}

export type Book = {
  id: string | number;
  slug: string;
  title: string;
  titleEn?: string;
  author: string;
  coverUrl?: string;
  readDate?: string;
  summary?: string;
  summaryEn?: string;
  tags?: string[];
  links?: {
    publisher?: string;
    notes?: string;
  };
};

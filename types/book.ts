export type Book = {
  id: string | number;
  slug: string;
  title: string;
  author: string;
  coverUrl?: string;
  readDate?: string;
  summary?: string;
  tags?: string[];
  links?: {
    publisher?: string;
    notes?: string;
  };
};

export type BlogsType = {
  id: string;
  name: string;
  youtubeUrl: string;
  createdAt: string
};

export type BlogsExtendedType = {
  pagesCount: number;
  page: number;
  pageSize: number;
  totalCount: number;
  items: [BlogsType | BlogsType[]];
};
export const PER_PAGE = 10;

export const numberOfPages = (entries: number) => {
  return Math.ceil(entries / PER_PAGE);
};

export const pageStartIndex = (currentPage: number) => {
  return PER_PAGE * (currentPage - 1);
};

import {
    MdOutlineArrowBackIos,
    MdOutlineArrowForwardIos,
  } from "react-icons/md";
  import ReactPaginate from "react-paginate";
  
  interface PaginationProps {
    pageCount: number;
    currentPageNumber: number; // 1-indexed
    handlePagination: (selectedItem: { selected: number }) => void; 
  }
  
  const Pagination: React.FC<PaginationProps> = ({
    pageCount,
    currentPageNumber,
    handlePagination,
  }) => {
    return (
      <ReactPaginate
        pageCount={Math.max(1, pageCount)}
        forcePage={Math.max(0, currentPageNumber - 1)}
        onPageChange={handlePagination}
        breakLabel="…"
        nextLabel={<MdOutlineArrowForwardIos size={16} aria-hidden />}
        previousLabel={<MdOutlineArrowBackIos size={16} aria-hidden />}
        pageRangeDisplayed={3}
        marginPagesDisplayed={1}
        renderOnZeroPageCount={null}
        // Optional: give anchors real hrefs like ?page=2 (useful if you also read searchParams)
        // hrefBuilder={(page) => `?page=${page}&limit=10`}
        containerClassName="flex items-center justify-center gap-2 mt-8 mb-4 text-md font-semibold list-none"
        pageClassName="flex rounded-full bg-[var(--color-primary-light)]"
        pageLinkClassName="w-8 h-8 flex items-center justify-center focus:outline-none cursor-pointer"
        activeClassName="!bg-[var(--color-primary)]"
        activeLinkClassName="!text-white !font-bold"
        previousClassName="mr-2 rounded-full flex items-center justify-center w-8 h-8 bg-[var(--color-primary-light)]"
        nextClassName="ml-2 rounded-full flex items-center justify-center w-8 h-8 bg-[var(--color-primary-light)]"
        previousLinkClassName="w-full h-full flex items-center justify-center text-[var(--color-primary)] focus:outline-none cursor-pointer"
        nextLinkClassName="w-full h-full flex items-center justify-center text-[var(--color-primary)] focus:outline-none cursor-pointer"
        // disabledClassName="opacity-50 pointer-events-none"
        breakClassName="mx-1 text-[var(--color-primary)]"
        breakLinkClassName="px-2 py-1.5"
      />
    );
  };
  
  export default Pagination;
  
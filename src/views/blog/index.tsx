import Button from "@/components/button/Button";
import PageHeader from "@/components/page-header/PageHeader";
import { useState, useEffect } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import BlogTable from "./components/BlogTable";
import { useRouter } from "next/navigation";

const Blogs = () => {
    const router = useRouter();
    const dataLimit = 10;
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    // const { usePaginatedQuery } = useAPI();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editData, setEditData] = useState<any | null>(null);

    // const getBlogListApiUrl = () => {
    //     const apiUrl = `${apiConfig.blog.blogUrl}?page=${currentPageNumber}&limit=${dataLimit}`;
    //     return apiUrl;
    // }

    const handlePagination = (paginationData: { selected: number }) => {
        const selectedPage = paginationData.selected + 1;
        setCurrentPageNumber(selectedPage);
    };

    // const {
    //     data: dataList,
    //     refetch: fetchData,
    //     isFetching,
    //     pageCount,
    //     isLoading
    // } = usePaginatedQuery({
    //     queryKey: [blogQueryKey],
    //     url: getBlogListApiUrl()
    // });

    // useEffect(() => {
    //     fetchData();
    // }, [currentPageNumber]);

    const handleEdit = (blog?: any) => {
        setEditData(blog || null);
        setIsEditOpen(true);
    };

    return (
        <>
            <div className="flex flex-col gap-8">
                {
                    !isEditOpen && (
                        <div className="flex items-center justify-between flex-wrap">
                            <PageHeader
                                headerTitle="Blogs"
                                headerDescription="Manage your blogs"
                            />
                            <Button label="Add New Blog" onClick={() => router.push("/create-blog")} color="var(--color-primary)" hoverColor="var(--color-primary-hover)" icon={<IoMdAddCircleOutline size={18} />} />
                        </div>
                    )
                }
                <div className="grid grid-cols-12 gap-12">
                    <div className="col-span-12">
                        {
                            isEditOpen ? (
                                <BlogCreation editData={editData} />

                            ) : (
                                <BlogTable
                                    currentPageNumber={currentPageNumber}
                                    handlePagination={handlePagination}
                                    onEdit={handleEdit}
                                />
                            )
                        }
                    </div>
                </div>
            </div> 
        </>
    );
};

export default Blogs;

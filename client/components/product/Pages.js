import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

import { useRouter } from 'next/router';

const Pages = ({ context }) => {

    const { limit, totalCount, currentPage } = context

    const router = useRouter();

    const pageCount = Math.ceil(totalCount / limit)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    return (
        <Pagination aria-label="Page navigation example">
            <PaginationItem >
                <PaginationLink
                    first
                    href="/products?page=1"
                />
            </PaginationItem>
            <PaginationItem disabled={currentPage == 1 ? true : false}>
                <PaginationLink
                    href={`${router.pathname}?page=${currentPage == 1 ? 1 : currentPage - 1}`}
                    previous
                />
            </PaginationItem>
            {pages.map(page =>
                <PaginationItem active={currentPage == page ? true : false}>
                    <PaginationLink
                        href={`${router.pathname}/?page=${page}`}
                        key={page}
                    >
                        {page}
                        {/* // active={device.page === page}
                    // onClick={() => device.setPage(page)} */}
                    </PaginationLink>
                </PaginationItem>
            )
            }
            <PaginationItem>
                <PaginationLink
                    href="#"
                    next
                />
            </PaginationItem>
            <PaginationItem>
                <PaginationLink
                    href="#"
                    last
                />
            </PaginationItem>
        </Pagination >
    );
};

export default Pages;
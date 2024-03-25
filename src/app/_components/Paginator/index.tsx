const Paginator = ({ currentPage, totalPages, setPage }:
    { currentPage: number, totalPages: number, setPage: (page: number) => void }) => {
    const lastPage = Math.trunc((totalPages / 6) + (totalPages % 6 === 0 ? 0 : 1))
    const pages = []
    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        if (i > 0 && i <= totalPages) {
            pages.push(
                <button className="border-0 bg-white text-gray-500 hover:text-gray-700 cursor-pointer ml-1" onClick={() => setPage(i)} disabled={currentPage === i}>
                    {currentPage === i ? <b className='text-bold'>{i}</b> : i}
                </button>
            )
        }
    }
    return (
        <div className="flex flex-row justify-between items-center mt-4">
            <button className="border-0 bg-white text-gray-500 hover:text-gray-700 cursor-pointer ml-1" onClick={() => setPage(1)} disabled={currentPage === 1}>
                &lt;&lt;
            </button>
            {pages}
            <button className="border-0 bg-white text-gray-500 hover:text-gray-700 cursor-pointer ml-1" onClick={() => setPage(lastPage)} disabled={currentPage === lastPage}>
                &gt;&gt;
            </button>
        </div>
    )
}
export default Paginator
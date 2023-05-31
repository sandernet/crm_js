import Link from "next/link";

const MainContainer = ({ children }) => {

    return (
        <>
            <div className="navbar">
                <Link className="link" href={`/`}>
                    Главная страница
                </Link>
                <Link href={`/products/`}>
                    Страница с товарами
                </Link>
            </div>
            <div>
                {children}
            </div>
        </>
    );
}

export default MainContainer;
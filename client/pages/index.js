import MainContainer from "../components/MainContainer"

const Index = () => {
    return (
        <>
            <MainContainer>
                <h1>Главная страница</h1>
                <style jsx>
                    {`
                     .navbar{
                      background: orange;
                        padding: 15px;
                    }
                    `}
                </style>
            </MainContainer>
        </>
    );
}

export default Index;
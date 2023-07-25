import React, { createContext, useContext } from "react";
import { ProductsList } from "@data";

const context = createContext({ data: new ProductsList() });

const useDefContext = () => {
    return useContext(context);
};

const Context = (props) => {
    return (
        <context.Provider value={{ data: new ProductsList() }} name="PRODUCTSlIST CONTEXT">
            {props.children}
        </context.Provider>
    );
};

export { Context, useDefContext };

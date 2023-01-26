import { Outlet } from "react-router-dom";
import { ROLE } from "../Role";
import { Error404 } from "../error/Error404";
import { useAppSelector } from "../store";
import { FC } from "react";

export const AuthRotes= ({
    children,
    roles,
}: {
    children: React.ReactElement;
    roles: Array<ROLE>;
}) => {
    const { user } = useAppSelector(state => state.userAuth);
    const userHasRequiredRole = user && roles.includes(user.authority) ? true : false;
    if (user && roles.includes(user.authority)) {
        return <Error404 />; // build your won access denied page (sth like 404)
    }

    return children;
};
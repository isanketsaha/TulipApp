import { ROLE } from "../Role";
import { useAppSelector } from "../store";
import { Error403 } from "../error/Error403";

export const AuthRotes= ({
    children,
    roles,
}: {
    children: React.ReactElement;
    roles: Array<ROLE>;
}) => {
    const { user } = useAppSelector(state => state.userAuth);
    const userHasRequiredRole = user && roles.includes(user.authority) ? true : false;
    if (user && !roles.includes(user.authority)) {
        return <Error403 />; // build your won access denied page (sth like 404)
    }

    return children;
};
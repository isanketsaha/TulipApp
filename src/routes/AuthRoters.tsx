import { Role } from "../Role";
import { useAppSelector } from "../store";
import { Error403 } from "../error/Error403";

export const AuthRotes= ({
    children,
    roles,
}: {
    children: React.ReactElement;
    roles: Array<Role>;
}) => {
    const { user } = useAppSelector(state => state.userAuth);
    if (user && !roles.includes(user.authority)) { //One one role assigned. 
        return <Error403 />; // build your won access denied page (sth like 404)
    }
    return children;
};
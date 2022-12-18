import { Button, Result } from "antd"
import { Link, useRouteError } from "react-router-dom";


export const Error404 = () => {

    const error: any = useRouteError();
    console.error(error);
    return (
        <Result
            status="404"
            title="404"
            subTitle={<h3>Unable to find your page. <br /> {error.statusText || error.message}</h3>}
            extra={<Link to="/"><Button type="primary">Back Home</Button> </Link>}
        />
    )
}

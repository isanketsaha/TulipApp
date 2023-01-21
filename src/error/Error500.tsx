import { Button, Result } from "antd";
import { Link } from "react-router-dom";

export const Error500 = () => {

    return (<>
        <Result
            status="500"
            title="500"
            subTitle="Unable to find Student."
            extra={<Link to="/"><Button type="primary">Home</Button></Link>}
        />
    </>);
}
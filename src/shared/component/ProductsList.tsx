import { Button, Form, Row, Upload } from "antd"
import { useState } from "react";
import { uploadProps } from "/src/configs/UploadConfig";
import { UploadOutlined } from '@ant-design/icons';
export const ProductsList = () => {

    return (
        <Row align={"middle"} justify={"end"}>
            <Upload {...uploadProps()} showUploadList={true}
                listType="text" name="documents" accept={".xlsx"} maxCount={1}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
        </Row>
    );
}


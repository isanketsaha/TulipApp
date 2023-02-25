import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';


export const MultipleUpload = () => {

    const beforeUpload = (file: any) => {
        const reader = new FileReader();

        reader.onload = (e: any) => {
            console.log(e.target.result);
        };
        reader.readAsText(file);

        // Prevent upload
        return false;
    }

    return (
        <Upload.Dragger beforeUpload={beforeUpload} className="upload-parent-sideBySide"
            listType="picture" name="documents" accept=".jpg,.pdf" maxCount={2}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag documents to this area to upload</p>
        </Upload.Dragger>
    )
}
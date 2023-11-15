import Upload from "antd/es/upload/Upload"
import { UploadFiles } from "../UploadFiles"

export const Products = () => {
  return (
    <>
      <UploadFiles
        draggable={true}
        childElement={
          <>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">This will only support xls files for uploading products.</p>
          </>
        }
      />
    </>
  )
}

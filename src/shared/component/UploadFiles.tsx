import { InboxOutlined, LoadingOutlined, UploadOutlined } from "@ant-design/icons"
import { Button, Form, FormItemProps, FormProps, Upload, UploadProps, message } from "antd"
import { RcFile } from "antd/es/upload"
import { FC, ReactNode, useState } from "react"
import { Role } from "../utils/Role"
import { useAppSelector } from "/src/store"
import Dragger from "antd/es/upload/Dragger"

export const UploadFiles: FC<
  FormItemProps & UploadProps & { draggable?: Boolean | undefined; childElement?: ReactNode | undefined }
> = (props) => {
  const { name, listType, maxCount = 1, label, draggable, childElement } = props
  const userAuth = useAppSelector((state) => state.userAuth)
  const [loading, setLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>()

  const baseUrl = import.meta.env.VITE_BASE_API_URL

  const allowedFieldType = ".jpg,.pdf,.png"

  const uploadProps = () => {
    return {
      name: "file",
      action: baseUrl + "/file/upload",
      headers: {
        authorization: `Bearer ${userAuth?.user?.idToken}`,
      },
      showUploadList: {
        showDownloadIcon: [Role.ADMIN, Role.PRINCIPAL].includes(userAuth.user?.authority ?? Role.STAFF),
        showPreviewIcon: [Role.ADMIN, Role.PRINCIPAL, Role.STAFF].includes(userAuth?.user?.authority ?? Role.STAFF),
        showRemoveIcon: [Role.ADMIN, Role.PRINCIPAL, Role.STAFF].includes(userAuth?.user?.authority ?? Role.STAFF),
      },
      onChange({ file, fileList, event }) {
        if (file.status == "uploading") {
          setLoading(true)
        }
        if (file.status === "done") {
          getBase64(file.originFileObj as RcFile, (url) => {
            setLoading(false)
            setImageUrl(url)
          })
          message.success(`${file.name} file uploaded successfully`)
        } else if (file.status === "error") {
          setLoading(false)
          message.error(`${file.name} file upload failed.`)
        }
      },
      onDownload(file) {
        fetch(baseUrl + "/file/download?uuid=" + file.response, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth?.user?.idToken}`,
          },
        }).then((response) => {
          response.blob().then((blob: any) => {
            const filename = file.name
            blob = blob.slice(0, blob.size, file.type)
            let url = window.URL.createObjectURL(blob)
            let a = document.createElement("a")
            a.href = url
            a.download = filename ?? "UNKNOWN"
            a.click()
          })
        })
      },
      onRemove(file) {
        fetch(baseUrl + "/file?uuid=" + file.response, {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${userAuth?.user?.idToken}`,
          },
        }).then((response) => response.text())
      },
      onPreview(file) {
        console.log("Your upload file:", file)
        return fetch(baseUrl + "/file?uuid=" + file.response, {
          method: "GET",
          headers: {
            authorization: `Bearer ${userAuth?.user?.idToken}`,
          },
        })
          .then((response) => response.text())
          .then((data) => {
            window.open(data, "_blank")
          })
      },
    } as UploadProps
  }

  const getBase64 = (img: RcFile, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => callback(reader.result as string))
    reader.readAsDataURL(img)
  }

  const normFile = (e: any) => {
    console.log("Upload event:", e)
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <UploadOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )

  return draggable ? (
    <Dragger {...uploadProps()} name="documents" accept={".xlsx"} maxCount={maxCount}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      {childElement}
    </Dragger>
  ) : (
    <Form.Item name={name} valuePropName="fileList" getValueFromEvent={normFile} label={label}>
      <Upload {...uploadProps()} listType={listType} name="documents" accept={allowedFieldType} maxCount={maxCount}>
        {listType === "picture-card" ? uploadButton : <Button icon={<UploadOutlined />}>Click to Upload</Button>}
      </Upload>
    </Form.Item>
  )
}

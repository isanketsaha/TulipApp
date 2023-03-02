import { UploadProps, message } from 'antd';

import { store } from '/src/store';
import { Role } from '../shared/utils/Role';

const baseUrl = import.meta.env.VITE_BASE_API_URL;
export const allowedFieldType = ".jpg,.pdf,.png";

const appState: any = store.getState();
export const uploadProps: UploadProps = {
    name: 'file',

    action: baseUrl + '/file/upload',
    headers: {
        authorization: `Bearer ${appState?.userAuth?.user?.idToken}`,
    },
    showUploadList: {
        showDownloadIcon: [Role.ADMIN, Role.PRINCIPAL].includes(appState?.userAuth?.user?.authority),
        showPreviewIcon: [Role.ADMIN, Role.PRINCIPAL, Role.STAFF].includes(appState?.userAuth?.user?.authority),
        showRemoveIcon: [Role.ADMIN, Role.PRINCIPAL, Role.STAFF].includes(appState?.userAuth?.user?.authority)
    },
    onChange({ file, fileList, event }) {
        if (file.status !== 'uploading') {
            console.log(file, fileList);
        }
        if (file.status === 'done') {
            message.success(`${file.name} file uploaded successfully`);
        } else if (file.status === 'error') {
            message.error(`${file.name} file upload failed.`);
        }
    },
    onDownload(file) {
        fetch(baseUrl + '/file/download?uuid=' + file.response, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${appState?.userAuth?.user?.idToken}`,
            }
        })
            .then((response) => {
                response.blob().then((blob: any) => {
                    const filename = file.name;
                    blob = blob.slice(0, blob.size, file.type)
                    let url = window.URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = filename ?? 'UNKNOWN';
                    a.click();
                });
            });
    },
    onRemove(file) {
        fetch(baseUrl + '/file?uuid=' + file.response, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${appState?.userAuth?.user?.idToken}`,
            }
        }).then((response) => response.text())

    },
    onPreview(file) {
        console.log('Your upload file:', file);
        return fetch(baseUrl + '/file?uuid=' + file.response, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${appState?.userAuth?.user?.idToken}`,
            }
        })
            .then((response) => response.text())
            .then((data) => {
                window.open(data, "_blank");
            })
    },
};

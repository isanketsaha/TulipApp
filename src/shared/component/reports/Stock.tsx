import { Row, Tag, Typography, Table, Button, Space, Popconfirm, message, Form } from "antd"
import { useFetchInventoryReportQuery, useUpdateProductVisibilityMutation } from "../../redux/api/feature/report/api";
import { IStockReport } from "../../interface/IStockReport";
import { IProductCatlog } from "../../interface/IProductCatalog";
import { ColumnsType } from "antd/es/table";
import { WarningOutlined, DownloadOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { useExportStockMutation } from "../../redux/api/feature/exports/api";
import { useAppSelector } from "/src/store";
import { Role } from "../../utils/Role";
import { useState } from "react";
import { EditableCell } from "../EditableCell";

export const Stock = () => {

    const { data: stockDate } = useFetchInventoryReportQuery();
    const [exportStock] = useExportStockMutation();
    const [editingKey, setEditingKey] = useState<number>();
    const [form] = Form.useForm();
    const isEditing = (record: IStockReport) => record.id === editingKey;
    const [updateProductVisibility] = useUpdateProductVisibilityMutation();
    const { user } = useAppSelector(state => state.userAuth);
    const filterProduct = stockDate?.map((item: IStockReport) => {
        return {
            text: item.product.itemName,
            value: item.product.itemName
        }
    });

    const edit = (record: Partial<IStockReport> & { key: React.Key }) => {
        form.setFieldsValue({ catalogId : record.id, ...record });
        setEditingKey(record?.id);
    }

    const cancel = () => {
        setEditingKey(-1);
      };

    const disableProduct = (id: number) => {
        if (id) {
            updateProductVisibility(id).then(res => message.success("Product got removed from catalog."))
        }
    }
    const categoryFilter = stockDate?.map((item: IStockReport) => {
        return {
            text: item.product.type,
            value: item.product.type
        }
    });

    const save = async (record: IStockReport ) => {
        try {
          const row = (await form.validateFields()) as IStockReport;  
          const val = {
                ...row,
                stockId: record.id
            }
            console.log(val);
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };

    const columns = [
       
        {
            title: 'Product Title',
            dataIndex: ['product', 'itemName'],
            key: 'product',
            filterSearch: true,
            editable: true,
            render: (value: string) => value,
            filters: [...new Map(filterProduct?.map((m) => [m.text, m])).values()],
            onFilter: (value: IProductCatlog, record: IStockReport) => record.product.itemName.indexOf(String(value)) === 0,
            onCell: (_: IStockReport, index: number) => ({
                rowSpan: stockDate && index && (_.product.itemName == stockDate[index].product.itemName) ? 1 : 1,
            }),

        },
        {
            title: 'Size / Class',
            dataIndex: 'product',
            key: 'product',
            render: (item: IProductCatlog) => item.size ? item.size : item.std ? item.std : 'N/A',

        }
        ,
        {
            title: 'Category',
            dataIndex: 'product',
            key: 'product',
            render: (item: IProductCatlog) => <Tag color="green"> {item.type} </Tag>,
            filters: [...new Map(categoryFilter?.map((m) => [m.text, m])).values()],
            onFilter: (value: IProductCatlog, record: IStockReport) => record.product.type.indexOf(String(value)) === 0,
            responsive: ['md'],
        },
        {
            title: 'Available Quantity',
            dataIndex: 'availableQty',
            key: 'availableQty',
            render: (value: IProductCatlog, row: IStockReport) => <Tag icon={row.lowStock ? <WarningOutlined /> : null} color={row.lowStock ? "red" : "blue"}>  {row.availableQty}</Tag>,

        },

        {
            title: 'Price',
            dataIndex: ['product', 'price'],
            key: 'product',
            editable: true,
            render: (price: number) =>  price.toLocaleString('en-IN', {
                maximumFractionDigits: 1,
                style: 'currency',
                currency: 'INR'
            }),
        },
        ...(user?.authority == Role.ADMIN ? [{
            title: 'Purchase Quantity',
            dataIndex: ['purchasedQty'],
            editable: true,
            key: 'purchasedQty',

        }, {
            title: 'Action',
            key: 'action',
            render: (_: any, record: any) => {
                const editable = isEditing(record);
                return editable ? (
                    <Space size="middle">
                    <Typography.Link onClick={
                        () =>
                         save(record)} >
                      Save
                    </Typography.Link>
                    <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                      <a>Cancel</a>
                    </Popconfirm>
                  </Space>
                ) :
                (<Space size="middle">
                    
                        <a onClick={() => edit(record)}>Edit</a>
                    
                    <Popconfirm title={`Sure to remove ${record.product.itemName}?`}
                        icon={<QuestionCircleOutlined style={{ color: 'red' }} />} onConfirm={() => disableProduct(record.product.id)}>
                        <a>Remove</a>
                    </Popconfirm>
                </Space>)
            }
        }] : []),

    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: IStockReport) => ({
                record,
                inputType: col.dataIndex.includes('itemName')  ? 'text' : 'number' ,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });


    return (
        <>
            {stockDate &&
                <Form form={form} component={false}>
                    <Table<IStockReport>
                    title={() => <Row justify="end" align={"middle"}>
                       <Button shape="round" icon={<DownloadOutlined />} onClick={() => exportStock()}>
                           Export to Excel
                       </Button>
                       </Row>}
                        components={{
                            body: {
                                cell: EditableCell,
                            },
                        }}
                        rowKey={record => record.product.id}
                        bordered
                        dataSource={stockDate}
                        columns={mergedColumns as ColumnsType<IStockReport>}
                        rowClassName="editable-row"
                        scroll={{ y: 300 }} pagination={false}  size="small"
                    />
                </Form>

            }
        </>);
}



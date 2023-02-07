import { List, Row, Col, Tag, Typography, Table } from "antd"
import { useFetchInventoryReportQuery } from "../../redux/api/feature/report/api";
import { IStockReport } from "../../interface/IStockReport";
import { IProductCatlog } from "../../interface/IProductCatalog";
import { ColumnsType } from "antd/es/table";


export const Stock = () => {

    const { data } = useFetchInventoryReportQuery();

    const filterProduct = data?.map((item: IStockReport) => {
        return {
            text: item.product.itemName,
            value: item.product.itemName
        }
    });

    const categoryFilter = data?.map((item: IStockReport) => {
        return {
            text: item.product.type,
            value: item.product.type
        }
    });

    const columns : ColumnsType<IStockReport>= [
        {
            title: '',
            dataIndex: '',
            key: '',
            width: 30,
        },
        {
            title: 'Product Title',
            dataIndex: 'product',
            key: 'product',
            filterSearch: true,
            render: (item: IProductCatlog) => item.itemName,
            filters: [...new Map(filterProduct?.map((m) => [m.text, m])).values()],
            onFilter: (value , record) => record.product.itemName.indexOf(String(value)) === 0
        },
        {
            title: 'Size / Class',
            dataIndex: 'product',
            key: 'product',
            width: 120,
            render: (item: IProductCatlog) => item.size ? item.size : item.std ? item.std : 'N/A'
        }
        ,
        {
            title: 'Category',
            dataIndex: 'product',
            key: 'product',
            width: 200,
            render: (item: IProductCatlog) => <Tag color="green"> {item.type} </Tag>,
            filters: [...new Map(categoryFilter?.map((m) => [m.text, m])).values()],
            onFilter: (value, record) => record.product.type.indexOf(String(value)) === 0
        },
        {
            title: 'Quantity',
            dataIndex: 'availableQty',
            key: 'availableQty',
            width: 100,
            render: (item: number) => <Tag color="blue">  {item}</Tag>
        },
        {
            title: 'Price',
            dataIndex: 'product',
            key: 'product',
            width: 150,
            render: (item: IProductCatlog) => item.price ? item.price : 'N/A'
        }
    ];

    return (
        <>
            {data &&

                <Table<IStockReport> rowKey={(record) => record.id} dataSource={data} scroll={{ y: 300 }} columns={columns} size="middle" />
            }
        </>);
}
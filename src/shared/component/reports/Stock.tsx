import { List, Row, Col, Tag, Typography, Table, Button } from "antd"
import {  useFetchInventoryReportQuery } from "../../redux/api/feature/report/api";
import { IStockReport } from "../../interface/IStockReport";
import { IProductCatlog } from "../../interface/IProductCatalog";
import { ColumnsType } from "antd/es/table";
import {WarningOutlined, DownloadOutlined} from  '@ant-design/icons';
import { useExportStockMutation } from "../../redux/api/feature/exports/api";

export const Stock = () => {

    const { data: stockDate } = useFetchInventoryReportQuery();
    const[exportStock] = useExportStockMutation();

    const filterProduct = stockDate?.map((item: IStockReport) => {
        return {
            text: item.product.itemName,
            value: item.product.itemName
        }
    });

    const categoryFilter = stockDate?.map((item: IStockReport) => {
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
            responsive: ['lg'],
        },
        {
            title: 'Product Title',
            dataIndex: 'product',
            key: 'product',
            filterSearch: true,
            render: (value) => value.itemName,
            filters: [...new Map(filterProduct?.map((m) => [m.text, m])).values()],
            onFilter: (value , record) => record.product.itemName.indexOf(String(value)) === 0,
            onCell: (_, index) => ({
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
            onFilter: (value, record) => record.product.type.indexOf(String(value)) === 0,
            responsive: ['md'],
        },
        {
            title: 'Quantity',
            dataIndex: 'availableQty',
            key: 'availableQty',
            render: (value, row, index) =>  <Tag icon={row.lowStock ? <WarningOutlined /> : null} color={row.lowStock ? "red":"blue"}>  {value}</Tag>,
     
        },
        {
            title: 'Price',
            dataIndex: 'product',
            key: 'product',
            render: (item: IProductCatlog) => item.price ? item.price.toLocaleString('en-IN', {
                maximumFractionDigits: 1,
                style: 'currency',
                currency: 'INR'
            }) : 'N/A',
        }
    ];

    return (
        <>
            {stockDate &&

                <Table<IStockReport>  title={() =>  <Row justify="end" align={"middle"}>
               <Button shape="round" icon={<DownloadOutlined />} onClick={()=>exportStock()}>
                   Export to Excel
               </Button>
           </Row>} rowKey={(record) => record.id} dataSource={stockDate} scroll={{ y: 300 }} pagination={false} columns={columns} size="small" />
            }
        </>);
}
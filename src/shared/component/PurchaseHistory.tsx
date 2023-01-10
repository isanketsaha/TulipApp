import { Avatar, Card, Divider, List, message } from "antd"
import VirtualList from 'rc-virtual-list';
import { useState, useEffect } from "react";


interface UserItem {
    email: string;
    gender: string;
    name: {
      first: string;
      last: string;
      title: string;
    };
    nat: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  }
  
  const fakeDataUrl =
    'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
  const ContainerHeight = 400;
  
export const PurchaseHistory = () => {


    const [data, setData] = useState<UserItem[]>([]);

    const appendData = () => {
      fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((body) => {
          setData(data.concat(body.results));
          message.success(`${body.results.length} more items loaded!`);
        });
    };
  
    useEffect(() => {
      appendData();
    }, []);
  
    const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
        if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
          appendData();
        }
      };


    return (<>
        <Divider><h3>Purchase History</h3></Divider>
        <Card>
        <List>
      <VirtualList
        data={data}
        height={300}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item: UserItem) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
    </Card>
    </>)
}
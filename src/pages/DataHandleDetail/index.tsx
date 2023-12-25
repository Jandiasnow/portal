import { Button, Col, Page, Row, Space, Typography } from '@tenx-ui/materials';
import { matchPath, useLocation } from '@umijs/max';
import type { TabsProps } from 'antd';
import { Avatar, Divider, List, notification, Spin, Tabs } from 'antd';
import React, { useEffect, useState } from 'react';

import Status from '../../components/Status';
import utils from '../../utils/__utils';
import DataHandle from './DataHandle';
import styles from './index.less';
import Info from './info';

const DataHandleDetail = props => {
  const statuesMap = {
    processing: {
      text: '处理中',
      status: 'info',
    },
    process_complete: {
      text: '处理完成',
      status: 'success',
    },
    process_fail: {
      text: '处理失败',
      status: 'error',
    },
  };
  const [detailData, setDetailData] = useState({});
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    const match = matchPath({ path: '/data-handle/detail/:id' }, location.pathname);
    const id = match.params.id;
    const params = {
      input: {
        id,
      },
    };
    utils.bff
      .dataProcessDetails(params)
      .then(res => {
        const { data, status, message } = res.dataProcess.dataProcessDetails;
        if (status === 200) {
          setDetailData(data);
        } else {
          notification.warning({
            message,
          });
        }
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        notification.warning({
          message: '失败',
          description: err[0]?.message || '获取详细信息失败',
        });
      });
  };

  const formatTime = (time = '') => {
    return time.split('.')[0];
  };

  const items: TabsProps['items'] = [
    {
      key: 'info',
      label: '详细信息',
      children: <Info data={detailData} />,
    },
    {
      key: 'data-handle',
      label: '数据处理',
      children: <DataHandle data={detailData} getData={getData} />,
    },
  ];

  return (
    <Page style={{ marginBottom: '0px', paddingBottom: '0px' }}>
      <Row wrap={true} style={{ marginBottom: '16px' }} __component_name="Row">
        <Col span={24} __component_name="Col">
          <Space align="center" direction="horizontal" __component_name="Space">
            <Button.Back type="primary" title="" __component_name="Button.Back" />
          </Space>
          <Typography.Title
            bold={true}
            level={2}
            bordered={false}
            ellipsis={true}
            __component_name="Typography.Title"
          >
            数据处理详情
          </Typography.Title>
        </Col>
      </Row>
      <Spin spinning={loading}>
        <div className={styles.info}>
          <List
            itemLayout="horizontal"
            dataSource={[detailData]}
            renderItem={(item, index) => (
              <List.Item
              // actions={[<Button>删除</Button>]}
              >
                <List.Item.Meta
                  avatar={
                    <Avatar size={48} style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>
                      U
                    </Avatar>
                  }
                  title={<h4>{item.name || '这是一个名'}</h4>}
                  description={
                    <>
                      <span>
                        <Status {...statuesMap[item.status]} />
                      </span>
                      <Divider type="vertical" />
                      <span>
                        更新时间：
                        {item.end_time ? formatTime(item.end_time) : formatTime(item.start_time)}
                      </span>
                    </>
                  }
                />
              </List.Item>
            )}
          />
        </div>
        <div className={styles.tabs}>
          <Tabs items={items} />
        </div>
      </Spin>
    </Page>
  );
};

export default DataHandleDetail;

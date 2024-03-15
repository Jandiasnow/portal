import { KubeagiNextLead } from '@tenx-ui/icon';
import { Form, InputNumber, Switch } from 'antd';
import React from 'react';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import styles from '../index.less';

const InputNumberWidth = 120;
const FormItemProps = {
  wrapperCol: {
    span: 24,
  },
  labelCol: {
    span: 10,
  },
  labelAlign: 'left',
} as any;
interface ConfigNextProps {}

const ConfigNext: React.FC<ConfigNextProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  return (
    <Container isCollapse={true} title={'对话配置'} titleLevel={2}>
      <>
        <Container
          actions={[
            {
              key: 'switch',
              children: (
                // @todo
                <Form.Item
                  initialValue={60}
                  // name="SessionTimeout"
                  style={{ marginBottom: 0 }}
                >
                  <InputNumber
                    addonAfter={'s'}
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        DialogeTimeout: {
                          ...configs?.DialogeTimeout,
                          SessionTimeout: v,
                        },
                      });
                    }}
                    placeholder="请输入"
                    style={{ width: InputNumberWidth }}
                  />
                </Form.Item>
              ),
              data: {},
            },
          ]}
          configKey="DialogeTimeout"
          headerStyle={{ paddingBottom: 8 }}
          icon={<KubeagiNextLead className={styles.orangeIcon} />}
          isRowItem={true}
          style={{ paddingTop: 8 }}
          title={'对话超时'}
        ></Container>
        <Container
          actions={[
            {
              key: 'switch',
              children: (
                <Form.Item name="showDocDialoge" style={{ marginBottom: 0 }}>
                  <Switch
                    onChange={v => {
                      setConfigs({
                        ...configs,
                        DocDialoge: {
                          ...configs?.DocDialoge,
                          DocDialoge: v,
                        },
                      });
                    }}
                  />
                </Form.Item>
              ),
              data: {},
            },
          ]}
          configKey="DocDialoge"
          icon={<KubeagiNextLead className={styles.orangeIcon} />}
          isRowItem={!form?.getFieldValue('showDocDialoge')}
          renderChildren={form => {
            return (
              form.getFieldValue('showDocDialoge') && (
                <>
                  <Form.Item
                    style={{ marginBottom: 16 }}
                    {...FormItemProps}
                    initialValue={1024}
                    // @todo
                    // name="分段长度"
                    label="分段长度"
                    rules={[
                      {
                        validator: (_, value, callback) => {
                          return callback();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter="字符"
                      onChange={v => {
                        setConfigs({
                          ...configs,
                          DocDialoge: {
                            ...configs?.DocDialoge,
                            分段长度: v,
                          },
                        });
                      }}
                      placeholder="请输入"
                      style={{ width: InputNumberWidth, float: 'right' }}
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    {...FormItemProps}
                    initialValue={1024}
                    // @todo
                    // name="分段长度"
                    label="分段重叠长度"
                    rules={[
                      {
                        validator: (_, value, callback) => {
                          return callback();
                        },
                      },
                    ]}
                  >
                    <InputNumber
                      addonAfter="字符"
                      onChange={v => {
                        setConfigs({
                          ...configs,
                          DocDialoge: {
                            ...configs?.DocDialoge,
                            分段重叠长度: v,
                          },
                        });
                      }}
                      placeholder="请输入"
                      style={{ width: InputNumberWidth, float: 'right' }}
                    />
                  </Form.Item>
                </>
              )
            );
          }}
          style={{ padding: 0 }}
          title={'文档对话'}
        ></Container>
      </>
    </Container>
  );
};

export default ConfigNext;

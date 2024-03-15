import { QuestionCircleOutlined } from '@ant-design/icons';
import { KubeagiNextLead } from '@tenx-ui/icon';
import { Form, Select, Space, Switch, Tooltip } from 'antd';
import React from 'react';

import I18N from '@/utils/kiwiI18N';

import { useModalAppDetailContext } from '../../index';
import Container from '../Container';
import DocNullReturn from '../DocNullReturn';
import { SliderItem } from '../Modal';
import styles from '../index.less';

interface ConfigNextProps {}

const ConfigNext: React.FC<ConfigNextProps> = props => {
  const { configs, setConfigs, form } = useModalAppDetailContext();
  return (
    <Container isCollapse={true} title="查询配置" titleLevel={2}>
      <Container
        actions={[
          {
            key: 'switch',
            children: (
              <Form.Item name="showRerank" style={{ marginBottom: 0 }}>
                <Switch
                  onChange={v => {
                    setConfigs({
                      ...configs,
                      Rerank: {
                        ...configs?.Rerank,
                        showRerank: v,
                      },
                    });
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        borderBottom={form?.getFieldValue('showRerank')}
        changeConfig
        configKey="Rerank"
        icon={<KubeagiNextLead />}
        isRowItem={!form?.getFieldValue('showRerank')}
        renderChildren={form => {
          return (
            form.getFieldValue('showRerank') && (
              <Form.Item
                label="Rerank 模型"
                name="Rerank"
                rules={[
                  {
                    validator: (_, value, callback) => {
                      if (!value) {
                        return callback('请选择 Rerank 模型');
                      }
                      return callback();
                    },
                  },
                ]}
                style={{ marginBottom: 8 }}
              >
                <Select
                  onChange={v => {
                    setConfigs({
                      ...configs,
                      Rerank: {
                        ...configs?.Rerank,
                        Rerank: v,
                      },
                    });
                  }}
                  placeholder="请选择 Rerank 模型"
                  style={{ width: '150px', float: 'right' }}
                >
                  <Select.Option value="1">1</Select.Option>
                </Select>
              </Form.Item>
            )
          );
        }}
        style={{ padding: 0 }}
        title={'Rerank'}
      ></Container>
      <Container
        actions={[
          {
            key: 'switch',
            children: (
              <Form.Item name="MultiSearch" style={{ marginBottom: 0 }}>
                <Switch
                  onChange={v => {
                    setConfigs({
                      ...configs,
                      MultiSearch: {
                        ...configs?.MultiSearch,
                        MultiSearch: v,
                      },
                    });
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        configKey="MultiSearch"
        icon={<KubeagiNextLead />}
        isRowItem={true}
        style={{ padding: 0 }}
        title={'多查询'}
      ></Container>
      <Container
        actions={[
          {
            key: 'switch',
            children: (
              <Form.Item name="showSearchLimit" style={{ marginBottom: 0 }}>
                <Switch
                  onChange={v => {
                    setConfigs({
                      ...configs,
                      SearchLimit: {
                        ...configs?.DocDialoge,
                        showSearchLimit: v,
                      },
                    });
                  }}
                />
              </Form.Item>
            ),
            data: {},
          },
        ]}
        borderBottom={form?.getFieldValue('showSearchLimit')}
        configKey="SearchLimit"
        icon={<KubeagiNextLead />}
        isRowItem={!form?.getFieldValue('showSearchLimit')}
        renderChildren={form => {
          return (
            form.getFieldValue('showSearchLimit') && (
              <>
                <SliderItem
                  Config={{
                    initialValue: 0.7,
                    min: 0,
                    max: 1,
                    precision: 2,
                  }}
                  label={
                    <Space size={3}>
                      相似度阀值
                      <Tooltip title={I18N.ModelApp.piPeiYongHuWen}>
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="scoreThreshold"
                  sliderWidth="100px"
                  spaceStyle={{ float: 'right' }}
                />
                <SliderItem
                  Config={{
                    initialValue: 5,
                    min: 1,
                    max: 10,
                    precision: 0,
                  }}
                  label={
                    <Space size={3}>
                      引用数量
                      <Tooltip title={I18N.ModelApp.danCiSouSuoPi}>
                        <QuestionCircleOutlined className={styles.tooltip} />
                      </Tooltip>
                    </Space>
                  }
                  name="numDocuments"
                  sliderWidth="100px"
                  spaceStyle={{ float: 'right' }}
                />
              </>
            )
          );
        }}
        style={{ padding: 0 }}
        title={'查询限制'}
      ></Container>
      <DocNullReturn />
    </Container>
  );
};

export default ConfigNext;

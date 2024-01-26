import { CaretDownOutlined, CaretRightOutlined } from '@ant-design/icons';
import { Card, Divider, Typography, notification } from '@tenx-ui/materials';
import { Button, Col, Flex, Form, Row, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import React, { useState } from 'react';

import utils from '../../../utils/__utils';
import { useModalAppDetailContext } from '../index';
import ConfigConversationStarter from './ConfigConversationStarter';
import ConfigKnowledge from './ConfigKnowledge';
import ConfigModelService from './ConfigModelService';
import ConfigNext from './ConfigNext';
import ConfigPrompt from './ConfigPrompt';
import Dialogue from './Dialogue';
import RealTimeSearch from './RealTimeSearch';
import ViewReference from './ViewReference';
import ViewResInfo from './ViewResInfo';
import styles from './index.less';

interface BodyProps {}

const Body: React.FC<BodyProps> = props => {
  const {
    refresh,
    data,
    configs,
    initConfigs,
    loading: cardLoading,
    form,
  } = useModalAppDetailContext();
  const [loading, setLoading] = useState(false);
  const [saveIng, setSaveIng] = useState(false);

  return (
    <Card bordered={false} className={styles.card} loading={cardLoading} type="inner">
      <Row className={styles.content}>
        <Col span={10}>
          <Card className={styles.setting}>
            <Flex className={styles.action} justify="space-between">
              <Typography.Title level={1}>智能体配置</Typography.Title>
              <Tooltip title={isEqual(initConfigs, configs) && '请先修改智能体配置'}>
                <Button
                  disabled={isEqual(initConfigs, configs)}
                  loading={loading}
                  onClick={async () => {
                    form.validateFields().then(async values => {
                      try {
                        setLoading(true);
                        const input = {
                          ...data,
                          name: data?.metadata?.name,
                          namespace: data?.metadata?.namespace,
                          ...values,
                          knowledgebase:
                            values?.knowledgebase === 'undefined'
                              ? undefined
                              : values?.knowledgebase || data?.knowledgebase,
                          tools: [],
                        };
                        delete input.RealTimeSearchUsed;
                        delete input.RealTimeSearchName;
                        if (values.RealTimeSearchUsed && values.RealTimeSearchName) {
                          input.tools = [
                            {
                              name: values.RealTimeSearchName,
                            },
                          ];
                        }
                        delete input.metadata;
                        await utils.bff.updateApplicationConfig({
                          input,
                        });
                        refresh && refresh();
                        notification.success({
                          message: '保存智能体配置成功',
                        });
                        setLoading(false);
                        setSaveIng(!saveIng);
                      } catch (error) {
                        setLoading(false);
                        notification.warnings({
                          message: '保存智能体配置失败',
                          errors: error?.response?.errors,
                        });
                      }
                    });
                  }}
                  type="primary"
                >
                  保存
                </Button>
              </Tooltip>
            </Flex>
            <Form form={form}>
              <ConfigConversationStarter />
              <ConfigModelService />
              <ConfigKnowledge />
              <RealTimeSearch />
              <ConfigPrompt />
              {/* <ConfigAudio /> */}
              <Divider
                __component_name="Divider"
                closeIcon={<CaretDownOutlined />}
                content={
                  <>
                    <ConfigNext />
                    <ViewReference />
                    <ViewResInfo />
                  </>
                }
                dashed={true}
                defaultOpen={false}
                iconPlacement="right"
                mode="expanded"
                openIcon={<CaretRightOutlined />}
                orientation="left"
                orientationMargin={0}
              >
                个性化配置
              </Divider>
            </Form>
          </Card>
        </Col>
        <Col className={styles.dialogue} span={14}>
          <Dialogue saveIng={saveIng} />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;

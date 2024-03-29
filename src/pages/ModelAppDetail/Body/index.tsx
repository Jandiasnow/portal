import { Card, Typography, notification } from '@tenx-ui/materials';
import { Button, Col, Flex, Form, Row, Tooltip } from 'antd';
import { isEqual } from 'lodash';
import React, { useState } from 'react';

import I18N from '@/utils/kiwiI18N';

import utils from '../../../utils/__utils';
import { useModalAppDetailContext } from '../index';
import ConfigDialoge from './ConfigDialoge';
import ConfigKnowledge from './ConfigKnowledge';
import ConfigModelService from './ConfigModelService';
import ConfigPlugins from './ConfigPlugins';
import ConfigPrompt from './ConfigPrompt';
import ConfigSearch from './ConfigSearch';
import Container from './Container';
import Dialogue from './Dialogue';
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
    disabled,
  } = useModalAppDetailContext();
  const [loading, setLoading] = useState(false);
  const [saveIng, setSaveIng] = useState(false);
  const disabledMsg =
    '当前智能体为发布状态，不可进行编排。如需变更智能体配置，请先将智能体撤销发布，再进行修改。';
  return (
    <Card bordered={false} className={styles.card} loading={cardLoading} type="inner">
      <Row className={styles.content}>
        <Col span={12}>
          <Card
            className={styles.setting}
            extra={
              <Tooltip title={isEqual(initConfigs, configs) && I18N.ModelApp.qingXianXiuGaiZhi}>
                <Button
                  disabled={isEqual(initConfigs, configs) || disabled}
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
                          rerankModel: values.rerankModel || '',
                          tools:
                            values.tools
                              ?.filter(item => item.used)
                              ?.map(item => {
                                delete item.used;
                                return item;
                              }) || [],
                          docNullReturn: values.showDocNullReturn ? values.docNullReturn : '',
                        };

                        delete input.metadata;
                        delete input.showDocNullReturn;

                        if (!input.showSearchLimit) {
                          delete input.scoreThreshold;
                          delete input.numDocuments;
                        }
                        delete input.showSearchLimit;

                        await utils.bff.updateApplicationConfig({
                          input,
                        });
                        refresh && refresh();
                        notification.success({
                          message: I18N.ModelApp.baoCunZhiNengTi2,
                        });
                        setLoading(false);
                        setSaveIng(!saveIng);
                      } catch (error) {
                        setLoading(false);
                        notification.warnings({
                          message: I18N.ModelApp.baoCunZhiNengTi,
                          errors: error?.response?.errors,
                        });
                      }
                    });
                  }}
                  type="primary"
                >
                  {I18N.ModelApp.baoCun}
                </Button>
              </Tooltip>
            }
            headStyle={{ background: 'transparent', padding: '0 20px' }}
            title={
              <div style={disabled ? { paddingTop: 16 } : {}}>
                <Typography.Title level={1}>{I18N.ModelApp.zhiNengTiPeiZhi}</Typography.Title>
                {disabled && (
                  <p>
                    <Typography.Text
                      ellipsis={{ tooltip: { title: disabledMsg } }}
                      type="colorTextDescription"
                    >
                      {disabledMsg}
                    </Typography.Text>
                  </p>
                )}
              </div>
            }
          >
            <Form form={form}>
              <Flex gap={24}>
                <div style={{ width: '40%' }}>
                  <ConfigPrompt />
                </div>
                <div style={{ width: '60%' }}>
                  <ConfigModelService />
                  <Container title="技能" titleLevel={1}>
                    <ConfigPlugins />
                  </Container>
                  <Container title="记忆" titleLevel={1}>
                    <ConfigKnowledge />
                  </Container>
                  <Container title="高级配置" titleLevel={1}>
                    <>
                      <ConfigSearch />
                      <ConfigDialoge />
                    </>
                  </Container>
                  {/* <ConfigAudio /> */}
                  {/* <Divider
                    __component_name="Divider"
                    closeIcon={<CaretDownOutlined />}
                    content={
                      <>
                        <ConfigConversationStarter />
                        <ViewResInfo />
                        <ViewReference />
                        <ConfigNext />
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
                    {I18N.ModelApp.geXingHuaPeiZhi}
                  </Divider> */}
                </div>
              </Flex>
            </Form>
          </Card>
        </Col>
        <Col className={styles.dialogue} span={12}>
          <Dialogue saveIng={saveIng} />
        </Col>
      </Row>
    </Card>
  );
};

export default Body;

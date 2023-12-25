import { Typography } from '@tenx-ui/materials';
import { Divider, Flex, Form, Space } from 'antd';
import React, { useEffect, useReducer, useState } from 'react';
import { useModalAppDetailContext } from '../../index';
import Modal, { SettingProps } from '../Modal';
import styles from './index.less';

interface Action {
  key: string;
  isModal?: boolean;
  icon?: React.ReactElement;
  children?: React.ReactElement;
  data: any;
  modal?: SettingProps;
}

interface ContainerProps {
  children?: React.ReactElement;
  icon: React.ReactElement;
  title: string;
  actions?: Action[];
  configKey: string;
  changeConfig?: boolean;
  renderChildren?: (form, forceUpdate) => React.ReactElement;
  style?: any;
}

const Container: React.FC<ContainerProps> = props => {
  const { children, icon, title, actions, configKey, changeConfig, renderChildren } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<any>();
  const [ignored, forceUpdate] = useReducer(x => x + 1, 0);
  const [actionData, setActionData] = useState<Action>();
  const { initConfigs, configs, setConfigs, form } = useModalAppDetailContext();
  useEffect(() => {
    form.setFieldsValue(initConfigs?.[configKey] || {});
    forceUpdate();
  }, [initConfigs?.[configKey], form]);

  return (
    <div className={styles.container} style={props.style}>
      <Modal
        form={form}
        open={modalOpen && modalType === actionData.key}
        setOpen={setModalType}
        {...(actionData?.modal || {})}
        configKey={configKey}
      />
      <Flex justify="space-between" className={styles.header}>
        <Space size={5}>
          <span className={styles.titleIcon}>{icon}</span>
          <Typography.Title level={3}>{title}</Typography.Title>
        </Space>
        <Space size={5}>
          {actions?.map((action: Action, i) => {
            const { key, isModal = true, children: actionChildren, icon: actionIcon } = action;
            return (
              <>
                {actionIcon && (
                  <span
                    className={styles.icon}
                    onClick={() => {
                      if (!isModal) return;
                      setModalOpen(true);
                      setModalType(key);
                      setActionData(action);
                    }}
                  >
                    {actionIcon}
                  </span>
                )}
                {actionChildren}
                {i !== actions.length - 1 && (
                  <Divider mode="default" type="vertical" dashed={false} />
                )}
              </>
            );
          })}
        </Space>
      </Flex>
      {children}
      {renderChildren && renderChildren(form, forceUpdate)}
    </div>
  );
};

export default Container;

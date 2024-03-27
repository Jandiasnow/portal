/**
 * Licensed Materials - Property of k8s.com.cn
 * (C) Copyright 2023 KubeAGI. All Rights Reserved.
 */

/**
 * Chat
 * @author zggmd
 * @date 2024-01-22
 */
import { ChatMessage } from '@lobehub/ui';
import { Divider, Space, Typography } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';

import I18N from '../utils/kiwiI18N';
import useStyles from './index.style';
import RefContent from './renderContent';

export type Reference = {
  answer: string;
  content: string;
  file_name: string;
  page_number: number;
  qa_file_path: string;
  qa_line_number: number;
  question: string;
  score: number;
  title?: string;
  url?: string;
  rerank_score: number;
};
type IRenderReferences = {
  chat: ChatMessage;
  debug: boolean;
};
let mouseEnterTimeout;
let tempSetNum;
const getTempSetNum = () => tempSetNum;
const RenderReferences: FC<IRenderReferences> = props => {
  const { styles, cx } = useStyles();
  const { chat, debug } = props;
  const [_item, setItem] = useState<{ item: Reference; index: number }>();
  const [clear, setClear] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      mouseEnterTimeout && clearTimeout(mouseEnterTimeout);
    };
  }, []);
  const onMouseEnter = useCallback(
    (item, index) => {
      tempSetNum = index;
      setLoading(true);
      mouseEnterTimeout = setTimeout(() => {
        setLoading(false);
        if (getTempSetNum() === index) {
          setItem({ item, index });
          tempSetNum = undefined;
        }
      }, 1000);
    },
    [setItem, setClear, setLoading]
  );
  const onRefContentMouseLeave = () => {
    setClear(clear => clear - 1);
  };
  if (!chat.extra?.references) {
    return null;
  }
  return (
    <div className={cx(styles.references, 'references')}>
      <Divider className="referencesTxt" dashed orientation="left" />
      <RefContent
        debug={debug}
        index={_item?.index + 1 || 0}
        loading={loading}
        onMouseLeaveCallback={onRefContentMouseLeave}
        open={Boolean(clear)}
        reference={_item?.item || ({} as Reference)}
      >
        <Space
          className="referencesList"
          direction="horizontal"
          onMouseEnter={() => {
            setClear(2);
          }}
          onMouseLeave={() => {
            setClear(clear => clear - 1);
          }}
        >
          {I18N.Chat.yinYong}
          {chat.extra.references.map((item, index) => {
            return (
              <>
                <Typography.Link
                  key={index}
                  onMouseEnter={onMouseEnter.bind('', item, index)}
                  onMouseLeave={() => {
                    getTempSetNum() === index && (tempSetNum = undefined);
                  }}
                >
                  [{index + 1}]
                </Typography.Link>

                {chat.extra.references.length - 1 > index ? <Divider type="vertical" /> : null}
              </>
            );
          })}
        </Space>
      </RefContent>
    </div>
  );
};
export default RenderReferences;

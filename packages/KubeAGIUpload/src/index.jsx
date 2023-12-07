// 注意: 出码引擎注入的临时变量默认都以 "__$$" 开头，禁止在搭建的代码中直接访问。
// 例外：react 框架的导出名和各种组件名除外。
import React from 'react';

import {
  Component,
  Modal,
  Row,
  Col,
  Typography,
  Button,
  Space,
  FormilyForm,
  FormilyUpload,
  Flex,
} from '@tenx-ui/materials';

import { TenxIconLinkTo, AntdIconPlusOutlined } from '@tenx-ui/icon-materials';

import { DataProvider } from 'shared-components';
import { getUnifiedHistory } from '@tenx-ui/utils/es/UnifiedLink/index.prod';

import { createAxiosHandler as __$$createAxiosRequestHandler } from '@yunti/lowcode-datasource-axios-handler';

import { create as __$$createDataSourceEngine } from '@alilc/lowcode-datasource-engine/runtime';

import utils, { RefsManager } from './utils/__utils';

import * as __$$i18n from './i18n';

import __$$constants from './__constants';

import './index.css';

class KubeAgiUpload$$Component extends React.Component {
  get history() {
    return this.props.self?.history;
  }
  get appHelper() {
    return this.props.self?.appHelper;
  }

  _context = this;

  _dataSourceConfig = this._defineDataSourceConfig();
  _dataSourceEngine = __$$createDataSourceEngine(this._dataSourceConfig, this, {
    runtimeConfig: true,
    requestHandlersMap: { axios: __$$createAxiosRequestHandler(utils.getAxiosHanlderConfig?.()) },
  });

  get dataSourceMap() {
    return this._dataSourceEngine.dataSourceMap || {};
  }

  reloadDataSource = async () => {
    await this._dataSourceEngine.reloadDataSource();
  };

  get constants() {
    return __$$constants || {};
  }

  constructor(props, context) {
    super(props);

    this.utils = utils;

    this._refsManager = new RefsManager();

    __$$i18n._inject2(this);

    this.state = {
      ids: [],
      bucket: 'xxyy',
      status: {
        // 文件处理状态： '初始状态'
      },
      urlPrex: 'http://172.22.96.17/kubeagi-apis/minio',
      progress: {
        // 文件上传进度： 0
      },
      bucket_path: 'dataset/test/v1',
      modalVisible: false,
      Authorization:
        'bearer eyJhbGciOiJSUzI1NiIsImtpZCI6ImI1MmViYzk1NWRiYjYyNzBiN2YyZDZiNzQ5YWQ0M2RlNmExNTg0MjYifQ.eyJpc3MiOiJodHRwczovL3BvcnRhbC4xNzIuMjIuOTYuMTM2Lm5pcC5pby9vaWRjIiwic3ViIjoiQ2dWaFpHMXBiaElHYXpoelkzSmsiLCJhdWQiOiJiZmYtY2xpZW50IiwiZXhwIjoxNzAwODEwNDY0LCJpYXQiOjE3MDA3MjQwNjQsImF0X2hhc2giOiJNWFpoRGhrVGVNOGg2OVYyT193Vl93IiwiY19oYXNoIjoiWHFfQXFKSllsN3VrQ1ZRWVFqak5IZyIsImVtYWlsIjoiYWRtaW5AdGVueGNsb3VkLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJncm91cHMiOlsic3lzdGVtOm1hc3RlcnMiLCJpYW0udGVueGNsb3VkLmNvbSIsIm9ic2VydmFiaWxpdHkiLCJyZXNvdXJjZS1yZWFkZXIiLCJvYnNldmFiaWxpdHkiXSwibmFtZSI6ImFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiYWRtaW4iLCJwaG9uZSI6IiIsInVzZXJpZCI6ImFkbWluIn0.p5r2XN0Jl19FsHv85meDrFExu-TneS7i5_ENsWMMa5ziAxJjC_mLjgeN-4CzdM9flN3U931mSO29H-b2lifLdf7bYwtSOuIMiwoBkklOEa2MQVGDybkgH4QTlaClYYNSVYL4o4ZLmt5CFL7t0cf8UTapeUZTynL1ZPPgLMepPoqvteuNx4rsXXPjmywMK_o8jMRVxPLSdpxAV0e75lEW6wjq-0kqg8j2BFXbIeiftKzlRwAUa6NYAQZxsQGhS7_C3zIymyndoqzK5rAflwiHOZRX_CgQS0MIym1uNkauuH7MekRB2y5h0PMwGZ6tVwvF_h8by8RgjS7lVOb8rxMDcg',
    };
  }

  $ = refName => {
    return this._refsManager.get(refName);
  };

  $$ = refName => {
    return this._refsManager.getAll(refName);
  };

  _defineDataSourceConfig() {
    const _this = this;
    return {
      list: [
        {
          id: 'get_chunks',
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/get_chunks`,
              isCors: true,
              method: 'GET',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000,
            };
          }.bind(_this),
        },
        {
          id: 'new_multipart',
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/new_multipart`,
              isCors: true,
              method: 'GET',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000,
            };
          }.bind(_this),
        },
        {
          id: 'get_multipart_url',
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/get_multipart_url`,
              isCors: true,
              method: 'GET',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000,
            };
          }.bind(_this),
        },
        {
          id: 'update_chunk',
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/update_chunk`,
              isCors: true,
              method: 'POST',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000000,
            };
          }.bind(_this),
        },
        {
          id: 'complete_multipart',
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/complete_multipart`,
              isCors: true,
              method: 'POST',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000000,
            };
          }.bind(_this),
        },
        {
          id: 'delete_files',
          type: 'axios',
          isInit: function () {
            return false;
          }.bind(_this),
          options: function () {
            return {
              uri: `${this.getUrlPrex()}/delete_files`,
              isCors: true,
              method: 'POST',
              params: {},
              headers: {
                Authorization: this.props.Authorization || this.state.Authorization,
              },
              timeout: 5000000,
            };
          }.bind(_this),
        },
      ],
    };
  }

  getBucket() {
    // namespace
    return this.props.bucket || this.state.bucket;
  }

  closeModal() {
    this.setState({
      modalVisible: false,
    });
  }

  computeMD5(file) {
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
    let chunkSize = 1024 * 1024 * 64;
    let chunks = Math.ceil(file.size / chunkSize);
    let currentChunk = 0;
    let spark = new (this.utils.SparkMD5 || this.props.SparkMD5).ArrayBuffer();
    let fileReader = new FileReader();
    let time = new Date().getTime();
    console.log('计算MD5...');
    this.setState({
      status: {
        ...this.state.status,
        [file.uid]: '计算MD5',
      },
    });
    file.totalChunkCounts = chunks;
    loadNext();
    fileReader.onload = e => {
      spark.append(e.target.result); // Append array buffer
      currentChunk++;
      if (currentChunk < chunks) {
        console.log(`第${currentChunk}分片解析完成, 开始第${currentChunk + 1}/${chunks}分片解析`);
        loadNext();
      } else {
        let md5 = spark.end();
        console.log(
          `MD5计算完成：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${file.size} 用时：${
            (new Date().getTime() - time) / 1000
          } s`
        );
        spark.destroy(); //释放缓存
        file.uniqueIdentifier = md5; //将文件md5赋值给文件唯一标识
        file.cmd5 = false; //取消计算md5状态
        // 2. computeMD5Success
        this.computeMD5Success(file);
      }
    };
    fileReader.onerror = () => {
      console.warn('oops, something went wrong.');
      file.cancel();
    };
    function loadNext() {
      let start = currentChunk * chunkSize;
      let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file.file || file, start, end));
    }
  }

  getUrlPrex() {
    return `${window.location.origin}/kubeagi-apis/minio`;
  }

  handleBack() {
    this.props?.handleSuccess();
  }

  onFileAdded(file, fileAllList) {
    // 文件夹和文件需要区分一下
    // 如果支持文件夹
    if (this.props?.isSupportFolder) {
      const list = this.state.fileList || [];
      const newList = [];
      fileAllList.forEach(item => {
        // 避免重复添加
        if (!list.some(ele => ele.webkitRelativePath === item.webkitRelativePath)) {
          newList.push(item);
        }
      });
      this.setState({
        fileList: [...(this.state.fileList || []), ...newList],
      });
    } else {
      this.setState({
        fileList: [...(this.state.fileList || []), file],
      });
    }
    this.props?.setState({
      uploadThis: this,
    });
    return false;
  }

  startUpload() {
    this.setState({
      ids: [...this.state.ids, file.uid],
      progress: {
        ...this.state.progress,
        [file.uid]: 0,
      },
      status: {
        ...this.state.status,
        [file.uid]: '初始状态',
      },
    });
    // 1. 计算MD5
    this.computeMD5(file);
  }

  handleDelete(file) {
    // const pageThis = this
    // return new Promise((resolve, reject) => {
    //   pageThis.getDataSourceMap().delete_files.load({
    //     files: [file.name],
    //     bucket: pageThis.getBucket(),
    //     bucket_path: pageThis.getBucketPath(),
    //   }).then(function (response) {
    //     resolve(response);
    //   }).catch(function (error) {
    //     reject(error);
    //   });
    // })
    this.setState({
      fileList: this.state.fileList?.filter(item => item.uid !== file.uid),
    });
    return true;
  }

  getBucketPath() {
    // bucket_path就是 dataset/<dataset-name>/ < version
    return this.props?.getBucketPath() || this.state.bucket_path;
  }

  handleReUpload() {
    this.props.handleReUpload();
    this.handleBack();
    this.setState({
      modalVisible: false,
    });
  }

  newMultiUpload(file) {
    const pageThis = this;
    return new Promise((resolve, reject) => {
      pageThis
        .getDataSourceMap()
        .new_multipart.load({
          totalChunkCounts: file.totalChunkCounts,
          md5: file.uniqueIdentifier,
          size: file.size,
          fileName: pageThis.props?.isSupportFolder ? file.webkitRelativePath : file.name,
          bucket: pageThis.getBucket(),
          bucket_path: pageThis.getBucketPath(),
        })
        .then(function (response) {
          file.uploadID = response?.uploadID;
          file.uuid = response?.uuid;
          resolve(response);
        })
        .catch(function (error) {
          pageThis.utils.notification.warnings({
            message: pageThis.i18n('i18n-boehucun'),
            errors: [error],
          });
          reject(error);
        });
    });
  }

  multipartUpload(file) {
    const pageThis = this;
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice,
      chunkSize = 1024 * 1024 * 64,
      chunks = Math.ceil(file.size / chunkSize),
      currentChunk = 0,
      fileReader = new FileReader(),
      time = new Date().getTime();
    function loadNext() {
      let start = currentChunk * chunkSize;
      let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
      fileReader.readAsArrayBuffer(blobSlice.call(file.file || file, start, end));
    }
    function checkSuccessChunks() {
      var index = successChunks.indexOf((currentChunk + 1).toString());
      if (index == -1) {
        return false;
      }
      return true;
    }
    function getUploadChunkUrl(currentChunk, partSize) {
      return new Promise((resolve, reject) => {
        pageThis
          .getDataSourceMap()
          .get_multipart_url.load({
            md5: file.uniqueIdentifier,
            uuid: file.uuid,
            uploadID: file.uploadID,
            size: partSize,
            chunkNumber: currentChunk + 1,
            bucket: pageThis.getBucket(),
            bucket_path: pageThis.getBucketPath(),
          })
          .then(function (response) {
            urls[currentChunk] = response?.url;
            resolve(response);
          })
          .catch(function (error) {
            pageThis.utils.notification.warnings({
              message: pageThis.i18n('i18n-boehucun'),
              errors: [error],
            });
            reject(error);
          });
      });
    }
    function uploadMinio(url, e) {
      return new Promise((resolve, reject) => {
        pageThis.utils.axios
          .put(url, e.target.result, {
            headers: {
              timeout: 5000000,
              Authorization: pageThis.props.Authorization || this.state.Authorization,
            },
          })
          .then(function (res) {
            pageThis.handleBack();
            etags[currentChunk] = res.headers.etag;
            resolve(res);
          })
          .catch(function (err) {
            pageThis.props.setState({
              hasCreate: true,
            });
            if (err?.code === 'ERR_NETWORK') {
              pageThis.setState({
                modalVisible: true,
                modalLink: url?.split('?')?.[0],
              });
            } else {
              pageThis.handleBack();
              pageThis.utils.notification.warnings({
                message: pageThis.i18n('i18n-boehucun'),
                errors: [err],
              });
            }
            console.log(err);
            reject(err);
          });
      });
    }
    function updateChunk(currentChunk) {
      return new Promise((resolve, reject) => {
        // axios.post(file.urlPrex + '/update_chunk', qs.stringify({
        //   uuid: file.uuid,
        //   chunkNumber: currentChunk + 1,
        //   etag: etags[currentChunk]
        // }))
        pageThis
          .getDataSourceMap()
          .update_chunk.load({
            uuid: file.uuid,
            chunkNumber: currentChunk + 1,
            etag: etags[currentChunk],
            bucket: pageThis.getBucket(),
            bucket_path: pageThis.getBucketPath(),
            md5: file.uniqueIdentifier,
          })
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            pageThis.utils.notification.warnings({
              message: pageThis.i18n('i18n-boehucun'),
              errors: [error],
            });
            reject(error);
          });
      });
    }
    async function uploadChunk(e) {
      if (!checkSuccessChunks()) {
        let start = currentChunk * chunkSize;
        let partSize = start + chunkSize >= file.size ? file.size - start : chunkSize;

        //获取分片上传url
        await getUploadChunkUrl(currentChunk, partSize);
        if (urls[currentChunk] != '') {
          //上传到minio
          await uploadMinio(urls[currentChunk], e);
          if (etags[currentChunk] != '') {
            //更新数据库：分片上传结果
            //await updateChunk(currentChunk);
          } else {
            return;
          }
        } else {
          return;
        }
      }
    }
    function completeUpload() {
      return new Promise((resolve, reject) => {
        // axios.post(file.urlPrex + '/complete_multipart', qs.stringify({
        //   uuid: file.uuid,
        //   uploadID: file.uploadID,
        //   file_name: file.name,
        //   size: file.size,
        // }))
        pageThis
          .getDataSourceMap()
          .complete_multipart.load({
            uuid: file.uuid,
            uploadID: file.uploadID,
            file_name: file.name,
            size: file.size,
            bucket: pageThis.getBucket(),
            bucket_path: pageThis.getBucketPath(),
            md5: file.uniqueIdentifier,
          })
          .then(function (response) {
            resolve(response);
            pageThis.props?.handleFinished && pageThis.props.handleFinished(file, response);
          })
          .catch(function (error) {
            pageThis.utils.notification.warnings({
              message: pageThis.i18n('i18n-boehucun'),
              errors: [error],
            });
            reject(error);
          });
      });
    }
    var successChunks = new Array();
    var successParts = new Array();
    successParts = file.chunks.split(',');
    for (let i = 0; i < successParts.length; i++) {
      successChunks[i] = successParts[i].split('-')[0];
    }
    var urls = new Array();
    var etags = new Array();
    console.log('上传分片...');
    this.setState({
      status: {
        ...this.state.status,
        [file.uid]: '上传中',
      },
    });
    {
      loadNext();
      fileReader.onload = async e => {
        await uploadChunk(e);
        currentChunk++;
        if (currentChunk < chunks) {
          console.log(
            `第${currentChunk}个分片上传完成, 开始第${currentChunk + 1}/${chunks}个分片上传`
          );
          this.setState({
            progress: {
              ...this.state.progress,
              [file.uid]: Math.ceil((currentChunk / chunks) * 100),
            },
          });
          await loadNext();
        } else {
          await completeUpload();
          console.log(
            `文件上传完成：${file.name} \n分片：${chunks} 大小:${file.size} 用时：${
              (new Date().getTime() - time) / 1000
            } s`
          );
          this.setState({
            progress: {
              ...this.state.progress,
              [file.uid]: 100,
            },
            status: {
              ...this.state.status,
              [file.uid]: '上传完成',
            },
          });
          //window.location.reload();
        }
      };
    }
  }

  getDataSourceMap() {
    return this.dataSourceMap;
  }

  getSuccessChunks(file) {
    const pageThis = this;
    return new Promise((resolve, reject) => {
      pageThis
        .getDataSourceMap()
        .get_chunks.load({
          md5: file.uniqueIdentifier,
          bucket: pageThis.getBucket(),
          bucket_path: pageThis.getBucketPath(),
        })
        .then(function (response) {
          file.uploadID = response?.uploadID;
          file.uuid = response?.uuid;
          file.uploaded = response?.uploaded;
          file.chunks = response?.chunks;
          resolve(response);
        })
        .catch(function (error) {
          pageThis.utils.notification.warnings({
            message: pageThis.i18n('i18n-boehucun'),
            errors: [error],
          });
          reject(error);
        });
    });
  }

  async computeMD5Success(file) {
    await this.getSuccessChunks(file);
    if (file.uploadID == '' || file.uuid == '') {
      //未上传过
      await this.newMultiUpload(file);
      if (file.uploadID != '' && file.uuid != '') {
        file.chunks = '';
        this.multipartUpload(file);
      } else {
        //失败如何处理
        this.setState({
          status: {
            ...this.state.status,
            [file.uid]: '上传失败',
          },
        });
        return;
      }
    } else {
      if (file.uploaded == '1') {
        //已上传成功
        //秒传
        console.log('文件已上传完成');
        this.setState({
          progress: {
            ...this.state.progress,
            [file.uid]: 100,
          },
          status: {
            ...this.state.status,
            [file.uid]: '上传完成',
          },
        });
        // 向父级通知这文件已经上传过的了
        this.props.calcUploadedFile && this.props.calcUploadedFile(file);
        //window.location.reload();
      } else {
        //断点续传
        this.multipartUpload(file);
      }
    }
  }

  componentDidMount() {}

  componentDidMount() {
    this._dataSourceEngine.reloadDataSource();
  }

  render() {
    const __$$context = this._context || this;
    const { state } = __$$context;
    return (
      <Component>
        <Modal
          mask={true}
          open={__$$eval(() => this.state.modalVisible)}
          title={this.i18n('i18n-msjvy7uv') /* 提示 */}
          footer={
            <Space __component_name="Space" direction="horizontal" align="center">
              <Button
                __component_name="Button"
                danger={false}
                ghost={false}
                shape="default"
                block={false}
                disabled={false}
                onClick={function () {
                  return this.closeModal.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
              >
                {this.i18n('i18n-zughatwk') /* 取消 */}
              </Button>
              <Button
                icon=""
                type="primary"
                block={false}
                ghost={false}
                shape="default"
                danger={false}
                onClick={function () {
                  return this.handleReUpload.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this)}
                disabled={false}
                __component_name="Button"
              >
                {this.i18n('i18n-uklfmuzu') /* 重新上传 */}
              </Button>
            </Space>
          }
          centered={false}
          keyboard={true}
          onCancel={function () {
            return this.closeModal.apply(this, Array.prototype.slice.call(arguments).concat([]));
          }.bind(this)}
          forceRender={false}
          maskClosable={false}
          confirmLoading={false}
          destroyOnClose={true}
          __component_name="Modal"
          style={{ width: '800px' }}
        >
          <Row wrap={true} __component_name="Row">
            <Col span={24} __component_name="Col">
              <Typography.Text
                style={{ fontSize: '' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                {this.i18n('i18n-432m045e') /* 文件上传失败，可能的原因包括： */}
              </Typography.Text>
            </Col>
            <Col span={24} __component_name="Col" style={{ display: 'flex', alignItems: 'center' }}>
              <Typography.Text
                style={{ fontSize: '' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                {this.i18n('i18n-mzls5g8w') /* 1. 证书不受信任。 */}
              </Typography.Text>
              <Button
                __component_name="Button"
                type="link"
                icon=""
                href={__$$eval(() => this.state.modalLink || '-')}
                danger={false}
                ghost={false}
                shape="default"
                block={false}
                disabled={false}
                style={{
                  paddingTop: '0px',
                  paddingBottom: '0px',
                  paddingLeft: '0px',
                  paddingRight: '0px',
                }}
                target="_blank"
              >
                {[
                  <Typography.Text
                    __component_name="Typography.Text"
                    ellipsis={true}
                    style={{ fontSize: '' }}
                    disabled={false}
                    strong={false}
                    type="colorPrimary"
                    key="node_oclpuxu40yg"
                  >
                    {this.i18n('i18n-ymkxjalg') /* 点击信任证书 */}
                  </Typography.Text>,
                  <TenxIconLinkTo
                    __component_name="TenxIconLinkTo"
                    color="#4461EB"
                    key="node_oclpuxu40yb"
                  />,
                ]}
              </Button>
            </Col>
            <Col span={24} __component_name="Col">
              <Typography.Text
                style={{ fontSize: '' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                {this.i18n('i18n-8qd53yxm') /* 2. 网络连接不稳定，请检查您的网络并稍后重试。 */}
              </Typography.Text>
            </Col>
            <Col span={24} __component_name="Col">
              <Typography.Text
                style={{ fontSize: '' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                {
                  this.i18n(
                    'i18n-qgsszrjb'
                  ) /* 3. 如果您使用了防火墙或安全软件，请确保其没有阻止文件上传。 */
                }
              </Typography.Text>
            </Col>
          </Row>
          <Typography.Paragraph
            ellipsis={false}
            style={{ fontSize: '', paddingTop: '20px' }}
            code={false}
            delete={false}
            disabled={false}
            editable={false}
            mark={false}
            underline={false}
            strong={false}
          >
            {
              this.i18n(
                'i18n-tl135yoj'
              ) /* 如果问题仍然存在，或者您需要进一步的帮助，请联系网站管理员或支持团队。 */
            }
          </Typography.Paragraph>
        </Modal>
        <FormilyForm
          ref={this._refsManager.linkRef('formily_KubeAGIUpload')}
          formHelper={{ autoFocus: true, className: 'formily_KubeAGIUpload' }}
          componentProps={{
            colon: false,
            layout: 'horizontal',
            labelCol: __$$eval(() => this.props?.labelSpan || 4),
            labelAlign: 'left',
            labelWidth: __$$eval(() => this.props?.labelWidth || '120px'),
            wrapperCol: __$$eval(() => this.props?.contentSpan || 20),
            wrapperWidth: __$$eval(() => this.props?.contentWidth || '600px'),
          }}
          __component_name="FormilyForm"
        >
          <FormilyUpload
            fieldProps={{
              name: 'Upload',
              title: __$$eval(() => this.props.label || this.i18n('i18n-b6z34has')),
              'x-component': 'FormilyUpload',
              'x-validator': [],
              _unsafe_MixedSetter_title_select: 'VariableSetter',
            }}
            componentProps={{
              'x-component-props': {
                disabled: false,
                onRemove: function () {
                  return this.handleDelete.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this),
                directory: __$$eval(() => this.props.isSupportFolder),
                beforeUpload: function () {
                  return this.onFileAdded.apply(
                    this,
                    Array.prototype.slice.call(arguments).concat([])
                  );
                }.bind(this),
              },
            }}
            decoratorProps={{ 'x-decorator-props': { labelEllipsis: true } }}
            __component_name="FormilyUpload"
          >
            <Flex
              align="center"
              style={{ border: '1px dashed #4461EB', height: '100px', borderRadius: '4px' }}
              justify="center"
              vertical={true}
              __component_name="Flex"
            >
              <AntdIconPlusOutlined
                style={{ color: '#4461EB', fontSize: '16' }}
                __component_name="AntdIconPlusOutlined"
              />
              <Typography.Text
                type="colorTextSecondary"
                style={{ fontSize: '', paddingTop: '16px', paddingBottom: '16px' }}
                strong={false}
                disabled={false}
                ellipsis={true}
                __component_name="Typography.Text"
              >
                {this.i18n('i18n-acu9gpik') /* 点击 / 拖拽文件到此区域上传 */}
              </Typography.Text>
              <Flex __component_name="Flex">
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-ui0fj2sq') /* 仅支持 */}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {__$$eval(() => this.props.accept || '-')}
                </Typography.Text>
                <Typography.Text
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-u0ndjcyg') /* 文件； */}
                </Typography.Text>
                <Typography.Text
                  type="colorTextSecondary"
                  style={{ fontSize: '', paddingLeft: '6px' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-1v40vm3l') /* 单文件大小 */}
                </Typography.Text>
                <Typography.Text
                  type="warning"
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-o9uxngg9') /* 不超过2G， */}
                </Typography.Text>
                <Typography.Text
                  type="colorTextSecondary"
                  style={{ fontSize: '' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-w3k0sm1r') /* 单次上传文件数量 */}
                </Typography.Text>
                <Typography.Text
                  type="warning"
                  style={{ fontSize: '', paddingLeft: '6px' }}
                  strong={false}
                  disabled={false}
                  ellipsis={true}
                  __component_name="Typography.Text"
                >
                  {this.i18n('i18n-07ryldck') /* 不超过20个 */}
                </Typography.Text>
              </Flex>
            </Flex>
          </FormilyUpload>
        </FormilyForm>
      </Component>
    );
  }
}

const ComponentWrapper = (props = {}) => {
  const history = getUnifiedHistory();
  const appHelper = {
    utils,
    history,
  };
  const self = {
    appHelper,
    ...appHelper,
  };
  return (
    <DataProvider
      self={self}
      sdkInitFunc={{
        enabled: undefined,
        func: 'undefined',
        params: undefined,
      }}
      sdkSwrFuncs={[]}
      render={dataProps => (
        <KubeAgiUpload$$Component {...props} {...dataProps} self={self} appHelper={appHelper} />
      )}
    />
  );
};
export default ComponentWrapper;

function __$$eval(expr) {
  try {
    return expr();
  } catch (error) {}
}

function __$$evalArray(expr) {
  const res = __$$eval(expr);
  return Array.isArray(res) ? res : [];
}

function __$$createChildContext(oldContext, ext) {
  const childContext = {
    ...oldContext,
    ...ext,
  };
  childContext.__proto__ = oldContext;
  return childContext;
}

import React, { useEffect, useContext, useState } from 'react';
import { Card, Form, Button, Tag } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import { QosOption } from '../index';
import ConnectIndicator from '../../components/connectIndicator/ConnectIndicator';
import TagLabel from '../../components/tagLabel/TagLabel';

const Publisher = ({ publish, topic, controller, connectStatus }) => {
  const [color, setColor] = useState('red');
  const [record, setRecord] = useState({
    topic: topic,
    qos: 0,
    payload: 'off',
  });

  const onFinish = () => {
    publish(record);
  };

  const [form] = Form.useForm();
  const qosOptions = useContext(QosOption);

  useEffect(() => {
    setColor(() => (record.payload === 'off' ? 'red' : 'green'));
  }, [record.payload, topic]);

  const PublishForm = (
    <>
      <Form
        layout="vertical"
        name="basic"
        form={form}
        initialValues={record}
        onFinish={onFinish}
      >
        <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {controller.widgetName && (
            <TagLabel
              style={{
                display: 'flex',
                fontFamily: 'Lucida Handwriting',
              }}
              label={'widget'}
              content={controller.widgetName}
              color={'red'}
            />
          )}
          {controller.createdBy && (
            <TagLabel
              style={{
                display: 'flex',
                fontFamily: 'Lucida Handwriting',
              }}
              label={'createdBy'}
              content={controller.createdBy}
              color={'cyan'}
            />
          )}
          <Tag
            style={{
              display: 'flex',
              fontFamily: 'Lucida Handwriting',
            }}
            color="geekblue"
          >
            Topic: {topic} <ConnectIndicator connectStatus={connectStatus} />
          </Tag>
        </span>

        <Button
          htmlType="submit"
          danger
          style={{
            height: '80px',
            borderRadius: '50px',
            marginTop: '5px',
            background: color,
            boxShadow: '10px 10px 38px 0px rgba(0, 0, 0, 0.75)',
          }}
          size="large"
          type="primary"
          icon={<PoweroffOutlined />}
          onClick={() => {
            setRecord(() => ({
              ...record,
              payload: record.payload === 'off' ? 'on' : 'off',
            }));
          }}
        />
      </Form>
    </>
  );

  return <Card title="Publisher">{PublishForm}</Card>;
};

export default Publisher;

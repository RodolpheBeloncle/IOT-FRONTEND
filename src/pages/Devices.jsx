import React, { useState, useEffect, useCallback } from 'react';
import '../pages/styles/devices.css';
import { Row } from 'antd';
import axios from 'axios';
import CardDevice from '../components/CardDevice';
import CustomFormModal from '../components/CustomFormModal';

const Devices = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [devices, setDevices] = useState([]);

  // const getDevicesList = async () => {
  //   axios
  //     .get(import.meta.env.VITE_REACT_APP_API_DEVICES)
  //     .then((res) => {
  //       console.log('Devices : ', res.data);
  //       setDevices(res.data);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const getDevicesList = useCallback(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_API_DEVICES)
      .then((res) => {
        console.log('Devices : ', res.data);
        setDevices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    getDevicesList();
  }, []);
  return (
    <>
      <Row className="row" span={4}>
        <CustomFormModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </Row>
      <div className="home">
        {devices?.length > 0 ? (
          devices.map((controller, index) => (
            <Row key={index} className="row" span={4}>
              <CardDevice key={controller.id} controllersIOT={controller} />
            </Row>
          ))
        ) : (
          <span>No Devices to display</span>
        )}
      </div>
    </>
  );
};

export default Devices;

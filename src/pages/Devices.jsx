import React, { useState, useEffect } from 'react';
import '../pages/styles/devices.css';
import { Row } from 'antd';
import { HashRouter } from 'react-router-dom';
import axios from 'axios';
import CardDevice from '../components/CardDevice';
import CustomFormModal from '../components/CustomFormModal';

const Devices = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_REACT_APP_API_URL)
      .then((res) => {
        console.log('controllers', res.data);
        setDevices(res.data);
      })
      .catch((err) => console.log(err));
  }, [isOpenModal]);

  return (
    <>
    

      <Row className="row" span={4}>
        <CustomFormModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </Row>
      <div className="home">
        {devices.map((controller, index) => (
          <Row key={index} className="row" span={4}>
            <CardDevice key={controller.id} controllersIOT={controller} />
          </Row>
        ))}
      </div>
    </>
  );
};

export default Devices;

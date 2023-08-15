import React, { useState, useEffect, useCallback, useContext } from 'react';
import { ColorModeContext, tokens } from '../theme';
import '../pages/styles/devices.css';
import { Row } from 'antd';
import axios from '../services/axiosInterceptor';
// import axios from 'axios';
import CardDevice from '../components/CardDevice';
import { UserContext } from '../context/UserContextProvider';
import CustomFormModal from '../components/customFormModal/CustomFormModal';
import { useTheme } from '@mui/material';
import jwtDecode from 'jwt-decode';
import { TextField } from '@mui/material';

const Devices = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [devices, setDevices] = useState([]);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const { getCookie, userInfo } = useContext(UserContext);

  const getDevicesList = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_API_DEVICES);
      setDevices(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = devices.filter((item) => {
    const { type, widgetName, topic } = item;
    const searchTermLowerCase = searchTerm.toLowerCase();
    return (
      type.toLowerCase().includes(searchTermLowerCase) ||
      widgetName.toLowerCase().includes(searchTermLowerCase) ||
      topic.toLowerCase().includes(searchTermLowerCase)
    );
  });

  useEffect(() => {
    getDevicesList(); // Fetch devices data once when the component mounts
  }, []); // Empty dependency array to run the effect only once

  console.log('test', devices);
  return (
    <>
      {/* <Row className="row" span={4} style={{ margin: '10px' }}> */}
      {userInfo.role === 'admin' && (
        <CustomFormModal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          userInfo={userInfo}
        />
      )}
      {/* </Row> */}
      {/* SEARCH BAR */}
      <TextField
        style={{ margin: '20px' }}
        label="Search"
        variant="outlined"
        placeholder={`Search by keyword `}
        value={searchTerm}
        onChange={handleSearch}
        // fullWidth
        inputProps={{ style: { fontSize: 18 } }}
        InputLabelProps={{ style: { fontSize: 18 } }}
      />

      <div className="home">
        {filteredData?.length > 0 ? (
          filteredData.map((controller, index) => (
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

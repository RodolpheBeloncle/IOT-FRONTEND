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

  console.log('DECODEEDtoken', jwtDecode(getCookie('token')));

  const getDevicesList = useCallback(() => {
    axios
      .get(import.meta.env.VITE_API_DEVICES)
      .then((res) => {
        console.log('Devices : ', res.data);
        setDevices(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

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
    getDevicesList();
  }, []);
  return (
    <>
      <Row className="row" span={4} style={{ margin: '10px' }}>
        <CustomFormModal
          userInfo={userInfo}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </Row>
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

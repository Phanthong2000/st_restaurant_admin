import React from 'react';
import {
  Avatar,
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const run = keyframes`
    0% {
      left: 0;
      transform: translateX(-100%);
    }
    100% {
      left: 0;
      transform: translateX(0);
    }`;
const RootStyle = styled(Box)(({ theme }) => ({
  width: '100%'
}));
function TableNewUser() {
  const customersKeyword = useSelector((state) => state.customer.customersKeyword);
  const navigate = useNavigate();
  const header = [
    {
      name: 'Khách hàng',
      width: '70%'
    },
    {
      name: 'Thời gian tham gia',
      width: '30%'
    }
  ];
  const goToCustomer = () => {
    navigate(`/home/customer`);
  };
  return (
    <RootStyle>
      <Box>
        <TableContainer
          sx={{
            borderRadius: '10px',
            marginTop: '10px',
            border: `1px solid lightgrey`,
            padding: '10px'
          }}
        >
          <Table>
            <TableHead>
              <TableRow>
                {header.map((item, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      width: item.width,
                      color: '#000',
                      paddingTop: '0px',
                      paddingBottom: '0px',
                      textAlign: 'left',
                      fontWeight: 'bold'
                    }}
                  >
                    {item.name}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {customersKeyword.slice(0, 5).map((item, index) => (
                <TableRow sx={{ animation: `${run} ${0.5 + index / 3}s ease` }} key={index}>
                  <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar src={item.anhDaiDien} />
                    <Box sx={{ marginLeft: '10px' }}>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '14px' }}>
                        {item.hoTen}
                      </Typography>
                      <Typography sx={{ fontWeight: 'bold', fontSize: '12px', color: 'gray' }}>
                        SĐT: {item.soDienThoai}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment(Date.parse(item.createAt)).format(`hh:mm a DD/MM/YYYY`)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography
              onClick={goToCustomer}
              sx={{
                color: '#000',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginTop: '5px',
                '&:hover': { color: 'gray' }
              }}
            >
              Xem thêm
            </Typography>
          </Box>
        </TableContainer>
      </Box>
    </RootStyle>
  );
}

export default TableNewUser;

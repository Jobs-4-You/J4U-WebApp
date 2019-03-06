import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

export const MenuContainer = styled('div')`
  display: flex
  align-items: center;

`

export const GrowTypo = styled(Typography)`
  margin-right: 50px !important;
`;

export const ModalContent = styled(Paper)`
  position: absolute;
  top: 1%;
  margin-left: -200px !important;
  left: 50%;
  :hover {
    background-color: rgba(0,0,0,0) !important;
  }
`;
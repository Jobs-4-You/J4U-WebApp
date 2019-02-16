import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';

export const ModalContent = styled(Paper)`
  position: absolute;
  top: 1%;
  margin-left: -200px !important;
  left: 50%;
  :hover {
    background-color: rgba(0,0,0,0) !important;
  }
`;
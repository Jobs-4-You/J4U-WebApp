import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

export const Root = styled.div`
  flex-grow: 1;
`;

export const MenuButton = styled(IconButton)`
  margin-left: -12;
  margin-right: 20;
`;

export const GrowTypo = styled(Typography)`
  flex-grow: ${props => props.grow};
  margin-right: 50px !important;
`;

export const AccountIcon = styled(AccountCircle)`
  vertical-align: middle;
  margin-right: 10px;
  font-size: 32px !important;
`;
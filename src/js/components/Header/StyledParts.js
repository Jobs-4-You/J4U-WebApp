import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

export const Root = styled.div`
  flex-grow: 1;
`;
export const MenuButton = styled(IconButton)`
  margin-left: -12;
  margin-right: 20;
`
export const GrowTypo = styled(Typography)`
  flex-grow: ${porops => porops.grow};
  margin-right: 50px !important;
`
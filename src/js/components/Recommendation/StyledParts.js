import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/lab/Slider';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

export const FullTypo = styled(Typography)`
  width: 100%;
`;

export const Loader = styled(CircularProgress)`
  margin: auto;
`;

export const FormContainer = styled.div`
  margin: 50px auto;
  max-width: 50%;
  text-align: center;
`;

export const StyledSlider = styled(Slider)`
  padding-top: 10px;
  padding-bottom: 10px;
`

export const Submit = styled(Button)`
  width: 150px !important;
  margin: auto !important;
  margin-top: 30px !important;
`

export const ResContainer = styled.div`
  margin: 50px;
`;

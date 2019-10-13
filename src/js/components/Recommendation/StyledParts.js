import styled from 'styled-components';
import Paper from '@material-ui/core/Paper';
import Slider from '@material-ui/core/Slider';
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
`;

export const Submit = styled(Button)`
  width: 150px !important;
  margin: auto !important;
  margin-top: 30px !important;
`;

export const ResContainer = styled.div`
  margin: 50px;
`;

export const Pre = styled.pre`
  white-space: pre-wrap;
  font-size: 0.875rem;
  font-weight: 400;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  line-height: 1.46429em;
`;

export const JobBit = styled.span`
  display: inline-block;
  padding: .25em .4em;
  font-size: 85%;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  background-color: #eee;
  font-weight: 400;
  border: 1px solid #ccc;
  border-radius: 1px;
  margin-right: 0.5rem;
`;
import { Container } from 'unstated';
import { recomQuery, searchQuery } from 'js/data';

class ErrorContainer extends Container {

  state = {
    message: '',
    open: false,
  }

  displayError = (message) => {
    this.setState({
      message,
      open: true,
    });
  }

  onClose = () => {
    this.setState({
      open: false,
    });
  }
}

export default ErrorContainer;
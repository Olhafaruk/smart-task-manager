import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

test('App renders', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  );
});

import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import {default as Main} from './containers/SurveyContainer';
import {default as Preview} from './containers/PreviewContainer';
import Header from './components/Header';

export const Router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <>
            <Header />
            <Main />
          </>
        ),
      },
      {
        path: '/preview',
        element: <Preview />,
      },
    ],
  },
]);

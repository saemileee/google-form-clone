import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import {default as Main} from './containers/SurveyPostFormContainer';
import {default as Preview} from './containers/SurveyPreviewFormContainer';
import {default as Result} from './containers/SurveyResultContainer';

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
      {
        path: '/result',
        element: <Result />,
      },
    ],
  },
]);

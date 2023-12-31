import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import {default as Main} from './containers/SurveyBuilderContainer';
import {default as Preview} from './containers/SurveyPreviewContainer';
import {default as Result} from './containers/SurveyResultContainer';

import Header from './components/common/Header';
import NotFound from './containers/NotFound';
import ErrorBoundary from './components/ErrorBoundary';

export const Router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      {
        path: '/',
        element: (
          <ErrorBoundary>
            <Header />
            <Main />
          </ErrorBoundary>
        ),
      },
      {
        path: '/preview',
        element: (
          <ErrorBoundary>
            <Preview />
          </ErrorBoundary>
        ),
      },
      {
        path: '/result',
        element: (
          <ErrorBoundary>
            <Result />
          </ErrorBoundary>
        ),
      },
    ],
    errorElement: <NotFound />,
  },
]);

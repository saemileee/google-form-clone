import {createBrowserRouter} from 'react-router-dom';
import App from './App';
import {default as Main} from './containers/SurveyContainer';
import {default as Preview} from './containers/PreviewContainer';

export const Router = createBrowserRouter([
    {
        path: '',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Main />,
            },
            {
                path: '/preview',
                element: <Preview />,
            },
        ],
    },
]);

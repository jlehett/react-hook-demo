import ReactDOM from 'react-dom';
import Root from './root/root';
import './robots.txt';

const render = Component => {
    ReactDOM.render(
        <Component/>,
        document.getElementById('root'),
    );
}

render(Root);
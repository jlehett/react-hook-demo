import {
    Routes,
    Route,
} from 'react-router-dom';
import App from '@root/app';
import Home from '@views/home';

export default (
    <Routes>
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
        </Route>
    </Routes>
);

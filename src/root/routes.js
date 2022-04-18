import {
    Routes,
    Route,
} from 'react-router-dom';
import App from '@root/app';
import Home from '@views/home';
import ExamplesWrapper from '@views/examples/wrapper';
import UseState_Simple from '@views/examples/use-state/simple';

const pageOrdering = [
    <UseState_Simple/>,
    <UseState_Simple/>,
    <UseState_Simple/>,
];

const pageRoutes = () => {
    const routes = [];
    for (let i = 1; i <= pageOrdering.length; i++) {
        routes.push(<Route path={`/presentation/:slideIndex/${i}`} element={pageOrdering[i-1]}/>);
    }
    return routes;
};

export default (
    <Routes>
        <Route path="/" element={<App/>}>
            <Route index element={<Home/>}/>
            <Route path="/presentation/:slideIndex" element={<ExamplesWrapper pageOrdering={pageOrdering}/>}>
                {pageRoutes()}
            </Route>
        </Route>
    </Routes>
);

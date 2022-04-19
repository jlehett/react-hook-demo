import {
    Routes,
    Route,
} from 'react-router-dom';
import App from '@root/app';
import Home from '@views/home';
import ExamplesWrapper from '@views/examples/wrapper';
import UseState_NoState from '@views/examples/use-state/no-state';
import UseState_NoStateReset from '@views/examples/use-state/no-state-reset';
import UseState_Simple from '@views/examples/use-state/simple';
import UseState_UpdateBatching from '@views/examples/use-state/update-batching';

const pageOrdering = [
    <UseState_NoState/>,
    <UseState_NoStateReset/>,
    <UseState_Simple/>,
    <UseState_UpdateBatching/>,
];

const pageRoutes = () => {
    const routes = [];
    for (let i = 1; i <= pageOrdering.length; i++) {
        routes.push(<Route key={i} path={`/presentation/:slideIndex/${i}`} element={pageOrdering[i-1]}/>);
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

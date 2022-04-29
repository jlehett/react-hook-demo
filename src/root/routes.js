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
import UseEffect_BasicEffect from '@views/examples/use-effect/basic-effect';
import UseEffect_EffectCleanup from '@views/examples/use-effect/effect-cleanup';
import UseEffect_ClassLifecycleReplacement from '@views/examples/use-effect/class-lifecycle-replacement';
import UseContext_BasicContext from '@views/examples/use-context/basic-context';
import UseContext_MultipleProviders from '@views/examples/use-context/multiple-providers';
import UseContext_UpdatingContextBadPerformance from '@views/examples/use-context/updating-context-bad-performance';
import UseContext_UpdatingContextGoodPerformance from '@views/examples/use-context/updating-context-good-performance';
import UseContext_UpdatingContextMorePerformanceConcerns from '@views/examples/use-context/updating-context-more-performance-concerns';
import UseContext_UpdatingContextSplittingControls from '@views/examples/use-context/updating-context-splitting-controls';

const pageOrdering = [
    <UseState_NoState/>,
    <UseState_NoStateReset/>,
    <UseState_Simple/>,
    <UseState_UpdateBatching/>,
    <UseEffect_BasicEffect/>,
    <UseEffect_EffectCleanup/>,
    <UseEffect_ClassLifecycleReplacement/>,
    <UseContext_BasicContext/>,
    <UseContext_MultipleProviders/>,
    <UseContext_UpdatingContextBadPerformance/>,
    <UseContext_UpdatingContextGoodPerformance/>,
    <UseContext_UpdatingContextMorePerformanceConcerns/>,
    <UseContext_UpdatingContextSplittingControls/>,
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

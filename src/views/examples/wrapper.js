import {
    useNavigate,
    useParams,
    Outlet,
} from 'react-router-dom';
import {
    Button,
} from '@mui/material';
import localStyles from './wrapper.styles.scss';

/**
 * Wrapper for the examples.
 */
const ExamplesWrapper = ({
    pageOrdering,
}) => {
    /*********
     * HOOKS *
     *********/

    /**
     * Use the "navigate" function from react-router-dom.
     */
    const navigate = useNavigate();

    /**
     * Use the slide index param.
     */
    const { slideIndex } = useParams();

    /*************
     * FUNCTIONS *
     *************/

    /********************
     * RENDER FUNCTIONS *
     ********************/

    /**
     * Main render.
     */
    return (
        <div className="page">
            <Outlet/>
            <section className={localStyles.navigationSection}>
                {
                    Number(slideIndex) > 1
                        ? (
                            <Button
                                variant="contained"
                                className={localStyles.backButton}
                                onClick={() => navigate(`/presentation/${Number(slideIndex)-1}/${Number(slideIndex)-1}`)}
                            >
                                Back
                            </Button>
                        )
                        : <span/>
                }
                {
                    Number(slideIndex) < pageOrdering.length
                        ? (
                            <Button
                                variant="contained"
                                className={localStyles.nextButton}
                                onClick={() => navigate(`/presentation/${Number(slideIndex)+1}/${Number(slideIndex)+1}`)}
                            >
                                Next
                            </Button>
                        )
                        : <span/>
                }
            </section>
        </div>
    );
};

export default ExamplesWrapper;
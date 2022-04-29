import {
    useContext,
    createContext,
} from 'react';

// Default theme definition
const defaultTheme = {
    foreground: '#F4743B', // orange
    background: '#483C46', // lighter gray
};

// Theme from the top Provider
const topProviderTheme = {
    foreground: '#D9FFF5', // mint green
    background: '#1D1E18', // darker gray
};

// Theme from the Lower Provider
const lowerProviderTheme = {
    foreground: '#37FF8B', // bright green
    background: '#522B29', // brown
};

// Example context tracking a theme
const ThemeContext = createContext(defaultTheme);

/**
 * Example of using a basic context.
 */
const BasicContext = ({

}) => {
    
    // Use the theme context
    const theme = useContext(ThemeContext);

    // Main render
    return (
        <div className="column">
            <p style={{ color: theme.foreground, background: theme.background, padding: '20px' }}>
                This is using the theme context!
            </p>
        </div>
    );
};

/**
 * Wrapper to provide the theme context.
 */
const Wrapper = () => {

    return (
        <>
            <div>
                <h1>
                    Multiple Providers
                </h1>
                <p>
                    When multiple providers are in use, the closest parent provider will provide the value that
                    the child component uses.
                </p>
            </div>
            <div className="column">

                <div>
                    <h2>No Provider</h2>
                    <BasicContext/>
                </div>

                <ThemeContext.Provider value={topProviderTheme}>

                    <div>
                        <h2>Top Provider</h2>
                        <BasicContext/>
                    </div>

                    <ThemeContext.Provider value={lowerProviderTheme}>

                        <div>
                            <h2>Lower Provider</h2>
                            <BasicContext/>
                        </div>

                    </ThemeContext.Provider>

                </ThemeContext.Provider>
            </div>
        </>
    )
};

export default Wrapper;
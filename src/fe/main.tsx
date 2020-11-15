import React from "react";
import ReactDOM from "react-dom";

// Styles object.
const styles: Record<string, React.CSSProperties> = {
    container: {
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center"
    },
    title: {
        fontSize: "3rem"
    },
    pre: {
        fontFamily: 'Consolas,"courier new"',
        color: "crimson",
        backgroundColor: "#e7dada",
        padding: "1rem",
        fontSize: "105%",
        borderRadius: "7px"
    }
};

// Declare the typeof `jsCallbackExample` to satisfy the TSC!
declare global {
    function jsCallbackExample(msg: string): Promise<Record<string, string>>;
}

// Executes the `jsCallbackExample` function
// and return it's result or an empty object.
async function requestOsInfo(): Promise<Record<string, string>> {
    try {
        return await jsCallbackExample("Can you send me the OS info, please?");
    } catch (err) {
        console.log(err);
        return {};
    }
}

// Our main React component!
function App() {
    const [state, setState] = React.useState({});

    React.useEffect(() => {
        // Requests the OS info from the Go app
        // and assign it to the 'sate'.
        requestOsInfo().then(setState);
    }, [setState]);

    // Render the basic view including the requests OS info!
    return (
        <div style={styles.container}>
            <div>
                <h1 style={styles.title}>Hello, Webview!</h1>
                <pre style={styles.pre}>
                    <code>{JSON.stringify(state, null, 4)}</code>
                </pre>
            </div>
        </div>
    );
}

// Render the app to the view, like a traditional React app!
ReactDOM.render(<App />, document.querySelector("main#app"));

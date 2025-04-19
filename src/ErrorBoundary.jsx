// class components aren't deprecated, but they aren't really used either.
// hooks cannot be used within class components.
// error boundaries can only be done with class components, but brian holt recommends
// usng a plugin called react-error-boundaries instead of writing them yourself.
import { Component } from "react";

class ErrorBoundary extends Component {
    state = { hasError: false }
    static getDerivedStateFromError() {
        // static methods are called directly on the uninstantiated class; not on an instance of ErrorBoundary
        return { hasError: true }
    }
    componentDidCatch(error, info) {
        console.error("ErrorBoundary caught some error", error, info);
    }

    // these functions do a similar job to hooks within class components
    // componentDidMount() {}
    // componentWillUnmount() {}
    // componentDidUpdate() {}
    // this.setState({
    //     key: value,
    // });

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <h2>uh oh :/</h2>
                    <p>
                        There was an error with this page. <Link to="/">Click here</Link> to go back to the home page.
                    </p>
                </div>
            );
        }
        return this.props.children;
    }
}

// this is how we would use a custom hook in a class component
// function EBWithHooks() {
//     const potd = usePizzaOfTheDay()
//     return <ErrorBoundary potd={potd} />
// }

export default ErrorBoundary;

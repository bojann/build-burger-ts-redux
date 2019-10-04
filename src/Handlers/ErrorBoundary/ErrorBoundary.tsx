import React from "react"
import styled from "@emotion/styled"

interface Props {
    errorMsg: string,
}
interface State {
    hasError: boolean,
    error: Error | null,
    errorInfo: React.ErrorInfo | null,
}

const ERROR_DIV = styled("div")`
    font-size: 2rem;
    color: red;
    padding: 10px;
    background: #e0bc964d;
`

export default class ErrorBoundary extends React.Component<Props, State> {
    public state:State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };
    public componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log('%c log error  BA: ', 'background: yellow;', error);
        console.log('%c log errorInfo BA: ', 'background: orange;', errorInfo);
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    public render() {
        if (this.state.hasError && this.props.errorMsg) {
            return <ERROR_DIV>{this.props.errorMsg}</ERROR_DIV>
        } else if (this.state.hasError) {
            return <ERROR_DIV>Something went wrong.</ERROR_DIV>
        }
        return this.props.children;
    }

}

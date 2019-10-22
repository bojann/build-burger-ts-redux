import React from "react";
import styled from "@emotion/styled";

interface Props {
    errorMsg?: string,
}
interface State {
    hasError: boolean,
    error: Error | null,
    errorInfo: React.ErrorInfo | null,
}

const ERRORDIV = styled("div")`
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
        console.error('%c log error  BA: ', 'background: yellow;', error);
        console.error('%c log errorInfo BA: ', 'background: orange;', errorInfo);
        this.setState({
            hasError: true,
            error,
            errorInfo,
        });
    }

    public render() {
        if (this.state.hasError && this.props.errorMsg) {
            return <ERRORDIV>{this.props.errorMsg}</ERRORDIV>
        } else if (this.state.hasError) {
            return <ERRORDIV>Something went wrong.</ERRORDIV>
        }
        return this.props.children;
    }

}

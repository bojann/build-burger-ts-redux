import React from "react"
import { render } from "@testing-library/react"
import ErrorBoundary from "../../../Handlers/Errors/ErrorBoundary";
import Layout from "../../../component/Layout/Layout";

class BrokenFakeComponent extends React.Component {
    render() {
        return (
            null.map(el => el + 1)
        )
    }
}

beforeEach(() => {
    jest.spyOn(console, "error")
    console.error.mockImplementation(() => {})
})

afterEach(() => {
    console.error.mockRestore()
})

describe("++++++++++++ ErrorBoundary tests", () => {
    test("show component if no render errors", () => {
        const { container } = render(
            <ErrorBoundary>
                <span>test</span>
            </ErrorBoundary>
        )

        expect(container.querySelector("span")).toContainHTML("<span>test</span>")
    });

    test("show default error message when render app breaks", () => {
        const { getByText } = render(
            <ErrorBoundary>
                <Layout>
                    <BrokenFakeComponent />
                </Layout>
            </ErrorBoundary>            
        )
        
        expect(getByText("Something went wrong.")).toBeVisible();
        expect(getByText("Something went wrong.")).toBeInTheDocument();
    });

    test("show custom error message when render app breaks", () => {
        const { getByText, container } = render(
            <ErrorBoundary errorMsg="ERROR MESSAGE">
                <Layout>
                    <BrokenFakeComponent />
                </Layout>
            </ErrorBoundary>
        )

        expect(getByText("ERROR MESSAGE")).toBeInTheDocument();
        expect(getByText("ERROR MESSAGE")).toBeVisible();
    });
})


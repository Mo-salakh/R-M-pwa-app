import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            hasError: false
        }
    }

    static getDerivedStateFromError(error) {
        console.log(error);
        return {
            hasError: true
        }
    }

    render() {
        if(this.state.hasError) {
            return <h3 style={{
                textAlign: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh'
            }}>
                Что-то пошло не так
            </h3>
        }
        // eslint-disable-next-line react/prop-types
        return this.props.children
    }
    
}

export default ErrorBoundary
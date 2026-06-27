import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("App crashed:", error, info);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.history.back();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="bg-white rounded-xl shadow p-8 max-w-md text-center">
            <h1 className="text-xl font-bold text-red-600 mb-2">Something went wrong</h1>
            <p className="text-gray-600 text-sm mb-4 break-words">
              {this.state.error?.message || "Unknown error"}
            </p>
            <button
              onClick={this.handleReset}
              className="bg-[var(--color-navy)] text-white px-5 py-2 rounded-lg font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

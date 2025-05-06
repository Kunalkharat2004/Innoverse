import React from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

class QueryDevtoolsErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console
    console.error("ReactQueryDevtools error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // No need to render anything when devtools fail
      return null;
    }

    return this.props.children;
  }
}

const QueryDevtools = () => {
  // Only render in development
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <QueryDevtoolsErrorBoundary>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryDevtoolsErrorBoundary>
  );
};

export default QueryDevtools;

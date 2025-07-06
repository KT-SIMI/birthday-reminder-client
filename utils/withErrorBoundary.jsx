import ErrorBoundary from './ErrorBoundary';

const withErrorBoundary = (Component) => (props) =>
  (
    <ErrorBoundary>
      <Component {...props} />
    </ErrorBoundary>
  );

export default withErrorBoundary;
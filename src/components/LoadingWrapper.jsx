const LoadingWrapper = ({ isLoading, dataLength, children }) => {
  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Exploring the universe...</p>
      </div>
    );
  }

  if (dataLength === 0) {
    return <div className="no-data">No results found in this galaxy.</div>;
  }

  return <>{children}</>;
};

export default LoadingWrapper;
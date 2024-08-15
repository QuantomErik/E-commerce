import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button className="scroll-to-top-button" onClick={handleScrollToTop}>
      Back to Top
    </button>
  );
};

export default ScrollToTopButton;

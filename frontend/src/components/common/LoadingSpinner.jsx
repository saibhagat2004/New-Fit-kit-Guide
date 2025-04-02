// eslint-disable-next-line react/prop-types


const LoadingSpinner = ({size}) => {
	const sizeClass = `loading-${size}`;

	return <span className={`loading loading-spinner ${sizeClass}`} />;
};
export default LoadingSpinner;
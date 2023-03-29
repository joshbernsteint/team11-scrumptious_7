const ProgressBar = (props) => {
    //followed tutorial here https://dev.to/ramonak/react-how-to-create-a-custom-progress-bar-component-in-5-minutes-2lcl
    const { bgcolor, completed } = props;

    const bar = {
        height: 20,
        width: '80%',
        backgroundColor: "#e0e0de",
        borderRadius: 70,
        margin: 20
    }

    const barFill = {
        backgroundColor: bgcolor,
        width: `${completed}%`,
        height: '100%',
        borderRadius: 'inherit',
        textAlign: 'right'
    }

    const writing = {
        fontWeight: 'bold',
        padding: 5,
        color: 'white',
    }

    return (
    <div style={bar}>
        <div style={barFill}>
        <span style={writing}>{`${completed}%`}</span>
        </div>
    </div>
    );
};
export default ProgressBar
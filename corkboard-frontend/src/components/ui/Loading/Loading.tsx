import "./Loading.scss";

const Loading = () => {
    return (
        <div className="loading">
            {Array.from({ length: 4 }).map((_, i) => (
                <div className="line" key={i}></div>
            ))}
        </div>
    );
};

export default Loading;

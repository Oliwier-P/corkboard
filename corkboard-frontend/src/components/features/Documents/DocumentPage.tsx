import "./DocumentPage.scss";

interface DocumentPageProps {
    id: string;
}

const DocumentPage = ({ id }: DocumentPageProps) => {
    return <div>Document id: {id}</div>;
};

export default DocumentPage;

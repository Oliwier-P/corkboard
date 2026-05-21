import "./Documents.scss";
import DocumentsNav from "./DocumentsNav/DocumentsNav.tsx";
import DocumentPage from "./DocumentPage.tsx";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Documents = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        if (!documentId || documentId === "null") navigate("/workspaces/1/document/1");
    }, [documentId, navigate]);

    return (
        <div className="documents">
            <DocumentsNav />

            {documentId && <DocumentPage id={documentId} />}
        </div>
    );
};

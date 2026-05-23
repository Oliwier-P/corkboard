import "./Documents.scss";
import DocumentsNav from "./DocumentsNav/DocumentsNav.tsx";
import DocumentPage from "./DocumentPage.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkspaceStore } from "../../../store/workspaceStore.ts";
import { api } from "../../../api/api.ts";
import type { DocumentType } from "../../../types/DocumentType.ts";

export const Documents = () => {
    const { documentId } = useParams();
    const navigate = useNavigate();
    const workspace = useWorkspaceStore((state) => state.workspace);
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        api.get("/documents", { params: { workspace_id: workspace?.id } }).then((response) => {
            setDocuments(response.data);
            setLoading(false);
        });
    }, [documentId, navigate]);

    if (loading) {
        return <div className="page-status">Loading...</div>;
    }

    return (
        <div className="documents">
            <DocumentsNav documents={documents} setDocuments={setDocuments} />

            {!!documentId ? (
                <DocumentPage document={documents.find((d) => d.id === Number(documentId)) ?? documents[0]} />
            ) : documents.length > 0 ? (
                <div className="page-status">Choose document</div>
            ) : (
                <div className="page-status">Create new document</div>
            )}
        </div>
    );
};

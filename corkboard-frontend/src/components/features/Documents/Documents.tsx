import "./Documents.scss";
import DocumentsNav from "./DocumentsNav/DocumentsNav.tsx";
import DocumentPage from "./DocumentPage.tsx";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import { useDocumentsSubscription } from "@/features/Documents/useDocumentsSubscription.ts";
import { useAuth } from "@/context/auth/useAuth.ts";
import Loading from "@/ui/Loading/Loading.tsx";
import type { DocumentType } from "@/types/DocumentType.ts";
import { documentsApi } from "@/api/documents.ts";

export const Documents = () => {
    const { documentId } = useParams();
    const { user } = useAuth();
    const workspace = useWorkspaceStore((state) => state.workspace);
    const [documents, setDocuments] = useState<DocumentType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const navigate = useNavigate();

    useDocumentsSubscription(workspace?.id, user?.id, setDocuments);

    useEffect(() => {
        if (!workspace) return;

        documentsApi.getAll(workspace.id, (response) => {
            setDocuments(response);
            setLoading(false);
        });
    }, [documentId, navigate, workspace]);

    if (loading) return <Loading overlay={true} />;

    return (
        <div className="documents">
            <DocumentsNav
                documents={documents}
                onAdd={(response) => {
                    setDocuments((prev) => [...prev, response]);
                }}
            />

            {documents.length > 0 ? (
                <DocumentPage
                    key={documentId}
                    document={documents.find((d) => d.id === documentId) ?? documents[0]}
                    onUpdate={(response) => setDocuments((prev) => prev.map((d) => (d.id === response.id ? response : d)))}
                />
            ) : documents.length > 0 ? (
                <div className="page-status">Choose document</div>
            ) : (
                <div className="page-status">Create new document</div>
            )}
        </div>
    );
};

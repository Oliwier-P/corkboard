import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";
import { cable } from "@/lib/cable.ts";
import type { DocumentType } from "@/types/DocumentType.ts";

type DocumentsEvent =
    | { type: "document_created"; document: DocumentType }
    | { type: "document_updated"; document: DocumentType }
    | { type: "document_destroyed"; document: DocumentType };

export const useDocumentsSubscription = (
    workspaceId: string | undefined,
    userId: string | undefined,
    setDocuments: Dispatch<SetStateAction<DocumentType[]>>,
): void => {
    useEffect(() => {
        if (!workspaceId || !userId) return;

        const subscription = cable.subscriptions.create(
            { channel: "DocumentsChannel", workspace_id: workspaceId },
            {
                connected() {
                    console.log("Connected To Workspace", workspaceId);
                },
                disconnected() {
                    console.log("Disconnected");
                },
                received(event: DocumentsEvent) {
                    if (event.document.actor_id === userId) return;

                    switch (event.type) {
                        case "document_created":
                            setDocuments((prev) => (prev.some((d) => d.id === event.document.id) ? prev : [...prev, event.document]));
                            break;
                        case "document_updated":
                            setDocuments((prev) => prev.map((d) => (d.id === event.document.id ? { ...d, ...event.document } : d)));
                            break;
                        case "document_destroyed":
                            setDocuments((prev) => prev.filter((d) => d.id !== event.document.id));
                            break;
                        default:
                            console.error(event);
                    }
                },
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [workspaceId, userId, setDocuments]);
};

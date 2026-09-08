import { useDocumentsStore } from "./documentsStore.ts";
import { useEffect } from "react";
import { cable } from "@/lib/cable.ts";
import type { DocumentType } from "@/types/DocumentType.ts";

type DocumentsEvent =
    | {
          type: "document_created";
          document: DocumentType;
      }
    | {
          type: "document_updated";
          document: DocumentType;
      }
    | {
          type: "document_destroyed";
          document: DocumentType;
      };

export const useDocumentsSubscription = (workspaceId: string | undefined, userId: string | undefined): void => {
    const addDocument = useDocumentsStore((state) => state.addDocument);
    const updateDocument = useDocumentsStore((state) => state.updateDocument);
    const removeDocument = useDocumentsStore((state) => state.removeDocument);

    useEffect(() => {
        if (!workspaceId || !userId) return;

        const subscription = cable.subscriptions.create(
            {
                channel: "DocumentsChannel",
                workspace_id: workspaceId,
            },
            {
                connected() {
                    console.log("Connected To Workspace", workspaceId);
                },
                disconnected() {
                    console.log("Disconnected");
                },
                received(event: DocumentsEvent) {
                    if (event.document.actor_id !== userId) {
                        switch (event.type) {
                            case "document_created":
                                addDocument(event.document);
                                break;
                            case "document_updated":
                                updateDocument(event.document);
                                break;
                            case "document_destroyed":
                                removeDocument(event.document);
                                break;
                            default:
                                console.error(event);
                        }
                    }
                },
            },
        );

        return () => {
            subscription.unsubscribe();
        };
    }, [addDocument, removeDocument, updateDocument, userId, workspaceId]);
};

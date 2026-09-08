import { create } from "zustand";
import { api } from "@/api";
import * as _ from "lodash";
import type { DocumentType } from "@/types/DocumentType.ts";

interface DocumentsStore {
    documents: DocumentType[];
    fetchDocuments: (workspaceId: string, callback: (documents: DocumentType[]) => void) => void;
    addDocument: (document: DocumentType) => void;
    removeDocument: (document: DocumentType) => void;
    updateDocument: (document: DocumentType) => void;
}

export const useDocumentsStore = create<DocumentsStore>((set) => ({
    documents: [],
    fetchDocuments: (workspaceId: string, callback: (documents: DocumentType[]) => void) => {
        api.get("/documents", { params: { workspace_id: workspaceId } }).then((response) => {
            const sortedDocuments: DocumentType[] = _.sortBy(response.data, ["created_at"]);
            set({
                documents: sortedDocuments,
            });
            callback(sortedDocuments);
        });
    },
    addDocument: (document: DocumentType) => {
        set((state) => ({
            documents: [...state.documents, document],
        }));
    },
    removeDocument: (document: DocumentType) => {
        set((state) => ({
            documents: state.documents.filter((d) => d.id !== document.id),
        }));
    },
    updateDocument: (document: DocumentType) => {
        set((state) => ({
            documents: state.documents.map((d) => (d.id === document.id ? { ...d, ...document } : d)),
        }));
    },
}));

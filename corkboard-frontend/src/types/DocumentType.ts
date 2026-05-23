export type DocumentType = {
    id: number;
    name: string;
    content: JSON;
    owner: { id: number; username: string };
    updated_at: string;
};

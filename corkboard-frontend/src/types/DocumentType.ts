export type DocumentType = {
    id: number;
    name: string;
    owner: { id: number; username: string };
    updated_at: string;
};

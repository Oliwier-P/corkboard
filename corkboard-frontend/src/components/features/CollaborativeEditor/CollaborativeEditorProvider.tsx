import { HocuspocusProviderWebsocketComponent, HocuspocusRoom } from "@hocuspocus/provider-react";

type CollaborativeEditorProviderProps = {
    documentId: string;
    authToken: string;
    children: React.ReactNode;
};

const hocuspocusUrl = import.meta.env.VITE_HOCUSPOCUS_URL;

export const CollaborativeEditorProvider = ({ documentId, authToken, children }: CollaborativeEditorProviderProps) => {
    return (
        <HocuspocusProviderWebsocketComponent url={hocuspocusUrl}>
            <HocuspocusRoom
                name={documentId}
                token={authToken}
                onAuthenticated={() => console.log("Authenticated")}
                onAuthenticationFailed={(e) => console.log("AuthenticationFailed: ", e)}
                onSynced={(e) => console.log("Synced: ", e)}
            >
                {children}
            </HocuspocusRoom>
        </HocuspocusProviderWebsocketComponent>
    );
};

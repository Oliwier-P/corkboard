import type {ReleaseType} from "../types/ReleaseType.ts";
import {create} from "zustand";
import {api} from "../api/api.ts";

interface ReleasesStore {
    releases: ReleaseType[]
    currentReleaseId: number | null
    nextReleaseId: number | null

    fetchReleases: () => void
    addRelease: (name: string) => void
    updateRelease: (id: number, name: string, callback?: () => void) => void
    deleteRelease: (id: number, callback?: () => void) => void
}

export const useReleasesStore = create<ReleasesStore>((set) => ({
    releases: [],
    currentReleaseId: null,
    nextReleaseId: null,

    fetchReleases: () => {
        api.get("/releases").then((res) => {
            set({
                releases: res.data.releases,
                currentReleaseId: res.data.current_release_id,
                nextReleaseId: res.data.next_release_id
            })
        })
    },
    addRelease: (name: string) => {
        api.post("/releases", {name})
            .then((res) => {
                set((state) => ({
                    releases: [...state.releases, res.data]
                }))
            })
    },
    updateRelease: (id: number, name: string, callback?: () => void) => {
        set((state) => ({
            releases: state.releases.map((r) => (r.id === id ? {...r, name} : r))
        }))
        api.put(`/releases/${id}`, {name}).then(() => callback && callback())
    },
    deleteRelease: (id: number, callback?: () => void) => {
        set((state) => ({
            releases: state.releases.filter((r) => r.id !== id)
        }))
        api.delete(`/releases/${id}`).then(() => callback && callback())
    }
}))
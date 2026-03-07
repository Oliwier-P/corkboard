import "./ReleasesListItem.scss"
import { api } from "../../../api/api.ts";
import { useEffect, useRef, useState } from "react";
import type {KeyboardEvent} from "react";
import {Icon} from "../../ui/Icons/Icon.tsx";

type ReleasesListItemProps = {
    id: number;
    name: string;
    onEdit: (id: number, newName: string) => void;
    onDelete: (id: number) => void;
}

export const ReleasesListItem = ({id, name, onEdit, onDelete}: ReleasesListItemProps) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [value, setValue] = useState<string>(name);
    const [loading, setLoading] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isEditing) {
            inputRef.current?.focus();
        }
    }, [isEditing]);

    const updateRelease = async () => {
        if (value.trim() === "" || value === name) {
            setIsEditing(false);
            return;
        }

        try {
            setLoading(true);

            await api.patch(`/releases/${id}`, { name: value });

            onEdit(id, value);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = async (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            await updateRelease();
        }

        if (e.key === "Escape") {
            setValue(name);
            setIsEditing(false);
        }
    };

    const handleDeleteRelease = async () => {
        try {
            await api.delete(`/releases/${id}`);

            onDelete(id);
            console.log("Deleted!");
        } catch (error) {
            console.error(error);
        }
    }

    return <div className="releases-list-row">
        {isEditing ? <input
            className="releases-list-row__input"
            ref={inputRef}
            value={value}
            disabled={loading}
            onChange={(e) => setValue(e.target.value)}
            onBlur={updateRelease}
            onKeyDown={handleKeyDown}
        /> : <div className="releases-list-row__name">{name}</div>}

        <div className="releases-list-row__progress">
            <div className="bar"></div>
            <span>0/0</span>
        </div>
        <div className="releases-list-row__start">12 Jan</div>
        <div className="releases-list-row__end">25 Jan</div>

        <div className="releases-list-row__menu">
            <div className="edit" onClick={() => setIsEditing(true)}>
                <Icon icon="edit" />
            </div>
            <div className="delete" onClick={handleDeleteRelease}>
                <Icon icon="trash" />
            </div>
        </div>
    </div>
}
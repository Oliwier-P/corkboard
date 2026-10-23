import "./TaskDisplaySection.scss";
import { useAuth } from "@/context/auth/useAuth.ts";
import type { TaskDisplayType } from "@/types/TaskDisplayType.ts";
import usersApi from "@/api/users.ts";

const TaskDisplaySection = () => {
    const { user, setUser } = useAuth();

    const handleChangeTaskDisplay = (value: TaskDisplayType) => {
        usersApi.updatePreferences({ task_display: value }, (response) => {
            setUser(response);
        });
    };

    return (
        <>
            <label className="radio-option">
                <input
                    type="radio"
                    name="taskDisplay"
                    value="modal"
                    checked={user?.preferences.task_display === "modal"}
                    onChange={() => handleChangeTaskDisplay("modal")}
                />
                <span className="icon icon-modal">
                    <span className="shape" />
                </span>
                <span className="label">Modal</span>
            </label>
            <label className="radio-option">
                <input
                    type="radio"
                    name="taskDisplay"
                    value="sidebar"
                    checked={user?.preferences.task_display === "sidebar"}
                    onChange={() => handleChangeTaskDisplay("sidebar")}
                />
                <span className="icon icon-sidebar">
                    <span className="shape" />
                </span>
                <span className="label">Panel</span>
            </label>
        </>
    );
};

export default TaskDisplaySection;

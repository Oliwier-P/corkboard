import "./TaskDisplaySection.scss";
import { useAuth } from "@/context/auth/useAuth.ts";
import type { TaskDisplayType } from "@/types/TaskDisplayType.ts";
import { api } from "@/api";

const TaskDisplaySection = () => {
    const { user, setUser } = useAuth();

    const handleChangeTaskDisplay = (value: TaskDisplayType) => {
        api.put("user_preferences", { user_preference: { task_display: value } }).then((response) => {
            setUser(response.data);
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
                <span className="icon modal">
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
                <span className="icon sidebar">
                    <span className="shape" />
                </span>
                <span className="label">Panel</span>
            </label>
        </>
    );
};

export default TaskDisplaySection;

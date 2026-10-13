import "./WorkspaceGeneral.scss";
import { Input } from "@/ui/Input/Input.tsx";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/api";
import { Button } from "@/ui/Button/Button.tsx";
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@/context/auth/useAuth.ts";
import { useWorkspaceStore } from "@/store/workspaceStore.ts";
import Loading from "@/ui/Loading/Loading.tsx";
import Switch from "@/ui/Switch/Switch.tsx";

const schema = yup
    .object({
        id: yup.string().required(),
        name: yup.string().required("You have to enter a workspace name!"),
        code_prefix_enabled: yup.boolean().nullable().default(true),
        code_prefix: yup
            .string()
            .nullable()
            .max(3, "Max 3 characters")
            .when("code_prefix_enabled", {
                is: true,
                then: (schema) => schema.required("Code prefix is required!"),
                otherwise: (schema) => schema.optional(),
            }),
        auto_assign: yup.boolean().nullable().default(false),
        owner: yup.object().optional(),
    })
    .required();

type FormData = yup.InferType<typeof schema>;

const WorkspaceGeneral = () => {
    const { workspaceId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const setWorkspace = useWorkspaceStore((state) => state.setWorkspace);

    const {
        register,
        handleSubmit,
        formState: { isDirty, isLoading },
        getValues,
        reset,
        watch,
        control,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: async () => {
            const response = await api.get(`/workspaces/${workspaceId}`);
            return await response.data;
        },
    });
    const workspaceOwner = getValues("owner")?.id === user?.id;

    const handleDeleteWorkspace = async () => {
        api.delete(`/workspaces/${getValues("id")}`).then(() => {
            navigate("/workspaces");
        });
    };

    const onSubmit = ({ id, name, code_prefix_enabled, code_prefix, auto_assign }: FormData) => {
        api.put(`/workspaces/${id}`, { name, code_prefix_enabled, code_prefix, auto_assign }).then((res) => {
            reset(res.data);
            setWorkspace(res.data);
        });
    };

    if (isLoading) return <Loading overlay={true} />;

    return (
        <div className="workspace-general">
            <div className="workspace-general__title">
                Workspace settings
                <div className="workspace-general__buttons">
                    <Button color="primary" disabled={!isDirty} onClick={handleSubmit(onSubmit)}>
                        Save
                    </Button>
                </div>
            </div>

            <div className="workspace-general__section-title">General</div>
            <div className="workspace-general__section">
                <div className="workspace-general__setting">
                    <span className="workspace-general__label">Avatar</span>
                    <div className="workspace-general__logo">{getValues("name")?.[0]?.toUpperCase()}</div>
                </div>

                <div className="workspace-general__setting">
                    <span className="workspace-general__label">Name</span>
                    <Input register={register("name")} placeholder="Workspace name" />
                </div>

                <div className="workspace-general__setting">
                    <span className="workspace-general__label">Enable code prefix</span>
                    <Controller
                        control={control}
                        name="code_prefix_enabled"
                        render={({ field }) => <Switch checked={!!field.value} onChange={(checked) => field.onChange(checked)} />}
                    />
                </div>

                {watch("code_prefix_enabled") && (
                    <div className="workspace-general__setting">
                        <span className="workspace-general__label">Tasks code prefix</span>
                        <Input
                            className="code-prefix"
                            register={register("code_prefix", {
                                setValueAs: (value) => value?.toUpperCase() || "",
                            })}
                            maxLength={3}
                        />
                    </div>
                )}

                <div className="workspace-general__setting">
                    <span className="workspace-general__label">Auto assign</span>
                    <Controller
                        control={control}
                        name="auto_assign"
                        render={({ field }) => <Switch checked={!!field.value} onChange={(checked) => field.onChange(checked)} />}
                    />
                </div>
            </div>

            {workspaceOwner && (
                <>
                    <div className="workspace-general__section-title">Danger zone</div>
                    <div className="workspace-general__section">
                        <div className="workspace-general__setting">
                            <span className="workspace-general__label">Delete this Workspace forever</span>
                            <Button color="red" onClick={handleDeleteWorkspace}>
                                Delete
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WorkspaceGeneral;

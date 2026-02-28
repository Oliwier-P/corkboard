import "./LoginPage.scss";
import {Button} from "../../components/ui/./Button/Button.tsx";
import {LabeledInput} from "../../components/ui/LabeledInput/LabeledInput.tsx";
import {type SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    username: string,
    password: string
}

export const LoginPage = () => {

    const {
        register, handleSubmit, formState: {}
    } = useForm<Inputs>()
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <div className="login-page">
            <div className="login-page__content">
                <div className="login-page__header">
                    <div className="login-page__app-name">
                        Corkboard
                    </div>
                    <div className="login-page__horizontal-line"/>
                </div>
                <div className="login-page__description">
                    Manage your project with easy to use App
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <LabeledInput label="Username"
                                  register={register('username', {
                                      required: 'You have to enter a username!',
                                  })}/>
                    <LabeledInput label="Password" type="password"
                                  register={register('password', {
                                      required: 'You have to enter a password!',
                                  })}/>
                    <Button color="primary" type="submit">
                        Login
                    </Button>
                </form>

                <div className="login-page__sign-up">
                    <span className="small-text">Don't have an account?</span>
                    <Button variant="text">Sign Up</Button>
                </div>
            </div>
        </div>
    )
}

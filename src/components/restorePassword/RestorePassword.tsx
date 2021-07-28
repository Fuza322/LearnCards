import React from "react"
import {NavLink, Redirect} from "react-router-dom";
import {useFormik} from "formik";
import {AppRootStateType} from "../../redux/store";
import {useDispatch, useSelector} from "react-redux";
import {restorePasswordTC} from "../../redux/reducers/restorePassword-reducer";
import {InputText} from "../common/inputText/InputText";
import {Button} from "../common/button/Button";
import style from "./RestorePassword.module.scss"

type RestorePasswordPropsType = {}

type FormikErrorType = {
    email?: string
}

export const RestorePassword = React.memo(function (props: RestorePasswordPropsType) {

    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppRootStateType, boolean>(state => state.loginReducer.isLoggedIn)
    const errorMessage = useSelector<AppRootStateType, string | null>(message => message.restorePasswordReducer.errorMessage)

    const formik = useFormik({
        initialValues: {
            email: "",
        },
        validate: (values) => {
            const error: FormikErrorType = {}
            if (!values.email) {
                error.email = "Required"
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                error.email = "Invalid email address"
            }
            return error
        },
        onSubmit: values => {
            dispatch(restorePasswordTC(values.email))
            formik.resetForm()
        }
    })

    if (errorMessage?.slice(0, 8) === 'Recovery') {
        return <Redirect to={'/login'}/>
    }

    if (isLoggedIn) {
        return <Redirect to={"/profile"}/>
    }

    return (
        <div style={{margin: 10}}>
            <form onSubmit={formik.handleSubmit}>
                <p>It-incubator</p>
                <br/>
                <p>Forgot your password?</p>
                <br/>
                <InputText
                    style={{width: 250, height: 50}}
                    placeholder='Email'
                    {...formik.getFieldProps('email')}/>

                {formik.touched.email && formik.errors.email &&
                <div style={{color: 'red'}}>{formik.errors.email}</div>}
                <br/>
                <p style={{color: 'red'}}>{errorMessage}</p>
                <br/><br/><br/>
                <p>Enter your email address and we will send you a further instructions</p>
                <br/><br/>
                <Button
                    type={'submit'}
                    style={{width: 150, height: 50}}>Send instructions</Button>
                <br/><br/>
                <p>Did you remember your password?</p>
                <br/>
                <NavLink to={'/login'}>Try logging in</NavLink>
            </form>
        </div>
    )
})
import React, {useEffect} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {useDispatch} from "react-redux"
import {initializeAppTC} from "./redux/reducers/app-reducer"
import {Header} from "./components/common/header/Header"
import {Profile} from "./components/profile/Profile"
import {Login} from "./components/login/Login"
import {Registration} from "./components/registration/Registration"
import {RestorePassword} from "./components/restorePassword/RestorePassword"
import {UpdatePassword} from "./components/updatePassword/UpdatePassword"
import {PageNotFound} from "./components/pageNotFound/PageNotFound"
import {CheckEmail} from "./components/checkEmail/CheckEmail"
import s from "./App.module.scss"

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())
    }, [dispatch])

    return (
        <section className={s.pagesContainer}>
            <Header/>
            <Switch>
                <Route exact path={"/profile"} render={() => <Profile/>}/>
                <Route path={"/login"} render={() => <Login/>}/>
                <Route path={"/registration"} render={() => <Registration/>}/>
                <Route path={"/restorePassword"} render={() => <RestorePassword/>}/>
                <Route path={"/updatePassword"} render={() => <UpdatePassword/>}/>
                <Route path={"/404"} render={() => <PageNotFound/>}/>
                <Route exact path={"/checkEmail"} render={() => <CheckEmail/>}/>
                <Redirect from={"*"} to={"/404"}/>
            </Switch>
        </section>
    )
}

export default App
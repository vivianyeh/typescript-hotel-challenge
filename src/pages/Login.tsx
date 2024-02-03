

import NavBar from "../components/NavBar";
import LoginBG from "../components/LoginBG";
import LoginForm from "../views/LoginForm";
import { SectionProps } from "../inferfaces/User";
function Login() {
    document.title = "登入"
    const login: SectionProps = {
        message: "沒有會員嗎？",
        link: "前往註冊",
        url: "/typescript-hotel-challenge/#/SignUp",
    }

    return (
        <>
            <div className="row fixed-top">
                <NavBar />
            </div >
            <div className="row">
                <div className="col col-6 d-none d-md-block">
                    <LoginBG />
                </div>
                <div className="col col-12 col-md-6 mt-5">
                    <div className="bg-image-div d-flex justify-content-center">
                        <div className="form-content text-start w-75 py-5">
                            <div className="subtitle">享樂酒店，誠摯歡迎</div>
                            <h1 className="text-white">立即開始旅程</h1>
                            <LoginForm {...login} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;

import NavBar from "../components/NavBar";
import LoginBG from "../components/LoginBG";
import { SectionProps } from "../inferfaces/User";
import SignUpForm from "../views/SignUpForm";

function SignUp() {
    document.title = "註冊";
    const signup: SectionProps = {
        message: "已經有會員了嗎？",
        link: "立即登入",
        url: "typescript-hotel-challenge/#/Login",
    };

    return (
        <>
            <div className="row fixed-top">
                <NavBar />
            </div >
            <div className="row mx-auto">
                <div className="col col-6 d-none d-md-block">
                    <LoginBG />
                </div>
                <div className="col col-12 col-md-6 mt-3">
                    <div className="bg-image-div d-flex justify-content-center">
                        <div className="form-content text-start w-75  py-5">
                            <div className="subtitle">享樂酒店，誠摯歡迎</div>
                            <h1 className="text-white">立即註冊</h1>
                            <SignUpForm  {...signup} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SignUp;
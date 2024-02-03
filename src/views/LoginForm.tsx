import { useEffect, useState } from 'react';
import { Link } from '../components/Form';
import { LoginData, SectionProps } from '../inferfaces/User';
import { Button } from '../components/Button';


export const LoginForm = (section: SectionProps) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        isCheck: false
    })
    const [passwordError, setPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    // const [isFilled, setIsFilled] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (formData.email.length === 0 || formData.password.length === 0) {
            setIsButtonDisabled(true);
        }
        else if (passwordError === '' && emailError === '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);
        }
    }, [formData, passwordError, emailError]);

    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target
        const inputValue = type === 'checkbox' ? checked : value;
        setFormData({
            ...formData,
            [name]: inputValue,
        });

        if (name === "password") {
            if (inputValue.length < 8) {
                setPasswordError('密碼需至少8碼以上');
            } else if (!/\d/.test(inputValue) || !/[a-zA-Z]/.test(inputValue)) {
                setPasswordError('密碼需包含英數字');
            } else {
                setPasswordError('');
            }
        }
        if (name === "email") {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!inputValue || !emailPattern.test(inputValue)) {
                setEmailError('電子信箱格式有誤');
            } else {
                setEmailError('');
            }
        }
        // if (passwordError === '' && emailError === '') {
        //     setIsFilled(true);
        // }

    };



    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const url = "https://freyja-axp6.onrender.com/api/v1/user/login"
        const data: LoginData = {
            email: formData.email,
            password: formData.password,
        }
        await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', },
            body: JSON.stringify(data),
        }).then(response => response.json())
            .then(res => {
                if (res.status === false) {
                    setMessage(res.message);
                } else {
                    setMessage('成功');
                }
                console.log(res)

            })
            .catch(err => Promise.reject(err));

    };
    return (<>
        <form onSubmit={handleSubmit} className="form w-100 d-grid gap-3">
            <label htmlFor="email" className="text-white title">電子信箱</label>
            <div className="property-empty">
                <input className="form-input text-wrapper w-100 line-height-base rounded-2 px-2"
                    id="email" type="email" name="email" value={formData.email}
                    placeholder="hello@exsample.com" onChange={handleInputChange} required
                    style={{ borderColor: emailError ? '#DA3E51' : '#BF9D7D' }}
                />
            </div>
            {emailError && <span style={{ color: '#DA3E51' }}>{emailError}</span>}
            <label htmlFor="password" className="text-white title">密碼</label>
            <div className="property-empty">
                <input className="form-input text-wrapper w-100 line-height-base rounded-2 px-2 "
                    id="password" type="password" name="password" value={formData.password}
                    placeholder="請輸入密碼" onChange={handleInputChange} required
                    style={{ borderColor: passwordError ? '#DA3E51' : '#BF9D7D' }}
                />
            </div>
            {passwordError && <span style={{ color: '#DA3E51' }}>{passwordError}</span>}
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <div>
                        <input className="form-check-input title" id="isCheck" type="checkbox" name="isCheck"
                            onChange={handleInputChange} />
                        <label htmlFor="isCheck" className="text-white title px-2" >記住帳號</label>
                    </div>
                    <div className="text-primary title text-decoration-underline">忘記密碼？</div>
                </div>
            </div>
            {message && <span style={{ color: '#BF9D7D' }}>{message}</span>}

            <Button name="會員登入" disabled={isButtonDisabled} />
            <Link {...section} />
        </form>

    </>
    );
};
export default LoginForm;
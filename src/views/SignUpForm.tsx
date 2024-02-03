import { useEffect, useState } from 'react';
import { Link } from '../components/Form';
import { SectionProps, SigUpData } from '../inferfaces/User';
import { Stepper } from '../components/Stepper';
import { ZipCodeMap } from '../utils/zipcodes';
import Button from '../components/Button';


export const SignUpForm = (section: SectionProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        birthday: '',
        zipcode: 0,
        detail: '',
        isCheck: false,
        password2: '',
    })
    const [passwordError, setPasswordError] = useState('');
    const [passwordError2, setPasswordError2] = useState('');
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [birthError, setbirthError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [checkError, setCheckError] = useState('');

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const [next, setNext] = useState(false);
    const handleInputChange = (e: any) => {
        const { name, value, type, checked } = e.target
        const inputValue = type === 'checkbox' ? checked : value;
        if (name === "password") {
            if (inputValue.length < 8) {
                setPasswordError('密碼需至少8碼以上');
            }
            else if (!/\d/.test(inputValue) || !/[a-zA-Z]/.test(inputValue)) {
                setPasswordError('密碼需包含英數字');
            }
            else {
                setPasswordError('');
            }
        }
        if (name === "password2") {
            if (inputValue !== formData.password) {
                setPasswordError2('密碼不一致');
            } else {
                setPasswordError2('');
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
        if (name === "name") {
            if (!inputValue) {
                setNameError('請輸入姓名');
            } else {
                setNameError('');
            }
        }
        if (name === "phone") {
            const phonePattern = /^09\d{8}$/;
            if (!inputValue || !phonePattern.test(inputValue)) {
                setPhoneError('手機號碼格式有誤');
            } else {
                setPhoneError('');
            }
        }
        if (name === "birthday") {
            if (!inputValue) {
                setbirthError('請選擇生日');
            } else {
                setbirthError('');
            }
        }

        if (name === "detail") {
            if (!inputValue) {
                setAddressError('請輸入詳細地址');
            } else {
                setAddressError('');
            }
        }
        if (name === "isCheck") {
            if (!inputValue) {
                setCheckError('請閱讀並同意本網站個資使用規範');
            } else {
                setCheckError('');
            }
        }
        setFormData({
            ...formData,
            [name]: inputValue,
        });
    };
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        const url = "https://freyja-axp6.onrender.com/api/v1/user/signup"
        const data: SigUpData = {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            phone: formData.phone,
            birthday: new Date(formData.birthday),
            address: {
                zipcode: zipcode,
                detail: formData.detail
            }
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
                    setMessage('註冊成功');
                }

            })
            .catch(err => Promise.reject(err));

    };
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(2);
    };

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const countries = Array.from(new Set(ZipCodeMap.map(item => item.city)));
    const cities = selectedCountry
        ? Array.from(new Set(ZipCodeMap.filter(item => item.city === selectedCountry).map(item => item.county)))
        : [];

    const handleCountryChange = (e: any) => {
        setSelectedCountry(e.target.value);
        setSelectedCity('');
    };
    const [zipcode, setZipcode] = useState(0);

    const getZipCode = (cityName: string, countryName: string): number => {
        const item = ZipCodeMap.find(item => item.city === cityName && item.county === countryName);
        if (item) {
            return item.zipcode;
        } else {
            return 0;
        }
    }
    const handleCityChange = (e: any) => {
        setSelectedCity(e.target.value);

    };

    useEffect(() => {
        if (selectedCountry !== "請選擇縣市" && selectedCity !== "請選擇鄉鎮市區") {
            setZipcode(getZipCode(selectedCountry, selectedCity));
        }
    });

    useEffect(() => {
        if (formData.email.length === 0 || formData.password.length === 0 || formData.password2.length === 0) {
            setNext(true);
        }
        else if (passwordError === '' && emailError === '' && passwordError2 === '') {
            setNext(false);
        } else {
            setNext(true);
        }
    }, [formData, passwordError, emailError, passwordError2]);


    useEffect(() => {
        if (formData.name.length === 0 || formData.phone.length === 0 ||
            formData.birthday.length === 0 || formData.detail.length === 0 ||
            zipcode === 0 || !formData.isCheck) {
            setIsButtonDisabled(true);
        }
        else if (nameError === '' && phoneError === '' &&
            birthError === '' && addressError === '' && checkError === '') {
            setIsButtonDisabled(false);
        } else {
            setIsButtonDisabled(true);

        }
    }, [formData, nameError, phoneError, birthError, addressError, checkError]);


    return (<>  <form onSubmit={handleSubmit} className="form w-100 d-grid gap-3">
        {step === 1 && (
            <>
                <Stepper step={1} />

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
                <label htmlFor="password2" className="text-white title">確認密碼</label>
                <div className="property-empty">

                    <input className="form-input text-wrapper w-100 line-height-base rounded-2 px-2 "
                        id="password2" type="password" name="password2" value={formData.password2}
                        placeholder="請再輸入一次密碼" onChange={handleInputChange} required
                        style={{ borderColor: passwordError2 ? '#DA3E51' : '#BF9D7D' }}
                    />
                </div>
                {passwordError2 && <span style={{ color: '#DA3E51' }}>{passwordError2}</span>}
                <div className="property-empty ">
                    <button type="button"
                        onClick={handleNextStep}
                        className="button text-wrapper w-100 line-height-base rounded-2"
                        disabled={next}>下一步</button>
                </div>
            </>
        )}
        {step === 2 && (<>
            <Stepper step={2} />
            <label htmlFor="name" className="text-white title">姓名</label>
            <div className="property-empty">
                <input className="form-input text-wrapper w-100 line-height-base rounded-2 px-2"
                    id="name" type="text" name="name" value={formData.name}
                    placeholder="請輸入姓名" onChange={handleInputChange} required
                    style={{ borderColor: nameError ? '#DA3E51' : '#BF9D7D' }}
                />
            </div>
            {nameError && <span style={{ color: '#DA3E51' }}>{nameError}</span>}
            <label htmlFor="phone" className="text-white title">手機號碼</label>
            <div className="property-empty">
                <input className="form-input text-wrapper w-100 line-height-base rounded-2 px-2"
                    id="phone" type="tel" name="phone" value={formData.phone}
                    placeholder="請輸入手機號碼" onChange={handleInputChange} required
                    style={{ borderColor: phoneError ? '#DA3E51' : '#BF9D7D' }}
                />
            </div>
            {phoneError && <span style={{ color: '#DA3E51' }}>{phoneError}</span>}
            <label htmlFor="birthday" className="text-white title">生日</label>
            <div className="property-empty">
                <input className="form-input text-wrapper  line-height-base rounded-2 px-2 w-100 "
                    id="birthday" type="date" name="birthday" value={formData.birthday}
                    onChange={handleInputChange} required
                    style={{ borderColor: birthError ? '#DA3E51' : '#BF9D7D' }}
                />
            </div>
            {birthError && <span style={{ color: '#DA3E51' }}>{birthError}</span>}
            <label htmlFor="address" className="text-white title">地址</label>
            <div className="property-empty">
                <select value={selectedCountry} onChange={handleCountryChange}
                    className="rounded-2 px-2 w-50 h-75">
                    <option value="">請選擇縣市</option>
                    {countries.map(country => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <select value={selectedCity} onChange={handleCityChange}
                    className="rounded-2 px-2 w-50 h-75">
                    <option value="">請選擇鄉鎮市區</option>
                    {cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                    ))}
                </select>
            </div>
            <div className="property-empty">
                <input className="form-input text-wrapper w-100 line-height-base rounded-2 px-2"
                    id="detail" type="text" name="detail" value={formData.detail}
                    placeholder="請輸入詳細地址" onChange={handleInputChange} required
                    style={{ borderColor: addressError ? '#DA3E51' : '#BF9D7D' }}
                />
            </div>
            {addressError && <span style={{ color: '#DA3E51' }}>{addressError}</span>}
            <div className="row">
                <div className="col d-flex justify-content-between">
                    <div>
                        <input className="form-check-input title" id="isCheck" type="checkbox" name="isCheck"
                            onChange={handleInputChange} />
                        <label htmlFor="isCheck" className="text-white title px-2" >我已閱讀並同意本網站個資使用規範</label>
                    </div>
                </div>
            </div>
            {checkError && <span style={{ color: '#DA3E51' }}>{checkError}</span>}
            {message && <span style={{ color: '#BF9D7D' }}>{message}</span>}

            <Button name="完成註冊" disabled={isButtonDisabled} />

        </>
        )}
        <Link {...section} />
    </form>
    </>
    );
};
export default SignUpForm; 
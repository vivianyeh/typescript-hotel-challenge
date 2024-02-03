
export const Stepper = ({ step }: { step: number }) => {

    return (
        <div>
            {step === 1 && (
                <Step1 />

            )}
            {step === 2 && (
                <Step2 />
            )}
        </div>
    );
};

const Step1 = () => {
    return (
        <>
            <div className="row d-flex justify-content-center text-center w-100">
                <div className="col-5">
                    <div className="row d-flex justify-content-center ">
                        <div className="circle">1</div>
                        <span className="text-white ">輸入信箱及密碼</span>
                    </div>
                </div>
                <div className="col">
                    <div className="row d-flex justify-content-center underline mt-5">
                    </div>
                </div>
                <div className="col-5">
                    <div className="row d-flex justify-content-center">
                        <div className="circle bg-white text-secondary">2</div>
                        <span className="text-secondary ">填寫基本資料</span>
                    </div>
                </div>
            </div>
        </>
    );
};

const Step2 = () => {
    return (
        <>
            <div className="row d-flex justify-content-center text-center w-100">
                <div className="col-5">
                    <div className="row d-flex justify-content-center ">
                        <div className="circle">✔</div>
                        <span className="text-white ">輸入信箱及密碼</span>
                    </div>
                </div>
                <div className="col">
                    <div className="row d-flex justify-content-center underline mt-5">
                    </div>
                </div>
                <div className="col-5">
                    <div className="row d-flex justify-content-center">
                        <div className="circle">2</div>
                        <span className="text-white">填寫基本資料</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Stepper;
export const Button = ({ name, disabled }: { name: string, disabled: boolean }) => {

    return (
        <>
            <div className="property-empty ">
                <button type="submit"
                    disabled={disabled}
                    className="button text-wrapper w-100 line-height-base rounded-2">{name}</button>
            </div>
        </>
    )
}
export default Button;
import { SectionProps } from "../inferfaces/User"
export const Link = ({ message, link, url }: SectionProps) => {
    return (
        <>
            <div className="row">
                <div className="col d-flex ">
                    <label className="text-white title">{message}</label>
                    <div className="text-primary title text-decoration-underline px-2">
                        <a href={url}>{link}</a>
                    </div>
                </div>
            </div>
        </>
    )

}

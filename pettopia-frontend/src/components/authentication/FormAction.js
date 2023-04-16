export default function FormAction({
    handleSubmit,
    type='Button',
    action='submit',
    text
}){
    return(
        <>
        {
            type==='Button' ?
            <button
                type={action}
                className="btn-primary btn inline-block"
                onSubmit={handleSubmit}
            >

                {text}
            </button>
            :
            <></>
        }
        </>
    )
}

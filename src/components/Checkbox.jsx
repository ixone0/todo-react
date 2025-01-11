export default function Checkbox({ text, isChecked}) {
    let ResultCheckbox = ''
    if (isChecked) {
        ResultCheckbox = 
        <div>{text} is done</div>
    } else {
        ResultCheckbox = 
        <div>{text} is in progress</div>
    }
    return (
        <>
            {ResultCheckbox}
        </>
    )
}
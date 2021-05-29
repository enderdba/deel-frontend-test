const SourceSelector = (props) => {
    const { source, changeSource } = props

    const onRadioSelect = (e) => {
        changeSource(e.target.value)
    }

    return (<div onChange={onRadioSelect}>
        <input type="radio" value="json" defaultChecked={source === "json"} name="type" /> JSON hardcode
        <input type="radio" value="api" defaultChecked={source === "api"} name="type" /> FakeAPI
    </div>)
}

export default SourceSelector
export default () => {
    let connectedComponents //TODO: cannot be inited as an empty array because of userInput filters

    const setConnectedComponents = components =>
        (connectedComponents = components)

    const getConnectedComponents = () => connectedComponents

    return {
        setConnectedComponents,
        getConnectedComponents,
    }
}
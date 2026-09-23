declare module '*.pegjs' {
    const content: import('peggy').Parser
    export default content
}

declare module '*.js.static' {
    const content: any
    export default content
}

declare module '*.svg_content' {
    const content: any
    export default content
}

declare module '*.html' {
    const content: any
    export default content
}

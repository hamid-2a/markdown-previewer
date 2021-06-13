const placeholder = `# Welcome to my React Markdown Previewer!

## This is a sub-heading...
### And here's some other cool stuff:

Heres some code, \`<div></div>\`, between 2 backticks.

\`\`\`
// this is multi-line code:

function anotherExample(firstLine, lastLine) {
  if (firstLine == '\`\`\`' && lastLine == '\`\`\`') {
    return multiLineCode;
  }
}
\`\`\`

You can also make text **bold**... whoa!
Or _italic_.
Or... wait for it... **_both!_**
And feel free to go crazy ~~crossing stuff out~~.

There's also [links](https://www.freecodecamp.org), and
> Block Quotes!

And if you want to get really crazy, even tables:

Wild Header | Crazy Header | Another Header?
------------ | ------------- | -------------
Your content can | be here, and it | can be here....
And here. | Okay. | I think we get it.

- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.


1. And there are numbered lists too.
1. Use just 1s if you want!
1. And last but not least, let's not forget embedded images:

![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
`;

//Marked settings
marked.setOptions({
    breaks: true
});

//The renderer defines the output of the parser
const renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
    return `<a target="_blank" href="${href}">${text}</a>`;
};

//Preview component
const Preview = ({ markdown }) => {
    return (
        <div id="preview"
            dangerouslySetInnerHTML={{
                __html: marked(markdown, { renderer: renderer })
            }}
        ></div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            markdown: placeholder
        }
    }

    handleChange = (event) => {
        this.setState({
            markdown: event.target.value
        });
    }

    render() {
        return (
            <div className="wrapper">
                <h1 className="title">Markdown Previewer</h1>
                <div className="inputs">
                    <div className="input-box">
                        <header>Input</header>
                        <textarea id="editor" onChange={this.handleChange} value={this.state.markdown}></textarea>
                    </div>

                    <div className="output-box">
                        <header>output</header>
                        <Preview markdown={this.state.markdown} />
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(
    <App />,
    document.getElementById("root"));



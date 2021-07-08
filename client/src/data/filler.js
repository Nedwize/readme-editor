const text = `# Welcome to ReadMeEditor!🗒️

**ReadMeEditor** is a free, open source note taking application, which helps you write and visualize your notes in real time. ReadMeEditor comes with an in-built **Code Editor** so you can seamlessly write your notes in [Markdown](https://joplinapp.org/#markdown). ReadMeEditor is available as a **💻 desktop web** application and also comes with **🌓 Dark Mode**.

## Joplin is divided into three parts

Joplin has three main columns:

- **Sidebar** contains the list of your notebooks and tags, as well as the synchronisation status.
- **Note List** contains the current list of notes - either the notes in the currently selected notebook, the notes in the currently selected tag, or search results.
- **Note Editor** is the place where you write your notes. There is a **WYSIWYG editor** and a **Markdown editor** - click on **Code View** to switch between both! You may also use an [external editor](https://joplinapp.org/#external-text-editor) to edit notes. For example you can use something like Typora as an external editor and it will display the note as well as any embedded images.

## Writing notes in Markdown

Markdown is a lightweight markup language with plain text formatting syntax. Joplin supports a [Github-flavoured Markdown syntax](https://joplinapp.org/markdown/) with a few variations and additions.

In general, while Markdown is a markup language, it is meant to be human readable, even without being rendered. This is a simple example (you can see how it looks in the viewer panel):

* * *

# Heading

## Sub-heading

Paragraphs are separated by a blank line. Text attributes _italic_, **bold** and \`monospace\` are supported. You can create bullet lists:

* apples
* oranges
* pears

Or numbered lists:

1. wash
2. rinse
3. repeat

This is a [link](https://joplinapp.org) and, finally, below is a horizontal rule:

* * *

A lot more is possible including adding code samples, math formulae or checkbox lists - see the [Markdown documentation](https://joplinapp.org/#markdown) for more information.

## Organising your notes

### With notebooks 📔

Joplin notes are organised into a tree of notebooks and sub-notebooks.

- On **desktop**, you can create a notebook by clicking on New Notebook, then you can drag and drop them into other notebooks to organise them as you wish.
- On **mobile**, press the "+" icon and select "New notebook".
- On **terminal**, press \`:mn\`

![](:/5b0f3491f1ee480dba575af88f098b83)

### With tags 🏷️

The second way to organise your notes is using tags:

- On **desktop**, right-click on any note in the Note List, and select "Edit tags". You can then add the tags, separating them by commas.
- On **mobile**, open the note and press the "⋮" button and select "Tags".
- On **terminal**, type \`:help tag\` for the available commands.
`;

export default text;

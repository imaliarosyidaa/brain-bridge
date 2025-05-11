import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'
import MenuBar from './MenuBar'

export default function TiptapEditor({ description, setDescription }) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: description,
    onUpdate: ({ editor }) => {
      setDescription(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3'
      }
    }
  })

  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description)
    }
  }, [description, editor])

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  )
}

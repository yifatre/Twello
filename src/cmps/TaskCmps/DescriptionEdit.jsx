import { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'

export function DescriptionEdit({ task, saveTask, setIsDescriptionEdit, groupId }) {

    const API_KEY = '9soib2ndek94izy2u7ii5a5j5chs1jxjespuxr1934xsv5mb'
    const editorRef = useRef(null)

    function onSave() {
        saveTask({ ...task, description: editorRef.current.getContent() }, groupId)
        setIsDescriptionEdit(false)
    }

    function onCancel() {
        setIsDescriptionEdit(false)
    }

    return (
        <>
            <Editor
                apiKey={API_KEY}
                onInit={(evt, editor) => editorRef.current = editor}
                initialValue={task.description}
                init={{
                    height: 300,
                    menubar: false,
                    width: "100%",
                    resize: false,
                    statusbar: false,
                    toolbar_mode: 'sliding',
                    selector: 'div.desc-editor',
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                        'anchor', 'searchreplace', 'visualblocks', 'codesample', 'help',
                    ],
                    toolbar: 'styles | bold italic strikethrough | alignleft aligncenter alignright alignjustify | outdent indent | link codesample',
                    content_style: 'body {font - family:-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif; font-size:14px }'
                }}
            />
            <button className='create-btn' onClick={onSave}>Save</button>
            <button className='tasks-btn' onClick={onCancel}>Cancel</button>
        </>
    )
}

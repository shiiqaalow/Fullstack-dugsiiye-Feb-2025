import React, {forwardRef, useCallback, useEffect, useRef, useState} from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css'

// from parent to child = use props
// from child to parent = use forwardRef

//Use forwardRef to properly handle the ref as a child


const QuillEditor = ({value,onChange,placeholder,className,height=400 }) => {

    const QuillRef = useRef()

    const [ editorValue,setEditorValue ] = useState(value || '')

    // Update local state when prop value changes

    useEffect(()=>{
        setEditorValue(value || '')
    },[])


    // create a memorized onChange handler

    const handleOnChange = useCallback((value)=>{
        setEditorValue(value)
        onChange(value)
    },[onChange])
    

    // setup editor modules

    const modules = {
        toolbar: [
            ['bold','italic','underline','strike'],
            ['blockquote','code-block'],
            [{'header':1},{'header':2}],
            [{'list':'ordered'}],
            [{'script':'sub'},{'script':'super'}],
            [{'indent':'-1'},{'indent':'+1'}],
            ['link','image'],
            ['clean']
        ]
    }

    // setup editor formats

    const formats = [
        'header','bold','italic','underline','strike','blockquote','list','indent','link','image','code-block','script'
    ]

    return (
        <div className={className || ''} style={{height:`${height}px`}}>
            <ReactQuill
                ref={QuillRef}
                value={value}
                placeholder={placeholder || 'Write your content...'}
                onChange={handleOnChange}
                theme='snow'
                style={{height:`${height - 42}px`}}
                modules={modules}
                formats={formats}

            />
        </div>
    );
}

export default QuillEditor;

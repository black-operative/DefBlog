import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'
import config from '../conf/config';

function RTE(
    {
        name,
        control,
        label,
        defaultValue = ''        
    }
) {
    return (
        <div className = "w-full">
            {
                label &&
                <label className = "inline-block mb-1 pl-1">
                    {label}
                </label>
            }

            <Controller 
                name    = {name || 'Content'}
                control = {control}
                render  = {
                    ( { field : {onChange} } ) => (
                        <Editor 
                            apiKey         = {config.TIMYMCE_API_KEY}
                            initialValue   = {defaultValue}
                            onEditorChange = {onChange}                        
                            init           = {
                                {
                                    initialValue  : defaultValue,
                                    height        : 500,
                                    menubar       : true,
                                    toolbar       : `undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help`,
                                    content_style : "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                    plugins       : [
                                        'advlist', 
                                        'autolink', 
                                        'lists',
                                        'link', 
                                        'image', 
                                        'charmap',
                                        'preview', 
                                        'anchor', 
                                        'searchreplace',
                                        'code', 
                                        'media',
                                        'fullscreen',
                                        'table', 
                                        'code',
                                        'insertdatetime',
                                        'help', 
                                        'anchor',
                                        'wordcount',
                                        'visualblocks',
                                    ],
                                }
                            }
                        />
                    )
                }
            />
        </div>
    );
}

export default RTE;
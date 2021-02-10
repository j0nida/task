
import React from 'react';

const FileControl = (props) => {
    const {
        cancelIf, 
        onCancel, 
        onChange, 
        onLoaded,
        allowedFileTypes, //["image/png", "image/jpeg", "image/gif"]//["application/pdf","text/plain"]//FOR OTHER FORMATS SEE OUTPUT ON THE CONSOLE.WARN BELOW
        ...otherProps
    } = props;

    const handleChange = (event) => {
        const { files } = event.target;

        if (onChange) {
            if (props.multiple) {
                onChange(files);
            } else {
                onChange(files[0]);
            }
        }

        if (onLoaded || cancelIf) {
            const fileLength = props.multiple ? files.length : 1;
            for (let i = 0; i < fileLength; i++) {
                const file = files[i];

                if (allowedFileTypes && Array.isArray(allowedFileTypes)) 
                {
                    if(allowedFileTypes.indexOf(file.type) === -1) {
                        if (onCancel) {
                            onCancel(file, 'notAllowedFileType');
                        }
                        console.warn(`Selected file type [${file.type}] is not allowed "${file.name}"`);
                        return;
                    }
                }

                if (cancelIf && cancelIf(file)) {
                    if (onCancel) {
                        onCancel(file, 'custom');
                    }

                    return;
                }

                if (onLoaded && file) {
                    const fileReader = new window.FileReader();

                    fileReader.onload = (fileReadEvent) => {
                        onLoaded(fileReadEvent, file, fileReader.result);
                    };
                    fileReader.readAsDataURL(file);//OR readAsArrayBuffer, readAsBinaryString, readAsText
                }
            }
        }
    }

    return (
        <div className="col-md">
            <input {...otherProps}
                type='file'
                onChange={handleChange}
            />
        </div>
    );
}

export default FileControl;
export default function validateCreateLink(values) {
    //helper function
    let errors = {};
    //email error handling
    if (!values.description) {
        errors.description = 'Description required';
    } else if (values.description.length < 10) {
        errors.description = 'Description must be at least 10 characters.';
    }
    //password error handling
    if (!values.url) {
        errors.url = 'URL required';
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
        errors.url = 'This is not a valid URL.';
    }
    return errors;
}

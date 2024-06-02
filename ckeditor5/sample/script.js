ClassicEditor.create(document.querySelector(".editor"), {})
    .then((editor) => {
        window.editor = editor;
    })
    .catch(handleSampleError);

function handleSampleError(error) {
    const issueUrl = "https://github.com/ckeditor/ckeditor5/issues";

    const message = [
        "Oops, something went wrong!",
        `Please, report the following error on ${issueUrl} with the build id "arpqwijhsl2i-6fr9x5thuuco" and the error stack trace:`,
    ].join("\n");

    console.error(message);
    console.error(error);
}

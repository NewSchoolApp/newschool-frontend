export default function (object) {
    const form = new FormData();
    Object.keys(object).forEach(property => {
        form.append(property, object[property])
    })
    return form;
}
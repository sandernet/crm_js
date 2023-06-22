
export default function Images({ id }) {


    const urlImages = (id) => {

        return `http://localhost:5000/api/crm/images/?id=${id}`
    }


    if (id !== undefined) {
        return (
            <img src={urlImages(id)} alt="Картинка" width="30" height="30" />
        )
    }
    else {
        return
    }
}
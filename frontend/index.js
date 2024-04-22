const parent = document.getElementById('parent-el')

async function socialPost(event) {

    event.preventDefault()
    const imageUrl = event.target.post.value;
    const description = event.target.description.value;
    console.log(imageUrl, description)
    let post = {
        imageUrl,
        description
    }
    await axios.post("http://localhost:4000/social/post", post).then((res) => {
        if (res.status === 201) {
            alert(res.data.message)
            window.location.reload()
        }
    })
}

async function fetchedPost() {

    await axios.get("http://localhost:4000/social-fetch").then((res) => {
        if (res.status === 200) {
            console.log(res.data)
            const data = res.data.fetchedData;
            data.forEach((item) => {
                parent.innerHTML += `<ul id="parent"><li class="list"><img src=${item.imageUrl} />
                <p>user - ${item.description}</p>
                <button class="btn1" id=btn-comment onClick='showComment(${item.id})'>comment</button></li></ul>`
            })

        }
    }).catch((err) => {
        console.log(err)
    })
}
async function showComment(id) {
    console.log(id)
    const comment = document.getElementById("comment-1");
    comment.innerHTML = `<ul id="comment"><li class="list1"><form onSubmit =sendComment(event,${id})><input type="text" name="comment"  />
    <button class="btn">Send</button></form>
    </li></ul>`
    const showComment = document.getElementById('show-comment-1')
    await axios.post("http://localhost:4000/social/fetchcomment", { id: id }).then((res) => {
        if (res.status === 200) {
            console.log(res, "fhdchfb")
            let dataComment = res.data.commentData;
            dataComment.forEach((item) => {

                showComment.innerHTML += `<ul id="show-comment"><li><h3 style="yellow">Anyomonus:</h3>${item.comment}</li></ul>`
            })
        }
    }).catch((err) => {
        console.log(err)
    })

}
async function sendComment(e, id) {
    e.preventDefault()
    console.log("fghchfhhfhh")
    console.log(id, "fbcn", e.target.comment.value)
    let updateData = {
        id: id,
        comment: e.target.comment.value
    }
    console.log("updated data", updateData)
    await axios.post('http://localhost:4000/social/comment', updateData).then((res) => {
        if (res.status === 201) {

            console.log("success")
            window.location.reload()
        }
    })
}

window.addEventListener('DOMContentLoaded', fetchedPost)
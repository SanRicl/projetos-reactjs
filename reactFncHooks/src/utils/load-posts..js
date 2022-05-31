export const loadPosts = async () => {
    const postsResponse = fetch("https://jsonplaceholder.typicode.com/posts");
    const photosResponse = fetch("https://jsonplaceholder.typicode.com/photos")

    const [posts, photos] = await Promise.all([postsResponse, photosResponse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    //Zippando dois arrays. Pegando o array de fotos, a url e adcionando no array de posts
    const postsAndPhotos = postsJson.map((posts, index) => {
        return {...posts, cover: photosJson[index].url}
    })

    return postsAndPhotos
}
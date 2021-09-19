function fetchImages(searchValue, page) {
  return fetch(
    `https://pixabay.com/api/?q=${searchValue}&page=${page}&key=22121707-46a45fd40074b90b571e26051&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(
      new Error(`Sorry!We don't have images with this name`)
    );
  });
}
export const api = {
  fetchImages,
};

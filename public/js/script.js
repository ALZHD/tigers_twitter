const postForm = document.forms.postform;

function createCard(obj) {
  return `
        <div class='col'>
      <div class='card' style='width: 18rem;'>
        <img src=${obj.img} class='card-img-top' alt=${obj.img} />
        <div class='card-body'>
          <h5 class='card-title'>${obj.title}</h5>
          <button
            data-id=${obj.id}
            type='button'
            class='btn btn-danger'
          >Delete</button>
        </div>
      </div>
    </div>
    `;
}

postForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const allFromForm = Object.fromEntries(new FormData(postForm)); // собрали форму в объект
  // {name:value} -> {title:...,img:...}
  const response = await fetch('/posts', {
    method: 'post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(allFromForm),
  });
  if (response.ok) {
    const data = await response.json(); // {newPost:{title:...,img:...,id:...,author:...}}
    const container = document.querySelector('[data-container]');
    container.insertAdjacentHTML('afterbegin', createCard(data.newPost));
    postForm.reset();
  }
});

const postContainer = document.querySelector('[data-container]');
postContainer.addEventListener('click', async (e) => {
  if (e.target.type === 'button') {
    const response = await fetch(`/posts/${e.target.dataset.bla}/delete`);
    if (response.ok) {
      const currCard = e.target.closest('[data-col]');
      currCard.remove();
    } else {
      const data = await response.json();
      alert(data.message);
    }
  }
});

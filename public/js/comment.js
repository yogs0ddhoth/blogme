const signupFormHandler = async (event) => {
  event.preventDefault();
  console.log('test1');
  const comment = document.querySelector('#comment-input').value.trim();
  const id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comment && id) {
    console.log('test2');
    const response = await fetch(`/api/posts/${id}`, {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: { 'Content-Type': 'application/json' },
    });
    
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('submit', signupFormHandler);

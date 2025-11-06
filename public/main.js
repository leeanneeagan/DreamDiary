document.addEventListener('DOMContentLoaded', () => {
  // ------------------
  // DREAMS
  // ------------------
  document.querySelectorAll('.entry').forEach(entry => {
    const id = entry.querySelector('.delete-btn').dataset.id;
    const titleEl = entry.querySelector('.entry-title');
    const contentEl = entry.querySelector('.entry-content p');

    // DELETE
    entry.querySelector('.delete-btn')?.addEventListener('click', () => {
      fetch(`/dreams/${id}`, { method: 'DELETE' })
        .then(res => { if(res.ok) location.reload(); })
        .catch(err => console.log(err));
    });

    // EDIT
    entry.querySelector('.btn-info')?.addEventListener('click', (e) => {
      e.preventDefault(); // prevent default link navigation
      const newTitle = prompt('Edit dream title:', titleEl.innerText);
      const newContent = prompt('Edit dream content:', contentEl.innerText);
      if (!newTitle || !newContent) return;

      fetch(`/dreams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: newTitle, content: newContent })
      }).then(res => { if(res.ok) location.reload(); })
        .catch(err => console.log(err));
    });
  });
});

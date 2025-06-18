document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  if (!user || !token) {
    window.location.href = '/signin.html';
    return;
  }

  // Welcome message
  const welcomeMessage = document.getElementById('welcomeMessage');
  welcomeMessage.textContent = `Welcome, ${user.username} (${user.role})`;

  // Show admin panel only for admins
  if (user.role === 'admin') {
    document.getElementById('adminPanel').style.display = 'block';
  }

  // Sign out
  document.getElementById('signOutBtn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'signin.html';
  });

  // List My Creatures
  const myCreaturesList = document.getElementById('myCreaturesList');
  document.getElementById('listCreaturesBtn').addEventListener('click', async () => {
    myCreaturesList.innerHTML = ''; // clear list

    try {
      const response = await fetch('http://localhost:5050/api/my-creatures', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const creatures = await response.json();

      if (!response.ok) {
        alert(creatures.message || 'Failed to fetch creatures');
        return;
      }

      if (creatures.length === 0) {
        myCreaturesList.innerHTML = '<li>No creatures in your list.</li>';
        return;
      }

      creatures.forEach(c => {
        const li = document.createElement('li');
        li.style.color = 'white';
        li.style.fontWeight = 'bold';
        li.style.marginBottom = '1rem';
        li.style.padding = '0.5rem';
        li.style.border = '1px solid #ccc';
        li.style.borderRadius = '5px';
        li.style.backgroundColor = '#222';
        li.style.display = 'flex';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';
      
        const infoDiv = document.createElement('div');
        infoDiv.textContent = c.name; 
      
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '1rem';
        removeBtn.addEventListener('click', () => removeCreature(c._id));
      
        li.appendChild(infoDiv);
        li.appendChild(removeBtn);
        myCreaturesList.appendChild(li);
      });
      

    } catch (error) {
      alert('Network error. Please try again later.');
    }
  });
  
  
  // Remove Creature
  async function removeCreature(id) {
    try {
      const response = await fetch(`http://localhost:5050/api/my-creatures/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Failed to remove creature');
        return;
      }

      alert('Creature removed successfully');
      document.getElementById('listCreaturesBtn').click(); // refresh list
    } catch (error) {
      alert('Network error while removing creature');
    }
  }
  

  
  // Add Creature to My Creatures
  async function addCreature(creatureId) {
    try {
      const response = await fetch(`http://localhost:5050/api/my-creatures/${creatureId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.message || 'Failed to add creature');
        return;
      }

      alert('Creature added to your list!');
    } catch (error) {
      alert('Network error while adding creature.');
    }
  }
  

  // Search Creatures
  document.getElementById('searchBtn').addEventListener('click', () => {
    const query = document.getElementById('searchInput').value.trim();
    const resultsList = document.getElementById('resultsList');
    resultsList.innerHTML = '';

    const url = query === ''
      ? 'http://localhost:5050/api/creatures'
      : `http://localhost:5050/api/creatures/search?query=${encodeURIComponent(query)}`;

    fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data) || data.length === 0) {
          resultsList.innerHTML = '<li>No results found.</li>';
          return;
        }

        data.forEach(creature => {
          const li = document.createElement('li');
          li.style.color = 'white';
          li.style.fontWeight = 'bold';
          li.style.marginBottom = '1rem';
          li.style.padding = '0.5rem';
          li.style.border = '1px solid #ccc';
          li.style.borderRadius = '5px';
          li.style.backgroundColor = '#222';
        
          const name = document.createElement('div');
          name.textContent = `Name: ${creature.name}`;
        
          const category = document.createElement('div');
          category.textContent = `Category: ${creature.category}`;
        
          const description = document.createElement('div');
          description.textContent = `Description: ${creature.description}`;
        
          const addBtn = document.createElement('button');
          addBtn.textContent = 'Add';
          addBtn.style.marginTop = '0.5rem';
          addBtn.addEventListener('click', () => addCreature(creature._id));
        
          li.appendChild(name);
          li.appendChild(category);
          li.appendChild(description);
          li.appendChild(addBtn);
          resultsList.appendChild(li);
        });
        
      })
      .catch(err => {
        console.error('Search error:', err);
        alert('Search failed. Please try again.');
      });
  });

});

document.addEventListener('DOMContentLoaded', () => {
    const addPhoneForm = document.getElementById('addPhoneForm');
    const phoneList = document.getElementById('phoneList');
  
    // Carrega a lista de telefones ao abrir a página
    loadPhones();
  
    // Adiciona um novo telefone
    addPhoneForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('phoneName').value;
      const phone = document.getElementById('phoneNumber').value;
  
      try {
        const response = await fetch('http://localhost:5001/api/phones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: 1, name, phone }), // Substitua 1 pelo ID do usuário logado
        });
  
        if (response.ok) {
          alert('Telefone cadastrado com sucesso');
          loadPhones(); // Recarrega a lista de telefones
        } else {
          alert('Erro ao cadastrar telefone');
        }
      } catch (error) {
        console.error('Erro ao cadastrar telefone:', error);
        alert('Erro ao cadastrar telefone');
      }
    });
  
    // Função para carregar a lista de telefones
    async function loadPhones() {
      try {
        const response = await fetch('http://localhost:5001/api/phones/1'); // Substitua 1 pelo ID do usuário logado
        const phones = await response.json();
  
        phoneList.innerHTML = ''; // Limpa a lista atual
        phones.forEach(phone => {
          const li = document.createElement('li');
          li.textContent = `${phone.name}: ${phone.phone}`;
          phoneList.appendChild(li);
        });
      } catch (error) {
        console.error('Erro ao carregar telefones:', error);
      }
    }
  });
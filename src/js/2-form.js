// Ім'я ключа в локальному сховищі
const STORAGE_KEY = 'feedback-form-state';

// Ініціалізація об'єкта formData з порожніми значеннями
let formData = { email: '', message: '' };

// Отримання посилань на елементи форми
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

// Функція для оновлення значення formData і збереження в локальному сховищі
const updateFormData = () => {
  formData.email = emailInput.value.trim();
  formData.message = messageTextarea.value.trim();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

// Функція для завантаження даних з локального сховища при завантаженні сторінки
const populateFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    formData = JSON.parse(savedData);
    emailInput.value = formData.email || '';
    messageTextarea.value = formData.message || '';
  }
};

// Відстеження події 'input' для збереження введених даних
form.addEventListener('input', (event) => {
  if (event.target.name === 'email' || event.target.name === 'message') {
    updateFormData();
  }
});

// Обробка події 'submit' для перевірки полів і виведення даних у консоль
form.addEventListener('submit', (event) => {
  event.preventDefault(); // Забороняємо перезавантаження сторінки при сабміті

  // Перевірка, чи всі поля заповнені
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  // Виведення об'єкта formData у консоль
  console.log('Form submitted:', formData);

  // Очищення форми, об'єкта formData і локального сховища
  form.reset();
  formData = { email: '', message: '' };
  localStorage.removeItem(STORAGE_KEY);
});

// Завантаження даних з локального сховища при завантаженні сторінки
populateFormData();

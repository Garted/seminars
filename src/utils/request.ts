//Запросы на сервер

export async function deleteRequest(url: string) {
  //запрос на удаление данных на сервере, аргументом приходит строка в которой путь к серверу и id которые ужно удалить `http://localhost:5000/seminars/${id}`
  try {
    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      throw new Error(`Ошибка: ${res.status} ${res.statusText}`);
    }
    console.log('Данные удалены');
  } catch (e) {
    console.error('Ошибка при удалении:', e);
  }
}

export async function updateRequest<T>(url: string, data: T): Promise<void> {
  //запрос на обновление данных на сервере
  try {
    const res = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Ошибка обновления: ${res.status} ${res.statusText}`);
    }
    console.log('Данные обновлены');
  } catch (error) {
    console.error('Ошибка при обновлении:', error);
  }
}

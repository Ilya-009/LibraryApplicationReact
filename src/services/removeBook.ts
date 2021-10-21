export const removeBook = async (bookId: number | undefined):Promise<boolean> =>{
    if (bookId === undefined) return false;

    const url = 'http://localhost:44300/api/Books/' + bookId;

    const response = await fetch(url, {
        method: 'DELETE',
        credentials : "include"
    });

    if(!response.ok){
        console.error('Ошибка при добавлении новой книги');
        return false;
    }

    return true;
};
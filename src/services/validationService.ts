export const validateEmail = (email: string):boolean =>{
    return email.includes('@') && (email !== '') && (email.length > 8);
};

export const validatePasswordConfirm = (password: string, passwordConfirm: string): boolean => {
    return passwordConfirm !== '' && password === passwordConfirm;
};
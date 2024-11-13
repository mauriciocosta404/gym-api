export class ResourseNotFoundError extends Error{
    constructor(){
        super('Resourse not found.');
    }
}
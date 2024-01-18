export const createCrud = () => {
  class GetManyResponseDto {}

  /*
    Object.defineProperty(GetManyResponseDto, 'name', {
      writable: false,
      value: `GetMany${resourceName}ResponseDto`,
    });
*/
  return GetManyResponseDto;
};
